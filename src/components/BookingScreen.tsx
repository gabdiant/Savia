import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Video, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon
} from 'lucide-react';
import { Therapist, TherapyService, TherapyFormat, Booking, TherapistSchedule } from '../types';
import { createDefaultTherapistSchedule } from '../data/mockData';
import { YoliLogo } from './YoliLogo';

interface BookingScreenProps {
  therapist: Therapist;
  initialService?: TherapyService;
  onBack: () => void;
  onConfirmBooking: (booking: Booking) => void;
  onGoToBookings?: () => void;
}

export const BookingScreen: React.FC<BookingScreenProps> = ({
  therapist,
  initialService,
  onBack,
  onConfirmBooking,
  onGoToBookings
}) => {
  // Ensure view starts at the very top
  useEffect(() => {
    const scrollContainer = document.getElementById('yoli-app-body');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }, []);

  const [selectedService] = useState<TherapyService>(
    initialService || therapist.services[0]
  );
  const [selectedFormat, setSelectedFormat] = useState<TherapyFormat>(
    selectedService.format === 'ambos' ? 'presencial' : selectedService.format
  );
  
  // Therapist's custom availability schedule
  const [schedule] = useState<TherapistSchedule>(() => {
    try {
      const saved = localStorage.getItem(`yoli_schedule_${therapist.id}`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return createDefaultTherapistSchedule(therapist.id);
  });

  // Monthly Calendar State (Defaults to current date: Nov 2026)
  const today = new Date(2026, 10, 4); // Nov 4, 2026
  const [calendarDate, setCalendarDate] = useState<Date>(new Date(2026, 10, 1));
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-06');

  // Check if a date is open for booking
  const isDateBookable = (dateObj: Date, dateStr: string) => {
    const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (isPast) return false;
    if (schedule.blockedDates.includes(dateStr)) return false;

    const dayOfWeek = dateObj.getDay();
    const dayConfig = schedule.dailySchedules[dayOfWeek];
    if (!dayConfig || !dayConfig.enabled) return false;

    const slots = schedule.scheduleMode === 'uniform' ? schedule.uniformSlots : dayConfig.slots;
    return slots && slots.length > 0;
  };

  // Get available slots for the selected date
  const getSlotsForSelectedDate = (): string[] => {
    if (!selectedDate) return [];
    if (schedule.blockedDates.includes(selectedDate)) return [];

    const parts = selectedDate.split('-');
    if (parts.length !== 3) return [];
    const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    const dayOfWeek = d.getDay();
    const dayConfig = schedule.dailySchedules[dayOfWeek];
    if (!dayConfig || !dayConfig.enabled) return [];

    return schedule.scheduleMode === 'uniform' ? schedule.uniformSlots : dayConfig.slots;
  };

  const availableTimeSlots = getSlotsForSelectedDate();
  const [selectedTime, setSelectedTime] = useState<string>(() => availableTimeSlots[0] || '11:00');

  // Contact form - load saved client profile if present
  const [clientName, setClientName] = useState(() => {
    try {
      const p = localStorage.getItem('yoli_client_profile');
      if (p) return JSON.parse(p).name || 'Gabriel';
    } catch {}
    return 'Gabriel';
  });
  const [clientEmail, setClientEmail] = useState(() => {
    try {
      const p = localStorage.getItem('yoli_client_profile');
      if (p) return JSON.parse(p).email || 'gabdiant@gmail.com';
    } catch {}
    return 'gabdiant@gmail.com';
  });
  const [clientPhone, setClientPhone] = useState(() => {
    try {
      const p = localStorage.getItem('yoli_client_profile');
      if (p) return JSON.parse(p).phone || '+34 612 345 678';
    } catch {}
    return '+34 612 345 678';
  });
  const [consultationReason, setConsultationReason] = useState(() => {
    try {
      const p = localStorage.getItem('yoli_client_profile');
      if (p) return JSON.parse(p).consultationNotes || '';
    } catch {}
    return '';
  });
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Month navigation
  const prevMonth = () => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1));
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const monthTitle = `${monthNames[month]} ${year}`;

  // First day of month index (0 = Monday, 6 = Sunday)
  const firstDayRaw = new Date(year, month, 1).getDay();
  const firstDayIndex = firstDayRaw === 0 ? 6 : firstDayRaw - 1;
  const totalDays = new Date(year, month + 1, 0).getDate();

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) {
      alert('Por favor introduce tu nombre y correo electrónico.');
      return;
    }

    const newBooking: Booking = {
      id: 'book_' + Date.now(),
      therapistId: therapist.id,
      therapistName: therapist.name,
      therapistAvatar: therapist.avatar,
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      price: selectedService.price,
      durationMinutes: selectedService.durationMinutes,
      date: selectedDate,
      time: selectedTime,
      format: selectedFormat,
      clientName,
      clientEmail,
      clientPhone,
      consultationReason,
      status: 'confirmada',
      createdAt: new Date().toISOString()
    };

    onConfirmBooking(newBooking);
    setIsConfirmed(true);
  };

  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-[#FAF8FD] via-[#FAF8FD] to-[#FDEDF4] text-slate-800 pb-32">
      
      {/* Top Sticky Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-4 py-3 border-b border-pink-100/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center font-mono font-black text-[11px] bg-slate-900 text-white px-2 py-0.5 rounded-lg shadow-sm border border-slate-700 select-none tracking-tight shrink-0">7</span>
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-pink-50 hover:bg-pink-100 text-slate-700 flex items-center justify-center transition-colors active:scale-95"
            aria-label="Volver"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        <YoliLogo size="md" />

        <div className="w-9 flex justify-end">
          <span className="text-[10px] font-bold text-[#ED64A6] bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
            Reserva
          </span>
        </div>
      </div>

      {/* Screen Body */}
      <div className="px-5 pt-4 space-y-4 max-w-lg mx-auto w-full">
        {!isConfirmed ? (
          <form onSubmit={handleBook} className="space-y-4">
            
            {/* 7a. Therapist & Service Summary Card */}
            <div className="bg-white rounded-3xl p-4.5 border border-pink-100/90 shadow-2xs space-y-3 relative">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">7a</span>
                <span className="text-[10px] font-bold text-[#862D59] uppercase tracking-wider">Terapia & Terapeuta</span>
              </div>
              <div className="flex items-center gap-3.5">
                <img 
                  src={therapist.avatar} 
                  alt={therapist.name} 
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-pink-100 shadow-2xs shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#ED64A6] uppercase tracking-wider block">
                    Terapeuta Certificado
                  </span>
                  <h2 className="font-brand font-bold text-base text-slate-900 leading-tight truncate">
                    {therapist.name}
                  </h2>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {therapist.headline}
                  </p>
                </div>
              </div>

              {/* Terapia elegida banner */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-pink-50/90 via-white to-pink-50/60 border border-pink-100 flex items-center justify-between">
                <div>
                  <span className="text-[9.5px] font-bold text-[#ED64A6] uppercase tracking-wider block">
                    Terapia seleccionada
                  </span>
                  <h3 className="font-brand font-bold text-sm text-slate-900 mt-0.5">
                    {selectedService.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-[#F6AD55]" /> {selectedService.durationMinutes} min
                    </span>
                    <span>•</span>
                    <span className="capitalize">{selectedService.format === 'ambos' ? 'Presencial u Online' : selectedService.format}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-xl text-[#ED64A6]">${selectedService.price}</span>
                </div>
              </div>
            </div>

            {/* 7b. Modalidad */}
            <div className="bg-white rounded-3xl p-4 border border-pink-100/80 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-1.5">
                <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">7b</span>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Modalidad de consulta
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={selectedService.format === 'online'}
                  onClick={() => setSelectedFormat('presencial')}
                  className={`py-2.5 px-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    selectedFormat === 'presencial'
                      ? 'border-[#ED64A6] bg-[#ED64A6] text-white shadow-xs'
                      : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50'
                  } ${selectedService.format === 'online' ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>En Consulta</span>
                </button>
                <button
                  type="button"
                  disabled={selectedService.format === 'presencial'}
                  onClick={() => setSelectedFormat('online')}
                  className={`py-2.5 px-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    selectedFormat === 'online'
                      ? 'border-[#ED64A6] bg-[#ED64A6] text-white shadow-xs'
                      : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50'
                  } ${selectedService.format === 'presencial' ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Online (Zoom/Meet)</span>
                </button>
              </div>
              {selectedFormat === 'presencial' && therapist.city && (
                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5 px-1">
                  <MapPin className="w-3.5 h-3.5 text-[#ED64A6]" /> {therapist.address || therapist.city}
                </p>
              )}
            </div>

            {/* 7c. Calendario Mensual y Horarios */}
            <div className="bg-white rounded-3xl p-4 border border-pink-100/80 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">7c</span>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Fecha y Horario
                  </label>
                </div>
                <span className="text-[11px] font-bold text-[#ED64A6] bg-pink-50 px-2 py-0.5 rounded-full">
                  {selectedDate}
                </span>
              </div>

              {/* Monthly Calendar View */}
              <div className="border border-pink-100 rounded-2xl p-3 bg-[#FAF8FD]/40">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-pink-100/60">
                  <button
                    type="button"
                    onClick={prevMonth}
                    className="w-7 h-7 rounded-full bg-white hover:bg-pink-100 border border-pink-100 flex items-center justify-center text-slate-700 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <h4 className="font-bold text-xs text-slate-800">
                    {monthTitle}
                  </h4>
                  <button
                    type="button"
                    onClick={nextMonth}
                    className="w-7 h-7 rounded-full bg-white hover:bg-pink-100 border border-pink-100 flex items-center justify-center text-slate-700 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-1">
                  {weekDays.map(d => (
                    <div key={d} className="py-0.5">{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDayIndex }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-8" />
                  ))}

                  {Array.from({ length: totalDays }).map((_, i) => {
                    const dayNumber = i + 1;
                    const dateObj = new Date(year, month, dayNumber);
                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
                    
                    const isSelected = selectedDate === dateStr;
                    const isAvailable = isDateBookable(dateObj, dateStr);

                    return (
                      <button
                        type="button"
                        key={dateStr}
                        disabled={!isAvailable}
                        onClick={() => {
                          setSelectedDate(dateStr);
                          // Auto select first slot for this date if current slot not valid
                          const parts = dateStr.split('-');
                          const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
                          const dayConfig = schedule.dailySchedules[d.getDay()];
                          const slots = schedule.scheduleMode === 'uniform' ? schedule.uniformSlots : (dayConfig?.slots || []);
                          if (slots && slots.length > 0 && !slots.includes(selectedTime)) {
                            setSelectedTime(slots[0]);
                          }
                        }}
                        className={`h-8 rounded-xl text-xs font-semibold flex flex-col items-center justify-center relative transition-all ${
                          isSelected
                            ? 'bg-[#ED64A6] text-white font-bold shadow-glow-pink scale-105'
                            : isAvailable
                              ? 'bg-white hover:bg-pink-100 text-slate-800 border border-pink-50'
                              : 'text-slate-300 opacity-40 cursor-not-allowed'
                        }`}
                      >
                        <span>{dayNumber}</span>
                        {isAvailable && !isSelected && (
                          <span className="w-1 h-1 rounded-full bg-[#F6AD55] -mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. Horarios según disponibilidad y duración configurada */}
            <div className="bg-white rounded-3xl p-4 border border-pink-100/80 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  3. Hora de la sesión
                </label>
              </div>

              {availableTimeSlots.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {availableTimeSlots.map(time => (
                    <button
                      type="button"
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 rounded-xl border text-xs font-semibold transition-all ${
                        selectedTime === time
                          ? 'border-[#ED64A6] bg-[#ED64A6] text-white shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-pink-200'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 text-amber-800 text-xs text-center">
                  <p className="font-semibold">El terapeuta no tiene horarios habilitados para esta fecha.</p>
                  <p className="text-[11px] text-amber-700 mt-0.5">Por favor selecciona otro día en el calendario.</p>
                </div>
              )}
            </div>

            {/* 7d. Datos del Paciente */}
            <div className="bg-white rounded-3xl p-4 border border-pink-100/80 shadow-2xs space-y-3">
              <div className="flex items-center gap-1.5">
                <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">7d</span>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Datos de Contacto y Confirmación
                </label>
              </div>
              <div>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  placeholder="Tu nombre completo"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#ED64A6]/30 focus:border-[#ED64A6]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={e => setClientEmail(e.target.value)}
                  placeholder="Tu email"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#ED64A6]/30 focus:border-[#ED64A6]"
                />
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={e => setClientPhone(e.target.value)}
                  placeholder="WhatsApp / Móvil"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#ED64A6]/30 focus:border-[#ED64A6]"
                />
              </div>
              <div>
                <textarea
                  rows={2}
                  value={consultationReason}
                  onChange={e => setConsultationReason(e.target.value)}
                  placeholder="¿Qué te gustaría trabajar en esta sesión? (Opcional)"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#ED64A6]/30 focus:border-[#ED64A6]"
                />
              </div>
            </div>

            {/* Botón de Confirmación Directa sin pasarela de pagos */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={availableTimeSlots.length === 0}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#F6AD55] to-[#ED64A6] text-white font-bold text-sm shadow-glow-orange hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <span>Confirmar Reserva Directa</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="mt-2 text-center space-y-1">
                <p className="text-[11px] text-slate-600 font-semibold flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Sin cobro en la app: El valor (${selectedService.price}) se abona directamente con el terapeuta</span>
                </p>
                <p className="text-[10px] text-slate-400">Cancelación gratuita avisando con hasta 24h de anticipación</p>
              </div>
            </div>

          </form>
        ) : (
          /* Estado de Confirmación Exitoso en Pantalla Completa */
          <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#ED64A6] uppercase tracking-wider">¡Cita Confirmada!</span>
              <h2 className="text-xl font-bold text-slate-800 mt-1">Nos vemos pronto, {clientName.split(' ')[0]}</h2>
              <p className="text-xs text-slate-500 mt-1">
                Hemos enviado los detalles y el acceso a <strong className="text-slate-700">{clientEmail}</strong>.
              </p>
            </div>

            {/* Resumen Box */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">Terapeuta:</span>
                <span className="font-bold text-slate-800">{therapist.name}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">Sesión:</span>
                <span className="font-semibold text-slate-800">{selectedService.title}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">Fecha y Hora:</span>
                <span className="font-semibold text-[#ED64A6]">{selectedDate} a las {selectedTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Modalidad:</span>
                <span className="font-semibold capitalize text-slate-800">
                  {selectedFormat === 'presencial' ? `Presencial (${therapist.city})` : 'Online por Videollamada'}
                </span>
              </div>
            </div>

            {/* Tips card */}
            <div className="p-3.5 bg-pink-50/70 rounded-2xl text-left border border-pink-100 text-xs text-slate-600 flex gap-2.5 items-start">
              <Sparkles className="w-4 h-4 text-[#ED64A6] shrink-0 mt-0.5" />
              <p>
                <strong>Consejo para tu sesión:</strong> Viste ropa cómoda de fibras naturales, bebe un vaso de agua 15 minutos antes y ten a mano tu libreta de reflexiones.
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={onBack}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#ED64A6] to-[#F6AD55] text-white font-bold text-xs shadow-glow-pink hover:opacity-95 transition-all"
              >
                Volver a la Página del Terapeuta
              </button>
              {onGoToBookings && (
                <button
                  type="button"
                  onClick={onGoToBookings}
                  className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors"
                >
                  Ver en Mis Citas
                </button>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
