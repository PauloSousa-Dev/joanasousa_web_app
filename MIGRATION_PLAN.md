# Plano de Migração: Keystatic → Payload CMS + PostgreSQL

> **STATUS: ⏸️ PRONTO PARA DEPLOY EM PRODUÇÃO**
>
> **Última atualização:** 18 de Janeiro de 2026, 20:50
>
> **Fases Locais:** ✅ COMPLETAS (1-6)
>
> **Próximo Passo:** Deploy para Vercel (Fase 7)

---

## 🚀 COMO CONTINUAR (Próximos Passos)

### Estado Atual
- ✅ Migração local completa e funcionando
- ✅ Build de produção testado e a funcionar
- ✅ Git commit criado (commit 142c844)
- ⏸️ **AGUARDA:** Configuração de variáveis de ambiente no Vercel
- ⏸️ **AGUARDA:** Git push para trigger deploy

### Passo a Passo para Continuar

#### 1. Configurar Variáveis de Ambiente no Vercel

Aceder ao dashboard Vercel → Projeto → **Settings** → **Environment Variables**

Adicionar estas 3 variáveis (para Production, Preview e Development):

```bash
PAYLOAD_SECRET=4c3f760d501600eb687a2b1841901983108b43d65803c89b9630c33a1b886451

DATABASE_URI=postgresql://neondb_owner:npg_KvNMbe0Isj7G@ep-bitter-sun-ag5h5yet-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require

NEXT_PUBLIC_SERVER_URL=https://joanasousa.vercel.app
```

**Importante:**
- Marcar as 3 checkboxes: Production, Preview, Development
- Ajustar `NEXT_PUBLIC_SERVER_URL` se o domínio for diferente

#### 2. Fazer Git Push

```bash
git push origin main
```

Este push vai automaticamente trigger o deploy no Vercel.

#### 3. Verificar Deploy no Vercel

- Aguardar que o build termine (5-10 minutos)
- Verificar logs de build para erros
- Testar o site em produção

#### 4. Criar Primeiro Admin User em Produção

```bash
# Aceder ao admin em produção
https://joanasousa.vercel.app/studio

# Criar primeiro user:
# Email: (teu email)
# Password: (password segura)
# Role: admin
```

#### 5. Testar Produção

Verificar:
- ✅ Homepage carrega
- ✅ Admin acessível em `/studio`
- ✅ Imagens aparecem corretamente
- ✅ Conteúdo está todo presente

#### 6. Criar User Editor para o Cliente

No admin em produção:
- Users → Create New
- Email: (email do cliente)
- Role: **editor** (não admin!)
- Enviar credenciais ao cliente

---

## Informações Técnicas de Referência

### URLs do Sistema

| Ambiente | Frontend | Admin Panel | API Base |
|----------|----------|-------------|----------|
| **Local** | http://localhost:3001 | http://localhost:3001/studio | http://localhost:3001/api |
| **Produção** | https://joanasousa.vercel.app | https://joanasousa.vercel.app/studio | https://joanasousa.vercel.app/api |

### Credenciais da Base de Dados (Neon)

```
Região: Europe (eu-central-1)
Versão PostgreSQL: 17
Database: neondb
Connection String: (ver variável DATABASE_URI acima)
```

### Git Status

```
Branch: main
Último commit: 142c844 - "feat: Migrate from Keystatic to Payload CMS"
Ficheiros modificados: 76 files changed, 10904 insertions(+), 8138 deletions(-)
```

### Comandos Úteis

```bash
# Desenvolvimento local
npm run dev              # Inicia servidor (porta 3001 se 3000 ocupada)

# Build e produção
npm run build           # Build de produção
npm start               # Servidor de produção

# Payload
npx payload migrate     # Executar migrações de DB (se necessário)

# Git
git status              # Ver estado atual
git log --oneline -5    # Ver últimos commits
```

### Problemas Conhecidos e Soluções

#### Imagens não aparecem
- ✅ **Resolvido:** URLs convertidos de `/api/media/file/` para `/images/`
- Ficheiros guardados em: `public/images/`
- Extensões adicionadas automaticamente baseadas em mimeType

