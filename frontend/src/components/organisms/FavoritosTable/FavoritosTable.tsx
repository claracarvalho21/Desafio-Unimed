import React, { useState } from 'react';
import type { Contato } from '../../../types/contato';
import { FavoriteIcon } from '../../atoms/FavoriteIcon/FavoriteIcon';
import { Table } from '../../molecules/Table/Table';
import { Container } from '../../atoms/Container/Container';
import { ContainerWithOverflow } from '../../atoms/Container/ContainerWithOverflow';
import { useToast } from '../../atoms/Toast';
import { usePagination } from '../../../hooks/usePagination';
import { Pagination } from '../../molecules/Pagination/Pagination';
import favoriteIcon from '../../../assets/images/mi_favorite.svg';

interface FavoritosTableProps {
  favoritos: Contato[];
  onFavoritar: (id: number) => void;
  onEditar?: (contato: Contato) => void;
  onInativar?: (id: number) => void;
  onAtivar?: (id: number) => void;
  onOpenDetalhe?: (contato: Contato) => void;
  itemsPerPage?: number;
}

export const FavoritosTable: React.FC<FavoritosTableProps> = ({
  favoritos,
  onFavoritar,
  onOpenDetalhe,
  itemsPerPage = 5,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const { showToast } = useToast();

  const pagination = usePagination({
    items: favoritos,
    itemsPerPage,
    sortBy: 'nome',
    sortDirection: 'asc',
  });

  if (favoritos.length === 0) {
    return null;
  }

  const handleFavoritarClick = (item: Contato) => {
    if (item.favorito) {
      showToast('desfavoritado', `${item.nome} desfavoritado!`);
    } else {
      showToast('favoritado', `${item.nome} favoritado!`);
    }
    onFavoritar(item.id);
  };

  const handleRowClick = (item: Contato) => {
    if (onOpenDetalhe) {
      onOpenDetalhe(item);
    }
  };

  const columns = [
    {
      key: 'nome',
      header: 'Contato',
      render: (item: Contato) => (
        <div className="flex flex-col">
          <span className="text-[16px] font-normal text-[#016701] leading-[100%] tracking-[0%]">
            {item.nome}
          </span>
          <span className={`
            text-[11px] font-medium leading-[100%] tracking-[0%]
            ${item.ativo ? 'text-green-600' : 'text-gray-400'}
          `}>
            {item.ativo ? 'Ativo' : 'Inativo'}
          </span>
        </div>
      ),
    },
  ];

  return (
    <>
      <Container padding="none" maxWidth="custom" customMaxWidth="1096px" overflow="visible">
        {/* Accordion Header */}
        <div
          className="flex items-center justify-between cursor-pointer py-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h2 className="text-[24px] font-bold text-[#016701] font-['Inter'] leading-[100%] tracking-[0%] flex items-center gap-2">
            <img
              src={favoriteIcon}
              alt="Favoritos"
              className="w-6 h-6"
              style={{
                filter:
                  'brightness(0) saturate(100%) invert(21%) sepia(97%) saturate(1470%) hue-rotate(140deg) brightness(91%) contrast(101%)',
              }}
            />
            Favoritos
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({pagination.totalItems})
            </span>
          </h2>
          <button
            className="w-6 h-6 flex items-center justify-center text-[#016701] transition-transform duration-300"
            style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
            aria-label={isOpen ? 'Fechar favoritos' : 'Abrir favoritos'}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="#016701"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${isOpen ? 'max-h-150 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
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
              showAvatar={true}
              avatarField="nome"
              avatarBgColor="bg-[#009A59]"
              avatarTextColor="text-white"
              avatarSize="w-[35px] h-[35px]"
              onRowClick={handleRowClick}
              renderActions={(item) => (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoritarClick(item);
                  }}
                  className="cursor-pointer"
                >
                  <FavoriteIcon isFavorited={true} size={24} />
                </div>
              )}
            />
          </ContainerWithOverflow>

          {pagination.totalPages > 1 && (
            <div className="mt-4">
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
            </div>
          )}

          <div className="w-full h-0.5 bg-[#016701] mt-4" />
        </div>
      </Container>
    </>
  );
};