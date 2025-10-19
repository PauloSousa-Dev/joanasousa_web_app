# 📸 Guia de Gestão da Galeria

## Como adicionar fotos à galeria através do Keystatic

### 1️⃣ Aceder ao Admin do Keystatic

**Localmente:**

```bash
npm run dev
```

Depois acede a: `http://localhost:3000/keystatic`

**Em Produção (Vercel):**
Acede a: `https://seu-dominio.vercel.app/keystatic`

---

### 2️⃣ Adicionar uma Nova Imagem

1. No menu lateral, clica em **"Galeria - Imagens"**
2. Clica no botão **"Create Gallery Image"**
3. Preenche os campos:

   - **Título da Imagem**: Nome descritivo (ex: "Treino Funcional - Grupo Manhã")
   - **Imagem**: Clica em "Choose file" e faz upload da foto

     - ✅ Aceita: JPG, PNG, WebP
     - 📐 Recomendado: Mínimo 800px de largura
     - 🎯 Otimização: Next.js otimiza automaticamente as imagens

   - **Texto Alternativo (Alt)**: Descrição para acessibilidade (ex: "Sessão de treino funcional")

   - **Formato/Orientação**: Escolhe baseado na orientação da foto:

     - 📱 **Alto (Retrato 3:4)**: Fotos verticais
     - 🖼️ **Largo (Paisagem 4:3)**: Fotos horizontais
     - ⬛ **Quadrado (1:1)**: Fotos quadradas

   - **Ordem de Exibição**: Número para ordenar (0, 1, 2, 3...)
     - Menor número = aparece primeiro
     - Útil para destacar certas imagens

4. Clica em **"Create"**

---

### 3️⃣ Editar ou Remover Imagens

- **Editar**: Clica na imagem da lista e modifica os campos
- **Remover**: Clica na imagem e depois em "Delete"

---

### 4️⃣ Layout Masonry

A galeria usa um **layout masonry** (como Pinterest):

- As imagens são organizadas em colunas
- A orientação que escolheste (tall/wide/square) define o tamanho de cada card
- O sistema ajusta automaticamente para diferentes ecrãs:
  - 📱 Mobile: 1 coluna
  - 📱 Tablet: 2 colunas
  - 💻 Desktop: 3 colunas
  - 🖥️ Wide: 4 colunas

---

### 💡 Dicas de Otimização

**Boas práticas:**
✅ Usa imagens com boa qualidade (não precisa comprimir muito)
✅ Varia entre orientações (tall/wide/square) para um layout mais dinâmico
✅ Usa nomes descritivos nos títulos e alt text
✅ Define a ordem para destacar as melhores fotos primeiro

**Organização sugerida:**

- **0-9**: Fotos de destaque (resultados, grupo, atmosfera)
- **10-19**: Treinos específicos
- **20+**: Equipamentos, espaço, detalhes

---

### 🎨 Exemplos de Combinação

Para um layout visualmente equilibrado, alterna as orientações:

```
[TALL] [WIDE] [TALL] [SQUARE]
[WIDE] [SQUARE] [TALL] [WIDE]
[SQUARE] [TALL] [WIDE] [TALL]
```

---

### 🔄 Workflow Recomendado

1. **Preparar fotos**: Seleciona 8-12 fotos de qualidade
2. **Upload em lote**: Adiciona todas de uma vez no Keystatic
3. **Ordenar**: Define a ordem de exibição
4. **Testar**: Visualiza no site para ajustar orientações
5. **Ajustar**: Muda orientação se necessário para melhor layout

---

### ⚠️ Troubleshooting

**Problema**: Imagem não aparece

- ✅ Verifica se o upload foi concluído
- ✅ Faz refresh da página
- ✅ Verifica se a imagem está em `public/images/gallery`

**Problema**: Layout estranho

- ✅ Experimenta mudar a orientação (aspect)
- ✅ Varia entre tall/wide/square para equilíbrio

---

### 📁 Estrutura de Ficheiros

```
public/
  └── images/
      └── gallery/           # Imagens da galeria (via Keystatic)

content/
  └── gallery/              # Metadados das imagens (JSON)
      ├── treino-1.json
      ├── treino-2.json
      └── ...
```

---

## 🚀 Pronto!

Agora tens uma galeria totalmente gerida através do Keystatic, sem precisar mexer em código. Basta fazer upload das fotos e elas aparecem automaticamente no site com o layout masonry!
