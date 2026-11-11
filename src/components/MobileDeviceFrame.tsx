import React, { useState } from 'react';
import { Smartphone, Maximize2, Wifi, Battery, UserCheck, Shield, Sparkles } from 'lucide-react';
import { UserRole } from '../types';
import { YoliLogo } from './YoliLogo';

interface MobileDeviceFrameProps {
  children: React.ReactNode;
  bottomBar?: React.ReactNode;
  userRole?: UserRole;
  onSwitchRole?: (role: UserRole) => void;
  onOpenAdminDashboard?: () => void;
}

export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({ 
  children, 
  bottomBar,
  userRole = 'cliente',
  onSwitchRole,
  onOpenAdminDashboard
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECE7F6] via-[#F4F0FA] to-[#FBEAF1] flex flex-col items-center justify-start sm:py-6 sm:px-4 font-sans selection:bg-[#ED64A6] selection:text-white">
      
      {/* Mobile-only Role Switcher (outside the phone container) */}
      <div className="sm:hidden flex items-center justify-between w-full px-3 py-1.5 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-2xs z-50">
        <div className="flex items-center gap-1.5">
          <YoliLogo size="sm" />
          <span className="text-[10px] font-bold text-slate-400 uppercase">Rol:</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onSwitchRole?.('cliente')}
            className={`px-2 py-1 rounded-lg text-[10.5px] font-bold transition-all ${
              userRole === 'cliente'
                ? 'bg-[#ED64A6] text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Cliente
          </button>
          <button
            type="button"
            onClick={() => onSwitchRole?.('terapeuta')}
            className={`px-2 py-1 rounded-lg text-[10.5px] font-bold transition-all ${
              userRole === 'terapeuta'
                ? 'bg-[#ED64A6] text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Terapeuta
          </button>
          <button
            type="button"
            onClick={() => onSwitchRole?.('administrador')}
            className={`px-2 py-1 rounded-lg text-[10.5px] font-bold transition-all ${
              userRole === 'administrador'
                ? 'bg-purple-700 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Admin
          </button>
        </div>
      </div>

      {/* Top Banner on Desktop */}
      <header className="hidden sm:flex items-center justify-between w-full max-w-4xl mb-3 px-4 py-2 bg-white/85 backdrop-blur-md rounded-2xl border border-pink-100 shadow-2xs">
        <div className="flex items-center gap-3">
          <YoliLogo size="sm" />
          <span className="text-xs text-slate-500 border-l border-slate-200 pl-3">
            Plataforma de Terapias Alternativas & Sanación
          </span>
        </div>

        {/* Selector de Rol fuera de la app (Requisito 5) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100/90 p-0.5 rounded-xl border border-pink-100/70 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 select-none">
              Ver Como:
            </span>
            <button
              type="button"
              onClick={() => onSwitchRole?.('cliente')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                userRole === 'cliente'
                  ? 'bg-white text-slate-900 shadow-xs border border-pink-100'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              👤 Cliente
            </button>
            <button
              type="button"
              onClick={() => onSwitchRole?.('terapeuta')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                userRole === 'terapeuta'
                  ? 'bg-[#ED64A6] text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              🌿 Terapeuta
            </button>
            <button
              type="button"
              onClick={() => onSwitchRole?.('administrador')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                userRole === 'administrador'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              🛡️ Admin
            </button>
          </div>

          {userRole === 'administrador' && (
            <button
              onClick={onOpenAdminDashboard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200 transition-colors shadow-2xs cursor-pointer active:scale-95"
              title="Abrir Panel de Control Administrador"
            >
              <Shield className="w-3.5 h-3.5 text-purple-600" />
              <span>Panel Admin</span>
            </button>
          )}

          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
          >
            {isFullScreen ? (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#ED64A6]" />
                <span>Modo Teléfono</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-slate-600" />
                <span>Expandir</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div
        className={`transition-all duration-300 w-full ${
          isFullScreen
            ? 'max-w-xl bg-white shadow-xl rounded-none sm:rounded-3xl overflow-hidden min-h-screen sm:min-h-[850px]'
            : 'max-w-md p-0 sm:p-3 bg-transparent sm:bg-black rounded-none sm:rounded-[48px] shadow-none sm:shadow-2xl border-0 sm:border-4 border-slate-800/80 ring-0 sm:ring-8 sm:ring-pink-200/40'
        }`}
      >
        <div
          id="yoli-phone-container"
          className={`relative bg-gradient-to-b from-[#FAF8FD] via-[#FAF8FD] to-[#FDEDF4] overflow-hidden flex flex-col ${
            isFullScreen 
              ? 'h-full min-h-screen sm:min-h-[850px]' 
              : 'rounded-none sm:rounded-[40px] h-screen sm:h-[844px]'
          }`}
        >
          {/* iOS Status Bar simulation - SIEMPRE POR ENCIMA DE CUALQUIER ELEMENTO (z-[70]) */}
          {!isFullScreen && (
            <div 
              id="yoli-status-bar"
              className="hidden sm:flex shrink-0 bg-[#FAF8FD]/95 backdrop-blur-xs px-6 pt-3 pb-1 items-center justify-between text-xs font-semibold text-slate-800 select-none relative z-[70] pointer-events-none"
            >
              <span>9:41</span>
              {/* Dynamic Island Notch */}
              <div className="w-24 h-5 rounded-full bg-black mx-auto -mt-1 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ml-auto mr-2.5" />
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4" />
              </div>
            </div>
          )}

          {/* App Body - Scrollable content */}
          <div id="yoli-app-body" className="flex-1 overflow-y-auto no-scrollbar relative">
            {children}
          </div>

          {/* Pinned Bottom Nav Island - Firmly anchored at the bottom of the screen */}
          {bottomBar && (
            <div className="absolute bottom-3 sm:bottom-3.5 left-0 right-0 z-40 px-3.5 pointer-events-none">
              <div className="pointer-events-auto">
                {bottomBar}
              </div>
            </div>
          )}

          {/* iOS Bottom Bar Indicator - Only on desktop mockup */}
          {!isFullScreen && (
            <div className="hidden sm:flex absolute bottom-0.5 left-0 right-0 justify-center pointer-events-none z-50">
              <div className="w-32 h-1 bg-slate-400/40 rounded-full" />
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
