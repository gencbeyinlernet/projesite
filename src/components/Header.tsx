import { BookOpen, Clock, FileText, Cpu, Mail, Home } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  currentTab: string;
  onChangeTab: (tab: string) => void;
}

export default function Header({ currentTab, onChangeTab }: HeaderProps) {
  const navItems = [
    { id: 'home', label: 'Ana Sayfa', icon: Home },
    { id: 'session1', label: '1. Oturum (1-2. Saat)', icon: BookOpen },
    { id: 'session2', label: '2. Oturum (3-4. Saat)', icon: Clock },
    { id: 'session3', label: '3. Oturum (5-6. Saat)', icon: Clock },
    { id: 'session4', label: '4. Oturum (7-8. Saat)', icon: Clock },
    { id: 'models', label: 'Dil Modelleri', icon: Cpu },
    { id: 'resources', label: 'Ek Kaynaklar', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 shadow-xl" id="app-header">
      {/* Brand Bar */}
      <div className="bg-slate-950 text-white px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Yapay Zekâ Eğitim Kılavuzu</span>
              <span className="text-[11px] bg-blue-500 px-2.5 py-0.5 rounded-full font-mono font-bold tracking-wider uppercase text-blue-50">PORTAL</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Eğitmen: <span className="font-bold text-blue-400">Burak TURGUT</span>
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-xs font-mono text-slate-500 sm:block hidden">
              HAZİRAN 2026
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-slate-900/95 backdrop-blur-md border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-2 py-2 overflow-x-auto scrollbar-none" id="main-navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onChangeTab(item.id)}
                  className={`relative flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap cursor-pointer transition-all duration-150 select-none ${
                    isActive
                      ? 'text-blue-400 bg-blue-950/80 border border-blue-900/60'
                      : 'text-slate-400 hover:text-slate-105 hover:bg-slate-800/50'
                  }`}
                  id={`nav-${item.id}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400 scale-110' : 'text-slate-550'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

