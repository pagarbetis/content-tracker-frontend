import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Layers, 
  FileText, 
  LogOut, 
  ShieldCheck, 
  Bell, 
  User,
  ChevronRight,
  Menu,
  X,
  CheckCheck,
  Clock,
  AlertCircle
} from 'lucide-react';

export default function SidebarLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState('creator');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // State Notifikasi
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Target Rilis Konten',
      message: 'Konten "Belajar React" dijadwalkan tayang besok.',
      time: '10 menit lalu',
      unread: true,
      type: 'warning'
    },
    {
      id: 2,
      title: 'Status Pipeline Berubah',
      message: 'Video "Tips Tailwind" diubah statusnya menjadi Editing.',
      time: '1 jam lalu',
      unread: true,
      type: 'info'
    },
    {
      id: 3,
      title: 'Channel Terhubung',
      message: 'Akun TikTok @creatorlife berhasil diverifikasi.',
      time: '1 hari lalu',
      unread: false,
      type: 'success'
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const savedRole = localStorage.getItem('user_role') || 'creator';
    setRole(savedRole);

    // Event listener buat nutup dropdown saat klik di luar area
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_token');
    navigate('/login');
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Channels', path: '/channels', icon: <Layers className="w-4 h-4" /> },
    { name: 'Content Pipeline', path: '/contents', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="flex min-h-screen font-sans antialiased bg-slate-50 text-slate-800">
      
      {/* SIDEBAR CLEAN LIGHT ENTERPRISE */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 text-slate-600 flex flex-col justify-between transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div>
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-lg shadow-xs bg-slate-900">
                C
              </div>
              <div>
                <h1 className="text-sm font-bold leading-none tracking-tight text-slate-900">Creator Tracker</h1>
                <p className="text-[10px] text-slate-400 font-medium mt-1">Enterprise v1.0</p>
              </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Platform Nav</p>
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    if (window.innerWidth < 1024) setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    active 
                      ? 'bg-slate-900 text-white shadow-xs' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  {active && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 space-y-3 border-t border-slate-200">
          <div className="flex items-center gap-3 p-3 border rounded-lg bg-slate-50 border-slate-200">
            <div className="flex items-center justify-center text-xs font-bold rounded-md w-7 h-7 bg-slate-200 text-slate-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Role Akses</p>
              <p className="text-xs font-bold capitalize truncate text-slate-900">{role}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full gap-2 px-3 py-2 text-xs font-semibold transition border rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 border-slate-200 hover:border-red-200"
          >
            <LogOut className="w-3.5 h-3.5" /> Keluar Sesi
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex flex-col flex-1 min-w-0 bg-slate-50">
        
        {/* TOP HEADER */}
        <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-6 bg-white border-b border-slate-200">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden text-slate-600 hover:text-slate-900">
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-sm font-bold tracking-tight capitalize text-slate-900">
              {location.pathname.replace('/', '') || 'Dashboard'}
            </h2>
          </div>

          {/* Right Action Header */}
          <div className="flex items-center gap-4">
            
            {/* NOTIFICATION CENTER DROPDOWN */}
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 transition rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                title="Notifikasi"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute w-2 h-2 bg-red-500 rounded-full top-2 right-2 ring-2 ring-white"></span>
                )}
              </button>

              {/* Popover Panel */}
              {isNotifOpen && (
                <div className="absolute right-0 z-50 mt-2 overflow-hidden bg-white border shadow-lg w-80 border-slate-200 rounded-xl">
                  <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">Notifikasi</h4>
                      {unreadCount > 0 && (
                        <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full">
                          {unreadCount} baru
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-[11px] text-slate-500 hover:text-slate-900 font-semibold flex items-center gap-1"
                      >
                        <CheckCheck className="w-3 h-3" /> Tandai Dibaca
                      </button>
                    )}
                  </div>

                  <div className="overflow-y-auto divide-y max-h-80 divide-slate-100">
                    {notifications.length > 0 ? (
                      notifications.map((item) => (
                        <div 
                          key={item.id} 
                          className={`p-3.5 text-xs transition hover:bg-slate-50 flex items-start gap-3 ${
                            item.unread ? 'bg-slate-50/80' : 'bg-white'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {item.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-500" />}
                            {item.type === 'info' && <Clock className="w-4 h-4 text-blue-500" />}
                            {item.type === 'success' && <CheckCheck className="w-4 h-4 text-emerald-500" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold leading-tight text-slate-900">{item.title}</p>
                            <p className="text-slate-500 mt-1 leading-relaxed text-[11px]">{item.message}</p>
                            <span className="text-[10px] text-slate-400 mt-1.5 block font-medium">{item.time}</span>
                          </div>
                          {item.unread && (
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1 shrink-0"></span>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-xs text-center text-slate-400">
                        Tidak ada notifikasi.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="w-px h-4 bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 text-xs font-bold text-white rounded-full bg-slate-900">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-xs font-bold leading-none text-slate-900">Kriss</p>
                <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">● Online</p>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT BODY */}
        <main className="flex-1 p-6 overflow-y-auto md:p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
}