import { NextRequest, NextResponse } from "next/server";
import type {
  RegyBoxClass,
  RegyBoxDayClasses,
  RegyBoxLoginResponse,
} from "@/types/regybox";

/**
 * RegyBox API Client
 * Security: All credentials are stored in environment variables and never exposed to the client
 * This API route runs server-side only
 */

const REGYBOX_BASE_URL = "https://www.regibox.pt/app/app_nova/php";

// Time arrays from the original Python implementation
const CLASS_TIME_ARRAY = [
  "06:15 - 07:00",
  "07:00 - 08:00",
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "12:15 - 13:15",
  "16:30 - 17:30",
  "17:30 - 18:30",
  "18:30 - 19:30",
  "19:30 - 20:30",
];

const CLASS_TIME_ARRAY_WEEKEND = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
];

/**
 * Login to RegyBox and retrieve session cookie
 * Ported from Python's login() method
 */
async function loginToRegyBox(): Promise<RegyBoxLoginResponse> {
  const boxId = process.env.REGYBOX_BOX_ID;
  const email = process.env.REGYBOX_EMAIL;
  const password = process.env.REGYBOX_PASSWORD;

  // Security check: Ensure credentials are configured
  if (!boxId || !email || !password) {
    console.error("RegyBox credentials not configured in environment variables");
    return {
      success: false,
      error: "RegyBox credentials not configured",
    };
  }

  try {
    const loginUrl = `${REGYBOX_BASE_URL}/login/scripts/verifica_acesso.php?lang=pt`;

    const formData = new URLSearchParams({
      id_box: boxId,
      login: email,
      password: password,
    });

    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Login failed with status ${response.status}`,
      };
    }

    // Extract cookie from response headers
    const setCookie = response.headers.get("set-cookie");
    if (!setCookie) {
      return {
        success: false,
        error: "No cookie received from login",
      };
    }

    // Parse the cookie value (extract regybox_user_cookie)
    const cookieMatch = setCookie.match(/regybox_user_cookie=([^;]+)/);
    const cookie = cookieMatch ? cookieMatch[1] : setCookie;

    return {
      success: true,
      cookie,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown login error",
    };
  }
}

/**
 * Get classes for a specific day
 * Ported from Python's get_classes_for_the_day() method
 */
async function getClassesForDay(
  date: string,
  cookie: string
): Promise<RegyBoxDayClasses | null> {
  try {
    const classesUrl = `${REGYBOX_BASE_URL}/boxs/scripts/aulas_box/lista_aulas_box_by_day.php`;

    const formData = new URLSearchParams({
      date,
      lang: "pt",
    });

    const response = await fetch(classesUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: `regybox_user_cookie=${cookie}`,
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      console.error(`Failed to fetch classes: ${response.status}`);
      return null;
    }

    const html = await response.text();

    // Parse HTML to extract class information
    // This is a simplified version - the Python code uses BeautifulSoup
    // We'll need to parse the HTML response to extract class data
    const classes = parseClassesFromHTML(html, date);

    return {
      date,
      classes,
    };
  } catch (error) {
    console.error("Error fetching classes:", error);
    return null;
  }
}

/**
 * Parse HTML response to extract class information
 * This replaces BeautifulSoup logic from Python
 */
function parseClassesFromHTML(html: string, date: string): RegyBoxClass[] {
  const classes: RegyBoxClass[] = [];

  // Determine if it's a weekend
  const dateObj = new Date(date);
  const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
  const timeArray = isWeekend ? CLASS_TIME_ARRAY_WEEKEND : CLASS_TIME_ARRAY;

  // Parse HTML to find class elements
  // This is a simplified regex-based approach
  // In production, you might want to use a proper HTML parser like 'node-html-parser'

  for (const time of timeArray) {
    // Look for class information in the HTML
    // The Python code searches for specific div elements with class info
    // This regex pattern matches the structure from the Python implementation
    const classPattern = new RegExp(
      `data-time="${time.replace(/[-:]/g, "\\$&")}"[^>]*>([\\s\\S]*?)</div>`,
      "i"
    );
    const match = html.match(classPattern);

    if (match) {
      // Extract student count, total, and availability
      const studentsMatch = match[1].match(/(\d+)\s*\/\s*(\d+)/);
      const canJoinMatch = match[1].includes("btn-success"); // Join button present
      const classIdMatch = match[1].match(/data-class-id="([^"]+)"/);

      if (studentsMatch && classIdMatch) {
        classes.push({
          time,
          students_in_class: studentsMatch[1],
          total_students: studentsMatch[2],
          can_join_class: canJoinMatch,
          class_id: classIdMatch[1],
        });
      }
    }
  }

  return classes;
}

/**
 * GET endpoint to fetch RegyBox classes
 * Query params:
 * - date: Date string (format: YYYY-MM-DD) - optional, defaults to today
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date");

    // Default to today if no date provided
    const date = dateParam || new Date().toISOString().split("T")[0];

    // Step 1: Login to get session cookie
    const loginResult = await loginToRegyBox();

    if (!loginResult.success || !loginResult.cookie) {
      return NextResponse.json(
        { error: "Authentication failed", details: loginResult.error },
        { status: 401 }
      );
    }

    // Step 2: Fetch classes for the specified date
    const classesData = await getClassesForDay(date, loginResult.cookie);

    if (!classesData) {
      return NextResponse.json(
        { error: "Failed to fetch classes" },
        { status: 500 }
      );
    }

    // Return the classes data
    return NextResponse.json(classesData, {
      status: 200,
      headers: {
        // Cache for 5 minutes to reduce load on RegyBox API
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
