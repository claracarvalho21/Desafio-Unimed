// frontend/src/components/templates/ContatosTemplate/ContatosTemplate.tsx

import React from 'react';
import { SearchBar } from '../../molecules/SearchBar/SearchBar';
import { ContatosHeader } from '../../molecules/ContatosHeader/ContatosHeader';
import { FavoritosTable } from '../../organisms/FavoritosTable/FavoritosTable';
import { ContatosList } from '../../organisms/ContatosList/ContatosList';
import type { Contato } from '../../../types/contato';

interface ContatosTemplateProps {
  contatos: Contato[];
  favoritos: Contato[];
  contatosInativos: Contato[];
  isLoading: boolean;
  error: Error | null;
  mostrarInativos: boolean;
  onToggleMostrarInativos: () => void;
  onSearch: (term: string) => void;
  onNewContato: () => void;
  onFavoritar: (id: number) => void;
  onEditar: (contato: Contato) => void;
  onInativar: (id: number) => void;
  onAtivar: (id: number) => void;
  onOpenDetalhe: (contato: Contato) => void;
  onContatoAtualizado: (contato: Contato) => void;
  itemsPerPage?: number;
  favoritosPerPage?: number;
}

export const ContatosTemplate: React.FC<ContatosTemplateProps> = ({
  contatos,
  favoritos,
  isLoading,
  error,
  mostrarInativos,
  onToggleMostrarInativos,
  onSearch,
  onNewContato,
  onFavoritar,
  onEditar,
  onInativar,
  onAtivar,
  onOpenDetalhe,
  onContatoAtualizado,
  itemsPerPage = 10,
  favoritosPerPage = 5,
}) => {
  // Loading
  if (isLoading && contatos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#009A59] border-t-transparent" />
        <p className="mt-4 text-gray-500">Carregando contatos...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100">
        <p className="text-red-600">Erro ao carregar contatos</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-[#009A59] text-white px-4 py-2 rounded-lg hover:bg-[#007A45] transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ContatosHeader
        contatos={contatos}
        onNewContato={onNewContato}
        mostrarInativos={mostrarInativos}
        onToggleMostrarInativos={onToggleMostrarInativos}
      />

      <div className="mb-6">
        <SearchBar onSearch={onSearch} />
      </div>

      {favoritos.length > 0 && (
        <div className="mb-8">
          <FavoritosTable 
            favoritos={favoritos} 
            onFavoritar={onFavoritar}
            onEditar={onEditar}
            onInativar={onInativar}
            onAtivar={onAtivar}
            onOpenDetalhe={onOpenDetalhe}
            itemsPerPage={favoritosPerPage}
          />
        </div>
      )}

      <ContatosList
        contatos={contatos}
        onFavoritar={onFavoritar}
        onEditar={onEditar}
        onInativar={onInativar}
        onAtivar={onAtivar}
        onOpenDetalhe={onOpenDetalhe}
        onContatoAtualizado={onContatoAtualizado}
        itemsPerPage={itemsPerPage}
        mostrarInativos={mostrarInativos}
      />
    </div>
  );
};

export default ContatosTemplate;