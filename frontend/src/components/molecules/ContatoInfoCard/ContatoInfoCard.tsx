// frontend/src/components/molecules/ContatoInfoCard/ContatoInfoCard.tsx

import React from 'react';
import { Icon, type IconName } from '../../atoms/Input/Icon/Icon';
import { Typography } from '../../atoms/Typography/Typography';

interface ContatoInfoCardProps {
  icon: IconName; // ✅ Usar o tipo correto
  label: string;
  value: string;
  iconColor?: string;
}

export const ContatoInfoCard: React.FC<ContatoInfoCardProps> = ({
  icon,
  label,
  value,
  iconColor = '#016701',
}) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-[#F5FAF8] rounded-lg border border-[#E8F3EF]">
      <div className="w-10 h-10 rounded-full bg-[#009A59]/10 flex items-center justify-center shrink-0">
        <Icon name={icon} size={20} color={iconColor} />
      </div>
      <div className="flex-1 min-w-0">
        <Typography variant="caption" color="secondary" className="text-xs font-medium mb-1 block">
          {label}
        </Typography>
        <Typography variant="body" color="primary" className="text-base font-medium truncate">
          {value}
        </Typography>
      </div>
    </div>
  );
};