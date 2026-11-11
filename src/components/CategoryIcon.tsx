import React from 'react';
import { Category } from '../types';
import { renderCategoryIcon } from './CategoryIconHelper';

interface CategoryIconProps {
  category: Category;
  isSelected?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ 
  category, 
  isSelected, 
  onClick 
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center group w-full focus:outline-none transition-all py-1 active:scale-95 select-none relative cursor-pointer"
    >
      {/* Contenedor del Icono: 4 colores cíclicos, donde los de fondo blanco tienen el icono lila */}
      <div
        className={`w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-2xl flex items-center justify-center transition-all duration-200 relative ${category.colorBg} ${category.colorText} ${
          isSelected 
            ? 'border-2 border-[#ED64A6] shadow-glow-pink scale-105' 
            : 'shadow-2xs hover:shadow-xs group-hover:scale-102'
        }`}
      >
        {renderCategoryIcon(category.iconName, 'w-8 h-8 stroke-[2.2]')}
        {isSelected && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#ED64A6] ring-2 ring-white" />
        )}
      </div>

      <span 
        title={category.name}
        className={`text-[11px] sm:text-xs font-semibold text-center truncate max-w-full px-0.5 mt-1.5 tracking-tight transition-colors ${
          isSelected 
            ? 'text-[#ED64A6] font-bold' 
            : 'text-slate-700 group-hover:text-[#ED64A6]'
        }`}
      >
        {category.name}
      </span>
    </button>
  );
};


