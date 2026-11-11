import React from 'react';
import { X, Bell, Calendar, CheckCircle2, Sparkles, CheckCheck, Trash2 } from 'lucide-react';
import { AppNotification } from '../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
  onNotificationClick: (notif: AppNotification) => void;
  onClearAll: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onNotificationClick,
  onClearAll
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'recordatorio':
        return <Calendar className="w-4 h-4 text-[#F6AD55]" />;
      case 'cita_confirmada':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'taller':
        return <Sparkles className="w-4 h-4 text-[#ED64A6]" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Drawer content card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-b-3xl sm:rounded-3xl shadow-2xl border border-pink-100 overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-top-4 duration-200">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-pink-100 flex items-center justify-between bg-gradient-to-r from-pink-50/70 via-white to-orange-50/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#ED64A6] text-white flex items-center justify-center shadow-xs">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-brand font-bold text-base text-slate-900 leading-tight">
                Notificaciones
              </h3>
              <p className="text-[11px] text-slate-500">
                {unreadCount > 0 ? `${unreadCount} ${unreadCount === 1 ? 'nueva alerta' : 'nuevas alertas'}` : 'Todo al día'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={onMarkAllAsRead}
                className="px-2.5 py-1 rounded-xl text-[11px] font-semibold text-[#ED64A6] hover:bg-pink-50 transition-colors flex items-center gap-1"
                title="Marcar todas como leídas"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Leídas</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors ml-1"
              aria-label="Cerrar notificaciones"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications list */}
        <div className="p-4 overflow-y-auto space-y-2.5 divide-y divide-slate-50 flex-1">
          {notifications.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-pink-50 text-pink-300 mx-auto flex items-center justify-center">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-700">Sin notificaciones</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Aquí verás los recordatorios de tus sesiones y avisos de nuevos talleres.
                </p>
              </div>
            </div>
          ) : (
            notifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => onNotificationClick(notif)}
                className={`pt-2.5 first:pt-0 p-3 rounded-2xl transition-all cursor-pointer flex items-start gap-3 ${
                  !notif.read
                    ? 'bg-pink-50/60 border border-pink-100 shadow-2xs hover:bg-pink-50/90'
                    : 'bg-white hover:bg-slate-50 border border-slate-100'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-white shadow-2xs border border-pink-100/60 flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(notif.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className={`text-xs leading-snug truncate ${!notif.read ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                      {notif.title}
                    </h4>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-[#ED64A6] shrink-0" />
                    )}
                  </div>

                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    {notif.message}
                  </p>

                  <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-black/5 text-[10px] text-slate-400">
                    <span>{notif.date}</span>
                    {notif.linkTab === 'citas' && (
                      <span className="text-[#ED64A6] font-semibold hover:underline">
                        Ver cita →
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {notifications.length > 0 && (
          <div className="px-5 py-3 border-t border-pink-100 bg-slate-50/80 flex items-center justify-between text-xs text-slate-500">
            <span>{notifications.length} avisos registrados</span>
            <button
              type="button"
              onClick={onClearAll}
              className="text-slate-400 hover:text-red-500 text-[11px] font-semibold flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              <span>Limpiar historial</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
