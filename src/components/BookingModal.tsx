import React, { useState } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Video, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Therapist, TherapyService, TherapyFormat, Booking } from '../types';

interface BookingModalProps {
  therapist: Therapist;
  initialService?: TherapyService;
  onClose: () => void;
  onConfirmBooking: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  therapist,
  initialService,
  onClose,
  onConfirmBooking
}) => {
  const [selectedService, setSelectedService] = useState<TherapyService>(
    initialService || therapist.services[0]
  );
  const [selectedFormat, setSelectedFormat] = useState<TherapyFormat>(
    selectedService.format === 'ambos' ? 'presencial' : selectedService.format
  );
  
  // Monthly Calendar State (Defaults to current date: Nov 2026)
  const today = new Date(2026, 10, 4); // Nov 4, 2026
  const [calendarDate, setCalendarDate] = useState<Date>(new Date(2026, 10, 1));
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-06');
  const [selectedTime, setSelectedTime] = useState<string>('11:00');

  // Contact form
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [consultationReason, setConsultationReason] = useState('');
  const [step, setStep] = useState<'details' | 'confirmation'>('details');

  const availableTimeSlots = [
    '10:00', '11:30', '13:00', '16:00', '17:30', '19:00'
  ];

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
  const firstDayIndex = firstDayRaw === 0 ? 6 : firstDayRaw - 1; // convert Sunday (0) to 6
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
    setStep('confirmation');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col border border-pink-100">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-pink-100/60 flex items-center justify-between bg-gradient-to-r from-pink-50/50 to-orange-50/30">
          <div className="flex items-center gap-3">
            <img 
              src={therapist.avatar} 
              alt={therapist.name} 
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
            />
            <div>
              <p className="text-[11px] font-semibold tracking-wider uppercase text-[#ED64A6]">Reservar Sesión</p>
              <h3 className="text-base font-bold text-slate-800 leading-tight">{therapist.name}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto no-scrollbar space-y-5 flex-1">
          {step === 'details' ? (
            <form onSubmit={handleBook} className="space-y-5">
              
              {/* Terapia Seleccionada (ya elegida previamente) */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-pink-50/90 via-white to-pink-50/60 border border-pink-100 shadow-2xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#ED64A6] uppercase tracking-wider block">
                    Terapia seleccionada
                  </span>
                  <h4 className="font-brand font-bold text-sm text-slate-900 mt-0.5">
                    {selectedService.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-[#F6AD55]" /> {selectedService.durationMinutes} min
                    </span>
                    <span>•</span>
                    <span className="capitalize">{selectedService.format === 'ambos' ? 'Presencial u Online' : selectedService.format}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-lg text-[#ED64A6]">${selectedService.price}</span>
                </div>
              </div>

              {/* 1. Modalidad */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Modalidad de consulta
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={selectedService.format === 'online'}
                    onClick={() => setSelectedFormat('presencial')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
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
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
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
                  <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#ED64A6]" /> {therapist.address || therapist.city}
                  </p>
                )}
              </div>

              {/* 2. Selección de Día como un Mes Estilo Calendario */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    2. Seleccionar Día (Calendario)
                  </label>
                  <span className="text-[11px] font-semibold text-[#ED64A6]">
                    {selectedDate}
                  </span>
                </div>

                {/* Monthly Calendar Container */}
                <div className="bg-white rounded-2xl border border-pink-100 p-3 shadow-2xs">
                  {/* Calendar Month Header */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <button
                      type="button"
                      onClick={prevMonth}
                      className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <h4 className="font-bold text-xs text-slate-800">
                      {monthTitle}
                    </h4>
                    <button
                      type="button"
                      onClick={nextMonth}
                      className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Weekday Names */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-1">
                    {weekDays.map(d => (
                      <div key={d} className="py-0.5">{d}</div>
                    ))}
                  </div>

                  {/* Days Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Empty padding boxes before day 1 */}
                    {Array.from({ length: firstDayIndex }).map((_, i) => (
                      <div key={`empty-${i}`} className="h-8" />
                    ))}

                    {/* Days of month */}
                    {Array.from({ length: totalDays }).map((_, i) => {
                      const dayNumber = i + 1;
                      const dateObj = new Date(year, month, dayNumber);
                      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
                      
                      const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                      const isSelected = selectedDate === dateStr;
                      const isWeekend = dateObj.getDay() === 0; // Sundays rest
                      const isAvailable = !isPast && !isWeekend;

                      return (
                        <button
                          type="button"
                          key={dateStr}
                          disabled={!isAvailable}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`h-8 rounded-xl text-xs font-semibold flex flex-col items-center justify-center relative transition-all ${
                            isSelected
                              ? 'bg-[#ED64A6] text-white font-bold shadow-glow-pink scale-102'
                              : isAvailable
                                ? 'bg-slate-50 hover:bg-pink-100/60 text-slate-800 active:scale-95'
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

              {/* 3. Hora de la Sesión */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  3. Hora de la sesión
                </label>
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
              </div>

              {/* 4. Datos Personales */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  4. Tus Datos
                </label>
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
                    placeholder="Teléfono / WhatsApp"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#ED64A6]/30 focus:border-[#ED64A6]"
                  />
                </div>
                <div>
                  <textarea
                    rows={2}
                    value={consultationReason}
                    onChange={e => setConsultationReason(e.target.value)}
                    placeholder="¿Qué te gustaría trabajar en esta sesión? (Opcional, para preparar tu espacio)"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#ED64A6]/30 focus:border-[#ED64A6]"
                  />
                </div>
              </div>

              {/* Botón de Confirmación */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#F6AD55] to-[#ED64A6] text-white font-bold text-sm shadow-glow-orange hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <span>Confirmar Reserva (${selectedService.price})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Cancelación gratuita hasta 24h antes
                </p>
              </div>

            </form>
          ) : (
            /* Estado de Confirmación */
            <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#ED64A6] uppercase tracking-wider">¡Cita Confirmada!</span>
                <h3 className="text-xl font-bold text-slate-800 mt-1">Nos vemos pronto, {clientName.split(' ')[0]}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Hemos enviado los detalles y el enlace a <strong className="text-slate-700">{clientEmail}</strong>.
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
                  <span className="text-slate-500">Formato:</span>
                  <span className="font-semibold capitalize text-slate-800">
                    {selectedFormat === 'presencial' ? `Presencial (${therapist.city})` : 'Online por Videollamada'}
                  </span>
                </div>
              </div>

              {/* Consejos de preparación */}
              <div className="p-3 bg-pink-50/60 rounded-xl text-left border border-pink-100 text-[11px] text-slate-600 flex gap-2.5 items-start">
                <Sparkles className="w-4 h-4 text-[#ED64A6] shrink-0 mt-0.5" />
                <p>
                  <strong>Consejo para tu sesión:</strong> Viste ropa cómoda de fibras naturales, bebe un vaso de agua 15 minutos antes y ten a mano tu libreta de reflexiones.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
              >
                Cerrar y volver a Yoli
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
