'use client'

import React, { useState } from 'react';
import { Eye, EyeOff, Download, Mail, MessageCircle, Moon, Sun, LogOut, Shield } from 'lucide-react';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [theme, setTheme] = useState('dark');

  const appData = {
    stats: [
      { id: 1, label: 'Visualizaciones Totales', value: '15,847' },
      { id: 2, label: 'Último Análisis', value: '3 días' },
      { id: 3, label: 'Transacciones Totales', value: '€124,5K' },
      { id: 4, label: 'Crecimiento Mensual', value: '+18.3%' }
    ],
    charts: [
      { 
        id: 1, 
        title: 'Flujo de Visitantes por Hora', 
        description: 'Análisis del flujo de personas durante las horas pico de operación en el club.'
      },
      { 
        id: 2, 
        title: 'Ingresos por Categoría', 
        description: 'Distribución de ingresos entre bar, entrada, VIP y eventos especiales.'
      },
      { 
        id: 3, 
        title: 'Preferencias Musicales', 
        description: 'Análisis de géneros musicales más populares basado en interacciones.'
      }
    ],
    insights: [
      { 
        id: 1, 
        icon: '🎵', 
        title: 'Música Electrónica Domina', 
        description: 'El 67% de los asistentes prefiere música electrónica durante las horas pico'
      },
      { 
        id: 2, 
        icon: '💰', 
        title: 'VIP Genera 40% Ingresos', 
        description: 'La zona VIP representa el 40% de los ingresos totales con solo 15% ocupación'
      },
      { 
        id: 3, 
        icon: '📱', 
        title: 'Reservas Móviles Crecen', 
        description: 'Las reservas a través de dispositivos móviles aumentaron un 25% este mes'
      },
      { 
        id: 4, 
        icon: '🍸', 
        title: 'Cocktails Premium', 
        description: 'Los cocktails premium tienen mayor demanda los viernes y sábados'
      }
    ],
    contacts: [
      { id: 1, type: 'whatsapp', value: '+5491123456789', label: 'WhatsApp Soporte' }
    ]
  };

  const handleLogin = () => {
    setLoginError('');
    
    if (password === 'demo2025') {
      setUserType('user');
      setIsLoggedIn(true);
    } else if (password === 'admin2025') {
      setUserType('admin');
      setIsLoggedIn(true);
    } else {
      setLoginError('Contraseña incorrecta. Intenta nuevamente.');
      setTimeout(() => setLoginError(''), 3000);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setPassword('');
  };

  const downloadPDF = () => {
    alert('Descargando análisis completo en PDF...');
  };

  const shareWhatsApp = () => {
    const message = `SYNCRO Analytics Dashboard\n\nAccede al análisis exclusivo:\n${window.location.href}\n\nContraseña: demo2025`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareEmail = () => {
    const subject = 'SYNCRO Analytics - Dashboard Exclusivo';
    const body = `Acceso al dashboard:\n\nURL: ${window.location.href}\nContraseña: demo2025`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const openContact = (contact) => {
    if (contact.type === 'whatsapp') {
      const message = 'Hola, me contacto desde SYNCRO Analytics Dashboard';
      const whatsappUrl = `https://wa.me/${contact.value.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      window.location.href = `mailto:${contact.value}?subject=Consulta desde SYNCRO Analytics`;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-5 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>
        
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`fixed top-6 right-6 p-3 rounded-full backdrop-blur-lg transition-all hover:scale-105 z-50 border ${
            theme === 'dark' 
              ? 'bg-gray-800/80 border-gray-700 hover:bg-indigo-600' 
              : 'bg-white/80 border-gray-300 hover:bg-indigo-600'
          }`}
        >
          {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        <div className={`backdrop-blur-xl rounded-3xl p-10 max-w-md w-full text-center shadow-2xl border ${
          theme === 'dark' ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
        }`}>
          
          <div className="mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-3">
              SYNCRO
            </h1>
            <p className="text-gray-500 text-lg">Analytics Dashboard Exclusivo</p>
          </div>

          <div className="space-y-6">
            <div className="text-left">
              <label className="block text-gray-500 font-medium mb-2">
                Contraseña de Acceso
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className={`w-full p-3 rounded-xl transition-all focus:ring-2 focus:ring-indigo-500 border ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                  placeholder="Ingresa tu contraseña"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transform hover:-translate-y-1 transition-all shadow-lg"
            >
              Acceder al Análisis
            </button>

            {loginError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg">
                {loginError}
              </div>
            )}
          </div>
          
          <div className="mt-6 text-xs text-gray-400 space-y-1">
            <div>Demo Usuario: demo2025</div>
            <div>Demo Admin: admin2025</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-5 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`} style={{
      backgroundImage: theme === 'dark' 
        ? 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)'
        : 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.03) 0%, transparent 50%)'
    }}>
      
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={`fixed top-6 right-6 p-3 rounded-full backdrop-blur-lg transition-all hover:scale-105 z-50 border ${
          theme === 'dark' ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
        }`}
      >
        {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </button>

      <div className="flex justify-between items-center mb-8 flex-wrap gap-5">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          SYNCRO Analytics
        </h1>
        <div className="flex items-center gap-4">
          <div className={`px-4 py-2 rounded-full backdrop-blur-lg border ${
            theme === 'dark' ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
          }`}>
            <span className="flex items-center gap-2">
              {userType === 'admin' ? <Shield className="w-4 h-4" /> : '👤'}
              {userType === 'admin' ? 'Administrador' : 'Usuario'}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {appData.stats.map(stat => (
          <div key={stat.id} className={`backdrop-blur-xl rounded-2xl p-6 text-center transition-all hover:-translate-y-2 shadow-lg border ${
            theme === 'dark' ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
          }`}>
            <div className="text-3xl font-bold text-indigo-500 mb-2">{stat.value}</div>
            <div className="text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {appData.charts.map(chart => (
          <div key={chart.id} className={`backdrop-blur-xl rounded-2xl p-6 shadow-lg border ${
            theme === 'dark' ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
          }`}>
            <h3 className="text-xl font-semibold mb-4">{chart.title}</h3>
            <p className="text-gray-500 mb-5 leading-relaxed">{chart.description}</p>
            <div className={`h-48 rounded-xl flex items-center justify-center text-gray-400 text-lg border-2 border-dashed ${
              theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300'
            }`}>
              📊 Gráfico: {chart.title}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-6">Insights Clave del Negocio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {appData.insights.map(insight => (
            <div key={insight.id} className={`backdrop-blur-xl rounded-xl p-5 flex items-center gap-4 transition-all hover:-translate-y-1 shadow-lg border ${
              theme === 'dark' ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
            }`}>
              <div className="text-3xl bg-indigo-500 p-3 rounded-xl text-white">
                {insight.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{insight.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`backdrop-blur-xl rounded-2xl p-6 mb-8 shadow-lg border ${
        theme === 'dark' ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
      }`}>
        <h3 className="text-2xl font-semibold mb-6">Exportar y Compartir</h3>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={downloadPDF}
            className={`px-6 py-3 rounded-lg transition-all hover:-translate-y-1 flex items-center gap-3 ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-indigo-600' 
                : 'bg-gray-100 hover:bg-indigo-600 hover:text-white'
            }`}
          >
            <Download className="w-5 h-5" />
            Descargar PDF
          </button>
          <button
            onClick={shareWhatsApp}
            className={`px-6 py-3 rounded-lg transition-all hover:-translate-y-1 flex items-center gap-3 ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-green-600' 
                : 'bg-gray-100 hover:bg-green-600 hover:text-white'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </button>
          <button
            onClick={shareEmail}
            className={`px-6 py-3 rounded-lg transition-all hover:-translate-y-1 flex items-center gap-3 ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-blue-600' 
                : 'bg-gray-100 hover:bg-blue-600 hover:text-white'
            }`}
          >
            <Mail className="w-5 h-5" />
            Email
          </button>
        </div>
      </div>

      <div className="fixed bottom-8 left-8">
        <button
          onClick={() => openContact(appData.contacts[0])}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full transition-all hover:-translate-y-1 flex items-center gap-3 shadow-lg"
        >
          <MessageCircle className="w-5 h-5" />
          {appData.contacts[0].label}
        </button>
      </div>

      <div className={`backdrop-blur-xl rounded-2xl p-6 mt-8 border border-yellow-500/30 ${
        theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'
      }`}>
        <div className="flex items-center gap-3 text-yellow-500 mb-3">
          <Shield className="w-6 h-6" />
          <h3 className="text-lg font-semibold">VERSIÓN DE DEMOSTRACIÓN</h3>
        </div>
        <p className="text-gray-500 leading-relaxed">
          En producción: datos encriptados, contraseñas únicas por cliente, autenticación del servidor.
          <br />
          <strong>Contraseñas de prueba:</strong> demo2025 (usuario) | admin2025 (admin)
        </p>
      </div>
    </div>
  );
}
