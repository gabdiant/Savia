import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Check, 
  Plus, 
  Trash2, 
  Settings2, 
  CalendarOff, 
  CheckCircle2, 
  ArrowRight,
  Sun,
  Layers,
  Sparkles
} from 'lucide-react';
import { Therapist, TherapistSchedule, DaySchedule } from '../types';
import { DEFAULT_HOURS_POOL, createDefaultTherapistSchedule } from '../data/mockData';

interface TherapistScheduleManagerProps {
  therapists: Therapist[];
  activeTherapistId?: string;
  onSaveSchedule: (schedule: TherapistSchedule) => void;
  onClose?: () => void;
}

const WEEK_DAYS = [
  { dayIndex: 1, name: 'Lunes', short: 'Lun' },
  { dayIndex: 2, name: 'Martes', short: 'Mar' },
  { dayIndex: 3, name: 'Miércoles', short: 'Mié' },
  { dayIndex: 4, name: 'Jueves', short: 'Jue' },
  { dayIndex: 5, name: 'Viernes', short: 'Vie' },
  { dayIndex: 6, name: 'Sábado', short: 'Sáb' },
  { dayIndex: 0, name: 'Domingo', short: 'Dom' },
];

export const TherapistScheduleManager: React.FC<TherapistScheduleManagerProps> = ({
  therapists,
  activeTherapistId = 'asa-merria',
  onSaveSchedule,
  onClose
}) => {
  const [selectedTherapistId, setSelectedTherapistId] = useState<string>(activeTherapistId);

  // Load existing schedule from localStorage or generate default
  const loadSchedule = (tId: string): TherapistSchedule => {
    try {
      const saved = localStorage.getItem(`yoli_schedule_${tId}`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return createDefaultTherapistSchedule(tId);
  };

  const [schedule, setSchedule] = useState<TherapistSchedule>(() => loadSchedule(activeTherapistId));
  const [savedToast, setSavedToast] = useState(false);
  const [newBlockedDate, setNewBlockedDate] = useState('');
  const [selectedDayTab, setSelectedDayTab] = useState<number>(1); // 1 = Lunes

  // Switch therapist
  const handleSelectTherapist = (tId: string) => {
    setSelectedTherapistId(tId);
    setSchedule(loadSchedule(tId));
  };

  // Toggle duration (30, 45, 60 min)
  const handleSetDuration = (duration: 30 | 45 | 60) => {
    setSchedule(prev => ({
      ...prev,
      slotDurationMinutes: duration
    }));
  };

  // Toggle mode (uniform vs daily)
  const handleSetMode = (mode: 'uniform' | 'daily') => {
    setSchedule(prev => ({
      ...prev,
      scheduleMode: mode
    }));
  };

  // Toggle day working status
  const handleToggleDay = (dayIndex: number) => {
    setSchedule(prev => {
      const currentDay = prev.dailySchedules[dayIndex] || { enabled: false, slots: [] };
      return {
        ...prev,
        dailySchedules: {
          ...prev.dailySchedules,
          [dayIndex]: {
            ...currentDay,
            enabled: !currentDay.enabled
          }
        }
      };
    });
  };

  // Toggle uniform hour slot
  const handleToggleUniformSlot = (time: string) => {
    setSchedule(prev => {
      const exists = prev.uniformSlots.includes(time);
      const newSlots = exists
        ? prev.uniformSlots.filter(t => t !== time)
        : [...prev.uniformSlots, time].sort();
      return {
        ...prev,
        uniformSlots: newSlots
      };
    });
  };

  // Toggle specific day slot
  const handleToggleDailySlot = (dayIndex: number, time: string) => {
    setSchedule(prev => {
      const currentDay = prev.dailySchedules[dayIndex] || { enabled: true, slots: [] };
      const exists = currentDay.slots.includes(time);
      const newSlots = exists
        ? currentDay.slots.filter(t => t !== time)
        : [...currentDay.slots, time].sort();
      return {
        ...prev,
        dailySchedules: {
          ...prev.dailySchedules,
          [dayIndex]: {
            ...currentDay,
            slots: newSlots
          }
        }
      };
    });
  };

  // Add blocked date
  const handleAddBlockedDate = () => {
    if (!newBlockedDate) return;
    if (schedule.blockedDates.includes(newBlockedDate)) return;
    setSchedule(prev => ({
      ...prev,
      blockedDates: [...prev.blockedDates, newBlockedDate].sort()
    }));
    setNewBlockedDate('');
  };

  // Remove blocked date
  const handleRemoveBlockedDate = (dateStr: string) => {
    setSchedule(prev => ({
      ...prev,
      blockedDates: prev.blockedDates.filter(d => d !== dateStr)
    }));
  };

  // Save changes
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(`yoli_schedule_${selectedTherapistId}`, JSON.stringify(schedule));
    } catch {}
    onSaveSchedule(schedule);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const currentTherapistObj = therapists.find(t => t.id === selectedTherapistId) || therapists[0];

  return (
    <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-start justify-between pb-4 border-b border-pink-100/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ED64A6] to-[#F6AD55] text-white flex items-center justify-center shadow-xs">
            <Settings2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-brand font-bold text-base text-slate-900 leading-tight">
              Gestión de Agenda y Horarios
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Personaliza tu disponibilidad para que tus pacientes reserven con total flexibilidad
            </p>
          </div>
        </div>
      </div>

      {/* Selector de Terapeuta (si hay más de 1 en el sistema) */}
      {therapists.length > 1 && (
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
          <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
            Configurando horario para:
          </label>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {therapists.slice(0, 5).map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => handleSelectTherapist(t.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all shrink-0 ${
                  selectedTherapistId === t.id
                    ? 'bg-[#ED64A6] text-white shadow-2xs font-bold'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-pink-200'
                }`}
              >
                <img src={t.avatar} alt={t.name} className="w-5 h-5 rounded-full object-cover" />
                <span>{t.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 1. Selector de Duración de Citas: 30, 45, 60 min */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#ED64A6]" />
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              1. Duración de cada consulta
            </h4>
          </div>
          <span className="text-[11px] font-bold text-[#ED64A6] bg-pink-50 px-2 py-0.5 rounded-full">
            {schedule.slotDurationMinutes} minutos
          </span>
        </div>
        <p className="text-xs text-slate-500">
          Elige el tiempo estándar de tus sesiones. Los turnos en el calendario se generarán en base a esta duración:
        </p>
        <div className="grid grid-cols-3 gap-2">
          {([30, 45, 60] as const).map(dur => (
            <button
              key={dur}
              type="button"
              onClick={() => handleSetDuration(dur)}
              className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                schedule.slotDurationMinutes === dur
                  ? 'bg-gradient-to-r from-[#ED64A6] to-[#F6AD55] text-white shadow-xs scale-102'
                  : 'bg-slate-50 border border-pink-100/80 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{dur} minutos</span>
              {schedule.slotDurationMinutes === dur && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Modo de Horario: Todos los días por igual VS. Por separado */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#ED64A6]" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            2. Modo de Configuración
          </h4>
        </div>
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => handleSetMode('uniform')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
              schedule.scheduleMode === 'uniform'
                ? 'bg-white text-[#ED64A6] shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Mismo horario todos los días
          </button>
          <button
            type="button"
            onClick={() => handleSetMode('daily')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
              schedule.scheduleMode === 'daily'
                ? 'bg-white text-[#ED64A6] shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Personalizar día por día
          </button>
        </div>
      </div>

      {/* 3. Selección de Días Laborables */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#ED64A6]" />
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              3. Días que trabajas en la semana
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">Toca para activar/desactivar</span>
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {WEEK_DAYS.map(day => {
            const isEnabled = schedule.dailySchedules[day.dayIndex]?.enabled ?? false;
            return (
              <button
                key={day.dayIndex}
                type="button"
                onClick={() => handleToggleDay(day.dayIndex)}
                className={`py-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all ${
                  isEnabled
                    ? 'bg-emerald-500 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                }`}
                title={isEnabled ? `${day.name} habilitado` : `${day.name} cerrado`}
              >
                <span>{day.short}</span>
                <span className="text-[9px] mt-0.5">{isEnabled ? 'Activo' : 'Off'}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Configuración de Horas según el modo elegido */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            4. Franjas Horarias Disponibles
          </h4>
          <span className="text-[10px] text-slate-400">Selecciona las horas en las que recibes consultas</span>
        </div>

        {/* Modo Uniforme: Horas que aplican a todos los días laborables */}
        {schedule.scheduleMode === 'uniform' ? (
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2.5">
            <span className="text-xs font-bold text-slate-700 block">
              Horario aplicado a todos los días activos:
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
              {DEFAULT_HOURS_POOL.map(hour => {
                const isSelected = schedule.uniformSlots.includes(hour);
                return (
                  <button
                    key={hour}
                    type="button"
                    onClick={() => handleToggleUniformSlot(hour)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                      isSelected
                        ? 'bg-[#ED64A6] text-white shadow-2xs font-bold'
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-pink-200'
                    }`}
                  >
                    <span>{hour}</span>
                    {isSelected && <Check className="w-3 h-3" />}
                  </button>
                );
              })}
            </div>
            <p className="text-[10.5px] text-slate-500">
              {schedule.uniformSlots.length} horarios seleccionados para cada día de trabajo.
            </p>
          </div>
        ) : (
          /* Modo Día por Día: Pestañas para cada día de la semana */
          <div className="space-y-3">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
              {WEEK_DAYS.map(day => {
                const isDayEnabled = schedule.dailySchedules[day.dayIndex]?.enabled;
                const isTabSelected = selectedDayTab === day.dayIndex;
                return (
                  <button
                    key={day.dayIndex}
                    type="button"
                    onClick={() => setSelectedDayTab(day.dayIndex)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                      isTabSelected
                        ? 'bg-slate-900 text-white shadow-xs'
                        : isDayEnabled
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-400 opacity-60'
                    }`}
                  >
                    <span>{day.name}</span>
                    {!isDayEnabled && <span className="text-[9px]">(Cerrado)</span>}
                  </button>
                );
              })}
            </div>

            {/* Configuración de horas para el día seleccionado */}
            {(() => {
              const currentDayObj = schedule.dailySchedules[selectedDayTab] || { enabled: false, slots: [] };
              const currentDayMeta = WEEK_DAYS.find(w => w.dayIndex === selectedDayTab);
              
              if (!currentDayObj.enabled) {
                return (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-800 text-xs text-center space-y-2">
                    <p className="font-bold">El {currentDayMeta?.name} está configurado como día no laborable.</p>
                    <button
                      type="button"
                      onClick={() => handleToggleDay(selectedDayTab)}
                      className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                    >
                      Habilitar {currentDayMeta?.name}
                    </button>
                  </div>
                );
              }

              return (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      Horas de atención para el {currentDayMeta?.name}:
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {currentDayObj.slots.length} turnos activos
                    </span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                    {DEFAULT_HOURS_POOL.map(hour => {
                      const isSelected = currentDayObj.slots.includes(hour);
                      return (
                        <button
                          key={hour}
                          type="button"
                          onClick={() => handleToggleDailySlot(selectedDayTab, hour)}
                          className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                            isSelected
                              ? 'bg-[#ED64A6] text-white shadow-2xs font-bold'
                              : 'bg-white border border-slate-200 text-slate-600 hover:border-pink-200'
                          }`}
                        >
                          <span>{hour}</span>
                          {isSelected && <Check className="w-3 h-3" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* 5. Bloqueo de Fechas Específicas (Vacaciones / Festivos) */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <CalendarOff className="w-4 h-4 text-[#ED64A6]" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            5. Días bloqueados o vacaciones
          </h4>
        </div>
        <p className="text-xs text-slate-500">
          Añade fechas específicas en las que no estarás disponible (aparecerán deshabilitadas en el calendario de reserva):
        </p>

        <div className="flex items-center gap-2">
          <input
            type="date"
            value={newBlockedDate}
            onChange={e => setNewBlockedDate(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#ED64A6]/20"
          />
          <button
            type="button"
            onClick={handleAddBlockedDate}
            disabled={!newBlockedDate}
            className="px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors disabled:opacity-40 flex items-center gap-1 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Bloquear Fecha</span>
          </button>
        </div>

        {/* Lista de fechas bloqueadas */}
        {schedule.blockedDates.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {schedule.blockedDates.map(dateStr => (
              <span
                key={dateStr}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-semibold"
              >
                <span>🚫 {dateStr}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveBlockedDate(dateStr)}
                  className="w-4 h-4 rounded-full hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors"
                  title="Eliminar bloqueo"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-[11px] text-slate-400 italic">No tienes fechas bloqueadas actualmente.</p>
        )}
      </div>

      {/* Mensaje de confirmación toast */}
      {savedToast && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>¡Disponibilidad y agenda actualizadas con éxito! Los pacientes verán tus nuevos turnos al reservar.</span>
        </div>
      )}

      {/* Botón de Guardado Principal */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleSave}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#ED64A6] to-[#F6AD55] text-white font-bold text-sm shadow-glow-pink hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>Guardar Configuración de Horarios</span>
        </button>
      </div>

    </div>
  );
};