#### Build errors
- ✅ **Resolvido:** Removido `--turbopack` do script build
- ✅ **Resolvido:** Corrigidos erros TypeScript (type assertions)
- ✅ **Resolvido:** Removido ficheiro `src/lib/content.ts` antigo

#### Hydration errors
- ✅ **Resolvido:** Route groups isolados (website) e (payload)
- Evita conflito de layouts aninhados

---

## Resumo Executivo

Migração completa de **Keystatic (GitHub-based)** para **Payload CMS 3.0 (PostgreSQL)** para eliminar a dependência do GitHub e fornecer uma interface admin intuitiva para o cliente.

**Stack Atual:**
- Next.js 15 + Keystatic CMS
- Conteúdo em ficheiros JSON/YAML em `/content/`
- GitHub como backend em produção
- 6 singletons + 7 collections

**Stack Final:**
- Next.js 15 + Payload CMS 3.0
- PostgreSQL (Neon - 512MB grátis)
- Admin UI em URL personalizado (não `/admin`)
- Sistema de roles (admin + editor)
- **Custo: €0** (100% gratuito)

---

## Fase 1: Setup Inicial

### 1.1 Instalar Dependências

**Adicionar ao package.json:**
```json
{
  "dependencies": {
    "payload": "^3.0.0",
    "@payloadcms/next": "^3.0.0",
    "@payloadcms/db-postgres": "^3.0.0",
    "@payloadcms/richtext-lexical": "^3.0.0",
    "postgres": "^3.4.4",
    "sharp": "^0.33.0"
  },
  "devDependencies": {
    "tsx": "^4.0.0"
  }
}
```

**Comando:**
```bash
npm install payload@^3.0.0 @payloadcms/next@^3.0.0 @payloadcms/db-postgres@^3.0.0 @payloadcms/richtext-lexical@^3.0.0 postgres@^3.4.4 sharp@^0.33.0
npm install -D tsx
```

### 1.2 Configurar Base de Dados (Neon)

1. Criar conta em https://neon.tech
2. Criar projeto: "joanasousa-cms"
3. Região: Europe (mais próximo de PT)
4. Copiar connection string

**Atualizar `.env.local`:**
```env
# Payload CMS
PAYLOAD_SECRET=<gerar-secret-random-32-chars>
DATABASE_URI=postgresql://user:pass@ep-xxx.eu-central-1.aws.neon.tech/joanasousa?sslmode=require
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Remover variáveis Keystatic:
# KEYSTATIC_* (todas)
# GITHUB_TOKEN
```

**Gerar secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 1.3 Atualizar Configurações Next.js

**`next.config.ts`:**
```typescript
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  // ... config existente
}

export default withPayload(nextConfig)
```

**`tsconfig.json`:**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@payload-config": ["./payload.config.ts"]
    }
  }
}
```

---

## Fase 2: Configuração do Payload CMS

### 2.1 Criar Payload Config

**Ficheiro novo: `payload.config.ts`**

Este ficheiro define todo o schema CMS. Estrutura completa:

**Globals (6):** (equivalentes aos Keystatic singletons)
- `siteSettings` - SEO, footer, copyright
- `home` - Hero section (título, subtítulo, CTA, imagem)
- `about` - Biografia, foto, vídeos, anos experiência
- `gallery` - Settings da galeria
- `schedule` - Settings de horários
- `contact` - Contactos, mapa, redes sociais

**Collections (8):** (equivalentes aos Keystatic collections + users/media)
- `users` - Autenticação (admin + editor roles)
- `media` - Upload de imagens
- `pricing` - Planos de preços
- `galleryImages` - Fotos da galeria (título, ordem, aspect ratio)
- `classes` - Aulas (nome, tipo, dia, horário, vagas)
- `features` - Características (about section)
- `testimonials` - Testemunhos
- `navigation` - Items do menu

**Campos-chave a manter:**
- Todos os `order` fields (para sorting)
- Todos os `select` fields (icons, aspect ratios, days)
- Campos de imagem como `upload` type com relação a `media`
- Arrays (pricing features, etc.)

### 2.2 Criar Rotas do Admin

**`src/app/(payload)/[admin-url-personalizado]/[[...segments]]/page.tsx`:**

URL personalizado configurado no payload.config.ts

**`src/app/(payload)/[admin-url-personalizado]/importMap.js`:**
```javascript
export const importMap = {}
```

### 2.3 Criar Rotas da API

**`src/app/(payload)/api/[...slug]/route.ts`:**
```typescript
import { REST_DELETE, REST_GET, REST_PATCH, REST_POST } from '@payloadcms/next/routes'
import config from '@payload-config'

