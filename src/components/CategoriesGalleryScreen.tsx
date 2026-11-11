import React, { useEffect } from 'react';
import { ArrowLeft, Sparkles, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import { Category } from '../types';
import { YoliLogo } from './YoliLogo';
import { renderCategoryIcon } from './CategoryIconHelper';

interface CategoriesGalleryScreenProps {
  categories: Category[];
  onBack: () => void;
  onSelectCategory: (categoryId: string) => void;
}

interface CategoryDetailInfo {
  id: string;
  benefits: string[];
  sessionDuration: string;
  recommendedFor: string;
}

const CATEGORY_DETAILS: Record<string, CategoryDetailInfo> = {
  tarot: {
    id: 'tarot',
    benefits: ['Claridad en momentos de duda', 'Identificación de patrones inconscientes', 'Toma de decisiones desde la calma'],
    sessionDuration: '45 - 60 min',
    recommendedFor: 'Quienes buscan respuestas sobre su camino laboral, sentimental o propósito de vida.'
  },
  reiki: {
    id: 'reiki',
    benefits: ['Disminución profunda del estrés', 'Alineación de los 7 centros energéticos', 'Alivio del insomnio y la fatiga mental'],
    sessionDuration: '50 - 60 min',
    recommendedFor: 'Personas con sobrecarga emocional, ansiedad acumulada o que buscan armonizar su campo sutil.'
  },
  masaje: {
    id: 'masaje',
    benefits: ['Liberación de nudos y contracturas', 'Estimulación de la circulación y drenaje', 'Sensación inmediata de ligereza corporal'],
    sessionDuration: '60 - 75 min',
    recommendedFor: 'Tensión muscular en cuello, hombros o espalda derivada de trabajo o estrés físico.'
  },
  aromaterapia: {
    id: 'aromaterapia',
    benefits: ['Regulación del sistema límbico', 'Calma del sistema nervioso simpático', 'Mejora del estado de ánimo'],
    sessionDuration: '45 - 60 min',
    recommendedFor: 'Estrés crónico, problemas para conciliar el sueño y necesidad de descanso profundo.'
  },
  astral: {
    id: 'astral',
    benefits: ['Autoconocimiento exhaustivo', 'Comprensión de talentos y retos natales', 'Guía para tránsitos y ciclos del año'],
    sessionDuration: '60 - 90 min',
    recommendedFor: 'Quienes desean profundizar en su psicología natal y comprender sus dinámicas vinculares.'
  },
  meditacion: {
    id: 'meditacion',
    benefits: ['Control de la rumiación mental', 'Aumento de la capacidad de enfoque', 'Reconexión con la respiración diafragmática'],
    sessionDuration: '30 - 60 min',
    recommendedFor: 'Cualquier persona que sienta su mente acelerada y busque paz en su día a día.'
  },
  sonoterapia: {
    id: 'sonoterapia',
    benefits: ['Inducción de ondas cerebrales theta/alfa', 'Masaje celular a través de vibraciones', 'Desbloqueo de tensiones diafragmáticas'],
    sessionDuration: '50 - 60 min',
    recommendedFor: 'Personas a las que les cuesta meditar en silencio y necesitan una experiencia inmersiva sensorial.'
  },
  regresion: {
    id: 'regresion',
    benefits: ['Comprensión de fobias o miedos sin causa aparente', 'Sanación de lazos del pasado', 'Integración emocional profunda'],
    sessionDuration: '75 - 90 min',
    recommendedFor: 'Personas interesadas en indagar en memorias subconscientes para resolver bloqueos persistentes.'
  },
  'flores-bach': {
    id: 'flores-bach',
    benefits: ['Alivio de miedos y angustia', 'Acompañamiento en procesos de duelo o cambios', 'Equilibrio de estados anímicos extremos'],
    sessionDuration: '45 - 60 min',
    recommendedFor: 'Personas que atraviesan transiciones vitales complejas, crisis emocionales o estrés agudo.'
  },
  acupuntura: {
    id: 'acupuntura',
    benefits: ['Regulación de sistemas orgánicos y pulso', 'Alivio de migrañas y dolores crónicos', 'Mejora del insomnio y la fatiga persistente'],
    sessionDuration: '60 - 75 min',
    recommendedFor: 'Dolencias físicas crónicas, desequilibrios digestivos u hormonales y tensión acumulada.'
  },
  biodescodificacion: {
    id: 'biodescodificacion',
    benefits: ['Toma de conciencia del origen emocional', 'Liberación de somatizaciones recurrentes', 'Reprogramación de creencias limitantes'],
    sessionDuration: '60 - 90 min',
    recommendedFor: 'Quienes buscan comprender el mensaje emocional detrás de una enfermedad o síntoma recurrente.'
  },
  osteopatia: {
    id: 'osteopatia',
    benefits: ['Recuperación de la movilidad articular', 'Alivio de tensiones craneales y cervicales', 'Restablecimiento de la armonía visceral'],
    sessionDuration: '50 - 60 min',
    recommendedFor: 'Molestias posturales, bruxismo, dolores de cabeza tensionales y rigidez física.'
  }
};

export const CategoriesGalleryScreen: React.FC<CategoriesGalleryScreenProps> = ({
  categories,
  onBack,
  onSelectCategory
}) => {

  // Ensure view starts at the very top
  useEffect(() => {
    const scrollContainer = document.getElementById('yoli-app-body');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }, []);

  return (
    <div className="flex flex-col min-h-full bg-[#FAF8FD] text-slate-800 pb-32">
      
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-4 py-3 border-b border-pink-100/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center font-mono font-black text-[11px] bg-slate-900 text-white px-2 py-0.5 rounded-lg shadow-sm border border-slate-700 select-none tracking-tight shrink-0">6</span>
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-pink-50 hover:bg-pink-100 text-slate-700 flex items-center justify-center transition-colors"
            aria-label="Volver"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        <YoliLogo size="md" />

        <div className="w-9" />
      </div>

      <div className="px-5 pt-4 space-y-4">
        
        {/* 6a. Title & Introduction */}
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">6a</span>
            <div className="flex items-center gap-1 text-xs font-bold text-[#ED64A6] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Guía de Sabiduría Holística</span>
            </div>
          </div>
          <h1 className="font-brand text-2xl font-bold text-slate-900 leading-tight">
            Todas las Terapias
          </h1>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Conoce en qué consiste cada disciplina alternativa y elige la que resuene con lo que tu cuerpo y alma necesitan hoy.
          </p>
        </div>

        {/* 6b. Gallery Cards Grid */}
        <div className="space-y-4 pt-1">
          <div className="flex items-center gap-1.5 px-0.5">
            <span className="bg-slate-900 text-white font-mono font-bold text-[9.5px] px-1.5 py-0.2 rounded shadow-2xs">6b</span>
            <span className="text-[10px] font-bold text-[#862D59] uppercase tracking-wider">Catálogo de Disciplinas</span>
          </div>
          {categories.map(cat => {
            const detail = CATEGORY_DETAILS[cat.id];
            return (
              <div
                key={cat.id}
                className="bg-white rounded-3xl p-5 border border-pink-100/80 shadow-xs hover:border-pink-300 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 mb-2.5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs ${cat.colorBg} ${cat.colorText}`}>
                      {renderCategoryIcon(cat.iconName, 'w-6 h-6 stroke-[2]')}
                    </div>

                    <div>
                      <h3 className="font-brand font-bold text-lg text-slate-900 leading-tight">
                        {cat.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                        <Clock className="w-3 h-3 text-[#F6AD55]" />
                        <span>Sesión aprox: {detail?.sessionDuration || '60 min'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pequeña explicación de lo que es la terapia */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Recommended For */}
                  {detail && (
                    <div className="mt-3 p-3 bg-pink-50/50 rounded-2xl border border-pink-100/60">
                      <p className="text-[11px] font-bold text-[#862D59] mb-1">
                        ¿Para quién se recomienda?
                      </p>
                      <p className="text-[11px] text-slate-600 leading-normal">
                        {detail.recommendedFor}
                      </p>
                    </div>
                  )}

                  {/* Beneficios */}
                  {detail && (
                    <div className="mt-3 space-y-1.5">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Beneficios principales:
                      </p>
                      <div className="space-y-1">
                        {detail.benefits.map((b, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Botón de acción */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-orange-50 hover:bg-[#F6AD55] text-[#D97706] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>Ver Terapeutas de {cat.name}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
