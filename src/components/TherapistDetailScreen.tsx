import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Star, 
  Play, 
  MapPin, 
  Video, 
  Share2, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  MessageCircleHeart,
  Instagram,
  Youtube,
  Settings,
  X,
  Check,
  ExternalLink,
  SlidersHorizontal
} from 'lucide-react';
import { Therapist, TherapyService, VideoPersonality, SocialLinks, UserRole } from '../types';
import { YoliLogo } from './YoliLogo';

interface TherapistDetailScreenProps {
  therapist: Therapist;
  isFavorite: boolean;
  userRole?: UserRole;
  onToggleFavorite: (therapistId: string) => void;
  onBack: () => void;
  onOpenVideo: (video: VideoPersonality) => void;
  onBookService: (service?: TherapyService) => void;
}

export const TherapistDetailScreen: React.FC<TherapistDetailScreenProps> = ({
  therapist,
  isFavorite,
  userRole = 'cliente',
  onToggleFavorite,
  onBack,
  onOpenVideo,
  onBookService
}) => {
  const canManage = userRole === 'terapeuta' || userRole === 'administrador';

  // Ensure view starts at the very top
  useEffect(() => {
    const scrollContainer = document.getElementById('yoli-app-body');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }, []);

  // Redes Sociales del Terapeuta (Requisito 1)
  const [socials, setSocials] = useState<SocialLinks>(() => {
    return therapist.socialLinks || {
      enabled: true,
      instagram: 'https://instagram.com/' + therapist.name.toLowerCase().replace(/\s+/g, '_'),
      whatsapp: 'https://wa.me/34612345678',
      website: 'https://' + therapist.name.toLowerCase().replace(/\s+/g, '') + '.com'
    };
  });
  const [isEditSocialModalOpen, setIsEditSocialModalOpen] = useState(false);
  const [tempSocials, setTempSocials] = useState<SocialLinks>(socials);
  const [savedSuccessMessage, setSavedSuccessMessage] = useState(false);

  // Filtro de Reseñas / Experiencias de Pacientes (Requisito 2 y 5)
  type ReviewSort = 'recientes' | 'mayor_puntaje' | 'menor_puntaje';
  const [reviewSort, setReviewSort] = useState<ReviewSort>('recientes');
  const [isReviewSortDropdownOpen, setIsReviewSortDropdownOpen] = useState(false);

  const formatSocialUrl = (url: string | undefined, platform: string) => {
    if (!url) return '';
    const trimmed = url.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    if (platform === 'whatsapp') {
      const digits = trimmed.replace(/[^0-9]/g, '');
      return `https://wa.me/${digits}`;
    }
    if (platform === 'instagram') {
      const clean = trimmed.replace(/^@/, '');
      return `https://instagram.com/${clean}`;
    }
    if (platform === 'tiktok') {
      const clean = trimmed.replace(/^@/, '');
      return `https://tiktok.com/@${clean}`;
    }
    if (platform === 'youtube') {
      return `https://youtube.com/${trimmed}`;
    }
    return `https://${trimmed}`;
  };

  const handleSaveSocials = (e: React.FormEvent) => {
    e.preventDefault();
    setSocials(tempSocials);
    therapist.socialLinks = tempSocials;
    setIsEditSocialModalOpen(false);
    setSavedSuccessMessage(true);
    setTimeout(() => setSavedSuccessMessage(false), 3000);
  };

  // Ordenar reseñas según el filtro activo
  const sortedReviews = [...therapist.reviews].sort((a, b) => {
    if (reviewSort === 'mayor_puntaje') {
      return b.rating - a.rating;
    }
    if (reviewSort === 'menor_puntaje') {
      return a.rating - b.rating;
    }
    // 'recientes': ordenar por fecha
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (!isNaN(dateA) && !isNaN(dateB)) {
      return dateB - dateA;
    }
    return b.id.localeCompare(a.id);
  });

  return (
    <div className="flex flex-col min-h-full bg-[#FAF8FD] text-slate-800 pb-28">
      
      {/* Top Bar matching image layout */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-4 py-3 border-b border-pink-100/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center font-mono font-black text-[11px] bg-slate-900 text-white px-2 py-0.5 rounded-lg shadow-sm border border-slate-700 select-none tracking-tight shrink-0">5</span>
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-pink-50 hover:bg-pink-100 text-slate-700 flex items-center justify-center transition-colors"
            aria-label="Volver"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        <YoliLogo size="md" />

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onToggleFavorite(therapist.id)}
            className="w-9 h-9 rounded-full bg-pink-50 hover:bg-pink-100 flex items-center justify-center transition-colors"
            aria-label="Guardar en favoritos"
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${
                isFavorite ? 'text-[#ED64A6] fill-[#ED64A6]' : 'text-slate-500'
              }`} 
            />
          </button>
        </div>
      </div>

      <div className="px-5 pt-5 space-y-6">
        
        {/* 5a. Therapist Header Card: Foto rectangular grande a la izquierda + Info a la derecha (estilo 1d) */}
        <div className="bg-white rounded-3xl p-3.5 sm:p-4 border border-pink-100/90 shadow-xs relative flex items-stretch gap-3.5 sm:gap-4">
          {/* Badge 5a en la esquina superior derecha */}
          <div className="absolute top-2.5 right-3 flex items-center gap-1.5 z-10">
            <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">5a</span>
          </div>

          {/* Foto rectangular grande a la izquierda con bordes curvos */}
          <div className="w-32 sm:w-36 shrink-0 relative overflow-hidden rounded-2xl bg-pink-50 self-stretch min-h-[160px] shadow-2xs">
            <img 
              src={therapist.avatar} 
              alt={therapist.name} 
              className="w-full h-full object-cover"
            />
            {therapist.badge && (
              <span className="absolute bottom-2 left-2 bg-[#ED64A6] text-white text-[8.5px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                {therapist.badge}
              </span>
            )}
          </div>

          {/* Información a la derecha */}
          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
            <div>
              <div className="flex items-start justify-between gap-1 pr-6">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-brand leading-tight">
                  {therapist.name}
                </h1>
              </div>

              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{therapist.headline}</p>

              {/* Stars & Reviews */}
              <div className="flex items-center gap-1 mt-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-[#F6AD55] fill-[#F6AD55]" />
                ))}
                <span className="text-xs font-bold text-slate-700 ml-1">
                  {therapist.rating.toFixed(1)}
                </span>
                <span className="text-[11px] text-slate-400">({therapist.reviewCount} reseñas)</span>
              </div>

              {/* Modalidades Presencial / Virtual */}
              <div className="flex items-center gap-1.5 flex-wrap mt-2">
                {(therapist.formats.includes('presencial') || therapist.formats.includes('ambos')) && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>Presencial</span>
                  </span>
                )}
                {(therapist.formats.includes('online') || therapist.formats.includes('ambos')) && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-md">
                    <Video className="w-3 h-3 text-blue-500" />
                    <span>Virtual</span>
                  </span>
                )}
              </div>
            </div>

            {/* Redes Sociales del Terapeuta: Solo Instagram, TikTok y YouTube */}
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
              {socials.enabled !== false && (socials.instagram || socials.tiktok || socials.youtube) ? (
                <div className="flex items-center gap-2">
                  {socials.instagram && (
                    <a
                      href={formatSocialUrl(socials.instagram, 'instagram')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center shadow-xs hover:scale-110 active:scale-95 transition-transform"
                      title="Instagram del terapeuta"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {socials.tiktok && (
                    <a
                      href={formatSocialUrl(socials.tiktok, 'tiktok')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xs hover:scale-110 active:scale-95 transition-transform font-bold text-[10px]"
                      title="TikTok del terapeuta"
                      aria-label="TikTok"
                    >
                      Tk
                    </a>
                  )}
                  {socials.youtube && (
                    <a
                      href={formatSocialUrl(socials.youtube, 'youtube')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-xs hover:scale-110 active:scale-95 transition-transform"
                      title="YouTube del terapeuta"
                      aria-label="YouTube"
                    >
                      <Youtube className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ) : (
                <span className="text-[10px] text-slate-400 font-medium">
                  {therapist.city ? therapist.city.split('/')[0] : 'Online'}
                </span>
              )}

              {/* Opción para que los terapeutas configuren sus redes */}
              {canManage && (
                <button
                  type="button"
                  onClick={() => {
                    setTempSocials(socials);
                    setIsEditSocialModalOpen(true);
                  }}
                  className="text-[10px] font-semibold text-[#ED64A6] hover:text-[#b83777] flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-50 hover:bg-pink-100 transition-colors"
                >
                  <Settings className="w-3 h-3" />
                  <span>RRSS</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 5b. BIOGRAFÍA BREVE (Image 2 style) */}
        <div className="bg-white rounded-2xl p-4.5 border border-pink-100/70 shadow-xs space-y-3">
          <div className="flex items-center gap-1.5">
            <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">5b</span>
            <h2 className="text-xs font-bold text-[#862D59] tracking-wider uppercase">
              Biografía Breve
            </h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {therapist.bio}
          </p>

          {/* Specialization Tags in rounded pills as in Image 2 */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {therapist.specialties.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full bg-pink-50 border border-pink-200/80 text-[10px] font-bold text-[#9B2C63] uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* City / Location & Formats */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#ED64A6]" />
              {therapist.city || 'Atención Online'}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verificada
            </span>
          </div>
        </div>

        {/* 5c. VIDEOS DE PERSONALIDAD (Image 2 style - 3 video cards) */}
        {therapist.videos && therapist.videos.length > 0 && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">5c</span>
                <h2 className="text-xs font-bold text-[#862D59] tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#ED64A6]" />
                  Videos de Personalidad
                </h2>
              </div>
              <span className="text-[11px] text-slate-400">Conoce su energía</span>
            </div>

            <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
              {therapist.videos.map(video => (
                <div
                  key={video.id}
                  onClick={() => onOpenVideo(video)}
                  className="w-28 shrink-0 bg-white rounded-2xl overflow-hidden border border-pink-100 shadow-xs cursor-pointer group active:scale-97 transition-all"
                >
                  <div className="relative h-32 bg-slate-100 overflow-hidden">
                    <img 
                      src={video.thumbnail || therapist.avatar} 
                      alt={video.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    
                    {/* Play circle */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full bg-white/85 group-hover:bg-white text-[#ED64A6] flex items-center justify-center shadow-md transition-colors">
                        <Play className="w-4 h-4 ml-0.5 fill-[#ED64A6]" />
                      </div>
                    </div>

                    <span className="absolute bottom-1.5 right-1.5 text-[9px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded-md">
                      {video.duration}
                    </span>
                  </div>

                  <div className="p-2 text-center bg-white">
                    <span className="text-[11px] font-semibold text-slate-700 block truncate">
                      Ver video
                    </span>
                    <span className="text-[9px] text-slate-400 block truncate">
                      {video.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5d. TERAPIAS OFRECIDAS Y VALORES (Image 2 style - Sin filtros de formato) */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5">
            <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">5d</span>
            <h2 className="text-xs font-bold text-[#862D59] tracking-wider uppercase">
              Terapias Ofrecidas y Valores
            </h2>
          </div>

          <div className="space-y-3">
            {therapist.services.map(service => (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-4.5 border border-pink-100/90 shadow-2xs hover:border-pink-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-brand font-bold text-base text-slate-900 leading-snug">
                      {service.title}
                    </h3>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-lg text-[#ED64A6]">
                        ${service.price}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Bottom row: Time, Modality and Reservar button with ample room */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200/60 shrink-0">
                      <Clock className="w-3.5 h-3.5 text-[#F6AD55]" />
                      <span>{service.durationMinutes} min</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#862D59] bg-pink-50 px-2.5 py-1 rounded-xl border border-pink-100 shrink-0">
                      {service.format === 'ambos' ? 'Presencial / Online' : service.format === 'presencial' ? '📍 Presencial' : '💻 Online'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onBookService(service)}
                    className="px-5 py-2 rounded-xl bg-[#F6AD55] hover:bg-[#e09a43] text-white font-bold text-xs transition-all shadow-xs active:scale-95 shrink-0 ml-auto cursor-pointer"
                  >
                    Reservar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5e. RESEÑAS CON FILTRO DESPLEGABLE (Requisitos 4 y 5) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between relative">
            <div className="flex items-center gap-1.5">
              <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">5e</span>
              <h2 className="text-xs font-bold text-[#862D59] tracking-wider uppercase flex items-center gap-1.5">
                <MessageCircleHeart className="w-3.5 h-3.5 text-[#ED64A6]" />
                Reseñas
              </h2>
            </div>

            {/* Filtro de Reseñas: botón desplegable SOLO ICONO, sin texto */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsReviewSortDropdownOpen(!isReviewSortDropdownOpen)}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all shadow-xs border ${
                  isReviewSortDropdownOpen
                    ? 'bg-[#ED64A6] text-white border-[#ED64A6] shadow-glow-pink'
                    : 'bg-white text-slate-600 border-pink-100 hover:text-[#ED64A6] hover:border-pink-200'
                }`}
                aria-label="Filtrar reseñas"
                title="Filtrar reseñas"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>

              {/* Menú Desplegable con opciones de ordenación */}
              {isReviewSortDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setIsReviewSortDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 top-9.5 z-40 w-52 bg-white rounded-2xl p-1.5 border border-pink-100 shadow-xl space-y-0.5 animate-in fade-in zoom-in-95 duration-150">
                    <button
                      type="button"
                      onClick={() => {
                        setReviewSort('recientes');
                        setIsReviewSortDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                        reviewSort === 'recientes'
                          ? 'bg-pink-50 text-[#ED64A6] font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>Más recientes</span>
                      {reviewSort === 'recientes' && <Check className="w-3.5 h-3.5 text-[#ED64A6]" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setReviewSort('mayor_puntaje');
                        setIsReviewSortDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                        reviewSort === 'mayor_puntaje'
                          ? 'bg-pink-50 text-[#ED64A6] font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>Mayor a menor puntaje</span>
                      {reviewSort === 'mayor_puntaje' && <Check className="w-3.5 h-3.5 text-[#ED64A6]" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setReviewSort('menor_puntaje');
                        setIsReviewSortDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                        reviewSort === 'menor_puntaje'
                          ? 'bg-pink-50 text-[#ED64A6] font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>Menor a mayor puntaje</span>
                      {reviewSort === 'menor_puntaje' && <Check className="w-3.5 h-3.5 text-[#ED64A6]" />}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="space-y-2">
            {sortedReviews.map(review => (
              <div key={review.id} className="bg-white rounded-2xl p-3 border border-pink-100/70 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800">{review.author}</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-[#F6AD55] fill-[#F6AD55]" />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-pink-700/80 font-medium mt-0.5">{review.therapyTitle}</p>
                <p className="text-xs text-slate-600 mt-1 italic leading-relaxed">
                  "{review.comment}"
                </p>
                <span className="text-[10px] text-slate-400 mt-1 block font-medium">{review.date}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal para que el terapeuta configure sus Redes Sociales (Requisito 1) */}
      {isEditSocialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 space-y-4 border border-pink-100 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-pink-100">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#ED64A6]" />
                <h3 className="font-brand font-bold text-base text-slate-900">Mis Redes Sociales</h3>
              </div>
              <button
                onClick={() => setIsEditSocialModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSocials} className="space-y-3.5">
              {/* Interruptor de Visibilidad */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-pink-50/60 border border-pink-100">
                <div>
                  <span className="font-bold text-xs text-slate-800 block">Mostrar mis redes en el perfil</span>
                  <span className="text-[10px] text-slate-500">Permite a los pacientes conectar contigo fuera de la app</span>
                </div>
                <button
                  type="button"
                  onClick={() => setTempSocials(prev => ({ ...prev, enabled: prev.enabled === false }))}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                    tempSocials.enabled !== false ? 'bg-[#ED64A6]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                      tempSocials.enabled !== false ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Inputs de Redes: Solo Instagram, TikTok y YouTube */}
              <div className="space-y-2.5 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
                    <Instagram className="w-3.5 h-3.5 text-[#ee2a7b]" />
                    <span>Instagram</span>
                  </label>
                  <input
                    type="text"
                    value={tempSocials.instagram || ''}
                    onChange={e => setTempSocials(prev => ({ ...prev, instagram: e.target.value }))}
                    placeholder="ej: @lucialuna_tarot o url completa"
                    className="w-full px-3 py-2 rounded-xl border border-pink-100 bg-slate-50 focus:bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED64A6]/30"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-[8.5px]">Tk</span>
                    <span>TikTok</span>
                  </label>
                  <input
                    type="text"
                    value={tempSocials.tiktok || ''}
                    onChange={e => setTempSocials(prev => ({ ...prev, tiktok: e.target.value }))}
                    placeholder="ej: @lucia_espiritual o url completa"
                    className="w-full px-3 py-2 rounded-xl border border-pink-100 bg-slate-50 focus:bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED64A6]/30"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
                    <Youtube className="w-3.5 h-3.5 text-[#FF0000]" />
                    <span>YouTube</span>
                  </label>
                  <input
                    type="text"
                    value={tempSocials.youtube || ''}
                    onChange={e => setTempSocials(prev => ({ ...prev, youtube: e.target.value }))}
                    placeholder="ej: @canal o url completa"
                    className="w-full px-3 py-2 rounded-xl border border-pink-100 bg-slate-50 focus:bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED64A6]/30"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditSocialModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#ED64A6] to-[#F6AD55] text-white font-bold text-xs shadow-glow-pink flex items-center justify-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Guardar Cambios</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
