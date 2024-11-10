import { useState } from 'react';
import { LoginView } from '@/components/LoginView';
import { RegisterView } from '@/components/RegisterView';
import { DashboardView } from '@/components/DashboardView';

export type ViewType = 'login' | 'register' | 'dashboard';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (email: string, password: string) => {
    // Simulate authentication
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleRegister = (data: any) => {
    // Simulate registration
    setCurrentView('login');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {currentView === 'login' && (
        <LoginView
          onLogin={handleLogin}
          onRegisterClick={() => setCurrentView('register')}
        />
      )}
      {currentView === 'register' && (
        <RegisterView
          onRegister={handleRegister}
          onLoginClick={() => setCurrentView('login')}
        />
      )}
      {currentView === 'dashboard' && (
        <DashboardView onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;