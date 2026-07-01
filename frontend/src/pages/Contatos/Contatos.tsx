// frontend/src/pages/Contatos/index.tsx

import React from 'react';
import { useContatosPage } from '../../hooks/useContatosPage';
import { ContatosTemplate } from '../../components/templates/ContatosTemplate/ContatosTemplate';
import { ContatoDetalhe } from '../../components/organisms/ContatoDetalhe/ContatoDetalhe';
import { ContatoEditModal } from '../../components/organisms/ContatoEditModal/ContatoEditModal';

export const Contatos: React.FC = () => {
  const {
    contatos,
    favoritos,
    contatosInativos,
    isLoading,
    error,
    selectedContato,
    modalType,
    mostrarInativos,
    toggleMostrarInativos,
    handleCloseModal,
    handleContatoAtualizado,
    handleFavoritar,
    handleInativar,
    handleAtivar,
    handleEditar,
    handleOpenDetalhe,
    handleSearch,
    handleNewContato,
    handleEditSuccess,
    handleEditClose,
  } = useContatosPage();

  return (
    <>
      <ContatosTemplate
        contatos={contatos}
        favoritos={favoritos}
        contatosInativos={contatosInativos}
        isLoading={isLoading}
        error={error}
        mostrarInativos={mostrarInativos}
        onToggleMostrarInativos={toggleMostrarInativos}
        onSearch={handleSearch}
        onNewContato={handleNewContato}
        onFavoritar={handleFavoritar}
        onEditar={handleEditar}
        onInativar={handleInativar}
        onAtivar={handleAtivar}
        onOpenDetalhe={handleOpenDetalhe}
        onContatoAtualizado={handleContatoAtualizado}
        itemsPerPage={10}
        favoritosPerPage={5}
      />

      {/* Modais */}
      {modalType === 'detalhe' && selectedContato && (
        <ContatoDetalhe
          isOpen={true}
          contato={selectedContato}
          onClose={handleCloseModal}
          onEditar={handleEditar}
          onFavoritar={handleFavoritar}
          onInativar={handleInativar}
          onAtivar={handleAtivar}
          onContatoAtualizado={handleContatoAtualizado}
        />
      )}

      {modalType === 'edicao' && selectedContato && (
        <ContatoEditModal
          isOpen={true}
          contato={selectedContato}
          onClose={handleEditClose}
          onSuccess={handleEditSuccess}
        />
      )}
    </>
  );
};