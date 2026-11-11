import React, { useState } from 'react';
import { Search, MapPin, Video, Star, Heart, SlidersHorizontal, Sparkles, ChevronRight } from 'lucide-react';
import { Therapist, Category, TherapyFormat } from '../types';

interface ExplorarScreenProps {
  therapists: Therapist[];
  categories: Category[];
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  onSelectTherapist: (therapist: Therapist) => void;
}

export const ExplorarScreen: React.FC<ExplorarScreenProps> = ({
  therapists,
  categories,
  favoriteIds,
  onToggleFavorite,
  onSelectTherapist
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('todas');
  const [selectedFormat, setSelectedFormat] = useState<TherapyFormat | 'todos'>('todos');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('todos');
  const [search, setSearch] = useState('');

  const cities = ['todas', 'Madrid', 'Barcelona', 'Valencia', 'Sevilla'];

  const filtered = therapists.filter(t => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match = t.name.toLowerCase().includes(q) ||
        t.specialties.some(s => s.toLowerCase().includes(q)) ||
        t.services.some(srv => srv.title.toLowerCase().includes(q));
      if (!match) return false;
    }

    if (selectedCity !== 'todas') {
      if (!t.city?.toLowerCase().includes(selectedCity.toLowerCase())) return false;
    }

    if (selectedFormat !== 'todos') {
      if (!t.formats.includes(selectedFormat) && !t.formats.includes('ambos')) return false;
    }

    if (selectedCategoryId !== 'todos') {
      const cat = categories.find(c => c.id === selectedCategoryId);
      if (cat) {
        const catName = cat.name.toLowerCase();
        const match = t.specialties.some(s => s.toLowerCase().includes(catName)) ||
          t.services.some(srv => srv.title.toLowerCase().includes(catName));
        if (!match) return false;
      }
    }

    return true;
  });

  return (
    <div className="flex flex-col min-h-full bg-[#FAF8FD] text-slate-800 pb-28 px-5 pt-4 space-y-4">
      <div>
        <h1 className="font-brand text-2xl font-bold text-slate-900 leading-tight">Explorar Terapias</h1>
        <p className="text-xs text-slate-500">Conecta con terapeutas holísticos verificados</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por especialidad, síntoma o nombre..."
          className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-pink-100 text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#ED64A6]/30"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setSelectedCategoryId('todos')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategoryId === 'todos'
              ? 'bg-[#ED64A6] text-white shadow-2xs'
              : 'bg-white border border-pink-100 text-slate-600'
          }`}
        >
          Todas
        </button>
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCategoryId(c.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategoryId === c.id
                ? 'bg-[#ED64A6] text-white shadow-2xs'
                : 'bg-white border border-pink-100 text-slate-600'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* City & Format Filter row */}
      <div className="flex items-center gap-2 text-xs">
        {/* City */}
        <select
          value={selectedCity}
          onChange={e => setSelectedCity(e.target.value)}
          className="bg-white border border-pink-100 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none"
        >
          {cities.map(c => (
            <option key={c} value={c}>
              {c === 'todas' ? '📍 Todas las ciudades' : `📍 ${c}`}
            </option>
          ))}
        </select>

        {/* Format */}
        <select
          value={selectedFormat}
          onChange={e => setSelectedFormat(e.target.value as any)}
          className="bg-white border border-pink-100 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none"
        >
          <option value="todos">✨ Presencial u Online</option>
          <option value="presencial">📍 Solo Presencial</option>
          <option value="online">💻 Solo Online (Videollamada)</option>
        </select>
      </div>

      {/* Therapists List */}
      <div className="space-y-3 pt-1">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Mostrando {filtered.length} terapeutas
        </span>

        {filtered.map(t => (
          <div
            key={t.id}
            onClick={() => onSelectTherapist(t)}
            className="bg-white rounded-2xl p-4 border border-pink-100 shadow-2xs cursor-pointer hover:border-pink-300 transition-all flex flex-col gap-3 group"
          >
            <div className="flex items-start gap-3.5">
              <img 
                src={t.avatar} 
                alt={t.name} 
                className="w-14 h-14 rounded-full object-cover border border-pink-100 shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-brand font-bold text-sm text-slate-900 group-hover:text-[#ED64A6] transition-colors leading-tight">
                      {t.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-3.5 h-3.5 text-[#F6AD55] fill-[#F6AD55]" />
                      <span className="text-xs font-bold text-slate-800">{t.rating.toFixed(1)}</span>
                      <span className="text-[10px] text-slate-400">({t.reviewCount} reseñas)</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(t.id);
                    }}
                    className="text-slate-300 hover:text-[#ED64A6]"
                  >
                    <Heart 
                      className={`w-4 h-4 transition-colors ${
                        favoriteIds.includes(t.id) ? 'text-[#ED64A6] fill-[#ED64A6]' : ''
                      }`} 
                    />
                  </button>
                </div>

                <p className="text-xs text-slate-500 mt-1 line-clamp-1">{t.headline}</p>
              </div>
            </div>

            {/* Specialties & Format info */}
            <div className="flex flex-wrap gap-1 text-[10px]">
              {t.specialties.map(spec => (
                <span key={spec} className="px-2 py-0.5 rounded-md bg-pink-50 text-[#9B2C63] font-semibold">
                  {spec}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 flex items-center gap-1">
                {t.formats.includes('online') && <Video className="w-3.5 h-3.5 text-blue-500" />}
                {t.city ? <span>{t.city.split('/')[0]}</span> : <span>Online</span>}
              </span>

              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">
                  desde ${Math.min(...t.services.map(s => s.price))}
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-[#F6AD55] text-white font-bold text-[11px] shadow-xs">
                  Ver Perfil
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