export const GET = REST_GET(config)
export const POST = REST_POST(config)
export const DELETE = REST_DELETE(config)
export const PATCH = REST_PATCH(config)
```

---

## Fase 3: Script de Migração de Dados

**Ficheiro novo: `scripts/migrate-keystatic-to-payload.ts`**

Script que:
1. Lê todos os ficheiros em `/content/`
2. Faz upload das imagens para a collection `media`
3. Insere todos os dados no PostgreSQL via Payload API
4. Mantém referências corretas entre conteúdo e imagens

**Executar:**
```bash
npm run migrate
```

**Adicionar ao package.json:**
```json
{
  "scripts": {
    "migrate": "tsx scripts/migrate-keystatic-to-payload.ts"
  }
}
```

---

## Fase 4: Nova Camada de Queries

### 4.1 Criar Query Library do Payload

**Ficheiro novo: `src/lib/payload.ts`**

Substitui `src/lib/content.ts` mantendo **a mesma interface**:

```typescript
// Mesmo exports, mesmos nomes de funções
export const getSiteSettings = async () => { /* query Payload */ }
export const getHome = async () => { /* query Payload */ }
export const getAbout = async () => { /* query Payload */ }
// ... etc (todas as funções)
```

**Transformações importantes:**
- Upload relationships → converter para URL strings
- Arrays de features → manter estrutura
- Ordenação → usar `sort` parameter
- Manter estrutura `{ slug, entry }` para compatibilidade

### 4.2 Atualizar Imports

**`src/app/page.tsx` (linha 1-12):**
```typescript
// ANTES:
import { getSiteSettings, getHome, /* ... */ } from "@/lib/content"

// DEPOIS:
import { getSiteSettings, getHome, /* ... */ } from "@/lib/payload"
```

**`src/app/layout.tsx` (linha 5):**
```typescript
// ANTES:
import { getSiteSettings } from "@/lib/content"

// DEPOIS:
import { getSiteSettings } from "@/lib/payload"
```

**Nota:** Resto do código permanece **100% inalterado** - os componentes não precisam de mudanças!

---

## Fase 5: Limpeza

### 5.1 Remover Ficheiros Keystatic

**Apagar:**
- `keystatic.config.ts`
- `src/lib/content.ts`
- `src/app/keystatic/` (diretório completo)
- `src/app/api/keystatic/` (diretório completo)
- `src/middleware.ts` (já não é necessário)

### 5.2 Remover Dependências

```bash
npm uninstall @keystatic/core @keystatic/next
```

### 5.3 Arquivar Conteúdo

**NÃO apagar `/content/`** - fazer backup:
```bash
mv content content.backup
```

Adicionar ao `.gitignore`:
```
content.backup/
```

---

## Fase 6: Testing Local

### 6.1 Checklist de Testes

**1. Iniciar Dev Server:**
```bash
npm run dev
```

**2. Testar Admin UI:**
- Aceder: http://localhost:3000/[admin-url-personalizado]
- Criar primeiro user admin
- Verificar que todos os globals e collections aparecem
- Testar edição de conteúdo

**3. Testar Frontend:**
- Aceder: http://localhost:3000
- Verificar todas as secções
- Confirmar que imagens carregam
- Testar navegação

**4. Testar Build:**
```bash
npm run build
npm start
```

**5. Criar User Editor (para o cliente):**
- No admin, ir a Users
- Criar user com role: "editor"
- Testar que editor não pode apagar users

---

## Fase 7: Deploy no Vercel

### 7.1 Configurar Variáveis de Ambiente no Vercel

No dashboard do Vercel:
```
PAYLOAD_SECRET=<mesmo-do-local>
DATABASE_URI=<neon-connection-string-production>
NEXT_PUBLIC_SERVER_URL=https://joanasousa.vercel.app
NODE_ENV=production
```

### 7.2 Deploy

**Opção A - Via Git (recomendado):**
```bash
git add .
git commit -m "feat: Migrate from Keystatic to Payload CMS"
git push origin main
```

**Opção B - Via CLI:**
```bash
vercel --prod
```

### 7.3 Pós-Deploy

1. Aceder a `https://joanasousa.vercel.app/[admin-url]`
2. Criar user admin
3. Executar migration em produção (ou re-inserir dados via admin)
4. Criar user editor para o cliente
5. Testar tudo funciona

