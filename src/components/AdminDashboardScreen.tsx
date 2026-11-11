import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  FileText, 
  Award, 
  MapPin, 
  Video, 
  Sparkles, 
  Filter, 
  UserPlus, 
  Search,
  Check,
  X,
  Eye,
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Booking, TherapistApplication, TherapyFormat } from '../types';
import { INITIAL_APPLICATIONS } from '../data/mockData';
import { YoliLogo } from './YoliLogo';

interface AdminDashboardScreenProps {
  bookings: Booking[];
  onBack: () => void;
  onExplore?: () => void;
}

export const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({
  bookings,
  onBack,
  onExplore
}) => {
  const [activeTab, setActiveTab] = useState<'metricas' | 'solicitudes'>('metricas');
  const [statusFilter, setStatusFilter] = useState<'todas' | 'pendiente' | 'aprobado' | 'rechazado'>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<TherapistApplication | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Applications loaded from localStorage or mockData
  const [applications, setApplications] = useState<TherapistApplication[]>(() => {
    try {
      const saved = localStorage.getItem('yoli_therapist_applications');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_APPLICATIONS;
  });

  // Save applications to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('yoli_therapist_applications', JSON.stringify(applications));
    } catch {}
  }, [applications]);

  // Ensure view starts at the very top
  useEffect(() => {
    const scrollContainer = document.getElementById('yoli-app-body');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleApprove = (appId: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === appId 
          ? { 
              ...app, 
              status: 'aprobado', 
              reviewNotes: 'Aprobado por el Administrador Gabriel el ' + new Date().toLocaleDateString('es-ES') 
            } 
          : app
      )
    );
    showToast('✓ Solicitud aprobada. El terapeuta ahora está habilitado en Yoli.');
    if (selectedApplication?.id === appId) {
      setSelectedApplication(prev => prev ? { ...prev, status: 'aprobado' } : null);
    }
  };

  const handleReject = (appId: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === appId 
          ? { 
              ...app, 
              status: 'rechazado', 
              reviewNotes: 'Solicitud observada: Documentación pendiente de homologación.' 
            } 
          : app
      )
    );
    showToast('Solicitud rechazada / observada.');
    if (selectedApplication?.id === appId) {
      setSelectedApplication(prev => prev ? { ...prev, status: 'rechazado' } : null);
    }
  };

  const handleSimulateNewApplication = () => {
    const newApp: TherapistApplication = {
      id: 'app_' + Date.now(),
      name: 'Sofía Almendra',
      email: 'sofia.aromaterapia@gmail.com',
      phone: '+34 689 456 123',
      city: 'Madrid',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      headline: 'Aromaterapeuta Clínica & Alquimia Floral',
      specialties: ['Aromaterapia', 'Meditación', 'Masaje'],
      formats: ['ambos'],
      experienceYears: 4,
      certifications: [
        'Diplomado en Aromaterapia Holística y Aceites Botánicos',
        'Certificación en Mindfulness Basado en Reducción del Estrés (MBSR)'
      ],
      bio: 'Combino la botánica terapéutica con respiración consciente para modular el sistema límbico y reducir estados de ansiedad aguda.',
      status: 'pendiente',
      appliedDate: new Date().toISOString().split('T')[0]
    };

    setApplications(prev => [newApp, ...prev]);
    setActiveTab('solicitudes');
    setStatusFilter('pendiente');
    showToast('Nueva postulación de terapeuta recibida para revisión.');
  };

  // Filtered applications
  const filteredApps = applications.filter(app => {
    if (statusFilter !== 'todas' && app.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = app.name.toLowerCase().includes(q);
      const matchEmail = app.email.toLowerCase().includes(q);
      const matchSpec = app.specialties.some(s => s.toLowerCase().includes(q));
      if (!matchName && !matchEmail && !matchSpec) return false;
    }
    return true;
  });

  const pendingCount = applications.filter(a => a.status === 'pendiente').length;
  const approvedCount = applications.filter(a => a.status === 'aprobado').length;
  const rejectedCount = applications.filter(a => a.status === 'rechazado').length;

  // Global booking metrics calculation
  const totalUserBookings = bookings.length;
  const historicalBookingsCount = 138;
  const grandTotalBookings = totalUserBookings + historicalBookingsCount;

  // Revenue calculation ($50 average + user bookings)
  const currentBookingsRevenue = bookings.reduce((acc, b) => acc + (b.price || 50), 0);
  const totalPlatformGMV = 11450 + currentBookingsRevenue;

  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-[#FAF8FD] via-[#FAF8FD] to-[#FDEDF4] text-slate-800 pb-32">
      
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 border-b border-pink-100 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center font-mono font-black text-[11px] bg-slate-900 text-white px-2 py-0.5 rounded-lg shadow-sm border border-slate-700 select-none tracking-tight shrink-0">8</span>
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-pink-50 hover:bg-pink-100 text-slate-700 flex items-center justify-center transition-colors active:scale-95"
            aria-label="Volver"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <YoliLogo size="sm" />
              <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full border border-purple-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-purple-600" /> SuperAdmin
              </span>
            </div>
            <h1 className="text-xs font-bold text-slate-800 leading-tight">Panel de Control Exclusivo</h1>
          </div>
        </div>

        <button
          onClick={handleSimulateNewApplication}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-[#ED64A6] to-[#F6AD55] text-white text-[11px] font-bold shadow-2xs hover:opacity-95 transition-all"
          title="Simular una nueva postulación de terapeuta para revisar"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Nueva Postulación</span>
        </button>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 left-4 right-4 z-50 max-w-sm mx-auto p-3 bg-slate-900/95 text-white rounded-2xl shadow-xl flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="flex-1 font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="px-5 pt-4 space-y-4">
        
        {/* 8a. Administrator Welcome Banner */}
        <div className="bg-gradient-to-br from-purple-900 via-slate-900 to-[#862D59] text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 w-36 h-36 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="bg-white/20 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs border border-white/20">8a</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-pink-300">
                  Acceso Administrativo Concedido
                </span>
              </div>
              <h2 className="text-xl font-bold font-brand tracking-tight mt-0.5">
                Bienvenido, Gabriel
              </h2>
              <p className="text-xs text-purple-200/90 mt-1 max-w-xs leading-relaxed">
                Gestión centralizada de postulaciones de terapeutas y analítica global de reservas en Yoli.
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-pink-300" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-center text-xs">
            <div className="p-2 rounded-xl bg-white/5">
              <span className="block text-lg font-bold text-white">{grandTotalBookings}</span>
              <span className="text-[10px] text-purple-200">Reservas Totales</span>
            </div>
            <div className="p-2 rounded-xl bg-white/5">
              <span className="block text-lg font-bold text-amber-300">${totalPlatformGMV.toLocaleString()}</span>
              <span className="text-[10px] text-purple-200">GMV Facturado</span>
            </div>
            <div className="p-2 rounded-xl bg-white/5">
              <span className="block text-lg font-bold text-pink-300">{pendingCount}</span>
              <span className="text-[10px] text-purple-200">Terapeutas x Revisar</span>
            </div>
          </div>
        </div>

        {/* 8b. Tab Switcher */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 px-1">
            <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">8b</span>
            <span className="text-[10px] font-bold text-[#862D59] uppercase tracking-wider">Selector de Vistas</span>
          </div>
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-pink-100 shadow-2xs">
          <button
            onClick={() => setActiveTab('metricas')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'metricas'
                ? 'bg-gradient-to-r from-[#ED64A6] to-[#F6AD55] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Métricas de Reservas</span>
          </button>
          <button
            onClick={() => setActiveTab('solicitudes')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 relative ${
              activeTab === 'solicitudes'
                ? 'bg-gradient-to-r from-[#ED64A6] to-[#F6AD55] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Registro de Terapeutas</span>
            {pendingCount > 0 && (
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                activeTab === 'solicitudes' ? 'bg-white text-[#ED64A6]' : 'bg-[#ED64A6] text-white'
              }`}>
                {pendingCount}
              </span>
            )}
          </button>
        </div>
        </div>

        {/* ==============================================================
            8c. TAB 1: MÉTRICAS DE RESERVAS TOTALES
            ============================================================== */}
        {activeTab === 'metricas' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 px-1">
              <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">8c</span>
              <span className="text-[10px] font-bold text-[#862D59] uppercase tracking-wider">Métricas de Rendimiento y Reservas</span>
            </div>
            
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-3xl p-4 border border-pink-100 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-pink-50 text-[#ED64A6] flex items-center justify-center mb-2">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-slate-400 block">Reservas Registradas</span>
                <span className="text-2xl font-brand font-bold text-slate-900 mt-0.5 block">{grandTotalBookings}</span>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
                  <TrendingUp className="w-3 h-3" /> +14.8% este mes
                </span>
              </div>

              <div className="bg-white rounded-3xl p-4 border border-pink-100 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#F6AD55] flex items-center justify-center mb-2">
                  <DollarSign className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-slate-400 block">Ingresos Generados</span>
                <span className="text-2xl font-brand font-bold text-slate-900 mt-0.5 block">${totalPlatformGMV.toLocaleString()}</span>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
                  <CheckCircle2 className="w-3 h-3" /> 98.2% liquidadas
                </span>
              </div>
            </div>

            {/* Demanda por Terapia */}
            <div className="bg-white rounded-3xl p-4.5 border border-pink-100 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#862D59] uppercase tracking-wider">
                  Demanda por Tipo de Terapia
                </h3>
                <span className="text-[10px] text-slate-400">Total histórico</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-800">Tarot Evolutivo & Arquetipos</span>
                    <span className="text-[#ED64A6] font-bold">38% (53 citas)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-[#ED64A6] rounded-full" style={{ width: '38%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-800">Reiki Usui & Alineación</span>
                    <span className="text-[#c43f80] font-bold">28% (39 citas)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-[#FBB6CE]" style={{ width: '28%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-800">Masaje Holístico & Terapéutico</span>
                    <span className="text-[#F6AD55] font-bold">19% (26 citas)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-[#F6AD55]" style={{ width: '19%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-800">Carta Astral & Tránsitos</span>
                    <span className="text-purple-600 font-bold">11% (15 citas)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-purple-400" style={{ width: '11%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-800">Aromaterapia & Otras</span>
                    <span className="text-slate-600 font-bold">4% (6 citas)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-slate-300" style={{ width: '4%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Modalidad de Consulta */}
            <div className="bg-white rounded-3xl p-4.5 border border-pink-100 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-[#862D59] uppercase tracking-wider">
                Modalidad Preferida por Clientes
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 text-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-blue-600 font-bold">
                    <Video className="w-4 h-4" />
                    <span>Online / Video</span>
                  </div>
                  <span className="text-xl font-bold font-brand text-slate-900 block">64%</span>
                  <span className="text-[10px] text-slate-500">Sesiones virtuales desde cualquier país</span>
                </div>

                <div className="p-3 rounded-2xl bg-pink-50/70 border border-pink-100 text-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#ED64A6] font-bold">
                    <MapPin className="w-4 h-4" />
                    <span>Presencial</span>
                  </div>
                  <span className="text-xl font-bold font-brand text-slate-900 block">36%</span>
                  <span className="text-[10px] text-slate-500">Centros de bienestar en Madrid y Barcelona</span>
                </div>
              </div>
            </div>

            {/* Listado de Últimas Reservas en la Plataforma */}
            <div className="bg-white rounded-3xl p-4.5 border border-pink-100 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#862D59] uppercase tracking-wider">
                  Últimas Citas Agendadas ({bookings.length})
                </h3>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  En tiempo real
                </span>
              </div>

              <div className="space-y-2.5">
                {bookings.map(book => (
                  <div key={book.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img 
                        src={book.therapistAvatar} 
                        alt={book.therapistName} 
                        className="w-10 h-10 rounded-full object-cover border border-pink-200"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 leading-tight">{book.serviceTitle}</h4>
                        <p className="text-[11px] text-slate-500">
                          Cliente: <span className="font-semibold text-slate-700">{book.clientName}</span> ({book.clientEmail})
                        </p>
                        <p className="text-[10px] text-[#862D59] font-medium">Con {book.therapistName} • {book.date} a las {book.time}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-slate-900 block">${book.price}</span>
                      <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full uppercase">
                        {book.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ==============================================================
            8d. TAB 2: GESTIÓN DE REGISTROS DE NUEVOS TERAPEUTAS
            ============================================================== */}
        {activeTab === 'solicitudes' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 px-1">
              <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">8d</span>
              <span className="text-[10px] font-bold text-[#862D59] uppercase tracking-wider">Gestión de Postulaciones</span>
            </div>
            
            {/* Search and Filters */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Buscar postulante por nombre o especialidad..."
                  className="w-full pl-9 pr-3 py-2 rounded-2xl bg-white border border-pink-100 text-xs text-slate-800 placeholder-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#ED64A6]/20"
                />
              </div>

              {/* Status Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
                <button
                  onClick={() => setStatusFilter('todas')}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                    statusFilter === 'todas'
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white border border-pink-100 text-slate-600 hover:border-pink-200'
                  }`}
                >
                  Todas ({applications.length})
                </button>
                <button
                  onClick={() => setStatusFilter('pendiente')}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 ${
                    statusFilter === 'pendiente'
                      ? 'bg-[#F6AD55] text-white shadow-2xs'
                      : 'bg-white border border-orange-200 text-orange-700 hover:border-orange-300'
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  <span>Pendientes ({pendingCount})</span>
                </button>
                <button
                  onClick={() => setStatusFilter('aprobado')}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 ${
                    statusFilter === 'aprobado'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-white border border-emerald-200 text-emerald-700 hover:border-emerald-300'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Aprobados ({approvedCount})</span>
                </button>
                <button
                  onClick={() => setStatusFilter('rechazado')}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 ${
                    statusFilter === 'rechazado'
                      ? 'bg-rose-600 text-white shadow-2xs'
                      : 'bg-white border border-rose-200 text-rose-700 hover:border-rose-300'
                  }`}
                >
                  <XCircle className="w-3 h-3" />
                  <span>Rechazados ({rejectedCount})</span>
                </button>
              </div>
            </div>

            {/* List of Applications */}
            {filteredApps.length === 0 ? (
              <div className="bg-white rounded-3xl p-6 text-center border border-pink-100 space-y-2">
                <Users className="w-8 h-8 text-pink-300 mx-auto" />
                <h4 className="font-bold text-xs text-slate-800">No hay postulaciones con este filtro</h4>
                <p className="text-[11px] text-slate-500">Prueba cambiando el estado o el término de búsqueda.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredApps.map(app => (
                  <div
                    key={app.id}
                    className="bg-white rounded-3xl p-4 border border-pink-100/80 shadow-xs space-y-3 hover:border-pink-300 transition-all"
                  >
                    {/* Header Row */}
                    <div className="flex items-start gap-3.5">
                      <img 
                        src={app.avatar} 
                        alt={app.name} 
                        className="w-14 h-14 rounded-2xl object-cover border border-pink-200 shadow-2xs shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <h3 className="font-brand font-bold text-sm text-slate-900 leading-tight">
                              {app.name}
                            </h3>
                            <p className="text-[11px] text-slate-500">{app.headline}</p>
                          </div>
                          
                          {/* Status Badge */}
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1 ${
                            app.status === 'pendiente' 
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : app.status === 'aprobado'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-rose-100 text-rose-800 border border-rose-200'
                          }`}>
                            {app.status === 'pendiente' && <Clock className="w-3 h-3 text-amber-600" />}
                            {app.status === 'aprobado' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                            {app.status === 'rechazado' && <XCircle className="w-3 h-3 text-rose-600" />}
                            <span>{app.status}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-[10.5px] text-slate-500">
                          <span>📍 {app.city}</span>
                          <span>•</span>
                          <span>{app.experienceYears} años exp.</span>
                          <span>•</span>
                          <span className="text-slate-400">Postuló: {app.appliedDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Specialties Tags */}
                    <div className="flex flex-wrap gap-1">
                      {app.specialties.map(spec => (
                        <span key={spec} className="px-2 py-0.5 rounded-md bg-pink-50 border border-pink-100 text-[10px] font-semibold text-[#862D59]">
                          {spec}
                        </span>
                      ))}
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-medium text-slate-600">
                        {app.formats.includes('ambos') ? 'Online & Presencial' : app.formats[0]}
                      </span>
                    </div>

                    {/* Certifications preview */}
                    <div className="p-2.5 rounded-2xl bg-slate-50/80 border border-slate-100 text-xs text-slate-600 space-y-1">
                      <span className="text-[10px] font-bold text-[#862D59] uppercase tracking-wider flex items-center gap-1">
                        <Award className="w-3 h-3 text-[#ED64A6]" />
                        <span>Diplomas y Certificaciones Presentadas</span>
                      </span>
                      <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-700">
                        {app.certifications.map((cert, i) => (
                          <li key={i} className="line-clamp-1">{cert}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Review Notes if available */}
                    {app.reviewNotes && (
                      <p className="text-[11px] text-slate-500 italic bg-amber-50/50 p-2 rounded-xl border border-amber-100">
                        {app.reviewNotes}
                      </p>
                    )}

                    {/* Action Bar */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedApplication(app)}
                        className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 py-1"
                      >
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        <span>Ver Expediente Completo</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        {app.status !== 'rechazado' && (
                          <button
                            type="button"
                            onClick={() => handleReject(app.id)}
                            className="px-2.5 py-1.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center gap-1"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Rechazar</span>
                          </button>
                        )}

                        {app.status !== 'aprobado' && (
                          <button
                            type="button"
                            onClick={() => handleApprove(app.id)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Aprobar Terapeuta</span>
                          </button>
                        )}

                        {app.status === 'aprobado' && (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Habilitado en la app
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>

      {/* Modal: Expediente Completo del Terapeuta */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl border border-pink-100 p-5 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedApplication.avatar} 
                  alt={selectedApplication.name} 
                  className="w-12 h-12 rounded-2xl object-cover border border-pink-200 shadow-2xs"
                />
                <div>
                  <h3 className="font-brand font-bold text-base text-slate-900 leading-tight">
                    {selectedApplication.name}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedApplication.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedApplication(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-[#862D59] uppercase tracking-wider block">Contacto y Ubicación</span>
                <p><strong>Teléfono:</strong> {selectedApplication.phone}</p>
                <p><strong>Ciudad:</strong> {selectedApplication.city}</p>
                <p><strong>Modalidad:</strong> {selectedApplication.formats.join(', ')}</p>
                <p><strong>Experiencia:</strong> {selectedApplication.experienceYears} años ejerciendo</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#862D59] uppercase tracking-wider block mb-1">Propuesta & Biografía</span>
                <p className="text-xs text-slate-600 leading-relaxed bg-pink-50/50 p-3 rounded-2xl border border-pink-100">
                  {selectedApplication.bio}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-[#862D59] uppercase tracking-wider block">Diplomaturas Verificadas</span>
                {selectedApplication.certifications.map((c, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-purple-50 border border-purple-100 text-purple-900 text-xs flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              {selectedApplication.status !== 'rechazado' && (
                <button
                  type="button"
                  onClick={() => handleReject(selectedApplication.id)}
                  className="px-3 py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors"
                >
                  Rechazar
                </button>
              )}
              {selectedApplication.status !== 'aprobado' && (
                <button
                  type="button"
                  onClick={() => handleApprove(selectedApplication.id)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  Aprobar Terapeuta
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
