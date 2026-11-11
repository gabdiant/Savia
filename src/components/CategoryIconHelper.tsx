import React from 'react';
import { 
  Sun, 
  Sparkles, 
  HeartHandshake, 
  Flower2, 
  Compass, 
  Smile, 
  Music, 
  History 
} from 'lucide-react';

/**
 * Icono de persona meditando en postura de loto (Requisito 11)
 */
export const MeditationIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 stroke-[2]' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Cabeza con aura de serenidad */}
    <circle cx="12" cy="5" r="2.2" />
    {/* Columna erguida */}
    <path d="M12 7.5v6" />
    {/* Brazos flexionados con manos apoyadas en rodillas */}
    <path d="M12 9.5L6.5 13l1.5 2" />
    <path d="M12 9.5l5.5 3.5-1.5 2" />
    {/* Base en postura de loto sukhasana */}
    <path d="M4.5 19.5c2-3 5-3.5 7.5-3.5s5.5.5 7.5 3.5" />
    <path d="M7 19.5h10" />
  </svg>
);

/**
 * Flor de Bach botánica en trazo fino (Requisito 12)
 */
export const BachFlowerIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 stroke-[2]' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="11" r="2.5" />
    {/* 5 pétalos botánicos */}
    <path d="M12 8.5C10.5 5 11 3 12 2c1 1 1.5 3 0 6.5z" />
    <path d="M14.2 9.8c2.6-.5 4.5-1.5 5.3-.5.2 1.4-1.2 2.4-3.7 2z" />
    <path d="M13.6 13c1.8 2 2.8 3.5 2 4.5-1.2.6-2.5-.5-3.6-2.5z" />
    <path d="M10.4 13c-1.8 2-2.8 3.5-2 4.5 1.2.6 2.5-.5 3.6-2.5z" />
    <path d="M9.8 9.8c-2.6-.5-4.5-1.5-5.3-.5-.2 1.4 1.2 2.4 3.7 2z" />
    {/* Tallo sutil */}
    <path d="M12 17v4.5" />
  </svg>
);

/**
 * Set de 3 agujas / pins de Acupuntura MTC (Requisito 13)
 */
export const AcupuncturePinsIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 stroke-[2]' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Aguja 1 (Izquierda) */}
    <circle cx="6" cy="4" r="1.5" />
    <line x1="6" y1="5.5" x2="6" y2="9" strokeWidth="2.5" />
    <line x1="6" y1="9" x2="6" y2="19" />

    {/* Aguja 2 (Centro) */}
    <circle cx="12" cy="3" r="1.5" />
    <line x1="12" y1="4.5" x2="12" y2="8.5" strokeWidth="2.5" />
    <line x1="12" y1="8.5" x2="12" y2="21" />

    {/* Aguja 3 (Derecha) */}
    <circle cx="18" cy="4" r="1.5" />
    <line x1="18" y1="5.5" x2="18" y2="9" strokeWidth="2.5" />
    <line x1="18" y1="9" x2="18" y2="19" />

    {/* Meridiano bioenergético base */}
    <path d="M4 21c2.5-1 5.5-1 8-1s5.5 0 8 1" strokeDasharray="1.5 2" strokeWidth="1.5" />
  </svg>
);

export const renderCategoryIcon = (iconName: string, className: string = 'w-6 h-6 stroke-[2]') => {
  switch (iconName) {
    case 'Sun':
      return <Sun className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'HeartHandshake':
      return <HeartHandshake className={className} />;
    case 'Smile':
      return <Smile className={className} />;
    case 'Meditation':
      return <MeditationIcon className={className} />;
    case 'Flower2':
      return <Flower2 className={className} />;
    case 'BachFlower':
      return <BachFlowerIcon className={className} />;
    case 'Acupuncture':
    case 'AcupunctureNeedles':
      return <AcupuncturePinsIcon className={className} />;
    case 'Music':
      return <Music className={className} />;
    case 'History':
      return <History className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};
