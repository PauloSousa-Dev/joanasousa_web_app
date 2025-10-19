# RegyBox API Integration - Setup Guide

## Overview

This application now integrates with RegyBox to display real-time class schedules with availability and student counts. The integration is built with security as the top priority.

## Security Features

✅ **Server-side only authentication** - Credentials never exposed to the client
✅ **Environment variables** - All sensitive data stored securely
✅ **5-minute caching** - Reduces load on RegyBox API and improves performance
✅ **Error handling** - Graceful fallbacks and user-friendly error messages
✅ **Protected credentials** - `.env.local` is in `.gitignore` and never committed

## Setup Instructions

### 1. Configure RegyBox Credentials

You need to add your RegyBox credentials to the `.env.local` file:

```bash
# Open .env.local and add your credentials:
REGYBOX_BOX_ID=your_box_id_here
REGYBOX_EMAIL=your_email@example.com
REGYBOX_PASSWORD=your_password_here
```

**How to get these values:**
- **REGYBOX_BOX_ID**: Your gym's unique identifier in RegyBox (ask RegyBox support or check your account)
- **REGYBOX_EMAIL**: Your RegyBox login email
- **REGYBOX_PASSWORD**: Your RegyBox password

### 2. Restart the Development Server

After adding credentials, restart your Next.js server:

```bash
npm run dev
```

### 3. Test the Integration

Visit the "Aulas & Horários" section on your website. You should see:
- Real class schedules for the current week (Monday-Friday)
- Student counts (e.g., "12 / 16 alunos")
- Availability status (Disponível or Esgotado)
- Loading spinner while fetching data
- Error message if something goes wrong

## How It Works

### Architecture

```
┌─────────────────┐
│  User Browser   │
│  (Client-side)  │
└────────┬────────┘
         │
         │ GET /api/regybox/classes?date=2025-10-19
         ▼
┌─────────────────┐
│   Next.js API   │
│   Route Server  │
│  (Server-side)  │
└────────┬────────┘
         │
         │ 1. Login with credentials (from .env)
         │ 2. Get session cookie
         │ 3. Fetch classes for date
         ▼
┌─────────────────┐
│  RegyBox API    │
│ regibox.pt/app  │
└─────────────────┘
```

### Data Flow

1. **ScheduleSection component** (client-side) requests classes for the week
2. **Next.js API route** (`/api/regybox/classes`) authenticates with RegyBox
3. **RegyBox API** returns HTML with class information
4. **API route** parses HTML and returns JSON to the client
5. **Component** displays the data with loading/error states

### Files Created

- **`src/types/regybox.ts`** - TypeScript type definitions
- **`src/app/api/regybox/classes/route.ts`** - API route for fetching classes
- **`.env.local`** - Environment variables (credentials)
- Updated **`src/components/sections/ScheduleSection.tsx`** - Now fetches real data

## API Endpoint

### `GET /api/regybox/classes`

Fetches classes for a specific date from RegyBox.

**Query Parameters:**
- `date` (optional) - Date in YYYY-MM-DD format. Defaults to today.

**Example Request:**
```typescript
const response = await fetch('/api/regybox/classes?date=2025-10-19');
const data = await response.json();
```

**Example Response:**
```json
{
  "date": "2025-10-19",
  "classes": [
    {
      "time": "07:00 - 08:00",
      "students_in_class": "12",
      "total_students": "16",
      "can_join_class": true,
      "class_id": "12345"
    },
    {
      "time": "18:00 - 19:00",
      "students_in_class": "16",
      "total_students": "16",
      "can_join_class": false,
      "class_id": "12346"
    }
  ]
}
```

**Error Response:**
```json
{
  "error": "Authentication failed",
  "details": "Invalid credentials"
}
```

## Troubleshooting

### Problem: "RegyBox credentials not configured"

**Solution:** Add your credentials to `.env.local` and restart the server.

### Problem: "Authentication failed"

**Possible causes:**
- Incorrect credentials in `.env.local`
- RegyBox account locked or expired
- Network connectivity issues

**Solution:**
1. Verify credentials are correct
2. Test login at https://www.regibox.pt directly
3. Contact RegyBox support if needed

### Problem: Classes not showing

**Possible causes:**
- No classes scheduled for the current week
- HTML parsing failed (RegyBox changed their HTML structure)
- API rate limiting

**Solution:**
1. Check browser console for error messages
2. Check server logs (`npm run dev` output)
3. Verify classes exist in RegyBox for the current week

### Problem: HTML parsing returns empty classes

**Note:** The current implementation uses regex-based HTML parsing. RegyBox's HTML structure may vary.

**Solution:** If needed, we can:
1. Install `node-html-parser` for more robust parsing
2. Update the `parseClassesFromHTML` function in `/api/regybox/classes/route.ts`
3. Add more detailed logging to debug the HTML structure

## Performance Considerations

### Caching

The API route implements caching with these settings:
- **Cache duration:** 5 minutes (`s-maxage=300`)
- **Stale-while-revalidate:** 10 minutes (`stale-while-revalidate=600`)

This means:
- Same data is served for 5 minutes without hitting RegyBox
- After 5 minutes, stale data can be served for up to 10 more minutes while fetching fresh data

### Rate Limiting

To avoid overwhelming the RegyBox API:
- Client makes 5 requests on page load (one per weekday)
- Each request is cached for 5 minutes
- Multiple users benefit from shared cache

## Future Enhancements

Potential improvements:
1. **Server-side caching** - Cache in Redis/database instead of HTTP cache
2. **Webhook integration** - Real-time updates when classes change
3. **Class booking** - Allow users to join/leave classes (requires `join_class()` and `remove_class()` methods)
4. **User authentication** - Show personalized enrolled classes
5. **Better HTML parsing** - Use proper HTML parser library
6. **Program names** - Extract actual program names from RegyBox instead of generic "Treino"

## Security Checklist

Before deploying to production:

- [ ] Verify `.env.local` is in `.gitignore`
- [ ] Never commit credentials to Git
- [ ] Use strong, unique password for RegyBox account
- [ ] Enable 2FA on RegyBox account (if available)
- [ ] Set up monitoring for failed API requests
- [ ] Consider IP whitelisting on production server
- [ ] Rotate credentials periodically
- [ ] Review server logs for suspicious activity

## Support

For issues with:
- **RegyBox API** - Contact RegyBox support
- **This integration** - Check server logs and browser console
- **Credentials** - Contact your RegyBox account administrator

---

**Last Updated:** October 2025
**Version:** 1.0.0
