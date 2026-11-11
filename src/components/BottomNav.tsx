import React from 'react';
import { Home, Heart, User } from 'lucide-react';

export type TabType = 'inicio' | 'favoritos' | 'perfil';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  favoritesCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  favoritesCount = 0
}) => {
  return (
    <nav 
      aria-label="Navegación principal"
      className="bg-white/95 backdrop-blur-md rounded-3xl border border-pink-100/90 shadow-soft px-8 py-2 flex items-center justify-around w-full"
    >
      {/* Inicio */}
      <button
        onClick={() => onTabChange('inicio')}
        className={`flex flex-col items-center gap-0.5 transition-all py-1 px-3 rounded-2xl active:scale-95 ${
          activeTab === 'inicio' ? 'text-[#ED64A6]' : 'text-slate-400 hover:text-slate-600'
        }`}
        aria-label="Inicio"
      >
        <Home className="w-5 h-5" />
        <span className="text-[11px] font-bold tracking-tight">Inicio</span>
      </button>

      {/* Favoritos */}
      <button
        onClick={() => onTabChange('favoritos')}
        className={`relative flex flex-col items-center gap-0.5 transition-all py-1 px-3 rounded-2xl active:scale-95 ${
          activeTab === 'favoritos' ? 'text-[#ED64A6]' : 'text-slate-400 hover:text-slate-600'
        }`}
        aria-label="Favoritos"
      >
        <div className="relative">
          <Heart className={`w-5 h-5 ${activeTab === 'favoritos' ? 'fill-[#ED64A6]' : ''}`} />
          {favoritesCount > 0 && (
            <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#ED64A6] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
              {favoritesCount}
            </span>
          )}
        </div>
        <span className="text-[11px] font-bold tracking-tight">Favoritos</span>
      </button>

      {/* Perfil */}
      <button
        onClick={() => onTabChange('perfil')}
        className={`flex flex-col items-center gap-0.5 transition-all py-1 px-3 rounded-2xl active:scale-95 ${
          activeTab === 'perfil' ? 'text-[#ED64A6]' : 'text-slate-400 hover:text-slate-600'
        }`}
        aria-label="Perfil"
      >
        <User className="w-5 h-5" />
        <span className="text-[11px] font-bold tracking-tight">Perfil</span>
      </button>
    </nav>
  );
};
