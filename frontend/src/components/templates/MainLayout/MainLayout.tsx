import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../organisms/Header/Header';
import AccessibilityBar from '../../organisms/AccessibilityBar/AccessibilityBar';

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AccessibilityBar />
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default MainLayout;