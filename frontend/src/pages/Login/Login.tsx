import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import phoneIcon from '../../assets/images/boxicons_phone-filled.svg';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!email.includes('@') || !email.includes('.')) {
      newErrors.email = 'Email inválido';
    }

    if (!password.trim()) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch {
      setErrors({ 
        email: 'Credenciais inválidas. Use: admin@unimed.com / admin123' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5FAF8] p-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-lg border border-[#E8F3EF]">
        {/* Logo e Título */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-[#009A59]/10 flex items-center justify-center border-2 border-[#009A59]/20">
              <img
                src={phoneIcon}
                alt="Agenda de Contatos"
                className="w-10 h-10"
                style={{
                  filter:
                    'brightness(0) saturate(100%) invert(21%) sepia(97%) saturate(1470%) hue-rotate(140deg) brightness(91%) contrast(101%)',
                }}
              />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-[#016701]">
            Agenda de Contatos
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Faça login para acessar sua agenda
          </p>
        </div>

        {/* Formulário */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#016701] mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="admin@unimed.com"
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B6E2D0] transition text-[#016701] placeholder:text-[#016701]/40 ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-[#016701] focus:border-[#016701]'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-[#016701] mb-1">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              placeholder="••••••••"
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B6E2D0] transition text-[#016701] placeholder:text-[#016701]/40 ${
                errors.password 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-[#016701] focus:border-[#016701]'
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password}
              </p>
            )}
          </div>

          {/* Credenciais de teste */}
          <div className="text-xs text-gray-500 text-center bg-[#F5FAF8] p-2 rounded-lg border border-[#E8F3EF]">
            <span>Credenciais de teste: </span>
            <span className="font-mono bg-white px-2 py-1 rounded border border-[#E8F3EF] text-[#016701]">
              admin@unimed.com / admin123
            </span>
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#009A59] hover:bg-[#007A45] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B6E2D0] transition disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Entrando...
              </span>
            ) : (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Entrar
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};