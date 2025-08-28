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
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [editMode, setEditMode] = useState(false);

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
    
    if (password === process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD) {
      setUserType('user');
      setIsLoggedIn(true);
    } else if (password === process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD) {
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
    const message = `SYNCRO Analytics Dashboard\n\nAccede al análisis exclusivo:\n${window.location.href}\n\nContraseña: ${process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareEmail = () => {
    const subject = 'SYNCRO Analytics - Dashboard Exclusivo';
    const body = `Acceso al dashboard:\n\nURL: ${window.location.href}\nContraseña: ${process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD}`;
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
            <div>Demo Usuario: {process.env.DEMO_USER_PASSWORD}</div>
            <div>Demo Admin: {process.env.DEMO_ADMIN_PASSWORD}</div>
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
          SYNCRO Analitica
        </h1>
        <div className="flex items-center gap-4">
          {userType === 'admin' && (
            <button
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${showAdminPanel
                  ? 'bg-purple-500 text-white'
                  : theme === 'dark'
                    ? 'bg-gray-800/80 border-gray-700 hover:bg-purple-500'
                    : 'bg-white/80 border-gray-200 hover:bg-purple-500 hover:text-white'
                } border`}
            >
              <Shield className="w-4 h-4" />
              Panel Admin
            </button>
          )}
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

      {/* PANEL ADMIN */}
      {showAdminPanel && userType === 'admin' && (
        <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4`}>
          <div className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="sticky top-0 p-6 border-b border-gray-700 bg-gradient-to-r from-purple-600 to-indigo-600">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Panel de Administración
                </h2>
                <button
                  onClick={() => setShowAdminPanel(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              
              {/* Sección Estadísticas */}
              <div className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  📊 Gestionar Estadísticas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {appData.stats.map((stat, index) => (
                    <div key={stat.id} className={`p-4 rounded-lg border ${
                      theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'
                    }`}>
                      <div className="space-y-2">
                        <input
                          type="text"
                          defaultValue={stat.label}
                          className={`w-full p-2 rounded border text-sm ${
                            theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
                          }`}
                          placeholder="Título de la estadística"
                        />
                        <input
                          type="text"
                          defaultValue={stat.value}
                          className={`w-full p-2 rounded border text-lg font-bold ${
                            theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
                          }`}
                          placeholder="Valor"
                        />
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded text-sm transition-all">
                          Actualizar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sección Insights */}
              <div className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  💡 Gestionar Insights
                </h3>
                <div className="space-y-4">
                  {appData.insights.map((insight, index) => (
                    <div key={insight.id} className={`p-4 rounded-lg border ${
                      theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'
                    }`}>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                        <div>
                          <label className="block text-sm mb-1">Icono</label>
                          <input
                            type="text"
                            defaultValue={insight.icon}
                            className={`w-full p-2 rounded border text-2xl text-center ${
                              theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">Título</label>
                          <input
                            type="text"
                            defaultValue={insight.title}
                            className={`w-full p-2 rounded border ${
                              theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">Descripción</label>
                          <textarea
                            defaultValue={insight.description}
                            className={`w-full p-2 rounded border resize-none h-20 ${
                              theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
                            }`}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm transition-all">
                            Actualizar
                          </button>
                          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm transition-all">
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded font-semibold transition-all">
                    + Agregar Nuevo Insight
                  </button>
                </div>
              </div>

              {/* Sección Upload PDF */}
              <div className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  📄 Gestionar PDFs
                </h3>
                <div className="space-y-4">
                  <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                  }`}>
                    <div className="text-4xl mb-4">📁</div>
                    <p className="text-lg mb-4">Arrastra y suelta archivos PDF aquí</p>
                    <input type="file" accept=".pdf" className="hidden" id="pdfUpload" />
                    <label htmlFor="pdfUpload" className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg cursor-pointer inline-block transition-all">
                      Seleccionar PDF
                    </label>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-green-100 border border-green-300 rounded">
                      <span>📄 reporte-mensual.pdf</span>
                      <button className="text-red-500 hover:text-red-700">Eliminar</button>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-100 border border-green-300 rounded">
                      <span>📄 analisis-completo.pdf</span>
                      <button className="text-red-500 hover:text-red-700">Eliminar</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex gap-4 pt-4">
                <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-all">
                  💾 Guardar Todos los Cambios
                </button>
                <button 
                  onClick={() => setShowAdminPanel(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-all"
                >
                  ❌ Cerrar Panel
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
      
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
