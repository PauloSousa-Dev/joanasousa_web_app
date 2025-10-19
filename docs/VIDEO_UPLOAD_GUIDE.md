# Guia de Upload de Vídeos - Joana Sousa Centro de Treino

Este guia explica como adicionar vídeos otimizados à secção "Sobre Mim" do website.

## Especificações Técnicas Recomendadas

### Formato e Codec
- **Formato primário**: WebM (VP9 ou AV1) - melhor compressão
- **Formato fallback**: MP4 (H.264) - compatibilidade universal
- **Poster**: JPG ou WebP optimizado

### Qualidade do Vídeo
- **Resolução**: 720p (1280x720) - ideal para web
- **Frame rate**: 24-30fps
- **Bitrate**: 1000-2500 kbps (VBR - Variable Bitrate)
- **Duração**: 15-30 segundos (máximo 60s)
- **Orientação**: Vertical (9:16) ou Quadrado (1:1)

### Tamanho dos Ficheiros
- WebM: ~500KB - 2MB
- MP4: ~1MB - 3MB
- Poster: ~50-150KB

## Como Converter Vídeos

### Opção 1: FFmpeg (Linha de Comando)

```bash
# Converter para WebM (VP9)
ffmpeg -i input.mov -c:v libvpx-vp9 -b:v 1500k -c:a libopus -b:a 96k -vf scale=-1:720 output.webm

# Converter para MP4 (H.264)
ffmpeg -i input.mov -c:v libx264 -preset slow -crf 23 -vf scale=-1:720 -c:a aac -b:a 128k output.mp4

# Extrair poster (frame aos 2 segundos)
ffmpeg -i input.mov -ss 00:00:02 -vframes 1 -vf scale=-1:720 -q:v 2 poster.jpg
```

### Opção 2: HandBrake (Interface Gráfica)
1. Descarregar: https://handbrake.fr/
2. Abrir o vídeo original
3. Selecionar preset "Web" > "Gmail 5 Minutes 720p30"
4. Ajustar:
   - Dimensions: Height 720
   - Video: H.264, RF 23
   - Audio: AAC, 128kbps
5. Export

### Opção 3: Serviços Online
- **Cloudinary**: https://cloudinary.com (com otimização automática)
- **Handbrake.js**: https://handbrake.fr/
- **FFmpeg.wasm**: https://ffmpegwasm.netlify.app/

## Onde Hospedar os Vídeos

### Opção 1: Cloudinary (Recomendado)
- CDN global
- Otimização automática
- Transformações on-the-fly
- Free tier generoso

```
Exemplo de URLs:
WebM: https://res.cloudinary.com/[cloud_name]/video/upload/v1234567890/about-video.webm
MP4:  https://res.cloudinary.com/[cloud_name]/video/upload/v1234567890/about-video.mp4
Poster: https://res.cloudinary.com/[cloud_name]/video/upload/v1234567890/about-video.jpg
```

### Opção 2: Vercel Blob Storage
```bash
npm install @vercel/blob
```

### Opção 3: GitHub (para protótipos)
- Adicionar à pasta `public/videos/`
- URLs: `/videos/about-video.webm`

## Como Adicionar no Keystatic

1. Aceder ao admin: `http://localhost:3000/keystatic`
2. Ir a "Sobre Mim"
3. Preencher os campos de vídeo:
   - **URL Vídeo WebM**: URL completa do ficheiro .webm (opcional mas recomendado)
   - **URL Vídeo MP4**: URL completa do ficheiro .mp4 (obrigatório)
   - **URL Poster do Vídeo**: URL da imagem de preview (obrigatório)
4. Guardar

## Checklist de Performance

- [ ] Vídeo tem menos de 3MB
- [ ] Duração é inferior a 60 segundos
- [ ] Fornecido em formato WebM + MP4
- [ ] Poster image está optimizado (<150KB)
- [ ] Testado em mobile e desktop
- [ ] Vídeo não tem áudio importante (será muted por defeito)
- [ ] Conteúdo do vídeo é loop-friendly

## Impacto na Performance

### Métricas Esperadas
- **LCP (Largest Contentful Paint)**: Sem impacto (poster carrega primeiro)
- **CLS (Cumulative Layout Shift)**: 0 (aspect-ratio definido)
- **Tempo de carregamento**: +500ms-1s quando vídeo entra na viewport

### Otimizações Implementadas
- Lazy loading com Intersection Observer
- Poster image carrega imediatamente
- Vídeo só carrega quando 30% visível
- Auto-play apenas quando na viewport
- Preload metadata apenas

## Exemplo de Configuração

```json
{
  "videoWebm": "https://res.cloudinary.com/demo/video/upload/v1234/treino-terapeutico.webm",
  "videoMp4": "https://res.cloudinary.com/demo/video/upload/v1234/treino-terapeutico.mp4",
  "videoPoster": "https://res.cloudinary.com/demo/video/upload/v1234/treino-terapeutico.jpg"
}
```

## Troubleshooting

### Vídeo não reproduz em iOS Safari
- Verificar que `playsInline` está ativo (já implementado)
- Certificar que MP4 usa codec H.264

### Vídeo demora muito a carregar
- Reduzir bitrate para 1000-1500 kbps
- Encurtar duração para <20 segundos
- Verificar se WebM está a ser usado (browsers modernos)

### Qualidade do vídeo está má
- Aumentar bitrate para 2000-2500 kbps
- Verificar se fonte original tem boa qualidade
- Usar preset "slow" no FFmpeg

## Recursos Úteis

- [Web.dev - Video Performance](https://web.dev/fast/#optimize-your-videos)
- [FFmpeg Video Guide](https://trac.ffmpeg.org/wiki/Encode/VP9)
- [Cloudinary Video Optimization](https://cloudinary.com/documentation/video_optimization)
- [Core Web Vitals](https://web.dev/vitals/)

## Suporte

Para questões técnicas, consultar:
- Documentação Next.js: https://nextjs.org/docs
- Documentação Keystatic: https://keystatic.com/docs
