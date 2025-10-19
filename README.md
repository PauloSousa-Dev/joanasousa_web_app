# Joana Sousa - Personal Training Website

Site one-page moderno e responsivo para personal training, construído com as últimas tecnologias web.

## Tecnologias Utilizadas

### Core

- **Next.js 15.5** - Framework React com App Router
- **React 19** - Biblioteca UI
- **TypeScript 5** - Tipagem estática
- **Tailwind CSS 4** - Framework CSS utility-first

### Animações & Interatividade

- **Framer Motion** - Animações fluidas e profissionais
- **React Intersection Observer** - Detecção de elementos no viewport
- **Embla Carousel** - Carousel de alta performance para galeria

### Gestão de Conteúdo

- **Keystatic** - CMS headless para edição de conteúdo

### UI/UX

- **Lucide React** - Ícones modernos e consistentes

## Arquitetura do Projeto

```
src/
├── app/
│   ├── layout.tsx          # Layout principal com metadata SEO
│   ├── page.tsx            # Página principal one-page
│   └── globals.css         # Estilos globais e smooth scroll
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Menu sticky com scroll spy
│   │   └── Footer.tsx      # Rodapé com links e redes sociais
│   └── sections/
│       ├── HeroSection.tsx     # Hero com animações impactantes
│       ├── AboutSection.tsx    # Sobre mim com grid layout
│       ├── GallerySection.tsx  # Galeria com carousel
│       ├── ScheduleSection.tsx # Horários e preços
│       └── ContactSection.tsx  # Formulário de contacto
└── lib/
    └── content.ts          # Helper para Keystatic
```

## Features Implementadas

### Design & UX

- ✅ Design one-page com scroll suave
- ✅ Menu sticky com hide-on-scroll
- ✅ Scroll spy - destaque da seção ativa
- ✅ Animações com Framer Motion
- ✅ Intersection Observer para lazy animations
- ✅ Mobile-first responsive design
- ✅ Modo claro otimizado

### Navegação

- ✅ Smooth scroll entre seções
- ✅ Menu hambúrguer mobile
- ✅ Indicador visual de seção ativa
- ✅ Botão back-to-top no footer

### Seções

#### Hero Section

- Badge animado "Personal Training"
- Título com gradient text
- Estatísticas (500+ alunos, 10+ anos, 98% satisfação)
- CTAs primário e secundário
- Scroll indicator

#### About Section

- Grid layout com imagem + conteúdo
- Floating stats card
- Features grid com hover effects
- Background decorativo

#### Gallery Section

- Embla Carousel com auto-play
- Filtros por categoria
- Grid view alternativo
- Lightbox modal para imagens
- Navegação com arrows

#### Schedule Section

- Seletor de dias da semana
- Lista de aulas com disponibilidade
- Planos de preços com cards
- Highlight do plano popular

#### Contact Section

- Formulário de contacto funcional
- Informações de contacto clicáveis
- Links para redes sociais
- Placeholder para Google Maps
- Loading state no submit

### Performance

- ✅ Lazy loading de imagens
- ✅ Code splitting automático (Next.js)
- ✅ Turbopack para dev builds rápidos
- ✅ Prefers-reduced-motion support
- ✅ Overflow-x hidden para evitar scroll horizontal

### SEO & Acessibilidade

- ✅ Metadata otimizado
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Theme color
- ✅ Viewport configurado

## Tendências Web Aplicadas

### 2024/2025 Trends

1. **Glassmorphism** - Headers e cards com backdrop-blur
2. **Gradient Text** - Títulos com gradient clip-path
3. **Micro-interactions** - Hover effects subtis
4. **Scroll-triggered Animations** - Intersection Observer
5. **Hide-on-scroll Header** - Better UX em mobile
6. **Card Hover Effects** - Scale e translate
7. **Smooth Transitions** - Framer Motion
8. **Minimal Design** - Foco no conteúdo
9. **Custom Scrollbar** - Consistência visual
10. **Loading States** - Feedback visual

