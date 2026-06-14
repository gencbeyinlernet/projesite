import { useState, ComponentType } from 'react';
import { 
  Brain, Cpu, GraduationCap, Sparkles, Sliders, 
  Layers, Bot, Globe, FileText, FolderKanban, Terminal, 
  Command, BookOpen, Clock, Check, Copy, ExternalLink, 
  Code, ChevronRight, HelpCircle, Activity
} from 'lucide-react';
import { motion } from 'motion/react';

// Types & Data
import { Topic } from './types';
import { session1Categories, session1Topics } from './data/session1Data';
import { session2Categories, session2Topics } from './data/session2Data';
import { session3Categories, session3Topics } from './data/session3Data';
import { session4Categories, session4Topics } from './data/session4Data';
import { additionalResources } from './data/resourcesData';
import { popularModels } from './data/modelsData';
import { eduTools } from './data/eduToolsData';

// Custom Components
import Header from './components/Header';
import PromptBuilder from './components/PromptBuilder';
import BrainAssistant from './components/BrainAssistant';

// Icon Map Resolver
const iconMap: Record<string, ComponentType<any>> = {
  Brain, Cpu, GraduationCap, Sparkles, Sliders, 
  Layers, Bot, Globe, FileText, FolderKanban, Terminal, 
  Command, BookOpen, Clock, Check, Copy, Code, HelpCircle, Activity
};

