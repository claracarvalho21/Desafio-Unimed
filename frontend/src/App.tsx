import { BrowserRouter as Router } from 'react-router-dom';
import { ToastProvider } from './components/atoms/Toast';
import { ThemeProvider } from './contexts/ThemeProvider';
import { AuthProvider } from './contexts/AuthProvider'; // ✅ Importar do AuthProvider
import { AppRoutes } from './routes';
import './styles/base/index.css';

function App() {
  return (
    <ToastProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <AppRoutes />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ToastProvider>
  );
}

export default App;