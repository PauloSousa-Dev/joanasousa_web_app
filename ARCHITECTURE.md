# Arquitetura Técnica - Joana Sousa Website

## Visão Geral

Este documento descreve a arquitetura técnica do site one-page para personal training.

## Stack Tecnológico

### Frontend Framework
- **Next.js 15.5** com App Router
  - Server Components por padrão
  - Client Components onde necessário ("use client")
  - Turbopack para builds rápidos
  - Automatic code splitting

### Styling
- **Tailwind CSS 4** (nova versão)
  - Utility-first approach
  - Custom scrollbar styling
  - Responsive design classes
  - Animation utilities

### Animações
- **Framer Motion 12**
  - Variants pattern para animações complexas
  - useScroll hook para scroll effects
  - AnimatePresence para entrada/saída
  - Layout animations

### UI Components
- **Embla Carousel** para galeria
- **Lucide React** para ícones
- **React Intersection Observer** para lazy animations

## Padrões de Design

### Component Structure

```typescript
// Pattern usado em todos os componentes de seção
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SectionProps {
  // Props tipadas
}

export default function Section(props: SectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <section ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Content */}
      </motion.div>
    </section>
  );
}
```

### Animation Variants

Padrão consistente em todas as seções:

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1-0.2, // Timing entre children
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 }, // Estado inicial
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
```

### Scroll Behavior

#### Smooth Scroll (CSS)
```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem; /* Header height */
}
```

#### Scroll Spy (JavaScript)
```typescript
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    }
  );
  // Observe sections...
}, []);
```

#### Hide on Scroll Header
```typescript
const { scrollY } = useScroll();

useMotionValueEvent(scrollY, "change", (latest) => {
  const previous = scrollY.getPrevious();
  if (latest > previous && latest > 150) {
    setHidden(true); // Scrolling down
  } else {
    setHidden(false); // Scrolling up
  }
});
```

## Performance Optimizations

### 1. Code Splitting
- Automatic via Next.js
- Dynamic imports onde apropriado
- Componentes Client-side separados

### 2. Image Optimization
- Preparado para Next.js Image component
- Placeholders com aspect-ratio
- Lazy loading nativo

### 3. CSS Optimization
- Tailwind JIT mode
- Purged unused CSS
- Minimal custom CSS

### 4. Bundle Size
```bash
# Pacotes principais
framer-motion: ~60kb gzipped
embla-carousel-react: ~10kb gzipped
react-intersection-observer: ~2kb gzipped
lucide-react: ~1kb per icon (tree-shakeable)
```

### 5. Accessibility
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Claude Code Workflow Rules

### ⚠️ REGRA CRÍTICA: Sincronização com Keystatic

**Sempre que modificar o código, seguir este protocolo:**

1. **Ao REMOVER funcionalidades:**
   - ✅ Verificar se a funcionalidade existe no `keystatic.config.ts`
   - ✅ Se existir, remover ou comentar o schema correspondente
   - ✅ Verificar se há dados em `content/` e mover para backup se necessário

2. **Ao ADICIONAR funcionalidades:**
   - ✅ Avaliar se a funcionalidade deve ser dinâmica/editável pela cliente
   - ✅ Se sim, adicionar ao `keystatic.config.ts` na secção apropriada:
     - `singletons` para conteúdo único (hero, about, contact, etc.)
     - `collections` para múltiplos items (pricing, gallery, testimonials, etc.)
   - ✅ Usar o schema correto conforme tipo de conteúdo

3. **Estrutura do Keystatic:**
   ```
   keystatic.config.ts
   ├── singletons (conteúdo único)
   │   ├── siteSettings (⚙️ configurações globais)
   │   ├── home (hero section)
   │   ├── about (sobre mim)
   │   ├── gallery (settings da galeria)
   │   ├── schedule (agendamento)
   │   ├── programs (settings dos programas)
   │   └── contact (contacto)
   └── collections (múltiplos items)
       ├── pricing (planos de preços)
       ├── programItems (programas de treino)
       ├── galleryImages (imagens da galeria)
       ├── classes (horário de aulas)
       ├── features (características do about)
       ├── testimonials (testemunhos)
       └── navigation (menu de navegação)
   ```

4. **Checklist antes de completar uma tarefa:**
   - [ ] Código implementado/removido
   - [ ] Keystatic verificado e atualizado se necessário
   - [ ] Content files (`content/`) verificados
   - [ ] Props dos componentes alinhadas com schema Keystatic

### Exemplos de Aplicação

**Exemplo 1: Remover stats da hero section**
```typescript
// ❌ ANTES: tinha stats no HeroSection
// ✅ DEPOIS:
// 1. Remover código dos stats
// 2. Verificar keystatic.config.ts > home singleton
// 3. Se existir statsAlunos, statsExperiencia, etc. → REMOVER
// 4. Limpar content/home.json se necessário
```

**Exemplo 2: Adicionar nova feature "Certificações"**
```typescript
// ✅ PROTOCOLO:
// 1. Criar CertificationsSection.tsx
// 2. Adicionar ao keystatic.config.ts:
collections: {
  certifications: collection({
    label: "Certificações",
    path: "content/certifications/*",
    schema: {
      name: fields.text({ label: "Nome da Certificação" }),
      year: fields.number({ label: "Ano" }),
      institution: fields.text({ label: "Instituição" }),
      order: fields.number({ label: "Ordem" }),
    },
  }),
}
// 3. Criar lib/content.ts export
// 4. Usar dados no componente
```

## Data Flow

### Content Management

```typescript
// lib/content.ts
const reader = createReader(process.cwd(), keystaticConfig);

