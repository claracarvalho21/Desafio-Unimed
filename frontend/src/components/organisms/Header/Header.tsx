import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth'; // ✅ Do hooks
import avatar from '../../../assets/images/avatar.png';
import unimedLogo from '../../../assets/images/unimed.svg';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="w-full h-18.5 bg-[#009A59] shadow-md sticky top-0 z-50 header-unimed">
      <div className="w-full px-8 h-full flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src={unimedLogo}
              alt="Unimed"
              className="h-10 w-56 object-contain"
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white/80 text-[16px] leading-[100%] text-right">
              {user?.name || 'Usuário'}
            </span>
            <span className="text-white text-[16px] font-light">|</span>
            <span className="text-white font-bold text-[16px] leading-[100%] text-right">
              {user?.email || 'admin@unimed.com'}
            </span>
          </div>

          <div className="w-10.5 h-10.5 rounded-full overflow-hidden border-2 border-white/30 shrink-0">
            <img
              src={avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <button
            onClick={handleLogout}
            className="ml-2 px-3 py-1.5 text-sm text-white border border-white/30 rounded-lg hover:bg-white/10 transition"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;