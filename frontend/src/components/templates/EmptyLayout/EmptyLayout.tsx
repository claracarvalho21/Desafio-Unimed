import React from 'react';
import { Outlet } from 'react-router-dom';

interface EmptyLayoutProps {
  children?: React.ReactNode;
}

const EmptyLayout: React.FC<EmptyLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {children || <Outlet />}
    </div>
  );
};

export default EmptyLayout;