export const getHome = () => reader.singletons.home.read();
export const getAbout = () => reader.singletons.about.read();
export const getPricing = () => reader.collections.pricing.all();
export const getGallery = () => reader.collections.gallery.all();
```

### Page Rendering

```typescript
// app/page.tsx - Server Component
export default async function Home() {
  const home = await getHome(); // Server-side data fetch

  return (
    <>
      <Header /> {/* Client Component */}
      <main>
        <HeroSection {...home} /> {/* Props passed down */}
        {/* Other sections */}
      </main>
      <Footer />
    </>
  );
}
```

## Responsive Design

### Breakpoints (Tailwind)
```
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
2xl: 1536px // Extra large
```

### Mobile-First Approach
```jsx
// Base styles for mobile
<div className="text-base">
  // Overrides for larger screens
  <div className="md:text-lg lg:text-xl">
```

## Browser Compatibility

### Target Browsers
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+

### Fallbacks
- Smooth scroll: CSS + JavaScript fallback
- Backdrop blur: Solid background fallback
- Grid layout: Flexbox fallback (automático)

## Security Considerations

### Form Handling
```typescript
// ContactSection.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  // TODO: Implementar validação
  // TODO: Sanitize inputs
  // TODO: Rate limiting
  // TODO: CAPTCHA
};
```

### External Links
```jsx
<a
  href="https://external.com"
  target="_blank"
  rel="noopener noreferrer" // Previne window.opener exploit
>
```

## Future Enhancements

### Phase 2
- [ ] Integração com backend (API routes)
- [ ] Sistema de autenticação
- [ ] Dashboard de cliente
- [ ] Pagamentos (Stripe/PayPal)

### Phase 3
- [ ] PWA support
- [ ] Offline mode
- [ ] Push notifications
- [ ] Native app (React Native)

### Phase 4
- [ ] A/B testing
- [ ] Advanced analytics
- [ ] CRM integration
- [ ] Email marketing automation

## Deployment

### Recommended Platform
**Vercel** (otimizado para Next.js)
- Automatic deployments
- Edge functions
- Image optimization
- Analytics

### Environment Variables
```bash
# .env.local (example)
NEXT_PUBLIC_SITE_URL=https://joanasousa.pt
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
CONTACT_EMAIL_TO=joana@personaltraining.pt
```

### Build Commands
```bash
npm run build    # Production build
npm run start    # Start production server
```

## Monitoring & Analytics

### Metrics to Track
- Page load time
- Core Web Vitals (LCP, FID, CLS)
- Bounce rate
- Conversion rate (formulário)
- Scroll depth
- Button clicks

### Tools Sugeridas
- Google Analytics 4
- Vercel Analytics
- Sentry (error tracking)
- Lighthouse CI

## Maintenance

### Regular Tasks
- [ ] Update dependencies (monthly)
- [ ] Security audit (quarterly)
- [ ] Performance audit (quarterly)
- [ ] Content review (monthly)
- [ ] Backup (automated daily)

### Testing Checklist
- [ ] Responsive em todos os breakpoints
- [ ] Navegação funcional
- [ ] Formulário submete corretamente
- [ ] Animações smooth
- [ ] Loading states
- [ ] Error states
- [ ] Acessibilidade (WCAG AA)
