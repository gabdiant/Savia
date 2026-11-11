import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, Calendar } from 'lucide-react';
import { Therapist, VideoPersonality } from '../types';

interface VideoPlayerModalProps {
  therapist: Therapist;
  video: VideoPersonality;
  onClose: () => void;
  onBookNow: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  therapist,
  video,
  onClose,
  onBookNow
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(30);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 2));
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain flex items-center justify-center p-3.5 sm:p-5 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-slate-900 rounded-3xl overflow-hidden shadow-2xl text-white flex flex-col my-auto max-h-[85vh] h-[520px] sm:h-[570px] border border-white/10">
        
        {/* Top Progress bar */}
        <div className="absolute top-3 left-4 right-4 z-20 flex gap-1.5">
          <div className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300 rounded-full" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>

        {/* Header Controls */}
        <div className="absolute top-6 left-4 right-4 z-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
            <img 
              src={therapist.avatar} 
              alt={therapist.name} 
              className="w-7 h-7 rounded-full object-cover border border-white/40"
            />
            <div>
              <p className="text-xs font-semibold leading-tight">{therapist.name}</p>
              <p className="text-[10px] text-pink-200 leading-tight">Video de Personalidad</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-8 h-8 rounded-full bg-black/45 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/45 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Video Canvas Simulation */}
        <div 
          onClick={() => setIsPlaying(!isPlaying)}
          className="relative flex-1 bg-gradient-to-b from-slate-800 via-pink-950/40 to-slate-900 flex items-center justify-center cursor-pointer overflow-hidden"
        >
          <img 
            src={video.thumbnail || therapist.avatar} 
            alt={video.title} 
            className="absolute inset-0 w-full h-full object-cover opacity-85 transition-transform duration-700 ease-out scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/40" />

          {/* Play/Pause overlay indicator */}
          {!isPlaying && (
            <div className="relative z-10 w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </div>
          )}

          {/* Ambient Sound waves */}
          <div className="absolute bottom-32 left-6 right-6 flex items-end gap-1 h-8 opacity-70">
            {[40, 75, 55, 90, 65, 80, 45, 95, 70, 85, 50, 75, 60, 90, 40].map((h, i) => (
              <div 
                key={i} 
                className={`w-1 rounded-full bg-gradient-to-t from-[#ED64A6] to-[#F6AD55] transition-all duration-300 ${
                  isPlaying ? 'animate-pulse' : ''
                }`}
                style={{ height: `${isPlaying ? (h * (i % 2 === 0 ? 0.9 : 1.1)) : 20}%` }}
              />
            ))}
          </div>
        </div>

        {/* Video Info & Summary */}
        <div className="relative z-20 p-5 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent flex flex-col gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F6AD55] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{video.title} ({video.duration})</span>
            </div>
            <p className="text-xs text-slate-200 line-clamp-3 leading-relaxed">
              "{video.summary}"
            </p>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookNow();
            }}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#ED64A6] to-[#F6AD55] text-white font-bold text-sm shadow-glow-pink hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Reservar con {therapist.name.split(' ')[0]}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
