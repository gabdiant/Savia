import React from 'react';
import { Heart, Star, ChevronRight, Sparkles } from 'lucide-react';
import { Therapist } from '../types';

interface FavoritesScreenProps {
  favoriteTherapists: Therapist[];
  onSelectTherapist: (therapist: Therapist) => void;
  onToggleFavorite: (id: string) => void;
  onExplore: () => void;
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  favoriteTherapists,
  onSelectTherapist,
  onToggleFavorite,
  onExplore
}) => {
  return (
    <div className="flex flex-col min-h-full bg-[#FAF8FD] text-slate-800 pb-28 px-5 pt-5">
      {/* 2a. Header & Page Badge [2] */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span 
            className="inline-flex items-center justify-center font-mono font-black text-[11px] bg-slate-900 text-white px-2 py-0.5 rounded-lg shadow-sm border border-slate-700 select-none tracking-tight shrink-0"
            title="Página 2: Favoritos"
          >
            2
          </span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-[#ED64A6] shrink-0">
              <Heart className="w-4 h-4 fill-[#ED64A6]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">2a</span>
                <h1 className="font-brand text-lg font-bold text-slate-900 leading-tight">Mis Terapeutas Guardados</h1>
              </div>
              <p className="text-xs text-slate-500">Tus guías y profesionales favoritos</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2b. Listado de Favoritos */}
      {favoriteTherapists.length === 0 ? (
        <div className="my-auto py-12 text-center bg-white rounded-3xl border border-pink-100 p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-pink-50 mx-auto flex items-center justify-center text-[#ED64A6]">
            <Heart className="w-8 h-8 text-pink-300" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-800">Aún no tienes favoritos</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Guarda a los terapeutas que más te inspiren pulsando el corazón ❤️ en sus perfiles para encontrarlos rápidamente.
            </p>
          </div>
          {/* 2c. Sugerencia / Explorar */}
          <div className="pt-2">
            <span className="inline-block bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs mb-2">2c</span>
            <button
              onClick={onExplore}
              className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-[#ED64A6] text-white text-xs font-bold shadow-glow-pink hover:opacity-95 transition-all block"
            >
              Explorar Terapeutas
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 px-1">
            <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">2b</span>
            <span className="text-[11px] font-bold text-[#862D59] uppercase tracking-wider">
              Terapeutas Guardados ({favoriteTherapists.length})
            </span>
          </div>

          {favoriteTherapists.map(t => (
            <div
              key={t.id}
              onClick={() => onSelectTherapist(t)}
              className="bg-white rounded-2xl p-4 border border-pink-100/80 shadow-2xs cursor-pointer hover:border-pink-300 transition-all flex items-center gap-3.5 group"
            >
              <img 
                src={t.avatar} 
                alt={t.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-pink-100 shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-brand font-bold text-base text-slate-900 group-hover:text-[#ED64A6] transition-colors truncate">
                    {t.name}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(t.id);
                    }}
                    className="text-[#ED64A6]"
                  >
                    <Heart className="w-4 h-4 fill-[#ED64A6]" />
                  </button>
                </div>

                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3.5 h-3.5 text-[#F6AD55] fill-[#F6AD55]" />
                  <span className="text-xs font-bold text-slate-700">{t.rating.toFixed(1)}</span>
                  <span className="text-[11px] text-slate-400">({t.reviewCount} reseñas)</span>
                </div>

                <p className="text-xs text-slate-500 truncate mt-1">{t.headline}</p>

                <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-[#862D59]">
                    {t.specialties[0]}
                  </span>
                  <span className="text-xs font-bold text-[#F6AD55] flex items-center gap-0.5">
                    Reservar cita <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
