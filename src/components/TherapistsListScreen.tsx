import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Heart, MapPin, Video, Sparkles, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { Therapist, Category, TherapyFormat } from '../types';
import { YoliLogo } from './YoliLogo';
import { renderCategoryIcon } from './CategoryIconHelper';

interface TherapistsListScreenProps {
  category: Category;
  therapists: Therapist[];
  favoriteIds: string[];
  onBack: () => void;
  onSelectTherapist: (therapist: Therapist) => void;
  onToggleFavorite: (id: string) => void;
}

export const TherapistsListScreen: React.FC<TherapistsListScreenProps> = ({
  category,
  therapists,
  favoriteIds,
  onBack,
  onSelectTherapist,
  onToggleFavorite
}) => {
  const [selectedFormats, setSelectedFormats] = useState<Array<'presencial' | 'online'>>(['presencial', 'online']);
  const [selectedCity, setSelectedCity] = useState<string>('todas');

  const toggleFormat = (fmt: 'presencial' | 'online') => {
    if (selectedFormats.includes(fmt)) {
      if (selectedFormats.length > 1) {
        setSelectedFormats(selectedFormats.filter(f => f !== fmt));
      }
    } else {
      setSelectedFormats([...selectedFormats, fmt]);
    }
  };

  // Ensure view starts at the very top
  useEffect(() => {
    const scrollContainer = document.getElementById('yoli-app-body');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }, []);

  const cities = ['todas', 'Madrid', 'Barcelona', 'Valencia', 'Sevilla'];

  // Filter therapists offering this category
  const categoryTherapists = therapists.filter(t => {
    const catName = category.name.toLowerCase();
    const matchesCategory = 
      t.specialties.some(s => s.toLowerCase().includes(catName)) ||
      t.services.some(s => s.title.toLowerCase().includes(catName));

    if (!matchesCategory) return false;

    const matchPresencial = selectedFormats.includes('presencial') && (t.formats.includes('presencial') || t.formats.includes('ambos'));
    const matchOnline = selectedFormats.includes('online') && (t.formats.includes('online') || t.formats.includes('ambos'));
    if (!matchPresencial && !matchOnline) return false;

    if (selectedCity !== 'todas') {
      if (!t.city?.toLowerCase().includes(selectedCity.toLowerCase())) return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-[#FAF8FD] via-[#FAF8FD] to-[#FDEDF4] text-slate-800 pb-32">
      
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-4 py-3 border-b border-pink-100/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center font-mono font-black text-[11px] bg-slate-900 text-white px-2 py-0.5 rounded-lg shadow-sm border border-slate-700 select-none tracking-tight shrink-0">4</span>
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-pink-50 hover:bg-pink-100 text-slate-700 flex items-center justify-center transition-colors active:scale-95"
            aria-label="Volver a Inicio"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        <YoliLogo size="md" />

        <div className="w-9" />
      </div>

      <div className="px-5 pt-4 space-y-4">
        
        {/* 4a. Category Header Card */}
        <div className="bg-white rounded-3xl p-4.5 border border-pink-100/80 shadow-xs relative">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">4a</span>
            <span className="text-[10px] font-bold text-[#862D59] uppercase tracking-wider">Terapia Seleccionada</span>
          </div>
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs ${category.colorBg} ${category.colorText}`}>
              {renderCategoryIcon(category.iconName, 'w-7 h-7 stroke-[2]')}
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="font-brand font-bold text-xl text-slate-900 leading-tight">
                {category.name}
              </h1>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        {/* 4b. Titulo Especialistas en mismo color y fuente entre tarjeta y filtros */}
        <div className="flex items-center gap-2">
          <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">4b</span>
          <h2 className="font-brand font-bold text-lg text-[#ED64A6] tracking-tight">
            Especialistas
          </h2>
        </div>

        {/* 4c. Filters bar */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 px-0.5">
            <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">4c</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Filtros</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
            {/* Format pills: Multi-selección Presencial y Online (ambos seleccionados = todas) */}
            <button
              type="button"
              onClick={() => toggleFormat('presencial')}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedFormats.includes('presencial')
                  ? 'bg-[#ED64A6] text-white shadow-2xs'
                  : 'bg-white border border-pink-100 text-slate-600 hover:border-pink-200'
              }`}
            >
              📍 Presencial
            </button>
            <button
              type="button"
              onClick={() => toggleFormat('online')}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedFormats.includes('online')
                  ? 'bg-[#ED64A6] text-white shadow-2xs'
                  : 'bg-white border border-pink-100 text-slate-600 hover:border-pink-200'
              }`}
            >
              💻 Online
            </button>

            {/* City selector */}
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-pink-100 bg-white text-slate-600 text-[11px] font-semibold focus:outline-none hover:border-pink-200 transition-colors shrink-0"
            >
              {cities.map(c => (
                <option key={c} value={c}>
                  {c === 'todas' ? '📍 Todas las ciudades' : `📍 ${c}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4d. Results Counter & Therapists List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
            <div className="flex items-center gap-1.5">
              <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">4d</span>
              <span>{categoryTherapists.length} {categoryTherapists.length === 1 ? 'terapeuta encontrado' : 'terapeutas encontrados'}</span>
            </div>
            {(selectedFormats.length < 2 || selectedCity !== 'todas') && (
              <button
                onClick={() => {
                  setSelectedFormats(['presencial', 'online']);
                  setSelectedCity('todas');
                }}
                className="text-[#ED64A6] hover:underline text-[11px]"
              >
                Restablecer filtros
              </button>
            )}
          </div>

        {/* Therapists List */}
        {categoryTherapists.length === 0 ? (
          <div className="py-10 text-center bg-white rounded-3xl border border-pink-100 p-6 space-y-3">
            <Sparkles className="w-10 h-10 text-pink-300 mx-auto" />
            <h3 className="font-bold text-sm text-slate-800">
              No hay terapeutas de {category.name} con estos filtros
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Prueba cambiando a modalidad online o seleccionando todas las ciudades.
            </p>
            <button
              onClick={() => {
                setSelectedFormats(['presencial', 'online']);
                setSelectedCity('todas');
              }}
              className="px-4 py-2 rounded-xl bg-pink-50 text-[#ED64A6] text-xs font-bold hover:bg-pink-100 cursor-pointer"
            >
              Ver todos los terapeutas de {category.name}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {categoryTherapists.map(t => (
              <div
                key={t.id}
                onClick={() => onSelectTherapist(t)}
                className="bg-white rounded-3xl p-3 border border-pink-100/80 shadow-xs cursor-pointer hover:border-pink-300 transition-all group flex items-stretch gap-3.5"
              >
                {/* Rectángulo de bordes curvos a la izquierda igual que en Destacados */}
                <div className="w-24 sm:w-28 shrink-0 relative overflow-hidden rounded-2xl bg-pink-50 self-stretch min-h-[105px]">
                  <img 
                    src={t.avatar} 
                    alt={t.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {t.badge && (
                    <span className="absolute top-2 left-2 bg-[#ED64A6] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-2xs">
                      {t.badge}
                    </span>
                  )}
                </div>

                {/* Contenido derecho de la tarjeta */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="font-brand font-bold text-base text-slate-900 group-hover:text-[#ED64A6] transition-colors leading-tight truncate">
                        {t.name}
                      </h3>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(t.id);
                        }}
                        className="w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center text-slate-400 hover:text-[#ED64A6] transition-colors shrink-0"
                        aria-label="Guardar en favoritos"
                      >
                        <Heart 
                          className={`w-3.5 h-3.5 transition-colors ${
                            favoriteIds.includes(t.id) 
                              ? 'text-[#ED64A6] fill-[#ED64A6]' 
                              : 'text-slate-400'
                          }`} 
                        />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-[#F6AD55] fill-[#F6AD55]" />
                      ))}
                      <span className="text-[11px] text-slate-400 ml-0.5">({t.reviewCount} reseñas)</span>
                    </div>

                    {/* Al menos 4 tags de especialidades con márgenes laterales ampliados */}
                    <div className="flex flex-wrap gap-1.5 mt-2 w-full">
                      {t.specialties.slice(0, 4).map((spec) => (
                        <span
                          key={spec}
                          className="px-2.5 sm:px-3 py-1 rounded-lg bg-pink-50/90 border border-pink-100 text-[10px] font-semibold text-[#862D59]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Fila inferior: iconos de modalidades presencial y/o virtual en lugar del precio */}
                  <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {(t.formats.includes('presencial') || t.formats.includes('ambos')) && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          <span>Presencial</span>
                        </span>
                      )}
                      {(t.formats.includes('online') || t.formats.includes('ambos')) && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-md">
                          <Video className="w-3 h-3 text-blue-500" />
                          <span>Virtual</span>
                        </span>
                      )}
                    </div>
                    <span className="text-slate-400 font-medium text-[10px] truncate max-w-[95px]">
                      {t.city ? t.city.split('/')[0] : 'Online'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>

      </div>
    </div>
  );
};
