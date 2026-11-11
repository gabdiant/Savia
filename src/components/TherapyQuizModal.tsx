import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  Star,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Therapist } from '../types';

interface TherapyQuizModalProps {
  therapists: Therapist[];
  onClose: () => void;
  onSelectTherapist: (therapist: Therapist) => void;
}

interface RecommendedOption {
  rank: 1 | 2 | 3;
  affinity: number;
  therapyTitle: string;
  category: string;
  badgeText: string;
  isTopRecommended: boolean; // true = borde verde, false = borde amarillo suave
  reason: string;
  therapist: Therapist;
}

export const TherapyQuizModal: React.FC<TherapyQuizModalProps> = ({
  therapists,
  onClose,
  onSelectTherapist
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const totalQuestions = 5;

  // Answers state
  const [area, setArea] = useState<string>('emocional');
  const [duration, setDuration] = useState<string>('cronico');
  const [approach, setApproach] = useState<string>('energetico');
  const [mysticLevel, setMysticLevel] = useState<string>('sutil');
  const [formatPref, setFormatPref] = useState<string>('indiferente');

  // Compute top 3 recommendations
  const computeRecommendations = (): RecommendedOption[] => {
    const lucia = therapists.find(t => t.id === 'lucia-luna') || therapists[0];
    const asa = therapists.find(t => t.id === 'asa-merria') || therapists[0];
    const marcos = therapists.find(t => t.id === 'mooro-marianta') || therapists[0];
    const elena = therapists.find(t => t.id === 'elena-romero') || therapists[0];

    // Priority 1: Physical tension
    if (area === 'fisico') {
      if (mysticLevel === 'aterrizado') {
        return [
          {
            rank: 1,
            affinity: 98,
            therapyTitle: 'Quiromasaje Holístico Descontracturante',
            category: 'masaje',
            badgeText: '★ Más Recomendada (98% Afinidad)',
            isTopRecommended: true,
            reason: 'Técnica manual directa para liberar contracturas en cuello y espalda sin intermediarios.',
            therapist: asa
          },
          {
            rank: 2,
            affinity: 87,
            therapyTitle: 'Acupuntura Tradicional & Moxibustión',
            category: 'acupuntura',
            badgeText: 'Opción Complementaria (87% Afinidad)',
            isTopRecommended: false,
            reason: 'Desbloquea los canales de energía y desinflama puntos gatillo profundos.',
            therapist: elena
          },
          {
            rank: 3,
            affinity: 79,
            therapyTitle: 'Sesión Sensorial de Aromaterapia Botánica',
            category: 'aromaterapia',
            badgeText: 'Opción Alternativa (79% Afinidad)',
            isTopRecommended: false,
            reason: 'Aceites antiinflamatorios de lavanda y gaulteria para calmar la sensibilidad neuromuscular.',
            therapist: asa
          }
        ];
      }
      return [
        {
          rank: 1,
          affinity: 96,
          therapyTitle: 'Acupuntura MTC & Diagnóstico de Meridianos',
          category: 'acupuntura',
          badgeText: '★ Más Recomendada (96% Afinidad)',
          isTopRecommended: true,
          reason: 'Equilibrio biológico y energético integral para eliminar dolor recurrente de raíz.',
          therapist: elena
        },
        {
          rank: 2,
          affinity: 88,
          therapyTitle: 'Quiromasaje Holístico Descontracturante',
          category: 'masaje',
          badgeText: 'Opción Complementaria (88% Afinidad)',
          isTopRecommended: false,
          reason: 'Alivio directo de sobrecarga muscular y nudos miofasciales.',
          therapist: asa
        },
        {
          rank: 3,
          affinity: 80,
          therapyTitle: 'Armonización Sonora con Cuencos Tibetanos',
          category: 'sonoterapia',
          badgeText: 'Opción Alternativa (80% Afinidad)',
          isTopRecommended: false,
          reason: 'Vibraciones neuroacústicas que relajan el tono muscular involuntario.',
          therapist: marcos
        }
      ];
    }

    // Priority 2: Mental / Insomnia / Stress
    if (area === 'mental') {
      return [
        {
          rank: 1,
          affinity: 97,
          therapyTitle: 'Sonoterapia & Frecuencias Acústicas',
          category: 'sonoterapia',
          badgeText: '★ Más Recomendada (97% Afinidad)',
          isTopRecommended: true,
          reason: 'Sintoniza las ondas cerebrales en estados alfa y theta para apagar la rumiación mental y conciliar sueño.',
          therapist: marcos
        },
        {
          rank: 2,
          affinity: 89,
          therapyTitle: 'Sesión de Reiki Usui & Armonización de Chakras',
          category: 'reiki',
          badgeText: 'Opción Complementaria (89% Afinidad)',
          isTopRecommended: false,
          reason: 'Disminuye el cortisol y descarga la hiperactividad del chakra corona y tercer ojo.',
          therapist: lucia
        },
        {
          rank: 3,
          affinity: 82,
          therapyTitle: 'Aromaterapia Neurosensorial Antiestrés',
          category: 'aromaterapia',
          badgeText: 'Opción Alternativa (82% Afinidad)',
          isTopRecommended: false,
          reason: 'Estimulación del sistema límbico mediante esencias puras relajantes.',
          therapist: asa
        }
      ];
    }

    // Priority 3: Spiritual / Decisions / Clarity
    if (area === 'espiritual' || mysticLevel === 'esoterico' || approach === 'simbolico') {
      return [
        {
          rank: 1,
          affinity: 98,
          therapyTitle: 'Tarot Evolutivo & Lectura Intuitiva',
          category: 'tarot',
          badgeText: '★ Más Recomendada (98% Afinidad)',
          isTopRecommended: true,
          reason: 'Espejo arquetípico para ver con total nitidez tus encrucijadas presentes y activar tu poder interior.',
          therapist: lucia
        },
        {
          rank: 2,
          affinity: 88,
          therapyTitle: 'Sesión de Reiki Energético',
          category: 'reiki',
          badgeText: 'Opción Complementaria (88% Afinidad)',
          isTopRecommended: false,
          reason: 'Limpia interferencias en tu aura para que tomes decisiones desde la paz y no desde el miedo.',
          therapist: lucia
        },
        {
          rank: 3,
          affinity: 80,
          therapyTitle: 'Viaje Sonoro & Meditación con Cuencos',
          category: 'sonoterapia',
          badgeText: 'Opción Alternativa (80% Afinidad)',
          isTopRecommended: false,
          reason: 'Espacio de recogimiento interior para conectar con tu intuición y silencio fértil.',
          therapist: marcos
        }
      ];
    }

    // Default: Emotional & Healing
    return [
      {
        rank: 1,
        affinity: 97,
        therapyTitle: 'Sesión de Reiki Energético & Sanación Emocional',
        category: 'reiki',
        badgeText: '★ Más Recomendada (97% Afinidad)',
        isTopRecommended: true,
        reason: 'Alineación de centros energéticos para soltar angustia en el pecho y restaurar calma emocional.',
        therapist: lucia
      },
      {
        rank: 2,
        affinity: 86,
        therapyTitle: 'Tarot Evolutivo & Sanación de Vínculos',
        category: 'tarot',
        badgeText: 'Opción Complementaria (86% Afinidad)',
        isTopRecommended: false,
        reason: 'Comprensión profunda de apegos y lecciones afectivas para cerrar ciclos en paz.',
        therapist: lucia
      },
      {
        rank: 3,
        affinity: 81,
        therapyTitle: 'Baño Sonoro de Cuencos Tibetanos',
        category: 'sonoterapia',
        badgeText: 'Opción Alternativa (81% Afinidad)',
        isTopRecommended: false,
        reason: 'Armonización celular y liberación de bloqueos emocionales a través del sonido.',
        therapist: marcos
      }
    ];
  };

  const recommendations = computeRecommendations();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-pink-100 max-h-[92vh]">
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-pink-100 flex items-center justify-between bg-gradient-to-r from-pink-50 to-orange-50/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#ED64A6] text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#ED64A6] uppercase tracking-wider">Test de Bienestar</p>
              <h3 className="text-xs font-bold text-slate-800">Diagnóstico Intuitivo</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Progress bar */}
        {currentQuestion <= totalQuestions && (
          <div className="h-1 bg-pink-100/60 w-full">
            <div 
              className="h-full bg-gradient-to-r from-[#ED64A6] to-[#F6AD55] transition-all duration-300"
              style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            />
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 overflow-y-auto no-scrollbar space-y-4 flex-1">
          
          {/* Pregunta 1 */}
          {currentQuestion === 1 && (
            <div className="space-y-3 animate-in fade-in-50 duration-200">
              <div>
                <span className="text-[10px] font-bold text-[#ED64A6] uppercase">Pregunta 1 de {totalQuestions}</span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                  ¿Qué dimensión de tu bienestar necesita atención inmediata?
                </h4>
              </div>
              <div className="space-y-2">
                {[
                  { id: 'emocional', title: 'Emocional & Relacional', desc: 'Tristeza, duelo, apego, patrones vinculares' },
                  { id: 'fisico', title: 'Físico & Muscular', desc: 'Contracturas, dolor lumbar/cervical, fatiga corporal' },
                  { id: 'mental', title: 'Mental & Estrés', desc: 'Insomnio, sobrecarga de trabajo, mente acelerada' },
                  { id: 'espiritual', title: 'Espiritual & Vocacional', desc: 'Dudas sobre tu camino, falta de sentido, desconexión' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setArea(opt.id);
                      setCurrentQuestion(2);
                    }}
                    className={`w-full p-3 rounded-2xl border text-left transition-all ${
                      area === opt.id 
                        ? 'border-[#ED64A6] bg-pink-50/60 ring-1 ring-[#ED64A6]' 
                        : 'border-slate-200/80 hover:border-pink-200 bg-white'
                    }`}
                  >
                    <p className="font-bold text-xs text-slate-800">{opt.title}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pregunta 2 */}
          {currentQuestion === 2 && (
            <div className="space-y-3 animate-in fade-in-50 duration-200">
              <div>
                <span className="text-[10px] font-bold text-[#ED64A6] uppercase">Pregunta 2 de {totalQuestions}</span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                  ¿Desde hace cuánto tiempo sientes este bloqueo o malestar?
                </h4>
              </div>
              <div className="space-y-2">
                {[
                  { id: 'reciente', title: 'Reciente / Puntual', desc: 'Surgió en las últimas semanas por un cambio o evento puntual.' },
                  { id: 'cronico', title: 'Crónico o Recurrente', desc: 'Lleva meses o años manifestándose de forma cíclica.' },
                  { id: 'crecimiento', title: 'Búsqueda de Crecimiento', desc: 'No tengo un dolor agudo, quiero autoconocimiento y prevención.' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setDuration(opt.id);
                      setCurrentQuestion(3);
                    }}
                    className={`w-full p-3 rounded-2xl border text-left transition-all ${
                      duration === opt.id 
                        ? 'border-[#F6AD55] bg-orange-50/60 ring-1 ring-[#F6AD55]' 
                        : 'border-slate-200/80 hover:border-orange-200 bg-white'
                    }`}
                  >
                    <p className="font-bold text-xs text-slate-800">{opt.title}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pregunta 3 */}
          {currentQuestion === 3 && (
            <div className="space-y-3 animate-in fade-in-50 duration-200">
              <div>
                <span className="text-[10px] font-bold text-[#ED64A6] uppercase">Pregunta 3 de {totalQuestions}</span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                  ¿Qué estilo de experiencia prefieres durante tu sesión?
                </h4>
              </div>
              <div className="space-y-2">
                {[
                  { id: 'tactil', title: 'Corporal & Táctil', desc: 'Masaje manual con aceites esenciales, anatomía viva.' },
                  { id: 'energetico', title: 'Energético Sutil', desc: 'Imposición suave de manos, chakras, campo electromagnético.' },
                  { id: 'sensorial', title: 'Sonoro & Sensorial', desc: 'Inmersión con cuencos tibetanos, gongs y frecuencias.' },
                  { id: 'simbolico', title: 'Conversacional & Simbólico', desc: 'Lectura de arquetipos, cartas, astrología y diálogo.' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setApproach(opt.id);
                      setCurrentQuestion(4);
                    }}
                    className={`w-full p-3 rounded-2xl border text-left transition-all ${
                      approach === opt.id 
                        ? 'border-[#ED64A6] bg-pink-50/60 ring-1 ring-[#ED64A6]' 
                        : 'border-slate-200/80 hover:border-pink-200 bg-white'
                    }`}
                  >
                    <p className="font-bold text-xs text-slate-800">{opt.title}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pregunta 4 */}
          {currentQuestion === 4 && (
            <div className="space-y-3 animate-in fade-in-50 duration-200">
              <div>
                <span className="text-[10px] font-bold text-[#ED64A6] uppercase">Pregunta 4 de {totalQuestions}</span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                  ¿Cuál es tu grado de apertura al plano intuitivo / holístico?
                </h4>
              </div>
              <div className="space-y-2">
                {[
                  { id: 'aterrizado', title: 'Pragmático y Físico', desc: 'Me siento cómodo con técnicas anatómicas (quiromasaje, acupuntura).' },
                  { id: 'sutil', title: 'Abierto a Energías Sutiles', desc: 'Creo en la vibración, la intención y el flujo energético (Reiki, cuencos).' },
                  { id: 'esoterico', title: 'Afinidad Mística / Intuitiva', desc: 'Me apasionan el Tarot, la astrología natal y la sincronicidad.' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setMysticLevel(opt.id);
                      setCurrentQuestion(5);
                    }}
                    className={`w-full p-3 rounded-2xl border text-left transition-all ${
                      mysticLevel === opt.id 
                        ? 'border-[#F6AD55] bg-orange-50/60 ring-1 ring-[#F6AD55]' 
                        : 'border-slate-200/80 hover:border-orange-200 bg-white'
                    }`}
                  >
                    <p className="font-bold text-xs text-slate-800">{opt.title}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pregunta 5 */}
          {currentQuestion === 5 && (
            <div className="space-y-3 animate-in fade-in-50 duration-200">
              <div>
                <span className="text-[10px] font-bold text-[#ED64A6] uppercase">Pregunta 5 de {totalQuestions}</span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                  ¿Cómo prefieres tomar la sesión?
                </h4>
              </div>
              <div className="space-y-2">
                {[
                  { id: 'online', title: '💻 Online por videollamada', desc: 'En la comodidad y privacidad de tu hogar.' },
                  { id: 'presencial', title: '📍 En consulta presencial', desc: 'En un centro holístico con ambiente cuidado.' },
                  { id: 'indiferente', title: '✨ Indiferente / Abierto', desc: 'La modalidad que mejor le siente a la terapia.' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setFormatPref(opt.id);
                      setCurrentQuestion(6); // Show results
                    }}
                    className={`w-full p-3 rounded-2xl border text-left transition-all ${
                      formatPref === opt.id 
                        ? 'border-[#ED64A6] bg-pink-50/60 ring-1 ring-[#ED64A6]' 
                        : 'border-slate-200/80 hover:border-pink-200 bg-white'
                    }`}
                  >
                    <p className="font-bold text-xs text-slate-800">{opt.title}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PANTALLA DE RESULTADOS (Máximo 3 opciones: Borde verde en la más recomendada, amarillo suave en las otras) */}
          {currentQuestion === 6 && (
            <div className="space-y-4 animate-in fade-in-50 duration-200">
              <div className="text-center pt-1">
                <span className="text-[10px] font-bold text-[#ED64A6] uppercase tracking-wider block">
                  Diagnóstico Personalizado
                </span>
                <h4 className="font-brand font-bold text-lg text-slate-900 mt-0.5">
                  Tus 3 Terapias Compatibles
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Basado en tus 5 respuestas, estas son las disciplinas que mejor armonizan con tu proceso actual:
                </p>
              </div>

              {/* 3 Cartas de Recomendación */}
              <div className="space-y-3">
                {recommendations.map(opt => (
                  <div
                    key={opt.rank}
                    className={`rounded-3xl p-4 transition-all shadow-xs ${
                      opt.isTopRecommended
                        ? 'border-2 border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-400/30'
                        : 'border-2 border-amber-300 bg-amber-50/30'
                    }`}
                  >
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        opt.isTopRecommended
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {opt.badgeText}
                      </span>
                      <span className="text-xs font-bold text-slate-700">
                        {opt.affinity}% afinidad
                      </span>
                    </div>

                    <h5 className="font-brand font-bold text-sm text-slate-900 leading-tight">
                      {opt.therapyTitle}
                    </h5>

                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {opt.reason}
                    </p>

                    {/* Terapeuta recomendado */}
                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img 
                          src={opt.therapist.avatar} 
                          alt={opt.therapist.name} 
                          className="w-8 h-8 rounded-full object-cover border border-white shadow-2xs"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-800 leading-none">{opt.therapist.name}</p>
                          <div className="flex items-center gap-0.5 mt-0.5">
                            <Star className="w-2.5 h-2.5 text-[#F6AD55] fill-[#F6AD55]" />
                            <span className="text-[10px] text-slate-500">{opt.therapist.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          onSelectTherapist(opt.therapist);
                        }}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 shadow-2xs active:scale-95 transition-all ${
                          opt.isTopRecommended
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-[#F6AD55] hover:bg-[#e09a43] text-white'
                        }`}
                      >
                        <span>Ver Terapeuta</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botón de reiniciar test */}
              <button
                onClick={() => setCurrentQuestion(1)}
                className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Repetir cuestionario
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
