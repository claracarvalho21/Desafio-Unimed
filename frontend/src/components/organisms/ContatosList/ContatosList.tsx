// frontend/src/components/organisms/ContatosList/ContatosList.tsx

import React from 'react';
import type { Contato } from '../../../types/contato';
import { Table } from '../../molecules/Table/Table';
import { Container } from '../../atoms/Container/Container';
import { ContainerWithOverflow } from '../../atoms/Container/ContainerWithOverflow';
import { ModalConfirm } from '../../atoms/Moda/ModalConfirm';
import { usePagination } from '../../../hooks/usePagination';
import { useSelection } from '../../../hooks/useSelection';
import { useContatosList } from '../../../hooks/useContatosList';
import { Pagination } from '../../molecules/Pagination/Pagination';
import { ContatosTableHeader } from '../../molecules/ContatosTableHeader/ContatosTableHeader';
import { ContatoRow } from '../../molecules/ContatoRow/ContatoRow';
import { ContatoTableActions } from '../../molecules/ContatoTableActions/ContatoTableActions';

interface ContatosListProps {
  contatos: Contato[];
  onFavoritar: (id: number) => void;
  onEditar: (contato: Contato) => void;
  onInativar: (id: number) => void;
  onAtivar?: (id: number) => void;
  onOpenDetalhe: (contato: Contato) => void;
  onContatoAtualizado?: (contato: Contato) => void;
  itemsPerPage?: number;
  mostrarInativos?: boolean;
}

export const ContatosList: React.FC<ContatosListProps> = ({
  contatos,
  onFavoritar,
  onInativar,
  onAtivar,
  onOpenDetalhe,
  itemsPerPage = 10,
  mostrarInativos = true,  // Recebendo a prop
}) => {
  // Hooks
  const pagination = usePagination({
    items: contatos,
    itemsPerPage,
    sortBy: 'nome',
    sortDirection: 'asc',
  });

  const selection = useSelection<Contato>();

  const {
    showConfirmModal,
    contatoToToggle,
    handleFavoriteSelected,
    handleToggleSelected,
    handleToggleStatus,
    handleConfirmDesativar,
    handleCloseConfirmModal,
  } = useContatosList({
    contatos,
    onFavoritar,
    onInativar,
    onAtivar,
  });

  // Handlers
  const handleFavoritar = (id: number) => {
    const contato = contatos.find((c) => c.id === id);
    if (contato) {
      onFavoritar(id);
    }
  };

  const handleRowClick = (item: Contato) => {
    onOpenDetalhe(item);
  };

  // Calcular inativos para exibir
  const totalInativos = contatos.filter(c => !c.ativo).length;
  const totalAtivos = contatos.filter(c => c.ativo).length;

  if (contatos.length === 0) {
    return (
      <Container padding="md">
        <div className="w-full text-center py-8 text-gray-500">
          Nenhum contato encontrado.
        </div>
      </Container>
    );
  }

  const columns = [
    {
      key: 'nome',
      header: 'Contato',
      render: (item: Contato) => (
        <ContatoRow
          item={item}
          isSelected={selection.isSelected(item.id)}
          onSelect={selection.toggleSelect}
        />
      ),
    },
  ];

  return (
    <>
      <Container 
        padding="none" 
        maxWidth="custom" 
        customMaxWidth="1096px"
        overflow="visible"
      >
        <ContatosTableHeader
          totalItems={pagination.totalItems}
          selectedCount={selection.selectedCount}
          onClearSelection={selection.clearSelection}
          onFavoriteSelected={() => handleFavoriteSelected(selection.selectedIds)}
          onToggleSelected={() => handleToggleSelected(selection.selectedIds)}
        />

        {/* ✅ Exibir informações de status da lista */}
        <div className="flex items-center gap-4 px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
          <span>Total: {contatos.length}</span>
          <span className="text-green-600">Ativos: {totalAtivos}</span>
          <span className="text-gray-400">Inativos: {totalInativos}</span>
          <span className="text-xs text-gray-400">
            {mostrarInativos ? '📋 Mostrando todos' : '📋 Ocultando inativos'}
          </span>
        </div>

        <ContainerWithOverflow 
          padding="none"
          maxWidth="custom"
          customMaxWidth="100%"
          minWidth="900px"
        >
          <Table
            data={pagination.currentItems}
            columns={columns}
            rowHeight="h-[65px]"
            showAvatar={false}
            onRowClick={handleRowClick}
            renderActions={(item) => (
              <ContatoTableActions
                item={item}
                onFavoritar={handleFavoritar}
                onToggleStatus={handleToggleStatus}
              />
            )}
          />
        </ContainerWithOverflow>

        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          startIndex={pagination.startIndex}
          endIndex={pagination.endIndex}
          onPageChange={pagination.goToPage}
          onPrevious={pagination.goToPreviousPage}
          onNext={pagination.goToNextPage}
        />
      </Container>

      <ModalConfirm
        isOpen={showConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleConfirmDesativar}
        title="Desativar Contato"
        message={`Tem certeza que deseja desativar o contato "${contatoToToggle?.nome}"?`}
        confirmText="Desativar"
        cancelText="Cancelar"
        icon={
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        }
      />
    </>
  );
};

export default ContatosList;