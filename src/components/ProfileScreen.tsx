import React, { useState, useEffect } from 'react';
import { 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Settings,
  HeartHandshake,
  AlertCircle,
  ShieldCheck,
  UserCheck,
  Camera,
  Save,
  Check,
  Mail,
  Phone,
  HelpCircle
} from 'lucide-react';
import { Booking, UserRole, ClientProfile, Therapist } from '../types';
import { TherapistScheduleManager } from './TherapistScheduleManager';

interface ProfileScreenProps {
  bookings: Booking[];
  therapists?: Therapist[];
  currentUserRole?: UserRole;
  onSwitchRole?: (role: UserRole) => void;
  onExplore: () => void;
  onViewTherapistProfile?: () => void;
  onOpenAdminDashboard?: () => void;
}

// Preset avatars for clients to pick from easily
const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80'
];

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ 
  bookings, 
  therapists = [],
  currentUserRole = 'cliente',
  onSwitchRole,
  onExplore,
  onViewTherapistProfile,
  onOpenAdminDashboard
}) => {
  const [activeTab, setActiveTab] = useState<'perfil' | 'citas' | 'agenda' | 'terapeutas'>('perfil');

  // Client Profile state
  const [profile, setProfile] = useState<ClientProfile>(() => {
    try {
      const saved = localStorage.getItem('yoli_client_profile');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      name: 'Gabriel',
      email: 'gabdiant@gmail.com',
      age: '29',
      gender: 'Masculino',
      avatar: PRESET_AVATARS[1],
      phone: '+34 612 345 678',
      consultationNotes: 'Interesado en reducción de estrés laboral, meditación guiada y alineación energética.'
    };
  });

  const [formState, setFormState] = useState<ClientProfile>(profile);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // Ensure view starts at the very top
  useEffect(() => {
    const scrollContainer = document.getElementById('yoli-app-body');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formState);
    try {
      localStorage.setItem('yoli_client_profile', JSON.stringify(formState));
    } catch {}
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const genderOptions = ['Masculino', 'Femenino', 'No binario', 'Prefiero no decir'];

  return (
    <div className="flex flex-col min-h-full bg-[#FAF8FD] text-slate-800 pb-28 px-5 pt-5">
      
      {/* 3a. Profile Header with Page Badge [3] */}
      <div className="bg-white rounded-3xl p-5 border border-pink-100/80 shadow-2xs mb-5">
        <div className="flex items-center gap-3.5 mb-3">
          <span 
            className="inline-flex items-center justify-center font-mono font-black text-[11px] bg-slate-900 text-white px-2 py-0.5 rounded-lg shadow-sm border border-slate-700 select-none tracking-tight shrink-0"
            title="Página 3: Perfil"
          >
            3
          </span>
          <div className="flex items-center gap-1.5">
            <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">3a</span>
            <span className="text-[10px] font-bold text-[#862D59] uppercase tracking-wider">Perfil & Cuenta</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#ED64A6] to-[#F6AD55] p-0.5 shadow-md overflow-hidden">
              {profile.avatar ? (
                <img 
                  src={profile.avatar} 
                  alt={profile.name} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-slate-800 font-brand font-bold text-xl">
                  {profile.name.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setActiveTab('perfil');
                setShowAvatarPicker(prev => !prev);
              }}
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#ED64A6] text-white flex items-center justify-center shadow-xs hover:bg-[#c43f80] transition-colors"
              title="Cambiar foto de perfil"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-brand font-bold text-lg text-slate-900 leading-tight truncate">
                {profile.name}
              </h2>
              {currentUserRole === 'administrador' ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full border border-purple-200">
                  <ShieldCheck className="w-3 h-3 text-purple-600" /> Administrador
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-pink-50 text-[#ED64A6] px-2 py-0.5 rounded-full border border-pink-200">
                  Cliente
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5 truncate">
              {profile.email}
            </p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Activo
              </span>
              <span className="text-[10px] text-slate-400">
                {profile.age ? `${profile.age} años` : ''} {profile.gender ? `• ${profile.gender}` : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Acceso Exclusivo al Panel de Control Administrador */}
        {currentUserRole === 'administrador' && onOpenAdminDashboard && (
          <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-[#862D59] text-white flex items-center justify-between shadow-xs border border-purple-800/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-pink-300" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-brand text-white leading-tight">Panel de Control Administrador</h4>
                <p className="text-[10px] text-purple-200">Gestionar terapeutas y métricas de reservas</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenAdminDashboard}
              className="px-3 py-1.5 rounded-xl bg-[#ED64A6] hover:bg-[#d9488f] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 shrink-0 active:scale-95"
            >
              <span>Abrir Panel</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 3b. Segmented Tab Control: Mi Perfil / Mis Citas / Comunidad */}
        <div className="mt-4 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 mb-1.5 px-1">
            <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">3b</span>
            <span className="text-[10px] font-bold text-[#862D59] uppercase tracking-wider">Menú de Secciones</span>
          </div>
          <div className="flex items-center gap-1 p-1 bg-slate-100/80 rounded-2xl overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('perfil')}
              className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'perfil'
                  ? 'bg-white text-[#ED64A6] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Mi Perfil
            </button>
            <button
              onClick={() => setActiveTab('citas')}
              className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'citas'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Mis Citas ({bookings.length})
            </button>
            {(currentUserRole === 'terapeuta' || currentUserRole === 'administrador') && (
              <button
                onClick={() => setActiveTab('agenda')}
                className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'agenda'
                    ? 'bg-white text-[#ED64A6] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Mi Agenda
              </button>
            )}
            <button
              onClick={() => setActiveTab('terapeutas')}
              className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'terapeutas'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Comunidad
            </button>
          </div>
        </div>
      </div>

      {/* Tab: Mi Perfil (Editable Client Profile) */}
      {activeTab === 'perfil' && (
        <form onSubmit={handleSaveProfile} className="space-y-4">
          
          {/* Avatar selector modal / drawer if opened */}
          {showAvatarPicker && (
            <div className="bg-white rounded-3xl p-4 border border-pink-200 shadow-md space-y-3 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Elige tu foto de perfil</span>
                <button
                  type="button"
                  onClick={() => setShowAvatarPicker(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs"
                >
                  Cerrar
                </button>
              </div>
              
              <div className="grid grid-cols-6 gap-2">
                {PRESET_AVATARS.map((av, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setFormState(prev => ({ ...prev, avatar: av }));
                      setShowAvatarPicker(false);
                    }}
                    className={`relative rounded-full aspect-square overflow-hidden border-2 transition-all ${
                      formState.avatar === av
                        ? 'border-[#ED64A6] ring-2 ring-pink-200 scale-105'
                        : 'border-slate-200 hover:border-pink-300'
                    }`}
                  >
                    <img src={av} alt="Avatar opción" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                  O pega el enlace de tu propia foto (URL):
                </label>
                <input
                  type="url"
                  placeholder="https://ejemplo.com/mi-foto.jpg"
                  value={formState.avatar}
                  onChange={e => setFormState(prev => ({ ...prev, avatar: e.target.value }))}
                  className="w-full px-3 py-1.5 rounded-xl border border-pink-100 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#ED64A6]"
                />
              </div>
            </div>
          )}

          {/* 3c. Card: Información Básica para Compartir */}
          <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">3c</span>
                  <h3 className="text-xs font-bold text-[#862D59] uppercase tracking-wider">
                    Información Básica del Cliente
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Información visible para los terapeutas cuando reservas una consulta.
                </p>
              </div>
            </div>

            {/* Nombre */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Nombre Completo
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Tu nombre y apellido"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-pink-100 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED64A6]/20 focus:border-[#ED64A6]"
                />
              </div>
            </div>

            {/* Email & Edad (Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Mail */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Correo Electrónico (Mail)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="ejemplo@correo.com"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-pink-100 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED64A6]/20 focus:border-[#ED64A6]"
                  />
                </div>
              </div>

              {/* Edad */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Edad
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={formState.age}
                  onChange={e => setFormState(prev => ({ ...prev, age: e.target.value }))}
                  placeholder="Ej: 29"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-pink-100 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED64A6]/20 focus:border-[#ED64A6]"
                />
              </div>
            </div>

            {/* Sexo / Género */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Sexo / Género
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {genderOptions.map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setFormState(prev => ({ ...prev, gender: g }))}
                    className={`py-1.5 px-2.5 rounded-xl text-xs font-semibold transition-all text-center ${
                      formState.gender === g
                        ? 'bg-[#ED64A6] text-white shadow-2xs font-bold'
                        : 'bg-slate-50 border border-pink-100 text-slate-600 hover:border-pink-200'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Teléfono */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Teléfono de Contacto (Opcional)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={formState.phone || ''}
                  onChange={e => setFormState(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+34 600 000 000"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-pink-100 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED64A6]/20 focus:border-[#ED64A6]"
                />
              </div>
            </div>

            {/* Información adicional para compartir */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Notas de bienestar que deseo compartir con mis terapeutas
                </label>
                <span className="text-[10px] text-slate-400">Opcional</span>
              </div>
              <textarea
                rows={3}
                value={formState.consultationNotes || ''}
                onChange={e => setFormState(prev => ({ ...prev, consultationNotes: e.target.value }))}
                placeholder="Ej: Sensibilidad a aceites esenciales cítricos, busco enfocarme en relajación profunda y alineación de chakras..."
                className="w-full p-3 rounded-xl bg-slate-50 border border-pink-100 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ED64A6]/20 focus:border-[#ED64A6]"
              />
            </div>

            {/* Notification / Toast upon save */}
            {saveSuccess && (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">¡Perfil actualizado correctamente! Tus terapeutas podrán ver tus datos al agendar consultas.</span>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#ED64A6] to-[#F6AD55] text-white font-bold text-xs shadow-glow-pink hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Cambios de Perfil</span>
            </button>
          </div>

          {/* Privacy Note */}
          <div className="bg-pink-50/60 rounded-2xl p-3.5 border border-pink-100/60 flex items-start gap-2.5 text-slate-600 text-[11px]">
            <HelpCircle className="w-4 h-4 text-[#ED64A6] shrink-0 mt-0.5" />
            <p>
              Tus datos personales y de salud están protegidos bajo estándares de confidencialidad médica y terapéutica. Solo el terapeuta seleccionado tendrá acceso a las notas que decidas compartir.
            </p>
          </div>

        </form>
      )}

      {/* 3f. Tab: Mi Agenda (Configuración de Disponibilidad y Horarios) */}
      {activeTab === 'agenda' && (
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 px-1">
            <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">3f</span>
            <h3 className="text-xs font-bold text-[#862D59] uppercase tracking-wider">
              Mi Agenda & Disponibilidad
            </h3>
          </div>
          <TherapistScheduleManager
            therapists={therapists}
            onSaveSchedule={() => {}}
          />
        </div>
      )}

      {/* 3d. Tab: Citas */}
      {activeTab === 'citas' && (
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 px-1">
            <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">3d</span>
            <h3 className="text-xs font-bold text-[#862D59] uppercase tracking-wider">
              Historial y Próximas Sesiones
            </h3>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-white rounded-3xl p-6 text-center border border-pink-100/80 space-y-3">
              <div className="w-12 h-12 rounded-full bg-orange-50 text-[#F6AD55] mx-auto flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-800">No tienes citas agendadas</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Encuentra un terapeuta de Tarot, Reiki o Masajes para programar tu primera consulta.
                </p>
              </div>
              <button
                onClick={onExplore}
                className="px-4 py-2 rounded-xl bg-[#F6AD55] text-white font-bold text-xs shadow-glow-orange hover:opacity-95 transition-all"
              >
                Buscar una Sesión
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map(book => (
                <div
                  key={book.id}
                  className="bg-white rounded-2xl p-4 border border-pink-100 shadow-xs space-y-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={book.therapistAvatar} 
                        alt={book.therapistName} 
                        className="w-10 h-10 rounded-full object-cover border border-pink-100"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 leading-tight">{book.serviceTitle}</h4>
                        <p className="text-xs text-slate-500">Con {book.therapistName}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Confirmada
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#ED64A6]" />
                      <span>{book.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#ED64A6]" />
                      <span>{book.time} ({book.durationMinutes} min)</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-slate-500">
                      {book.format === 'presencial' ? (
                        <>
                          <MapPin className="w-3.5 h-3.5 text-[#ED64A6]" />
                          <span>Presencial en centro</span>
                        </>
                      ) : (
                        <>
                          <Video className="w-3.5 h-3.5 text-[#ED64A6]" />
                          <span>Online por Zoom</span>
                        </>
                      )}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Cita confirmada
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3e. Tab: Comunidad & Terapeutas */}
      {activeTab === 'terapeutas' && (
        <div className="bg-white rounded-3xl p-5 border border-pink-100 space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ED64A6] to-[#F6AD55] text-white flex items-center justify-center shadow-xs">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">3e</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#ED64A6] uppercase tracking-wider">Comunidad Yoli</span>
            <h3 className="text-base font-bold text-slate-800 mt-0.5">¿Ofreces terapias alternativas?</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Únete a la red de guías y terapeutas certificados de Yoli. Conecta con personas que buscan sanación en tu ciudad y en todo el mundo.
            </p>
          </div>

          <div className="space-y-2 text-xs text-slate-600 pt-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Sube tus videos de personalidad y genera confianza</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Gestiona reservas presenciales u online fácilmente</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Publica tus noticias, círculos y talleres</span>
            </div>
          </div>

          <button
            onClick={() => alert('¡Gracias por tu interés! Próximamente podrás verificar tu perfil y cargar tus diplomaturas directamente.')}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#ED64A6] to-[#F6AD55] text-white font-bold text-xs shadow-glow-pink hover:opacity-95 transition-all"
          >
            Postularme como Terapeuta
          </button>
        </div>
      )}

    </div>
  );
};