---

## Fase 8: Onboarding do Cliente

### 8.1 Criar Conta do Cliente

No admin:
1. Criar novo user
2. Email: [email do cliente]
3. Role: **editor**
4. Enviar credenciais

### 8.2 Documentação para o Cliente

Criar guia simples:
- Como aceder: `https://joanasousa.vercel.app/[admin-url]`
- Como editar globals (Home, About, Contact)
- Como gerir collections (Testemunhos, Galeria)
- Como fazer upload de imagens
- Como ordenar items (campo "ordem")

### 8.3 Sessão de Formação (30 min)

1. Login e navegação
2. Editar conteúdo
3. Upload de imagens
4. Q&A

---

## Segurança: URL Admin Personalizado

### Configuração no payload.config.ts

```typescript
export default buildConfig({
  admin: {
    user: 'users',
    // URL personalizado (não /admin)
    // Exemplos: /cms-painel, /backend, /gestao, ou qualquer slug custom
  },
  // ... resto da config
})
```

### Opções de URL sugeridas:
- `/cms-painel` - Profissional mas não óbvio
- `/gestao` - Português, menos previsível
- `/painel` - Simples e direto
- `/backend` - Técnico mas comum
- `/[nome-personalizado]` - Completamente custom (ex: `/js-admin-2024`)

**Nota de Segurança:**
- URL custom dificulta descoberta por bots
- Payload tem rate limiting built-in
- Login requer credenciais válidas
- 2FA pode ser adicionado se necessário

---

## Plano de Rollback (se necessário)

### Se algo correr mal:

**1. Restaurar Keystatic:**
```bash
git checkout HEAD~1 -- keystatic.config.ts src/lib/content.ts
npm install @keystatic/core @keystatic/next
mv content.backup content
```

**2. Redeploy versão anterior:**
```bash
git push origin main
```

**3. Restaurar variáveis de ambiente Keystatic no Vercel**

---

## Vantagens da Nova Solução

### Para o Cliente:
✅ Interface intuitiva e moderna
✅ Sem necessidade de GitHub
✅ Edição em tempo real
✅ Upload de imagens drag & drop
✅ Preview antes de publicar
✅ Acesso controlado (editor role)
✅ URL admin personalizado (mais seguro)

### Para o Developer:
✅ Type-safe (TypeScript full)
✅ Base de dados real (queries mais poderosas)
✅ API REST completa
✅ Fácil adicionar novos campos
✅ Melhor controlo de permissões
✅ Sem dependência do GitHub

### Custo:
💰 **€0/mês** (Neon free tier + Vercel free tier)

---

## Ficheiros Críticos

### Novos Ficheiros:
1. `payload.config.ts` - Schema completo do CMS
2. `src/lib/payload.ts` - Query functions
3. `scripts/migrate-keystatic-to-payload.ts` - Migration script
4. `src/app/(payload)/[admin-url]/[[...segments]]/page.tsx` - Admin UI
5. `src/app/(payload)/api/[...slug]/route.ts` - API routes

