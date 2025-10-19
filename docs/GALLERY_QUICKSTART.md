# 🚀 Galeria - Quick Start

## ✅ O que foi implementado

A galeria está agora **100% integrada com o Keystatic** e pronta para usar!

### Funcionalidades:

- ✅ Upload de imagens através do admin do Keystatic
- ✅ Layout masonry responsivo (como Pinterest)
- ✅ Suporte para 3 orientações: Alto (retrato), Largo (paisagem), Quadrado
- ✅ Ordenação personalizável
- ✅ Otimização automática de imagens pelo Next.js
- ✅ Placeholders elegantes quando não há imagens
- ✅ Overlay com informações ao passar o rato
- ✅ Animações suaves com Framer Motion

---

## 🎯 Como usar (3 passos)

### 1. Aceder ao Admin

```bash
# Localmente
npm run dev
# Vai a: http://localhost:3000/keystatic
```

### 2. Adicionar Imagens

1. Clica em **"Galeria - Imagens"** no menu
2. Clica em **"Create Gallery Image"**
3. Preenche:
   - **Título**: Ex: "Treino Funcional"
   - **Imagem**: Upload da foto
   - **Alt**: Descrição para acessibilidade
   - **Formato**: Escolhe tall/wide/square baseado na orientação
   - **Ordem**: 0 = primeiro, 1 = segundo, etc.
4. Salva!

### 3. Ver no Site

As imagens aparecem automaticamente na secção "Galeria" da homepage!

---

## 💡 Dicas Rápidas

**Para um layout equilibrado:**

- 🎨 Varia entre orientações (não uses só uma)
- 📸 Usa 8-12 imagens no início
- 🔢 Ordena as melhores fotos primeiro (ordem 0, 1, 2...)

**Orientações sugeridas por tipo de foto:**

- 📱 **Tall (3:4)**: Pessoas, exercícios individuais, close-ups
- 🖼️ **Wide (4:3)**: Grupos, espaço do ginásio, equipamentos
- ⬛ **Square (1:1)**: Logos, detalhes, fotos artísticas

---

## 📂 Estrutura Técnica

```
keystatic.config.ts           # Configuração (campo aspect adicionado)
  └── galleryImages collection

src/
  └── components/sections/
      └── GallerySection.tsx   # Componente (agora usa imagens do Keystatic)

src/app/page.tsx              # Busca e passa as imagens

public/images/gallery/        # Pasta de uploads (criada)
content/gallery/              # Metadados JSON (criado pelo Keystatic)
```

---

## 🔍 Guia Completo

Para mais detalhes, vê: [`docs/GALLERY_GUIDE.md`](./GALLERY_GUIDE.md)

---

## 🎨 Preview

**Antes:** Placeholders fixos
**Depois:** Imagens reais geridas pelo Keystatic com layout masonry dinâmico!
