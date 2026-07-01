// frontend/src/pages/Error/Error.tsx

import React from 'react';
import { Link } from 'react-router-dom';
export const Error: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {/* Ícone */}
      <div className="w-24 h-24 rounded-full bg-[#009A59]/10 flex items-center justify-center border-2 border-[#009A59]/20 mb-6">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" stroke="#016701" strokeWidth="2" />
          <line x1="12" y1="8" x2="12" y2="12" stroke="#016701" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="16" x2="12.01" y2="16" stroke="#016701" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Título */}
      <h1 className="text-7xl font-bold text-[#016701]">404</h1>
      <h2 className="text-2xl font-semibold text-[#016701] mt-4">
        Página não encontrada
      </h2>
      <p className="text-gray-500 mt-2 text-center max-w-md">
        A página que você está procurando não existe ou foi movida.
      </p>

      {/* Botão Voltar */}
      <Link
        to="/"
        className="mt-8 flex items-center gap-2 px-6 py-3 rounded-lg bg-[#009A59] text-white font-medium hover:bg-[#007A45] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Voltar para a página inicial
      </Link>

      {/* Texto adicional */}
      <p className="text-xs text-gray-400 mt-6">
        Se você acha que isso é um erro, entre em contato com o suporte.
      </p>
    </div>
  );
};