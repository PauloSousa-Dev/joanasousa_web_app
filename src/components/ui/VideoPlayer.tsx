"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoPlayerProps {
  /** URL do vídeo WebM (formato preferido) */
  webmSrc?: string;
  /** URL do vídeo MP4 (fallback) */
  mp4Src: string;
  /** URL da imagem poster (obrigatória para performance) */
  poster: string;
  /** Título do vídeo para acessibilidade */
  title?: string;
  /** Se true, vídeo começa muted com autoplay quando visível */
  autoPlayOnView?: boolean;
  /** ClassName customizado */
  className?: string;
}

export default function VideoPlayer({
  webmSrc,
  mp4Src,
  poster,
  title = "Vídeo",
  autoPlayOnView = true,
  className = "",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Intersection Observer para lazy loading
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3, // Começa a carregar quando 30% visível
  });

  // Auto-play quando o vídeo entra na view (se autoPlayOnView = true)
  useEffect(() => {
    if (inView && autoPlayOnView && videoRef.current && !hasStarted) {
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasStarted(true);
          })
          .catch((error) => {
            console.log("Auto-play prevented:", error);
          });
      }
    }
  }, [inView, autoPlayOnView, hasStarted]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
        setHasStarted(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      ref={ref}
      className={`relative group rounded-2xl overflow-hidden bg-gray-900 ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Vídeo */}
      <video
        ref={videoRef}
        poster={poster}
        loop
        playsInline
        muted={isMuted}
        preload="metadata" // Carrega apenas metadata até estar visível
        className="w-full h-full object-cover"
        aria-label={title}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        {/* WebM primeiro (melhor compressão) */}
        {webmSrc && <source src={webmSrc} type="video/webm" />}
        {/* MP4 fallback (compatibilidade universal) */}
        <source src={mp4Src} type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>

      {/* Overlay com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Controles customizados */}
      <AnimatePresence>
        {(showControls || !isPlaying) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {/* Botão Play/Pause Central */}
            {!isPlaying && (
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={togglePlay}
                className="pointer-events-auto w-20 h-20 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors shadow-2xl"
                aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={32} className="text-white fill-white ml-1" />
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini controles (canto inferior) */}
      <AnimatePresence>
        {showControls && isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 flex items-center gap-2"
          >
            {/* Play/Pause */}
            <motion.button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label={isPlaying ? "Pausar" : "Reproduzir"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <Pause size={18} className="text-white" />
              ) : (
                <Play size={18} className="text-white fill-white" />
              )}
            </motion.button>

            {/* Mute/Unmute */}
            <motion.button
              onClick={toggleMute}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label={isMuted ? "Ativar som" : "Desativar som"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMuted ? (
                <VolumeX size={18} className="text-white" />
              ) : (
                <Volume2 size={18} className="text-white" />
              )}
            </motion.button>

            <div className="flex-1" />

            {/* Badge "Treino Terapêutico" */}
            <div className="px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-md">
              <span className="text-xs font-medium text-white">
                Treino Terapêutico
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