### Ficheiros a Modificar:
1. `package.json` - Dependências + scripts
2. `next.config.ts` - Adicionar `withPayload`
3. `tsconfig.json` - Path alias para `@payload-config`
4. `.env.local` - Variáveis Payload
5. `src/app/page.tsx` - Mudar import (1 linha)
6. `src/app/layout.tsx` - Mudar import (1 linha)

### Ficheiros a Remover:
1. `keystatic.config.ts`
2. `src/lib/content.ts`
3. `src/app/keystatic/` (dir)
4. `src/app/api/keystatic/` (dir)
5. `src/middleware.ts`

---

## Estimativa de Tempo

**Fase 1-2:** Setup + Config → 4-5h
**Fase 3:** Migração de Dados → 2-3h
**Fase 4:** Query Layer → 2-3h
**Fase 5:** Limpeza → 1h
**Fase 6:** Testing → 3-4h
**Fase 7:** Deploy → 2-3h
**Fase 8:** Onboarding → 2h

**Total: 16-23 horas**

---

## 📊 Progresso Atual (18 Jan 2026)

### ✅ CONCLUÍDO:

**Fase 1: Setup Inicial**
- ✅ Dependências instaladas (Payload 3.0, PostgreSQL adapter, Sharp, etc.)
- ✅ Neon database criada: `joanasousa-cms` (PostgreSQL 17, Europe)
- ✅ `.env.local` configurado com:
  - PAYLOAD_SECRET: `4c3f760d501600eb687a2b1841901983108b43d65803c89b9630c33a1b886451`
  - DATABASE_URI: Connection string do Neon configurada
  - NEXT_PUBLIC_SERVER_URL: `http://localhost:3000`
- ✅ `next.config.ts` atualizado com `withPayload()`
- ✅ `tsconfig.json` configurado com path alias `@payload-config`

**Fase 2: Payload Configuration**
- ✅ `payload.config.ts` criado com schema completo:
  - 8 Collections: users, media, pricing, galleryImages, classes, features, testimonials, navigation
  - 6 Globals: siteSettings, home, about, gallery, schedule, contact
- ✅ Admin route customizado: `/studio` (em vez de `/admin`)
- ✅ Rotas criadas:
  - `src/app/(payload)/studio/[[...segments]]/page.tsx` - Admin UI
  - `src/app/(payload)/api/[...slug]/route.ts` - API endpoints
- ✅ Custom admin route configurado no `payload.config.ts` com `routes: { admin: '/studio', api: '/api' }`

**Fase 3: Migration Script**
- ✅ Script criado: `scripts/migrate-keystatic-to-payload.ts`
- ✅ Lê ficheiros JSON/YAML do `/content/`
- ✅ Upload automático de imagens para collection `media`
- ✅ Comando `npm run migrate` adicionado ao package.json

**Fase 4: Query Layer**
- ✅ `src/lib/payload.ts` criado (substitui `src/lib/content.ts`)
- ✅ Interface mantida idêntica ao Keystatic (zero breaking changes)
- ✅ `src/app/page.tsx` atualizado (import mudado)
- ✅ `src/app/layout.tsx` atualizado (import mudado)
- ✅ Todos os componentes React permanecem inalterados

### 🔧 TROUBLESHOOTING RESOLVIDO:

**Problema**: `/studio` redirecionava para `/admin/login` e dava 404
**Causa**: Payload não reconhecia o route customizado
**Solução**: Adicionado `routes: { admin: '/studio', api: '/api' }` no `payload.config.ts`
**Status**: Corrigido, aguarda restart do servidor

### ⏳ PRÓXIMOS PASSOS:

1. **Reiniciar servidor**:
   ```bash
   npm run dev
   ```

2. **Aceder ao admin e criar primeiro user**:
   - URL: `http://localhost:3001/studio` (porta 3001 porque 3000 está ocupada)
   - Criar admin user (email + password + nome)

3. **Executar migração de dados**:
   ```bash
   npm run migrate
   ```

4. **Verificar frontend**:
   - Testar `http://localhost:3001`
   - Confirmar que conteúdo aparece

5. **Limpeza (Fase 5)**:
   - Arquivar `/content/` para `/content.backup`
   - Remover ficheiros Keystatic
   - Desinstalar dependências Keystatic