const COLD_COLORS = [
  {
    border: 'border-blue-500',
    text: 'text-blue-400',
    bg: 'bg-blue-600',
    hoverBg: 'hover:text-blue-300',
    indicator: 'bg-blue-950/60 text-blue-300 border-blue-900/40',
  },
  {
    border: 'border-teal-500',
    text: 'text-teal-400',
    bg: 'bg-teal-600',
    hoverBg: 'hover:text-teal-300',
    indicator: 'bg-teal-950/60 text-teal-300 border-teal-900/40',
  },
  {
    border: 'border-indigo-500',
    text: 'text-indigo-400',
    bg: 'bg-indigo-600',
    hoverBg: 'hover:text-indigo-300',
    indicator: 'bg-indigo-950/60 text-indigo-300 border-indigo-900/40',
  },
  {
    border: 'border-cyan-500',
    text: 'text-cyan-400',
    bg: 'bg-cyan-600',
    hoverBg: 'hover:text-cyan-300',
    indicator: 'bg-cyan-950/60 text-cyan-300 border-cyan-900/40',
  },
  {
    border: 'border-emerald-500',
    text: 'text-emerald-400',
    bg: 'bg-emerald-600',
    hoverBg: 'hover:text-emerald-300',
    indicator: 'bg-emerald-950/60 text-emerald-300 border-emerald-900/40',
  },
  {
    border: 'border-violet-500',
    text: 'text-violet-400',
    bg: 'bg-violet-600',
    hoverBg: 'hover:text-violet-300',
    indicator: 'bg-violet-950/60 text-violet-300 border-violet-900/40',
  },
  {
    border: 'border-sky-500',
    text: 'text-sky-400',
    bg: 'bg-sky-600',
    hoverBg: 'hover:text-sky-300',
    indicator: 'bg-sky-950/60 text-sky-300 border-sky-900/40',
  }
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [copiedTextId, setCopiedTextId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');

  // Get active items based on selected tab
  let activeList: any[] = [];
  let activeSessionTitle = "";
  let activeSessionDesc = "";

  if (currentTab === 'home') {
    activeList = [];
    activeSessionTitle = "Yapay Zekâ Eğitim Kılavuzu";
    activeSessionDesc = "Yapay zekâyı yalnızca kullanan değil, onunla üreten öğretmenler yetiştirmek üzere hazırlanan kapsamlı uygulama portalı.";
  } else if (currentTab === 'session1') {
    activeList = session1Topics;
    activeSessionTitle = "1. Oturum (1-2. Saat)";
    activeSessionDesc = "Yapay zeka felsefesi, istem (prompt) teknikleri ve terminal/CLI geliştirme komutları.";
  } else if (currentTab === 'session2') {
    activeList = session2Topics;
    activeSessionTitle = "2. Oturum (3-4. Saat)";
    activeSessionDesc = "Yapay zekâ ile görsel tasarım, şablon üretimi, video hazırlama ve seslendirme.";
  } else if (currentTab === 'session3') {
    activeList = session3Topics;
    activeSessionTitle = "3. Oturum (5-6. Saat)";
    activeSessionDesc = "Yapay zeka otonom ajanları, fonksiyon çağırma (tool calling) ve akıllı veritabanı akışları.";
  } else if (currentTab === 'session4') {
    activeList = session4Topics;
    activeSessionTitle = "4. Oturum (7-8. Saat)";
    activeSessionDesc = "Adım adım AI App kurma, kod yayınlama, GitHub entegrasyonu ve mezuniyet.";
  } else if (currentTab === 'models') {
    activeList = popularModels;
    activeSessionTitle = "Yapay Zekâ Modelleri";
    activeSessionDesc = "Eğitim ve günlük işlerinizde konumlandırabileceğiniz en güçlü üretken yapay zeka modelleri.";
  } else if (currentTab === 'resources') {
    activeList = additionalResources;
    activeSessionTitle = "Ek Kaynaklar & Mevzuat";
    activeSessionDesc = "Eğitimde yapay zekânın yasal, etik ve pedagojik kurallarına ilişkin resmi kılavuzlar.";
  }

  // Find active item details
  const activeItem = activeList.find(item => item.id === selectedItemId) || activeList[0];

  // Get dynamic cold color styling based on the active item's list index
  const activeItemIndex = activeList.findIndex(item => item.id === (activeItem?.id || selectedItemId));
  const activeItemColorTheme = COLD_COLORS[activeItemIndex !== -1 ? activeItemIndex % COLD_COLORS.length : 0];

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileView('list');
    if (tabId === 'session1') {
      setSelectedItemId(session1Topics[0].id);
    } else if (tabId === 'session2') {
      setSelectedItemId(session2Topics[0].id);
    } else if (tabId === 'session3') {
      setSelectedItemId(session3Topics[0].id);
    } else if (tabId === 'session4') {
      setSelectedItemId(session4Topics[0].id);
    } else if (tabId === 'models') {
      setSelectedItemId(popularModels[0].id);
    } else if (tabId === 'resources') {
      setSelectedItemId(additionalResources[0].id);
    } else {
      setSelectedItemId('');
    }
  };

  const handleCopyCode = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTextId(id);
      setTimeout(() => setCopiedTextId(null), 1500);
    } catch (err) {
      console.error('Kopyalama hatası:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans antialiased text-slate-100" id="main-app-container">
      {/* Universal Sticky Slim Header with Top-tab Hub */}
      <Header currentTab={currentTab} onChangeTab={handleTabChange} />

      {/* Main Workspace Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Active Section Description Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 shadow-2xl">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest bg-blue-950/80 px-3 py-1 rounded border border-blue-900/40">
              {currentTab === 'home' ? "HOŞ GELDİNİZ" : "AKTİF SEÇİM REHBERİ"}
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">{activeSessionTitle}</h2>
            <p className="text-sm text-slate-400 font-normal leading-relaxed">{activeSessionDesc}</p>
          </div>
          
          {['session1', 'session2', 'session3', 'session4'].includes(currentTab) && (
            <div className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 transition-colors text-slate-200 text-xs sm:text-sm px-4 py-2 rounded-xl font-bold border border-slate-700/60 self-start sm:self-auto select-none">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Süre: 2 Saatlik Pratik Blok</span>
            </div>
          )}
        </div>

        {/* Workspace Display Area */}
        {currentTab === 'home' ? (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
            id="home-dashboard"
          >
            {/* Mission Statement Banner */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
              <div className="space-y-4 max-w-2xl relative z-10 text-center md:text-left">
                <span className="text-[11px] bg-blue-500/30 text-blue-300 border border-blue-500/40 px-3.5 py-1 rounded-full font-mono font-bold tracking-widest uppercase">
                  TEMEL MİSYONUMUZ
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Yapay zekâyı yalnızca kullanan değil, <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent font-black">onunla üreten</span> öğretmenler yetiştirmektir.
                </h3>
                <p className="text-slate-350 text-sm sm:text-base font-normal leading-relaxed">
                  Bu portal, eğitimde yapay zekâyı uygulamalı, etik kurallara bağlı ve üretime dayalı biçimde ele alan 4 aşamalı gelişim safhasını içerir. Sol üstten dilediğiniz oturumu seçerek hemen başlayabilirsiniz.
                </p>
              </div>
              
              <div className="shrink-0 relative z-10 bg-slate-950/90 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-1.5 w-full md:w-56 text-center shadow-xl">
                <Sparkles className="w-8 h-8 text-blue-450 animate-pulse" />
                <span className="text-sm font-bold text-slate-100 mt-2">Eğitim Trendi 2026</span>
                <span className="text-xs font-mono text-slate-500">Üretken Sınıf & Proje</span>
              </div>
              
              {/* Background Glows */}
              <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute left-1/3 bottom-0 w-60 h-60 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Main Sections Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT: Katılımcılar Ne Kazanacak? (span 8) */}
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
                  <div>
                    <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                       <span className="w-1.5 h-4 bg-blue-405 rounded-full"></span>
                       Katılımcılar Ne Kazanacak?
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 font-light">Eğitim programını başarıyla tamamlayan öğretmenlerin elde edeceği temel yetkinlikler</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { icon: GraduationCap, title: '🎓 AI Destekli İçerik Üretme Becerisi', desc: 'MEB standartları ve Bloom taksonomisine tam uyumlu sınav, soru havuzu, rubrik ve ders içeriklerini yapay zeka yardımıyla saniyeler içinde hazırlama.' },
                      { icon: Activity, title: '📊 Veri Analizi ve Görselleştirme Yetkinliği', desc: 'Ham excel öğrenci verilerinden ve karne performans matrislerinden görsel grafikler, Mermaid.js akış şemaları ve akıllı rehberlik raporları üretme.' },
                      { icon: Bot, title: '🤖 Kendi Öğretmen Asistanını Geliştirme Deneyimi', desc: 'Flowise, LM Studio ve Ollama ile yerel veya bulut tabanlı Sokratik soru asistanları, kelime pratik botları ve kişiye özel akıllı rehberlik ajanları prototipleme.' },
                      { icon: Sparkles, title: '🧠 Yapay Zekâ Araçlarını Entegre Kullanma Becerisi', desc: 'ChatGPT, Gemini, Claude, Canva, Adobe Firefly ve ElevenLabs platformlarını birbirleriyle entegre ederek çok yönlü çok modlu içerikler tasarlama.' },
                      { icon: Globe, title: '🌐 Web Ortamında Proje Yayınlama Deneyimi', desc: 'Yazılan frontend eğitim uygulamalarını Firebase Hosting ve Netlify servisleri kullanarak küresel erişime açma, CI/CD süreçlerini yönetme.' },
                      { icon: Terminal, title: '⚡ CLI Araçlarıyla Hızlı Üretim Yetkinliği', desc: 'Komut satırı (CMD/Terminal), Node.js felsefesi ve Gemini CLI kullanarak dosyaları ve kod tabanlarını terminalden saniyeler içinde analiz ettirip yönetme.' }
                    ].map((kazanim, idx) => {
                      const KazanimIcon = iconMap[kazanim.icon] || HelpCircle;
                      const titleText = kazanim.title.substring(2);
                      const emoji = kazanim.title.substring(0, 2);
                      return (
                        <div key={idx} className="bg-slate-950/40 hover:bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 transition-all duration-150 flex items-start gap-3.5 group">
                          <div className="bg-slate-905 group-hover:bg-blue-600 group-hover:text-white text-blue-400 border border-slate-800 rounded-xl p-2 w-10 h-10 flex items-center justify-center shadow-xs shrink-0 transition-colors text-lg">
                            {emoji}
                          </div>
                          <div className="space-y-1">
                            <h5 className="text-sm font-bold text-slate-205 tracking-tight group-hover:text-blue-400 transition-colors">{titleText}</h5>
                            <p className="text-xs font-light leading-relaxed text-slate-400">{kazanim.desc}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Eğitimde Öne Çıkan Yapay Zekâ Uygulamaları */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
                  <div>
                    <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                       <span className="w-1.5 h-4 bg-blue-405 rounded-full"></span>
                       Eğitimde Öne Çıkan Yapay Zekâ Uygulamaları
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 font-light">Eğitmenler ve akademisyenler için üretkenliği artıran, en popüler pratik yapay zekâ araçları</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {eduTools.map((tool) => (
                      <a
                        key={tool.id}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col justify-between bg-slate-950/40 hover:bg-slate-950/80 border border-slate-800 hover:border-blue-900/65 rounded-xl p-4 transition-all duration-150 shadow-sm"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-bold text-slate-200 group-hover:text-blue-400 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                              {tool.name}
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors shrink-0" />
                          </div>
                          <p className="text-xs text-slate-400 font-light leading-relaxed">
                            {tool.description}
                          </p>
                        </div>
                        <div className="pt-3 text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1">
                          <span>Aracı Ziyaret Et</span>
                          <ChevronRight className="w-2.5 h-2.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT: Kimler Katılabilir? + Quick Links (span 4) */}
              <div className="lg:col-span-4 space-y-6">
                {/* Kimler Katılabilir? */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-6 space-y-4">
                  <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                     <span className="w-1.5 h-4 bg-blue-405 rounded-full"></span>
                     Kimler Katılabilir?
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="bg-blue-950/30 border border-blue-900/40 rounded-xl p-4 flex items-start gap-3">
                      <div className="bg-blue-900/50 text-blue-300 rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">✓</div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-200">Tüm Öğretmenlere Açık</p>
                        <p className="text-xs leading-relaxed text-slate-400 font-light">Eğitim tüm öğretmenlere açıktır. Branş veya kademe fark etmeksizin dileyen her eğitimci programa katılabilir.</p>
                      </div>
                    </div>

                    <div className="bg-slate-950/40 border border-slate-850 rounded-xl p-4 flex items-start gap-3">
                      <div className="bg-slate-800 text-slate-400 rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">✓</div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-200">Dijital Okuryazarlık</p>
                        <p className="text-xs leading-relaxed text-slate-400 font-light">Temel dijital becerilere sahip katılımcılar süreçten maksimum verim alacaktır.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Navigation Guide */}
                <div className="bg-gradient-to-br from-blue-950 to-indigo-950 text-white rounded-2xl p-6 space-y-4 relative overflow-hidden border border-blue-900/40 shadow-xl">
                  <div className="relative z-10 space-y-1.5">
                    <h4 className="text-xs font-bold text-blue-300 uppercase tracking-widest font-mono">Hızlı Başlangıç</h4>
                    <p className="text-base font-bold tracking-tight text-white font-semibold">Modülleri İncelemeye Başla</p>
                    <p className="text-xs font-light text-blue-200 leading-relaxed">
                      Lütfen zengin ders içeriklerine, terminal komutlarına ve kod havuzlarına doğrudan erişmek için sekme bağlantılarını kullanın.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 pt-1 relative z-10">
                    {[
                      { id: 'session1', label: '1. Oturum', color: 'bg-white/10 hover:bg-white/20 border-white/5' },
                      { id: 'session2', label: '2. Oturum', color: 'bg-white/10 hover:bg-white/20 border-white/5' },
                      { id: 'session3', label: '3. Oturum', color: 'bg-white/10 hover:bg-white/20 border-white/5' },
                      { id: 'session4', label: '4. Oturum', color: 'bg-white/10 hover:bg-white/20 border-white/5' }
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => handleTabChange(btn.id)}
                        className={`py-2.5 px-3 rounded-lg text-xs font-bold text-center text-white ${btn.color} transition-all duration-150 cursor-pointer border active:scale-95`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>

                  <div className="absolute right-0 bottom-0 w-28 h-28 bg-white/5 rounded-full blur-xl pointer-events-none" />
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          <>
            {/* Mobile View Toggle (Visible only on mobile screen for sub tabs) */}
            <div className="flex sm:hidden bg-slate-900 p-1.5 rounded-2xl mb-4 border border-slate-800 gap-1 w-full" id="mobile-view-tabs">
              <button
                onClick={() => setMobileView('list')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${
                  mobileView === 'list' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-slate-450 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Konular ({activeList.length})
              </button>
              <button
                onClick={() => setMobileView('detail')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${
                  mobileView === 'detail' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-slate-450 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                İçerik Detayı
              </button>
            </div>

            {/* Split Screen Master-Detail Workspace Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start" id="workspace-grid-wrapper">
              
              {/* LEFT COLUMN: Clean List Selection (span 4) */}
              <div className={`sm:col-span-4 space-y-4 ${mobileView === 'list' ? 'block' : 'hidden sm:block'}`}>
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
                  <div className="bg-slate-950 px-4 py-4 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Seçenek Listesi</span>
                  </div>
                  
                  <div className="divide-y divide-slate-800 max-h-[620px] overflow-y-auto scrollbar-thin">
                    {activeList.map((item, index) => {
                      const isSelected = selectedItemId === item.id;
                      const colorTheme = COLD_COLORS[index % COLD_COLORS.length];
                      
                      // Extract icon or make generic circle for models/resources
                      let ItemIcon = HelpCircle;
                      if (item.icon) ItemIcon = iconMap[item.icon] || HelpCircle;
                      else if (currentTab === 'models') ItemIcon = Cpu;
                      else if (currentTab === 'resources') ItemIcon = FileText;

                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSelectedItemId(item.id);
                             setMobileView('detail');
                          }}
                          className={`w-full flex items-start gap-3.5 p-4 text-left transition-all border-l-4 cursor-pointer ${
                            isSelected 
                              ? `bg-slate-950 text-white ${colorTheme.border} font-bold shadow-inner` 
                              : `border-transparent text-slate-300 hover:bg-slate-800/40 ${colorTheme.hoverBg}`
                          }`}
                          id={`list-item-${item.id}`}
                        >
                          <div className={`mt-0.5 rounded-lg p-2.5 flex items-center justify-center shrink-0 transition-all ${
                            isSelected ? `${colorTheme.bg} text-white shadow-md` : `bg-slate-950 ${colorTheme.text} border border-slate-800`
                          }`}>
                            <ItemIcon className="w-4.5 h-4.5" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1.5">
                              <span className={`text-sm block truncate ${isSelected ? `${colorTheme.text} font-bold` : 'text-slate-200'}`}>
                                {item.title || item.name}
                              </span>
                              <ChevronRight className={`w-3.5 h-3.5 shrink-0 text-slate-600 transition-transform ${isSelected ? `translate-x-0.5 ${colorTheme.text}` : ''}`} />
                            </div>
                            <p className="text-xs text-slate-400 truncate mt-1">
                              {item.shortDesc || item.developer || item.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Highly Polished Deep-Dive Reading Canvas (span 8) */}
              <div className={`sm:col-span-8 space-y-6 ${mobileView === 'detail' ? 'block' : 'hidden sm:block'}`} id="reading-column">
                {activeItem ? (
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-6 sm:p-8" id="deep-dive-card">
                    
                    {/* Back button for mobile view */}
                    <button
                      onClick={() => setMobileView('list')}
                      className="sm:hidden mb-4 flex items-center gap-1.5 px-4 py-2 bg-slate-850 hover:bg-slate-800 text-slate-200 hover:text-white font-bold rounded-lg text-xs border border-slate-700/60 cursor-pointer transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                      Geri Dön
                    </button>

                    {/* ======================================================== */}
                    {/* CASE A: TOPIC CARD RENDERING (SESSIONS 1-4)              */}
                    {/* ======================================================== */}
                    {['session1', 'session2', 'session3', 'session4'].includes(currentTab) && (
                      <div className="space-y-6">
                        {/* Header */}
                        <div className="flex items-start gap-4 pb-6 border-b border-slate-800">
                          <div className={`text-white rounded-xl p-3 shadow-md flex items-center justify-center shrink-0 transition-colors ${activeItemColorTheme.bg}`}>
                            {(() => {
                              const TopicIcon = iconMap[activeItem.icon] || HelpCircle;
                              return <TopicIcon className="w-6 h-6 text-white" />;
                            })()}
                          </div>
                          
                          <div className="space-y-2">
                            <span className={`text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 border rounded transition-all ${activeItemColorTheme.indicator}`}>
                              {activeSessionTitle}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">{activeItem.title}</h3>
                            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">{activeItem.shortDesc}</p>
                          </div>
                        </div>

                        {/* Logic / Overview */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-450 font-mono font-semibold">Mantık ve Genel Bakış</h4>
                          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">{activeItem.content?.overview}</p>
                        </div>

                        {/* Key Points */}
                        {activeItem.content?.keyPoints && (
                          <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-450 font-mono font-semibold">Kritik Pedagojik Noktalar & Uygulama</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {activeItem.content.keyPoints.map((point: string, idx: number) => {
                                const colonIndex = point.indexOf(':');
                                const hasColon = colonIndex !== -1;
                                const pointHead = hasColon ? point.substring(0, colonIndex) : point;
                                const pointBody = hasColon ? point.substring(colonIndex + 1) : '';
                                return (
                                  <div key={idx} className="bg-slate-950/40 hover:bg-slate-950/80 border border-slate-855 p-4 rounded-xl flex items-start gap-3 transition-colors">
                                    <span className={`text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0 select-none mt-0.5 border ${activeItemColorTheme.indicator}`}>
                                      {idx + 1}
                                    </span>
                                    <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                                      {hasColon ? (
                                        <>
                                          <strong className={`font-semibold ${activeItemColorTheme.text}`}>{pointHead}:</strong>
                                          {pointBody}
                                        </>
                                      ) : (
                                        point
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Interactive Widget Option (Prompt Builder) */}
                        {activeItem.id === 'rgb-yapisi' && (
                          <div className="pt-2">
                            <PromptBuilder />
                          </div>
                        )}

                        {/* Source / Code Sandbox */}
                        {activeItem.content?.tipsOrCode && activeItem.id !== 'rgb-yapisi' && (
                          <div className="space-y-2 pt-2">
                            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-455 font-mono font-semibold">
                              <span>Uygulama Örneği & Rehber Metin</span>
                              <button
                                onClick={() => handleCopyCode(activeItem.content.tipsOrCode || '', activeItem.id)}
                                className={`text-xs px-3 py-1.5 rounded cursor-pointer flex items-center gap-1.5 font-bold transition-all border active:scale-[0.97] ${activeItemColorTheme.indicator}`}
                              >
                                {copiedTextId === activeItem.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-450 animate-scale" />
                                    Kopyalandı!
                                  </>
                                ) : (
                                  <>
                                    <Copy className={`w-3.5 h-3.5 ${activeItemColorTheme.text}`} />
                                    Kopyala
                                  </>
                                )}
                              </button>
                            </div>
                            <pre className="bg-slate-950 text-slate-200 rounded-xl p-4 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-850 leading-relaxed scrollbar-thin">
                              <code>{activeItem.content.tipsOrCode}</code>
                            </pre>
                          </div>
                        )}

                        {/* Interactive Links Block */}
                        {activeItem.content?.links && activeItem.content.links.length > 0 && (
                          <div className="space-y-3 pt-5 border-t border-slate-800">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-455 font-mono font-semibold">İlgili Araçlar & Hızlı Bağlantılar ({activeItem.content.links.length})</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {activeItem.content.links.map((link: any, idx: number) => (
                                <a
                                  key={idx}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`group flex flex-col justify-between bg-slate-950/40 hover:bg-slate-950/85 border border-slate-850 rounded-xl p-4 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-sm ${activeItemColorTheme.border ? `hover:${activeItemColorTheme.border}/60` : 'hover:border-blue-900/60'}`}
                                >
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between gap-2">
                                      <span className={`text-xs sm:text-sm font-bold text-slate-200 group-hover:underline ${activeItemColorTheme.text ? `group-hover:${activeItemColorTheme.text}` : 'group-hover:text-blue-400'}`}>
                                        {link.title}
                                      </span>
                                      <ExternalLink className={`w-3.5 h-3.5 text-slate-500 transition-colors shrink-0 ${activeItemColorTheme.text ? `group-hover:${activeItemColorTheme.text}` : 'group-hover:text-blue-400'}`} />
                                    </div>
                                    <p className="text-xs text-slate-400 font-light leading-relaxed animate-fade">
                                      {link.description}
                                    </p>
                                  </div>
                                  <div className={`pt-3 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 ${activeItemColorTheme.text ? `${activeItemColorTheme.text}` : 'text-blue-400'}`}>
                                    <span>Giriş Yap</span>
                                    <ChevronRight className="w-2.5 h-2.5 transition-transform group-hover:translate-x-1" />
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ======================================================== */}
                    {/* CASE B: MODEL DETAIL RENDERING                           */}
                    {/* ======================================================== */}
                    {currentTab === 'models' && (
                      <div className="space-y-6">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
                          <div className="flex items-center gap-4">
                            <div className="bg-blue-600 text-white rounded-xl w-12 h-12 flex items-center justify-center font-bold text-lg shadow-md shrink-0">
                              {activeItem.name?.[0]}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-xl font-bold tracking-tight text-white">{activeItem.name}</h3>
                                <span className="text-[10px] font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 uppercase">
                                  {activeItem.developer}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 font-light mt-1">Yapay Zekâ Dil Modeli Kataloğu</p>
                            </div>
                          </div>
                          
                          <a
                            href={activeItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-md text-xs sm:text-sm cursor-pointer"
                          >
                            <span>Model Sayfasına Git</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        {/* Overview description */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-[#5c7bb5] font-mono">Model Hakkında</h4>
                          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">{activeItem.description}</p>
                        </div>

                        {/* Highlighted core parameter traits */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          <div className="bg-blue-950/30 border border-blue-900/40 rounded-xl p-4 space-y-2">
                            <h5 className="text-xs font-bold text-blue-400 block uppercase tracking-wider">⚡ EN GÜÇLÜ ÖZELLİĞİ</h5>
                            <p className="text-xs sm:text-sm text-slate-300 leading-normal font-light">{activeItem.strength}</p>
                          </div>
                          
                          <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 space-y-2">
                            <h5 className="text-xs font-bold text-slate-300 block uppercase tracking-wider">🎯 ÖNERİLEN KULLANIM YOLU</h5>
                            <p className="text-xs sm:text-sm text-slate-300 leading-normal font-light">{activeItem.useCase}</p>
                          </div>
                        </div>

                        {/* Call to action card */}
                        <div className="bg-slate-950 border border-slate-800 text-slate-150 rounded-xl p-5 mt-4 space-y-3.5">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Eğitim Tavsiyesi</span>
                          </div>
                          <p className="text-xs sm:text-sm leading-relaxed text-slate-300 font-light">
                            Bu modeli eğitim çalışmalarınızda bir asistan olarak kullanabilirsiniz. Doğrudan resmi sohbet sayfasına gitmek için aşağıdaki bağlantıyı kullanabilirsiniz. Tüm bağlantılar canlandırılmış ve çalışır durumdadır.
                          </p>
                          <a
                            href={activeItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-blue-400 hover:text-blue-300 font-bold transition-colors mt-1"
                          >
                            {activeItem.name} Portalını Aç <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )}

                    {/* ======================================================== */}
                    {/* CASE C: ADDITIONAL RESOURCE CARD RENDERING              */}
                    {/* ======================================================== */}
                    {currentTab === 'resources' && (
                      <div className="space-y-6">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-6 border-b border-slate-800">
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold text-blue-300 bg-blue-950/80 px-2.5 py-1 border border-blue-900/40 rounded">
                              RESMİ MEVZUAT & ETİK REHBERLER
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mt-2">{activeItem.title}</h3>
                            <p className="text-xs sm:text-sm text-slate-450">Öğretmenler, Akademisyenler ve Araştırmacılar İçin Yasal Dayanaklar</p>
                          </div>
                          
                          <a
                            href={activeItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-md text-xs sm:text-sm cursor-pointer shrink-0"
                          >
                            <span>Belgeyi İncele</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        {/* Overview description */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-[#5c7bb5] font-mono">Rehber Özeti ve Önemi</h4>
                          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">{activeItem.description}</p>
                        </div>

                        {/* Structured info point on compliance */}
                        <div className="bg-slate-950/40 rounded-xl border border-slate-800 p-5 space-y-3">
                          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">Eğitim Ölçütlerine Uyum</h5>
                          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                            Bu resmi belge, ders geliştirme, ders dışı görevler, ölçme-değerlendirme ve veri toplama safhalarında yapay zeka araçlarının pedagojiye entegre edilmesi için zorunlu kılınan asgari şartları işaret eder.
                          </p>
                          <div className="pt-1">
                            <a 
                              href={activeItem.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-xs sm:text-sm text-blue-450 hover:text-blue-300 font-bold inline-flex items-center gap-1 hover:underline"
                            >
                              Resmi Kaynak Adresini Görüntüle <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                ) : (
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center text-slate-400 font-light">
                    Lütfen incelemek için sol taraftaki menü başlıklarından birini seçiniz.
                  </div>
                )}
              </div>

            </div>
          </>
        )}

      </main>

      {/* Persistent Elegant Footer with Credits */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="text-center sm:text-left">
            <p className="font-bold text-slate-300">Yapay Zekâ Eğitim Rehberi | Burak TURGUT</p>
            <p className="mt-1 font-light text-slate-500">Katılımcıların eğitimi uygulamalı takip etmesi amacıyla tasarlanmış canlandırılmış portal.</p>
          </div>
          <div className="flex items-center gap-4 font-bold">
            <span>Haziran 2026</span>
            <span className="text-slate-850">|</span>
            <a href="mailto:burakturgut53@gmail.com" className="hover:text-blue-400 text-slate-300 transition-colors">
              burakturgut53@gmail.com
            </a>
          </div>
        </div>
      </footer>
      <BrainAssistant />
    </div>
  );
}