## Como Executar

```bash
# Instalar dependências
npm install

# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

Aceder em: [http://localhost:3000](http://localhost:3000)

## 📚 Documentação

### Guias Disponíveis

- **[Keystatic CMS Guide](KEYSTATIC_GUIDE.md)** - Como usar o CMS para gerir conteúdo
- **[RegyBox Integration](REGYBOX_INTEGRATION.md)** - Integração com API de horários
- **[Architecture](ARCHITECTURE.md)** - Arquitetura técnica do projeto
- **[Security Guide](SECURITY_GUIDE.md)** - Guia de segurança e boas práticas
- **[Client Admin Guide](CLIENT_ADMIN_GUIDE.md)** - Guia para o cliente (não-técnico)
- **[Security Audit](REPOSITORY_SECURITY_AUDIT.md)** - Auditoria de segurança do repositório

### Guias Específicos (docs/)

- **[Video Upload Guide](docs/VIDEO_UPLOAD_GUIDE.md)** - Como fazer upload de vídeos

## Gestão de Conteúdo (Keystatic)

Aceder ao painel admin em: [http://localhost:3000/keystatic](http://localhost:3000/keystatic)

### Conteúdo Editável

- ⚙️ Site Settings: SEO, footer, copyright
- 🏠 Home: Hero section
- 👤 About: Bio, features, vídeo
- 💪 Programs: Programas de treino
- 🖼️ Gallery: Imagens com aspect ratio
- 💬 Testimonials: Testemunhos de clientes
- 🧭 Navigation: Menu de navegação
- 📅 Schedule: Disponibilidade
- 📞 Contact: Informações de contacto

## Próximos Passos

### Melhorias Sugeridas

1. **Integração com Backend**

   - API para formulário de contacto
   - Sistema de reservas real
   - Newsletter subscription

2. **Imagens Reais**

   - Substituir placeholders
   - Otimizar com Next.js Image
   - Adicionar alt texts descritivos

3. **Analytics**

   - Google Analytics 4
   - Facebook Pixel
   - Hotjar para heatmaps

4. **Funcionalidades Adicionais**

   - Blog de fitness
   - Área de cliente (login)
   - Sistema de pagamentos
   - Calendário de disponibilidade em tempo real

5. **SEO Avançado**

   - Open Graph tags
   - Twitter Cards
   - Schema.org markup
   - Sitemap.xml

6. **Performance**

   - Image optimization (webp, avif)
   - Font optimization
   - Lighthouse score 90+

7. **Maps Integration**
   - Google Maps API
   - Localização do ginásio
   - Direções

## Personalização

### Cores

Editar em `globals.css` e componentes:

- Primary: `gray-900` (#111827)
- Background: `white`
- Accent: Customizável

### Fontes

Configuradas em `layout.tsx`:

- Geist Sans (default)
- Geist Mono (monospace)

### Animações

Configuráveis em cada componente via Framer Motion variants

## 🔒 Segurança

O projeto implementa várias camadas de segurança:

- ✅ **Password Middleware** - Protege painel admin Keystatic
- ✅ **Environment Variables** - Todas as credenciais em `.env.local`
- ✅ **HTTPS** - Encriptação em produção (Vercel)
- ✅ **Cookie Security** - httpOnly, secure, sameSite
- ✅ **Git Protection** - `.env` nunca commitado
- ✅ **Zero Secrets Hardcoded** - Tudo em `process.env`

Vê o [Security Guide](SECURITY_GUIDE.md) para mais detalhes.

## Browser Support

- Chrome/Edge (últimas 2 versões)
- Firefox (últimas 2 versões)
- Safari (últimas 2 versões)
- iOS Safari (últimas 2 versões)

## Licença

Projeto privado - Todos os direitos reservados

## Autor

Desenvolvido por Paulo Sousa  
Design e conteúdo: Joana Sousa Personal Training
