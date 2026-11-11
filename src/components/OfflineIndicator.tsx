import React, { useState } from 'react';
import { WifiOff, CheckCircle2, ChevronDown, Sparkles } from 'lucide-react';
import { useOnlineStatus } from '../utils/offlineCache';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const [dismissed, setDismissed] = useState(false);

  if (isOnline || dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 via-[#ED64A6] to-purple-600 text-white px-3 py-1.5 text-xs flex items-center justify-between shadow-xs z-50">
      <div className="flex items-center gap-2">
        <WifiOff className="w-3.5 h-3.5 animate-pulse" />
        <span className="font-semibold text-[11px]">
          Modo sin conexión activo
        </span>
        <span className="hidden sm:inline text-[10px] text-pink-100 opacity-90">
          • Terapeutas y noticias favoritas guardadas en caché
        </span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-[10px] bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full font-bold transition-colors"
      >
        Entendido
      </button>
    </div>
  );
};
