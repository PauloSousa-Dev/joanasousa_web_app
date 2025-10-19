# 📚 Índice de Documentação

## 🎯 Quick Start

Novo no projeto? Começa por aqui:

1. **[README.md](README.md)** - Overview do projeto
2. **[ARCHITECTURE.md](ARCHITECTURE.md)** - Como o código está organizado
3. **[KEYSTATIC_GUIDE.md](KEYSTATIC_GUIDE.md)** - Como editar conteúdo

---

## 📖 Documentação por Audiência

### **Para Developers**

| Documento | Descrição | Quando Ler |
|-----------|-----------|-----------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | Estrutura do projeto | Ao começar no projeto |
| [KEYSTATIC_GUIDE.md](KEYSTATIC_GUIDE.md) | CMS setup e usage | Ao configurar CMS |
| [REGYBOX_INTEGRATION.md](REGYBOX_INTEGRATION.md) | API externa | Ao trabalhar com horários |
| [SECURITY_GUIDE.md](SECURITY_GUIDE.md) | Segurança e auth | Antes de deploy |
| [REPOSITORY_SECURITY_AUDIT.md](REPOSITORY_SECURITY_AUDIT.md) | Auditoria completa | Histórico/referência |

### **Para Clientes/Editores**

| Documento | Descrição | Quando Ler |
|-----------|-----------|-----------|
| [CLIENT_ADMIN_GUIDE.md](CLIENT_ADMIN_GUIDE.md) | Como editar o site | Primeiro acesso ao admin |

### **Para DevOps/Deploy**

| Documento | Descrição | Quando Ler |
|-----------|-----------|-----------|
| [SECURITY_GUIDE.md](SECURITY_GUIDE.md) | Setup de produção | Antes de deploy |
| README.md (secção Deploy) | Variáveis de ambiente | Durante deploy |

---

## 🗂️ Documentação por Tópico

### **CMS & Conteúdo**
- [KEYSTATIC_GUIDE.md](KEYSTATIC_GUIDE.md) - Configuração e uso do CMS
- [CLIENT_ADMIN_GUIDE.md](CLIENT_ADMIN_GUIDE.md) - Guia não-técnico
- [docs/VIDEO_UPLOAD_GUIDE.md](docs/VIDEO_UPLOAD_GUIDE.md) - Upload de vídeos

### **Integrações**
- [REGYBOX_INTEGRATION.md](REGYBOX_INTEGRATION.md) - API de horários
  - Autenticação
  - Endpoints
  - Error handling
  - Troubleshooting

### **Arquitetura**
- [ARCHITECTURE.md](ARCHITECTURE.md) - Overview técnico
  - Estrutura de pastas
  - Componentes
  - Data flow
  - State management

### **Segurança**
- [SECURITY_GUIDE.md](SECURITY_GUIDE.md) - Guia completo
  - Password middleware
  - Environment variables
  - GitHub OAuth (opcional)
  - Boas práticas
- [REPOSITORY_SECURITY_AUDIT.md](REPOSITORY_SECURITY_AUDIT.md) - Auditoria
  - O que está/não está exposto
  - Verificações feitas
  - Checklist de segurança

---

## 🔍 Encontrar Informação Rápida

### **Como fazer...**

| Tarefa | Documento | Secção |
|--------|-----------|--------|
| Editar texto da home | [CLIENT_ADMIN_GUIDE.md](CLIENT_ADMIN_GUIDE.md) | "Mudar texto da página principal" |
| Adicionar imagem | [CLIENT_ADMIN_GUIDE.md](CLIENT_ADMIN_GUIDE.md) | "Adicionar foto à galeria" |
| Upload de vídeo | [docs/VIDEO_UPLOAD_GUIDE.md](docs/VIDEO_UPLOAD_GUIDE.md) | Guia completo |
| Configurar segurança | [SECURITY_GUIDE.md](SECURITY_GUIDE.md) | "Setup em 2 passos" |
| Deploy para produção | README.md | "Como Executar" |
| Configurar RegyBox | [REGYBOX_INTEGRATION.md](REGYBOX_INTEGRATION.md) | "Setup" |
| Entender estrutura | [ARCHITECTURE.md](ARCHITECTURE.md) | Todo |
| Adicionar coleção Keystatic | [KEYSTATIC_GUIDE.md](KEYSTATIC_GUIDE.md) | "Configuração" |

---

## 📝 Manutenção de Docs

### **Quando Atualizar:**

- ✅ **README.md** - Mudanças na stack ou features principais
- ✅ **ARCHITECTURE.md** - Mudanças estruturais significativas
- ✅ **KEYSTATIC_GUIDE.md** - Novas coleções ou campos
- ✅ **SECURITY_GUIDE.md** - Mudanças em auth ou secrets
- ✅ **CLIENT_ADMIN_GUIDE.md** - Mudanças no fluxo do cliente

### **Não Precisa Atualizar:**

- ❌ Mudanças CSS ou estilo
- ❌ Pequenos bugfixes
- ❌ Refactoring interno (sem impacto API)

---

## 🆘 Preciso de Ajuda!

### **Não encontras o que procuras?**

1. **Usa a busca:** `Cmd+F` ou `Ctrl+F` nos docs
2. **Verifica o README.md:** Tem overview geral
3. **Security issues?** → [SECURITY_GUIDE.md](SECURITY_GUIDE.md)
4. **Cliente com dúvidas?** → [CLIENT_ADMIN_GUIDE.md](CLIENT_ADMIN_GUIDE.md)

---

## ✅ Checklist de Leitura

Para novos developers no projeto:

- [ ] Li o README.md completo
- [ ] Entendo a arquitetura (ARCHITECTURE.md)
- [ ] Sei como funciona o Keystatic (KEYSTATIC_GUIDE.md)
- [ ] Conheço as práticas de segurança (SECURITY_GUIDE.md)
- [ ] Sei como fazer deploy

Para clientes/editores:

- [ ] Li o CLIENT_ADMIN_GUIDE.md
- [ ] Consegui fazer login no admin
- [ ] Testei editar um texto
- [ ] Testei adicionar uma imagem
- [ ] Sei como pedir ajuda

---

**Última atualização:** 19 de Outubro, 2025  
**Documentos:** 7 principais + 1 específico  
**Status:** ✅ Completo e atualizado