6. **Deploy Produção (Fase 7)**:
   - Configurar variáveis ambiente no Vercel
   - Deploy via git
   - Criar admin user em produção
   - Executar migração em produção

## Verificação Final

### Antes de começar:
- [x] Backup de tudo (git commit) - ✅ Código versionado
- [x] Neon database criada - ✅ joanasousa-cms em EU
- [x] `.env.local` configurado - ✅ Com todas as variáveis
- [x] URL admin personalizado escolhido - ✅ `/studio`

### Durante:
- [x] payload.config.ts criado - ✅ Schema completo
- [x] Rotas admin/api criadas - ✅ Em /studio e /api
- [ ] Migration script executado com sucesso - ⏳ Aguarda primeiro user
- [x] Query layer funciona - ✅ src/lib/payload.ts criado
- [ ] Build local passa - ⏳ Testar após migração

### Depois:
- [ ] Deploy em produção OK
- [ ] Admin UI acessível no URL custom
- [ ] Conteúdo migrado
- [ ] Cliente tem acesso
- [ ] Documentação entregue

---

## 🛠️ Comandos Úteis

### Desenvolvimento
```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Executar migração de dados do Keystatic para Payload
npm run migrate

# Gerar tipos TypeScript do Payload
npm run payload generate:types

# Aceder à CLI do Payload
npx payload

# Build de produção
npm run build

# Iniciar servidor de produção
npm start
```

### Database (Neon PostgreSQL)
```bash
# Conectar à base de dados via psql
psql 'postgresql://neondb_owner:npg_KvNMbe0Isj7G@ep-bitter-sun-ag5h5yet-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require'

# Ver todas as tabelas criadas pelo Payload
\dt

# Ver schema de uma tabela específica
\d users

# Contar registos numa collection
SELECT COUNT(*) FROM gallery_images;
```

### Troubleshooting
```bash
# Limpar cache do Next.js
rm -rf .next

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install

# Ver logs detalhados do Payload
NODE_OPTIONS='--inspect' npm run dev

# Verificar portas em uso
lsof -i :3000
lsof -i :3001
```

## 🔍 Informações Técnicas

### Estrutura de Dados no PostgreSQL

**Tabelas criadas automaticamente pelo Payload:**

| Tabela | Descrição | Campos principais |
|--------|-----------|-------------------|
| `users` | Utilizadores do CMS | email, password (hash), name, role |
| `media` | Ficheiros uploadados | filename, url, alt, width, height, mimeType |
| `gallery_images` | Imagens da galeria | title, order, aspect, image_id (FK), alt |
| `features` | Características | title, description, icon, order |
| `testimonials` | Testemunhos | name, role, quote, order |
| `navigation` | Items menu | name, href, order, showInHeader, showInFooter |
| `pricing` | Planos preços | name, price, period, popular |
| `classes` | Aulas | name, type, day, time, spots, available |
| `site_settings` | Global settings | siteName, seoTitle, seoDescription, etc. |
| `home` | Global home | heroTitle, heroSubtitle, cta, backgroundImage_id |
| `about` | Global about | title, subtitle, bio1, bio2, image_id, etc. |
| `gallery` | Global gallery | title, subtitle, description |
| `schedule` | Global schedule | title, subtitle, description |
| `contact` | Global contact | phone, email, location, instagram, facebook |
| `payload_preferences` | Preferências admin | user_id, key, value |
| `payload_migrations` | Controlo migrações | name, batch, timestamp |

**Relações (Foreign Keys):**
- `gallery_images.image_id` → `media.id`
- `home.backgroundImage_id` → `media.id`
- `about.image_id` → `media.id`

### Variáveis de Ambiente

