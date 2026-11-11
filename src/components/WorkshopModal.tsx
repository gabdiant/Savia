import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Video, CheckCircle2, Users, ArrowRight } from 'lucide-react';
import { Workshop } from '../types';

interface WorkshopModalProps {
  workshop: Workshop;
  onClose: () => void;
  onBookWorkshop: (workshop: Workshop, name: string, email: string) => void;
}

export const WorkshopModal: React.FC<WorkshopModalProps> = ({
  workshop,
  onClose,
  onBookWorkshop
}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail) return;
    onBookWorkshop(workshop, userName, userEmail);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain flex items-center justify-center p-3.5 sm:p-5 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-pink-100 my-auto max-h-[90vh]">
        
        {/* Workshop Image Cover - Mayor altura vertical para lucir la imagen */}
        <div className="relative h-60 sm:h-72 bg-slate-900 overflow-hidden shrink-0">
          <img 
            src={workshop.image} 
            alt={workshop.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-20"
          >
            <X className="w-4 h-4" />
          </button>

          <span className="absolute top-3 left-3 bg-[#ED64A6] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs z-10">
            {workshop.dateBadge}
          </span>

          <div className="absolute bottom-3 left-4 right-4 text-white z-10">
            <h3 className="font-bold text-base sm:text-lg leading-snug drop-shadow-xs">{workshop.title}</h3>
            <p className="text-xs text-pink-200 mt-0.5">Facilitado por {workshop.therapistName}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 overflow-y-auto overscroll-contain space-y-4 flex-1">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Meta pills */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-pink-50/70 border border-pink-100/60 flex items-center gap-2 text-slate-700">
                  <Calendar className="w-4 h-4 text-[#ED64A6]" />
                  <span className="font-semibold">{workshop.dateBadge} • {workshop.date}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-orange-50/70 border border-orange-100/60 flex items-center gap-2 text-slate-700">
                  <Clock className="w-4 h-4 text-[#F6AD55]" />
                  <span className="font-semibold">{workshop.time}</span>
                </div>
              </div>

              {/* Format & Spots */}
              <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="flex items-center gap-1.5 font-medium">
                  {workshop.format === 'presencial' ? (
                    <>
                      <MapPin className="w-3.5 h-3.5 text-[#ED64A6]" />
                      <span>{workshop.city || 'Presencial en centro'}</span>
                    </>
                  ) : (
                    <>
                      <Video className="w-3.5 h-3.5 text-[#ED64A6]" />
                      <span>Online en Directo por Zoom</span>
                    </>
                  )}
                </span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {workshop.spotsLeft} plazas restantes
                </span>
              </div>

              {/* Description - Sección ampliada para mostrar todo el texto completo */}
              <div className="bg-pink-50/40 p-4 rounded-2xl border border-pink-100/70 space-y-2">
                <h4 className="text-xs font-bold text-[#862D59] uppercase tracking-wider">
                  Información y Programa Completo
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {workshop.description}
                </p>
                <div className="pt-2 border-t border-pink-100/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span>✨ Incluye material y acceso a grabaciones</span>
                  <span className="font-medium text-[#ED64A6]">${workshop.price} USD</span>
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-2.5 pt-1 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Inscribirme al taller (${workshop.price})
                </h4>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre"
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#ED64A6]/30"
                />
                <input
                  type="email"
                  required
                  placeholder="Tu correo electrónico"
                  value={userEmail}
                  onChange={e => setUserEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#ED64A6]/30"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#ED64A6] to-[#F6AD55] text-white font-bold text-xs shadow-glow-pink hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Reservar Plaza (${workshop.price})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-base text-slate-800">¡Plaza Reservada!</h4>
              <p className="text-xs text-slate-500">
                Te hemos enviado el acceso y los detalles a <strong>{userEmail}</strong>.
              </p>
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
