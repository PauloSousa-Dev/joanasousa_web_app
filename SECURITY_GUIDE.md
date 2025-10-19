# 🔒 Guia de Segurança do Keystatic

## ⚠️ PROBLEMA IDENTIFICADO

O Keystatic estava **EXPOSTO PUBLICAMENTE** sem autenticação. Qualquer pessoa podia aceder a `/keystatic` e editar o conteúdo do website!

---

## ✅ SOLUÇÃO IMPLEMENTADA

### **Middleware de Autenticação**

Foi criado um middleware (`src/middleware.ts`) que protege:

- `/keystatic/*` - Painel administrativo
- `/api/keystatic/*` - API routes

---

## 🔐 Como Configurar

### **1. Definir Senha no .env.local**

Cria/edita o ficheiro `.env.local` na raiz do projeto:

```bash
# Senha FORTE para proteger o Keystatic
KEYSTATIC_PASSWORD=ChooseAStrongPasswordHere123!
```

⚠️ **IMPORTANTE:**

- Usa uma senha **forte** (mínimo 16 caracteres)
- **NUNCA** faças commit do `.env.local` no git
- Muda a senha regularmente

### **2. Configurar no Vercel (Produção)**

No painel da Vercel:

1. Vai a **Settings** → **Environment Variables**
2. Adiciona:
   ```
   Key: KEYSTATIC_PASSWORD
   Value: SuaSenhaForte123!
   ```
3. **Redeploy** a aplicação

---

## 🚀 Como Usar

### **Aceder ao Admin:**

1. Vai a: `https://seusite.com/keystatic`
2. Aparece popup de autenticação
3. **Username:** (deixa vazio ou qualquer valor)
4. **Password:** A tua `KEYSTATIC_PASSWORD`
5. ✅ Login válido por 24 horas

### **Em Desenvolvimento:**

```bash
# 1. Define a senha
echo 'KEYSTATIC_PASSWORD=dev123' >> .env.local

# 2. Inicia o servidor
npm run dev

# 3. Acede a http://localhost:3001/keystatic
# 4. Usa a senha: dev123
```

---

## 🛡️ Níveis de Segurança

### **Atual: Proteção por Senha** ✅

**Segurança:** ⭐⭐⭐⭐☆ (Boa)

**Vantagens:**

- ✅ Fácil de configurar
- ✅ Funciona imediatamente
- ✅ Não requer serviços externos
- ✅ Cookie dura 24h (não pede sempre senha)

**Desvantagens:**

- ⚠️ Senha partilhada (não há contas individuais)
- ⚠️ Sem logs de quem editou o quê

**Ideal para:** Websites pequenos, 1-2 administradores

---

### **Futura: GitHub OAuth** (Opcional)

**Segurança:** ⭐⭐⭐⭐⭐ (Excelente)

Se quiseres upgrade para autenticação via GitHub:

1. **Configurar Keystatic para GitHub mode:**

   ```typescript
   // keystatic.config.ts
   storage: {
     kind: "github",
     repo: { owner: "PauloSousa-Dev", name: "joanasousa_web_app" },
   }
   ```

2. **Criar GitHub App:**

   - https://github.com/settings/apps/new
   - Callback URL: `https://seusite.com/api/keystatic/github/oauth/callback`

3. **Configurar variáveis:**
   ```bash
   KEYSTATIC_GITHUB_CLIENT_ID=xxx
   KEYSTATIC_GITHUB_CLIENT_SECRET=xxx
   KEYSTATIC_SECRET=xxx
   ```

**Vantagens:**

- ✅ Cada editor tem conta própria
- ✅ Histórico de edições no GitHub
- ✅ Rollback fácil (Git)
- ✅ Multi-user sem partilhar senhas

---

## 🔥 Cenários de Emergência

### **Se perderes a senha:**

1. Acede ao servidor/Vercel
2. Muda a variável `KEYSTATIC_PASSWORD`
3. Redeploy (ou restart em dev)

### **Se suspeitares de acesso não autorizado:**

1. **Muda IMEDIATAMENTE** a senha
2. Verifica no Git se há commits suspeitos:
   ```bash
   git log --oneline content/
   ```
3. Faz rollback se necessário:
   ```bash
   git revert <commit_id>
   ```

---

## 📊 Checklist de Segurança

### **Desenvolvimento:**

- [ ] `.env.local` criado com `KEYSTATIC_PASSWORD`
- [ ] `.env.local` está no `.gitignore`
- [ ] Nunca fazer commit de senhas

### **Produção (Vercel):**

- [ ] `KEYSTATIC_PASSWORD` definida nas Environment Variables
- [ ] Senha tem 16+ caracteres
- [ ] Senha inclui letras, números, símbolos
- [ ] Redeploy feito após configurar variáveis

### **Testes:**

- [ ] Tentar aceder `/keystatic` sem senha → Deve bloquear
- [ ] Login com senha correta → Deve funcionar
- [ ] Cookie válido por 24h → Não deve pedir sempre
- [ ] API `/api/keystatic/*` → Deve estar protegida

---

## ❓ FAQ

**P: E se eu quiser remover a proteção em dev?**

```typescript
// src/middleware.ts
if (process.env.NODE_ENV === "development") {
  return NextResponse.next(); // Skip auth em dev
}
```

**P: Posso ter múltiplas senhas?**
Sim, modifica o middleware:

```typescript
const validPasswords = [
  process.env.KEYSTATIC_PASSWORD_ADMIN,
  process.env.KEYSTATIC_PASSWORD_EDITOR,
];
if (validPasswords.includes(password)) { ... }
```

**P: Como vejo quem está logado?**
Com a solução atual (senha partilhada), não é possível. Para isso precisas de GitHub OAuth ou NextAuth.

**P: O middleware afeta a performance?**
Não! O middleware só corre nas rotas `/keystatic/*`, não afeta o website público.

---

## 🚨 LEMBRETE FINAL

**ANTES DE FAZER DEPLOY PARA PRODUÇÃO:**

1. ✅ Define `KEYSTATIC_PASSWORD` no Vercel
2. ✅ Testa o login em staging/preview
3. ✅ Confirma que `/keystatic` pede autenticação
4. ✅ Guarda a senha num gestor de senhas (1Password, Bitwarden, etc)

**SEM ISTO, O TEU CONTEÚDO ESTÁ EXPOSTO! ⚠️**

---

**Data de Implementação:** 19 de Outubro, 2025  
**Status:** ✅ PROTEGIDO COM MIDDLEWARE