**Desenvolvimento (`.env.local`):**
```env
PAYLOAD_SECRET=4c3f760d501600eb687a2b1841901983108b43d65803c89b9630c33a1b886451
DATABASE_URI=postgresql://neondb_owner:npg_KvNMbe0Isj7G@ep-bitter-sun-ag5h5yet-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

**Produção (Vercel):**
```env
PAYLOAD_SECRET=<mesmo-do-local>
DATABASE_URI=<neon-connection-string>
NEXT_PUBLIC_SERVER_URL=https://joanasousa.vercel.app
NODE_ENV=production
```

### URLs Importantes

| Ambiente | Frontend | Admin Panel | API Base |
|----------|----------|-------------|----------|
| **Local** | http://localhost:3001 | http://localhost:3001/studio | http://localhost:3001/api |
| **Produção** | https://joanasousa.vercel.app | https://joanasousa.vercel.app/studio | https://joanasousa.vercel.app/api |

### Roles & Permissions

| Role | Pode criar users | Pode editar conteúdo | Pode apagar users | Acesso API |
|------|------------------|---------------------|-------------------|------------|
| **admin** | ✅ Sim | ✅ Sim | ✅ Sim | ✅ Total |
| **editor** | ❌ Não | ✅ Sim | ❌ Não | ✅ Leitura |

---

## ✅ Resultados da Migração (Completada: 18/01/2026)

### Fases Completadas

- ✅ **Fase 1-4**: Setup, Configuração, Script de Migração, Query Layer
- ✅ **Fase 5**: Limpeza de ficheiros Keystatic
- ⏸️ **Fase 6**: Testing Local (em curso)
- ⏸️ **Fase 7**: Deploy para Vercel (pendente)
- ⏸️ **Fase 8**: Onboarding do Cliente (pendente)

### Dados Migrados

**Globals (5/6):**
- ✅ Site Settings
- ✅ Home (com imagem de background)
- ✅ About (imagens funcionando corretamente)
- ✅ Gallery Settings
- ✅ Contact
- ⚠️ Schedule Settings (não migrado - ficheiro não encontrado)

**Collections:**
- ✅ 4 Features
- ✅ 3 Testimonials
- ✅ 5 Navigation items
- ⚠️ Pricing, Classes, Gallery Images (não encontrados em content/)

### Problemas Resolvidos

1. ✅ **Hydration errors** - Isolado route groups (website) e (payload)
2. ✅ **Redirect /studio → /admin** - Configurado custom route em payload.config.ts
3. ✅ **Imagens não aparecem** - Corrigido URL generation (/api/media/file/ → /images/)
4. ✅ **Uploads sem extensão** - Adicionado lógica para adicionar extensão baseada em mimeType
5. ✅ **Database connection** - Configurado Neon PostgreSQL com sucesso

### Ficheiros Removidos

- ✅ `keystatic.config.ts`
- ✅ `src/app/keystatic/`
- ✅ `src/app/api/keystatic/`
- ✅ `src/middleware.ts`
- ✅ Dependências: @keystatic/core, @keystatic/next (199 packages removidos)

### Ficheiros Arquivados

- 📦 `content/` → `content.backup/` (backup seguro)

### Sistema Funcionando

- ✅ Frontend: http://localhost:3001
- ✅ Admin Panel: http://localhost:3001/studio
- ✅ API: http://localhost:3001/api
- ✅ Upload de imagens funcionando
- ✅ Query layer a retornar dados corretamente
- ✅ Sem erros de compilação

---

## Notas Importantes

1. **Manter `content.backup/`** - Não apagar até garantir que tudo funciona em produção
2. **Testar migration local primeiro** - Nunca executar direto em produção
3. **Build local antes de deploy** - `npm run build` tem que funcionar
4. **Criar admin user imediatamente** após deploy
5. **Zero downtime** - Site continua a funcionar durante migração
6. **Guardar URL admin em segurança** - Anotar e partilhar apenas com cliente
7. **Porta 3001** - Se porta 3000 estiver ocupada, Next.js usa automaticamente 3001

## Suporte

**Documentação:**
- Payload CMS: https://payloadcms.com/docs
- Neon PostgreSQL: https://neon.tech/docs

**Problemas Comuns:**
- "Cannot find module '@payload-config'" → Run `npm run build`
- Database connection error → Verificar `DATABASE_URI`
- Images not loading → Verificar upload directory
