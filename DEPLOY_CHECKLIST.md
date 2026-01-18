# 🚀 Deploy Checklist - Payload CMS Migration

**Data:** 18 Janeiro 2026
**Status:** Pronto para deploy em produção

---

## ✅ O que já está feito

- [x] Migração local completa
- [x] Build de produção testado (npm run build)
- [x] Git commit criado (142c844 e 081dcec)
- [x] Documento de migração atualizado
- [x] Sistema local funcionando em http://localhost:3001

---

## 📋 Próximos Passos (Por Ordem)

### 1️⃣ Configurar Vercel Environment Variables

Ir a: **Vercel Dashboard → Projeto → Settings → Environment Variables**

Adicionar **3 variáveis** (marcar Production + Preview + Development):

```
PAYLOAD_SECRET=4c3f760d501600eb687a2b1841901983108b43d65803c89b9630c33a1b886451
```

```
DATABASE_URI=postgresql://neondb_owner:npg_KvNMbe0Isj7G@ep-bitter-sun-ag5h5yet-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

```
NEXT_PUBLIC_SERVER_URL=https://joanasousa.vercel.app
```

*(Ajustar o URL se o domínio for diferente)*

---

### 2️⃣ Fazer Git Push

```bash
git push origin main
```

Isto vai automaticamente trigger o deploy no Vercel.

---

### 3️⃣ Aguardar Build no Vercel

- Tempo estimado: 5-10 minutos
- Verificar logs para confirmar sem erros
- URL: https://vercel.com/[seu-username]/[projeto]/deployments

---

### 4️⃣ Criar Primeiro Admin User

Assim que o deploy terminar:

1. Aceder: https://joanasousa.vercel.app/studio
2. Preencher formulário de registo:
   - **Email:** (teu email)
   - **Password:** (password forte)
3. Confirmar que consegues fazer login

---

### 5️⃣ Verificar Produção

Testar:
- [ ] Homepage carrega: https://joanasousa.vercel.app
- [ ] Admin acessível: https://joanasousa.vercel.app/studio
- [ ] Consegues fazer login
- [ ] Imagens aparecem corretamente
- [ ] Conteúdo está presente (Home, About, Features, etc.)

---

### 6️⃣ Criar User para o Cliente

No admin em produção:

1. **Users** → **Create New**
2. Preencher:
   - **Email:** (email do cliente)
   - **Password:** (gerar password forte)
   - **Role:** **editor** ⚠️ (NÃO admin!)
3. Enviar credenciais ao cliente via email seguro

---

## 🔧 Troubleshooting

### Se o build falhar no Vercel:

1. Verificar logs de build no dashboard Vercel
2. Confirmar que as 3 variáveis de ambiente foram adicionadas
3. Verificar que o `DATABASE_URI` está correto
4. Se necessário, fazer redeploy manual

### Se não conseguir criar user:

1. Verificar que a database está acessível
2. Confirmar connection string no Vercel
3. Ver logs de runtime no Vercel

### Se imagens não aparecerem:

- As imagens são servidas de `public/images/`
- URL conversion automático já está implementado
- Verificar que a imagem foi feita upload via admin

---

## 📞 Informação de Suporte

**Documentação:**
- Payload CMS: https://payloadcms.com/docs
- Neon (DB): https://neon.tech/docs
- Vercel: https://vercel.com/docs

**Ficheiros importantes:**
- `MIGRATION_PLAN.md` - Plano completo de migração
- `payload.config.ts` - Configuração do Payload
- `src/lib/payload.ts` - Query layer

**Comandos úteis:**
```bash
npm run dev          # Desenvolvimento local
npm run build        # Build de produção
git log --oneline    # Ver histórico de commits
```

---

## ✨ Após Deploy Concluído

- [ ] Testar todas as funcionalidades em produção
- [ ] Entregar credenciais ao cliente
- [ ] Fazer walkthrough com o cliente (15-30 min)
- [ ] Apagar `content.backup/` após confirmar tudo OK (opcional)
- [ ] Celebrar! 🎉

---

**Última atualização:** 18/01/2026 20:50
