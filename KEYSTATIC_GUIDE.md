# Guia de Gestão de Conteúdo com Keystatic

## Acesso ao Painel Admin

Para gerir o conteúdo do site, aceda a:
**http://localhost:3000/keystatic**

## Estrutura de Conteúdo

### Singletons (Páginas Únicas)

#### 1. Home
Campos editáveis:
- **Título principal** - Título do hero
- **Subtítulo** - Texto abaixo do título
- **Texto do botão** - CTA principal

#### 2. Sobre Mim
Campos editáveis:
- **Título** - Título da secção
- **Subtítulo** - Badge acima do título
- **Descrição Principal** - Texto resumo
- **Biografia - Parágrafo 1** - Primeiro parágrafo
- **Biografia - Parágrafo 2** - Segundo parágrafo
- **Foto Profissional** - Imagem (opcional)
- **Anos de Experiência** - Número exibido no card

#### 3. Galeria - Configurações
Campos editáveis:
- **Título** - Título da secção
- **Subtítulo** - Descrição da galeria

#### 4. Horários - Configurações
Campos editáveis:
- **Título** - Título da secção
- **Subtítulo** - Descrição dos horários

#### 5. Contacto
Campos editáveis:
- **Título** - Título da secção
- **Subtítulo** - Descrição
- **Telefone** - Número de contacto
- **Email** - Email de contacto
- **Localização** - Morada
- **Latitude do Mapa** - Coordenadas GPS (latitude)
- **Longitude do Mapa** - Coordenadas GPS (longitude)
- **Instagram URL** - Link para Instagram
- **Facebook URL** - Link para Facebook

### Collections (Conteúdo Múltiplo)

#### 1. Planos de Preços
Campos por entrada:
- **Nome do Plano** - Ex: "Personal", "Grupo"
- **Preço** - Ex: "50€"
- **Período** - Ex: "por sessão"
- **Plano Popular?** - Checkbox para destacar
- **Características** - Lista de features (array)

#### 2. Galeria - Imagens
Campos por imagem:
- **Título da Imagem**
- **Categoria** - Dropdown: Treinos, Força, Cardio, etc.
- **Imagem** - Upload de ficheiro
- **Texto Alternativo (Alt)** - Para acessibilidade

#### 3. Aulas
Campos por aula:
- **Nome da Aula** - Ex: "Treino Funcional"
- **Tipo** - Dropdown: Grupo ou Individual
- **Dia da Semana** - Dropdown: Segunda a Sábado
- **Horário** - Ex: "07:00 - 08:00"
- **Vagas Totais** - Número
- **Vagas Disponíveis** - Número

#### 4. Características (About)
Campos por característica:
- **Título** - Ex: "Certificação Profissional"
- **Descrição** - Texto explicativo
- **Ícone** - Dropdown com opções predefinidas

## Como Editar Conteúdo

### Via Painel Admin (Recomendado)
1. Aceder a http://localhost:3000/keystatic
2. Selecionar a secção a editar na barra lateral
3. Fazer alterações nos campos
4. Clicar em "Save" para guardar

### Via Ficheiros JSON (Avançado)
Os ficheiros de conteúdo estão em `/content/`:
- `home.json` - Conteúdo da home
- `about.json` - Conteúdo sobre mim
- `gallery-settings.json` - Configurações da galeria
- `schedule.json` - Configurações de horários
- `contact.json` - Informações de contacto
- `pricing/` - Pasta com planos de preços
- `gallery/` - Pasta com imagens da galeria
- `classes/` - Pasta com aulas
- `features/` - Pasta com características

## Localização das Imagens

### Upload de Imagens
As imagens são guardadas em:
- **Foto Profissional**: `/public/images/`
- **Galeria**: `/public/images/gallery/`

### Boas Práticas
- Usar imagens optimizadas (webp ou jpg)
- Tamanho máximo recomendado: 2MB
- Dimensões recomendadas:
  - Foto profissional: 800x1000px (ratio 4:5)
  - Galeria: 600x800px (ratio 3:4)

## Google Maps

### Configurar Localização
No painel Keystatic > Contacto:
1. Introduzir o endereço em "Localização"
2. Obter coordenadas GPS:
   - Aceder a https://www.google.com/maps
   - Pesquisar o endereço
   - Clicar com botão direito no marcador
   - Selecionar as coordenadas (formato: latitude, longitude)
3. Copiar latitude para o campo "Latitude do Mapa"
4. Copiar longitude para o campo "Longitude do Mapa"

### Exemplo de Coordenadas
- **Lisboa**: Latitude `38.7223`, Longitude `-9.1393`
- **Porto**: Latitude `41.1579`, Longitude `-8.6291`

## Workflow de Publicação

### Desenvolvimento Local
1. Editar conteúdo via Keystatic
2. Alterações aparecem imediatamente no site local
3. Ficheiros JSON são atualizados automaticamente

### Produção (GitHub)
1. Fazer commit das alterações
2. Push para GitHub
3. Deploy automático via Vercel (quando configurado)

## Comandos Úteis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Aceder ao painel Keystatic
# http://localhost:3000/keystatic

# Aceder ao site
# http://localhost:3000
```

## Resolução de Problemas

### Painel Keystatic não carrega
- Verificar se o servidor está a correr (`npm run dev`)
- Limpar cache do browser
- Verificar console para erros

### Imagens não aparecem
- Verificar se o ficheiro está em `/public/images/` ou `/public/images/gallery/`
- Verificar extensão do ficheiro (jpg, png, webp)
- Recarregar página

### Alterações não aparecem
- Fazer hard refresh (Ctrl+Shift+R ou Cmd+Shift+R)
- Verificar se guardou as alterações no Keystatic
- Verificar ficheiro JSON correspondente

## Suporte

Para questões técnicas ou problemas, consultar:
- [README.md](README.md) - Documentação geral
- [ARCHITECTURE.md](ARCHITECTURE.md) - Arquitetura técnica
- Keystatic Docs: https://keystatic.com/docs
