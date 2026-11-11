import React, { useState, useRef } from 'react';
import { 
  Search, 
  Bell, 
  SlidersHorizontal, 
  Heart, 
  Star, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  ArrowLeft,
  X,
  MapPin,
  Video
} from 'lucide-react';
import { Therapist, Category, Workshop, NeedFilter } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { YoliLogo } from './YoliLogo';
import { renderCategoryIcon } from './CategoryIconHelper';


interface HomeScreenProps {
  categories: Category[];
  therapists: Therapist[];
  workshops: Workshop[];
  needFilters: NeedFilter[];
  favoriteIds: string[];
  unreadNotificationsCount?: number;
  onOpenNotifications?: () => void;
  onToggleFavorite: (id: string) => void;
  onSelectTherapist: (therapist: Therapist) => void;
  onSelectWorkshop: (workshop: Workshop) => void;
  onOpenQuiz: () => void;
  onNavigateToCategoriesGallery: () => void;
  onNavigateToCategoryTherapists: (category: Category) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  categories,
  therapists,
  workshops,
  needFilters,
  favoriteIds,
  unreadNotificationsCount = 0,
  onOpenNotifications,
  onToggleFavorite,
  onSelectTherapist,
  onSelectWorkshop,
  onOpenQuiz,
  onNavigateToCategoriesGallery,
  onNavigateToCategoryTherapists
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('todas');
  const [selectedNeed, setSelectedNeed] = useState<string | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  // Workshop carousel states
  const [activeWorkshopIndex, setActiveWorkshopIndex] = useState(0);
  const workshopScrollRef = useRef<HTMLDivElement>(null);
  const categoriesScrollRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: Category) => {
    onNavigateToCategoryTherapists(category);
  };

  // Drag states for categories
  const [isCatDragging, setIsCatDragging] = useState(false);
  const [catStartX, setCatStartX] = useState(0);
  const [catScrollLeft, setCatScrollLeft] = useState(0);

  // Drag states for workshops
  const [isWsDragging, setIsWsDragging] = useState(false);
  const [wsStartX, setWsStartX] = useState(0);
  const [wsScrollLeft, setWsScrollLeft] = useState(0);

  const availableCities = ['todas', 'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Online'];

  // Sync active workshop dot on scroll - Ensures last card is NEVER stuck blurred
  const handleWorkshopScroll = () => {
    if (!workshopScrollRef.current) return;
    const el = workshopScrollRef.current;
    const { scrollLeft, clientWidth, scrollWidth } = el;
    
    // Check if scrolled near the end (within 35px) - guarantees last card is active!
    if (scrollLeft + clientWidth >= scrollWidth - 35) {
      setActiveWorkshopIndex(workshops.length - 1);
      return;
    }

    // Check if scrolled near the start (within 35px)
    if (scrollLeft <= 35) {
      setActiveWorkshopIndex(0);
      return;
    }

    // Measure real DOM center distance of each card to the container center
    const containerCenter = scrollLeft + clientWidth / 2;
    const cards = el.children;
    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      if (!card) continue;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    setActiveWorkshopIndex(closestIndex);
  };

  // Workshop navigation
  const scrollWorkshopBy = (direction: number) => {
    if (!workshopScrollRef.current) return;
    const el = workshopScrollRef.current;
    const nextIndex = Math.min(Math.max(0, activeWorkshopIndex + direction), workshops.length - 1);
    scrollToWorkshopIndex(nextIndex);
  };

  const scrollToWorkshopIndex = (index: number) => {
    if (!workshopScrollRef.current) return;
    const el = workshopScrollRef.current;
    const cards = el.children;
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      const scrollPos = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
      el.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }
    setActiveWorkshopIndex(index);
  };

  // Workshop mouse drag & wheel
  const handleWorkshopWheel = (e: React.WheelEvent) => {
    if (workshopScrollRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      workshopScrollRef.current.scrollLeft += e.deltaY * 0.8;
    }
  };

  const handleWorkshopMouseDown = (e: React.MouseEvent) => {
    if (!workshopScrollRef.current) return;
    setIsWsDragging(true);
    setWsStartX(e.pageX - workshopScrollRef.current.offsetLeft);
    setWsScrollLeft(workshopScrollRef.current.scrollLeft);
  };

  const handleWorkshopMouseMove = (e: React.MouseEvent) => {
    if (!isWsDragging || !workshopScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - workshopScrollRef.current.offsetLeft;
    const walk = (x - wsStartX) * 1.5;
    workshopScrollRef.current.scrollLeft = wsScrollLeft - walk;
  };

  const handleWorkshopMouseUp = () => {
    setIsWsDragging(false);
  };

  // Categories mouse drag & wheel
  const handleCategoriesWheel = (e: React.WheelEvent) => {
    if (categoriesScrollRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      categoriesScrollRef.current.scrollLeft += e.deltaY * 0.8;
    }
  };

  const handleCategoriesMouseDown = (e: React.MouseEvent) => {
    if (!categoriesScrollRef.current) return;
    setIsCatDragging(true);
    setCatStartX(e.pageX - categoriesScrollRef.current.offsetLeft);
    setCatScrollLeft(categoriesScrollRef.current.scrollLeft);
  };

  const handleCategoriesMouseMove = (e: React.MouseEvent) => {
    if (!isCatDragging || !categoriesScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - categoriesScrollRef.current.offsetLeft;
    const walk = (x - catStartX) * 1.5;
    categoriesScrollRef.current.scrollLeft = catScrollLeft - walk;
  };

  const handleCategoriesMouseUp = () => {
    setIsCatDragging(false);
  };

  const scrollCategoriesBy = (direction: number) => {
    if (!categoriesScrollRef.current) return;
    // Scroll by the full container width which corresponds to 5 icons
    const scrollAmount = categoriesScrollRef.current.clientWidth * direction;
    categoriesScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Count active filters
  const activeFiltersCount = 
    (selectedNeed ? 1 : 0) + 
    (selectedCity !== 'todas' ? 1 : 0);

  const isFilteringOrSearching = Boolean(searchQuery.trim() || selectedNeed || selectedCity !== 'todas');

  // Filter therapists for active search/filters
  const filteredTherapists = therapists.filter(t => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = t.name.toLowerCase().includes(q);
      const matchBio = t.bio.toLowerCase().includes(q);
      const matchSpec = t.specialties.some(s => s.toLowerCase().includes(q));
      const matchCity = t.city?.toLowerCase().includes(q);
      const matchServices = t.services.some(s => s.title.toLowerCase().includes(q));
      if (!matchName && !matchBio && !matchSpec && !matchCity && !matchServices) {
        return false;
      }
    }

    if (selectedNeed) {
      const need = needFilters.find(n => n.id === selectedNeed);
      if (need) {
        const matchAnyCategory = need.categoryIds.some(catId => {
          const cat = categories.find(c => c.id === catId);
          if (!cat) return false;
          return t.specialties.some(s => s.toLowerCase().includes(cat.name.toLowerCase())) ||
            t.services.some(s => s.title.toLowerCase().includes(cat.name.toLowerCase()));
        });
        if (!matchAnyCategory) return false;
      }
    }

    if (selectedCity !== 'todas') {
      if (selectedCity === 'Online') {
        const matchOnline = t.formats.includes('online') || t.formats.includes('ambos');
        if (!matchOnline) return false;
      } else {
        const matchCity = t.city?.toLowerCase().includes(selectedCity.toLowerCase());
        if (!matchCity) return false;
      }
    }

    return true;
  });

  // 4. Exact 3 Featured Therapists: Asa Merria, Lucía Luna, Marcos Marianta
  const featuredTherapistsList: Therapist[] = [
    therapists.find(t => t.id === 'asa-merria'),
    therapists.find(t => t.id === 'lucia-luna'),
    therapists.find(t => t.id === 'mooro-marianta'),
  ].filter((t): t is Therapist => Boolean(t));

  const displayFeatured = featuredTherapistsList.length === 3 
    ? featuredTherapistsList 
    : therapists.slice(0, 3);

  return (
    <div className="relative flex flex-col min-h-full bg-gradient-to-b from-[#FAF8FD] via-[#FAF8FD] to-[#FDEDF4] text-slate-800 pb-32">
      
      {/* ========================================================
          ABOVE-THE-FOLD SECTION:
          1. Header (Logo 'yoli' + campana)
          2. Buscador + filtros
          3. Terapias (siempre 5 iconos a la vez)
          4. Noticias y talleres (doble alto, 1 a la vez con previews difuminados)
          ======================================================== */}
      
      {/* 1. Header: Page badge [1] + Logo 'yoli' */}
      <div className="relative z-10 px-5 pt-3 pb-1 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span 
            className="inline-flex items-center justify-center font-mono font-black text-[11px] bg-slate-900 text-white px-2 py-0.5 rounded-lg shadow-sm border border-slate-700 select-none tracking-tight"
            title="Página 1: Inicio"
          >
            1
          </span>
          <YoliLogo size="md" />
        </div>
        
        <button 
          onClick={onOpenNotifications}
          className="relative w-9 h-9 rounded-full bg-white shadow-2xs border border-pink-100 flex items-center justify-center text-slate-700 hover:text-[#ED64A6] transition-colors active:scale-95"
          aria-label="Abrir notificaciones"
          title="Ver avisos y recordatorios"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 ? (
            <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-[#ED64A6] text-white text-[9.5px] font-bold flex items-center justify-center shadow-xs">
              {unreadNotificationsCount}
            </span>
          ) : (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-slate-300" />
          )}
        </button>
      </div>

      {/* 1a. Buscador y Filtros */}
      <div className="relative z-10 px-5 py-1.5 shrink-0">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">1a</span>
          <span className="text-[10px] font-bold text-[#862D59] uppercase tracking-wider">Buscador</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar"
              className="w-full pl-9 pr-8 py-2 rounded-2xl bg-white border border-pink-100/90 text-xs text-slate-800 placeholder-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#ED64A6]/30 focus:border-[#ED64A6]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter button - Solo icono de filtro */}
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all shadow-xs shrink-0 ${
              activeFiltersCount > 0
                ? 'bg-[#ED64A6] text-white shadow-glow-pink'
                : 'bg-[#F6AD55] text-white hover:bg-[#e09a43]'
            }`}
            aria-label="Abrir filtros"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* RESULTADOS DE BÚSQUEDA / FILTROS (Si el usuario busca activamente) */}
      {isFilteringOrSearching && (
        <div className="relative z-10 px-5 pt-3 pb-2 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#862D59] uppercase tracking-wider">
              Resultados ({filteredTherapists.length})
            </h2>
            <button
              onClick={() => {
                setSelectedNeed(null);
                setSelectedCity('todas');
                setSearchQuery('');
              }}
              className="text-[11px] font-semibold text-[#ED64A6] hover:underline"
            >
              Restablecer
            </button>
          </div>

          {filteredTherapists.length === 0 ? (
            <div className="py-6 text-center bg-white rounded-3xl border border-pink-100 p-5 space-y-1.5">
              <Sparkles className="w-6 h-6 text-pink-300 mx-auto" />
              <h3 className="font-bold text-xs text-slate-700">Sin resultados para esta búsqueda</h3>
              <p className="text-[11px] text-slate-500">Prueba con otra palabra clave o ubicación.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredTherapists.map(t => (
                <div
                  key={t.id}
                  onClick={() => onSelectTherapist(t)}
                  className="bg-white rounded-2xl p-3 border border-pink-100/80 shadow-2xs cursor-pointer hover:border-pink-300 transition-all flex items-center gap-3 group"
                >
                  <img 
                    src={t.avatar} 
                    alt={t.name} 
                    className="w-12 h-12 rounded-full object-cover border border-pink-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-brand font-bold text-xs text-slate-900 group-hover:text-[#ED64A6] transition-colors truncate">
                        {t.name}
                      </h4>
                      <div className="flex items-center gap-0.5 text-[11px] font-bold text-slate-700">
                        <Star className="w-3 h-3 text-[#F6AD55] fill-[#F6AD55]" />
                        <span>{t.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 truncate">{t.headline}</p>
                    <div className="flex items-center gap-1.5 mt-1 text-[9.5px] text-slate-400">
                      <span className="font-semibold text-[#862D59]">{t.specialties[0]}</span>
                      <span>•</span>
                      <span className="capitalize">{t.city ? t.city.split('/')[0] : 'Online'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 1b. TERAPIAS: SIEMPRE EXACTAMENTE 5 ICONOS MOSTRÁNDOSE */}
      <div className="relative z-10 pt-2 pb-1 shrink-0">
        <div className="px-5 mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">1b</span>
            <h2 className="text-xs font-bold text-[#862D59] uppercase tracking-wider">
              Terapias
            </h2>
          </div>
          <button
            onClick={() => onNavigateToCategoriesGallery()}
            className="flex items-center gap-1 text-[11px] font-bold text-[#ED64A6] hover:text-[#c43f80] active:scale-95 transition-all py-0.5 px-2 rounded-xl hover:bg-pink-50"
          >
            <span>Ver todas</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Carrusel con exactamente 5 iconos por ancho de pantalla */}
        <div className="relative group/catcarousel px-1">
          <div
            ref={categoriesScrollRef}
            onWheel={handleCategoriesWheel}
            onMouseDown={handleCategoriesMouseDown}
            onMouseMove={handleCategoriesMouseMove}
            onMouseUp={handleCategoriesMouseUp}
            onMouseLeave={handleCategoriesMouseUp}
            className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none py-1"
          >
            {categories.map(cat => (
              <div 
                key={cat.id} 
                className="w-1/5 min-w-[20%] max-w-[20%] flex-none shrink-0 snap-start flex justify-center px-0.5"
              >
                <CategoryIcon
                  category={cat}
                  isSelected={false}
                  onClick={() => handleCategoryClick(cat)}
                />
              </div>
            ))}
          </div>

          {/* Controles para avanzar de a 5 iconos */}
          <button
            type="button"
            onClick={() => scrollCategoriesBy(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/95 text-slate-700 shadow-md border border-pink-100 flex items-center justify-center opacity-0 group-hover/catcarousel:opacity-100 transition-opacity z-20 hover:text-[#ED64A6]"
            aria-label="Ver 5 anteriores"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => scrollCategoriesBy(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/95 text-slate-700 shadow-md border border-pink-100 flex items-center justify-center opacity-0 group-hover/catcarousel:opacity-100 transition-opacity z-20 hover:text-[#ED64A6]"
            aria-label="Ver 5 siguientes"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 1. TEST INTUITIVO: COLOCADO ENTRE CATEGORÍAS Y NOTICIAS Y TALLERES */}
      <div className="relative z-10 px-5 pt-2 pb-1.5 shrink-0">
        <div 
          onClick={() => onOpenQuiz()}
          className="p-3.5 sm:p-4 rounded-3xl bg-gradient-to-r from-pink-50 via-white to-orange-50 border border-pink-100/90 shadow-xs cursor-pointer hover:border-pink-300 transition-all flex items-center justify-between group active:scale-98"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ED64A6] to-[#F6AD55] text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#ED64A6] block">
                Test Intuitivo
              </span>
              <h3 className="font-brand font-bold text-sm text-slate-800 leading-tight">
                ¿No sabes qué terapia elegir?
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Responde 5 preguntas y te recomendamos tus opciones ideales
              </p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-[#F6AD55] text-white text-xs font-bold shadow-2xs flex items-center gap-1 shrink-0">
            <span>Iniciar</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* 1c. NOTICIAS Y TALLERES */}
      <div className="relative z-10 pt-2 pb-2 shrink-0">
        <div className="px-5 mb-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">1c</span>
            <h2 className="text-xs font-bold text-[#862D59] uppercase tracking-wider">
              Noticias y Talleres
            </h2>
          </div>
        </div>

        {/* Contenedor del Carrusel (Sin barras fijas estáticas) */}
        <div className="relative group/workshopcarousel">
          {/* Track del carrusel con snap-center y centrado */}
          <div
            ref={workshopScrollRef}
            onScroll={handleWorkshopScroll}
            onWheel={handleWorkshopWheel}
            onMouseDown={handleWorkshopMouseDown}
            onMouseMove={handleWorkshopMouseMove}
            onMouseUp={handleWorkshopMouseUp}
            onMouseLeave={handleWorkshopMouseUp}
            className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory gap-3 px-8 sm:px-10 py-1.5 cursor-grab active:cursor-grabbing select-none"
          >
            {workshops.map((ws, idx) => {
              const isCurrent = idx === activeWorkshopIndex;
              return (
                <div
                  key={ws.id}
                  onClick={() => {
                    if (!isCurrent) {
                      scrollToWorkshopIndex(idx);
                    } else {
                      onSelectWorkshop(ws);
                    }
                  }}
                  className={`w-[82%] sm:w-[84%] h-64 sm:h-70 shrink-0 snap-center rounded-3xl overflow-hidden border border-pink-100/80 relative cursor-pointer group active:scale-98 transition-all duration-300 flex flex-col justify-end ${
                    isCurrent 
                      ? 'scale-100 opacity-100 shadow-md ring-1 ring-pink-200/50' 
                      : 'scale-[0.96] opacity-75 shadow-xs'
                  }`}
                >
                  {/* Imagen de fondo */}
                  <img 
                    src={ws.image} 
                    alt={ws.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                  />

                  {/* Sombra y gradiente para legibilidad perfecta */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15 pointer-events-none" />

                  {/* BORDES DIFUMINADOS SOLO DE LA NOTICIA SIGUIENTE (se mueve con la tarjeta) */}
                  {!isCurrent && (
                    <div 
                      className="absolute inset-0 rounded-3xl pointer-events-none z-20 transition-opacity duration-300 backdrop-blur-[2px]"
                      style={{
                        boxShadow: 'inset 0 0 28px 14px rgba(250, 248, 253, 0.92)',
                        maskImage: 'radial-gradient(ellipse at center, transparent 35%, black 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 35%, black 100%)'
                      }}
                    />
                  )}

                  {/* Badges superiores */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
                    <span className="text-[10px] font-bold text-white bg-[#ED64A6]/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-pink-200" />
                      <span>Taller Destacado</span>
                    </span>
                    <span className="text-[11px] font-bold text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                      {ws.dateBadge}
                    </span>
                  </div>

                  {/* Contenido inferior */}
                  <div className="relative z-10 p-4 text-white">
                    <div className="flex items-center gap-2 mb-1.5">
                      <img 
                        src={ws.therapistAvatar} 
                        alt={ws.therapistName}
                        className="w-5 h-5 rounded-full object-cover border border-white/60"
                      />
                      <span className="text-[11px] font-medium text-pink-200 truncate">
                        Por {ws.therapistName}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-2 drop-shadow-xs">
                      {ws.title}
                    </h3>

                    {/* Fila inferior SIN precio */}
                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/20">
                      <span className="text-[11px] text-white/90 bg-white/15 backdrop-blur-xs px-2.5 py-1 rounded-lg font-medium">
                        {ws.spotsLeft} plazas disponibles
                      </span>

                      <span className="px-3 py-1 rounded-xl bg-[#ED64A6] hover:bg-[#d9488f] text-white text-xs font-bold shadow-xs flex items-center gap-1 transition-colors">
                        <span>Ver taller</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Flechas para cambiar de taller */}
          <button
            type="button"
            onClick={() => scrollWorkshopBy(-1)}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/95 text-slate-700 shadow-md border border-pink-100 flex items-center justify-center opacity-0 group-hover/workshopcarousel:opacity-100 transition-opacity z-30 hover:text-[#ED64A6]"
            aria-label="Taller anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollWorkshopBy(1)}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/95 text-slate-700 shadow-md border border-pink-100 flex items-center justify-center opacity-0 group-hover/workshopcarousel:opacity-100 transition-opacity z-30 hover:text-[#ED64A6]"
            aria-label="Siguiente taller"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots indicadores */}
          <div className="flex items-center justify-center gap-1.5 pt-2">
            {workshops.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToWorkshopIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  activeWorkshopIndex === i ? 'w-5 bg-[#ED64A6]' : 'w-1.5 bg-pink-200 hover:bg-pink-300'
                }`}
                aria-label={`Ir al taller ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 1d. DESTACADOS DE LA SEMANA */}
      <div className="relative z-10 px-5 pt-3 pb-2 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">1d</span>
            <h2 className="text-xs font-bold text-[#862D59] uppercase tracking-wider">
              Destacados de la semana
            </h2>
          </div>
        </div>

        <div className="space-y-3">
          {displayFeatured.map((t) => (
            <div 
              key={t.id}
              onClick={() => onSelectTherapist(t)}
              className="bg-white rounded-3xl p-3 border border-pink-100/80 shadow-xs cursor-pointer hover:border-pink-300 transition-all group flex items-stretch gap-3.5"
            >
              {/* Rectángulo de bordes curvos que ocupa el espacio izquierdo de la tarjeta */}
              <div className="w-24 sm:w-28 shrink-0 relative overflow-hidden rounded-2xl bg-pink-50 self-stretch min-h-[105px]">
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
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
      </div>

      {/* Modal de Filtros Avanzados (Botón 33) */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 space-y-4 border border-pink-100 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-pink-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#ED64A6]" />
                <h3 className="font-brand font-bold text-base text-slate-900">Filtros de Búsqueda</h3>
              </div>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 1. Ubicación */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                1. Ubicación
              </label>
              <div className="flex flex-wrap gap-1.5">
                {availableCities.map(city => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      selectedCity === city
                        ? 'bg-[#ED64A6] text-white shadow-2xs font-bold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {city === 'todas' ? 'Todas' : city}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Enfoque por Necesidad */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                2. Enfoque por Necesidad
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedNeed(null)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    !selectedNeed
                      ? 'bg-[#862D59] text-white shadow-2xs font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Cualquier necesidad
                </button>
                {needFilters.map(need => (
                  <button
                    key={need.id}
                    onClick={() => setSelectedNeed(need.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      selectedNeed === need.id
                        ? 'bg-[#862D59] text-white shadow-2xs font-bold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {need.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  setSelectedCity('todas');
                  setSelectedNeed(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200"
              >
                Limpiar Todo
              </button>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#ED64A6] to-[#F6AD55] text-white font-bold text-xs shadow-glow-pink"
              >
                Ver {filteredTherapists.length} Resultados
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

