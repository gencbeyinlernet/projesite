import { useState } from 'react';
import { Sparkles, Copy, Check, RefreshCw } from 'lucide-react';

export default function PromptBuilder() {
  const [role, setRole] = useState('Kıdemli Node.js Geliştiricisi');
  const [goal, setGoal] = useState('Verilen bir dizindeki dosyaları tarayarak içlerindeki TODO yorum satırlarını bulup CSV raporu olarak döndüren bir komut satırı scripti yazmak');
  const [boundary, setBoundary] = useState('Yalnızca çalıştırılabilir JavaScript kodu ver. Açıklamaları kod bloklarının içerisine yorum olarak ekle. Ekstra açıklama metni yazma.');
  const [copied, setCopied] = useState(false);

  const roles = [
    'Kıdemli Node.js Geliştiricisi',
    'SEO Pazarlama Uzmanı',
    'İçerik Editörü ve Yazar',
    'UX/UI Danışmanı',
    'Akademik Araştırma Görevlisi'
  ];

  const goals = [
    'Verilen bir dizindeki dosyaları tarayarak içlerindeki TODO yorum satırlarını bulup CSV raporu olarak döndüren bir komut satırı scripti yazmak',
    'Yeni kurulacak bir yapay zeka e-ticaret botu için ilgi çekici, tıklama oranı yüksek 3 farklı reklam başlığı ve açıklaması üretmek',
    'Karmaşık bir veri tabanı şemasından yola çıkarak veri tutarlılığını test eden SQL test sorguları hazırlamak',
    'Yeni başlayanlar için adım adım 5 günlük etkili bir yapay zeka okuryazarlığı çalışma müfredatı hazırlamak'
  ];

  const boundaries = [
    'Yalnızca çalıştırılabilir JavaScript kodu ver. Açıklamaları kod bloklarının içerisine yorum olarak ekle. Ekstra açıklama metni yazma.',
    'Tamamen Markdown formatında, bol başlık ve madde kullanarak yaz. Teknik terimlerin yanına parantez içinde basit Türkçe karşılıklarını koy.',
    'Samimi, esprili fakat konunun uzmanlığını hissettiren bir dille yaz. 250 kelimeyi aşma.',
    'Sadece JSON formatında çıktı ver. Başka hiçbir giriş veya çıkış metni ekleme.'
  ];

  const generatedPrompt = `[ROL]: Sen son derece deneyimli bir ${role}sin.

[HEDEF]: Senden ricam, şu görevi eksiksiz yerine getirmen:
"${goal}"

[SINIRLAR & FORMAT]: Bu görevi yaparken aşağıdaki kurallara kesinlikle uyman gerekiyor:
- ${boundary}
- Yanıtı Türkçe dilinde ver.`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Kopyalama başarısız', err);
    }
  };

  const handleRandomize = () => {
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    const randomGoal = goals[Math.floor(Math.random() * goals.length)];
    const randomBoundary = boundaries[Math.floor(Math.random() * boundaries.length)];
    setRole(randomRole);
    setGoal(randomGoal);
    setBoundary(randomBoundary);
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-6 lg:p-8" id="rgb-interactive-tool">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h4 className="font-bold text-white flex items-center gap-2 text-base sm:text-lg">
            <Sparkles className="w-5 h-5 text-blue-400" />
            İnteraktif RGB Prompt Oluşturucu
          </h4>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-light">
            Rol, Hedef ve Sınırları belirleyerek yapay zekaya göndereceğiniz kusursuz şablonu anında oluşturun.
          </p>
        </div>
        <button
          onClick={handleRandomize}
          className="flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-200 hover:text-white bg-slate-850 hover:bg-slate-800 border border-slate-750 rounded-xl cursor-pointer transition-colors"
          title="Rastgele Senaryo Seç"
          id="btn-randomize-prompt"
        >
          <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
          Rastgele Değiştir
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column inputs */}
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-red-400 mb-2 flex items-center justify-between">
              <span>🔴 R: Role (Rol & Kimlik)</span>
              <span className="text-[10px] text-slate-500 font-normal lowercase select-none">Tıklayıp Seçin</span>
            </label>
            <div className="flex gap-2 flex-wrap mb-2">
              {roles.slice(0, 3).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-2.5 py-1 text-[11px] rounded font-bold transition-all border cursor-pointer ${
                    role === r
                      ? 'bg-red-950/40 text-red-300 border-red-800'
                      : 'bg-slate-950 text-slate-400 border-slate-850 hover:bg-slate-800/60'
                  }`}
                >
                  {r.split(' ')[0]} {r.split(' ')[1] || ''}
                </button>
              ))}
            </div>
            <textarea
              className="w-full text-sm p-3 bg-slate-950 text-slate-200 border border-slate-800 rounded-xl focus:border-red-450 focus:ring-1 focus:ring-red-950 outline-none transition-all resize-y min-h-[60px]"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Yazıcılık rolü veya profesyonel ünvan girin..."
              rows={2}
              id="input-role"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 flex items-center justify-between">
              <span>🟢 G: Goal (Görev & Hedef)</span>
              <span className="text-[10px] text-slate-500 font-normal lowercase select-none">Detaylı talimat</span>
            </label>
            <textarea
              className="w-full text-sm p-3 bg-slate-950 text-slate-200 border border-slate-800 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-950 outline-none transition-all resize-y min-h-[90px]"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Yazmasını, hesaplamasını ya da kodlamasını istediğiniz ana görevi detaylandırın..."
              rows={3}
              id="input-goal"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-blue-400 mb-2 flex items-center justify-between">
              <span>🔵 B: Brand & Boundary (Kural & Biçim)</span>
              <span className="text-[10px] text-slate-500 font-normal lowercase select-none">Sınırlılık</span>
            </label>
            <textarea
              className="w-full text-sm p-3 bg-slate-950 text-slate-200 border border-slate-800 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-950 outline-none transition-all resize-y min-h-[80px]"
              value={boundary}
              onChange={(e) => setBoundary(e.target.value)}
              placeholder="Kelime sınırı, anlatım tonu, kullanılacak ya da kaçınılacak kelimeler..."
              rows={3}
              id="input-boundary"
            />
          </div>
        </div>

        {/* Right column prompt output preview */}
        <div className="flex flex-col h-full">
          <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
            <span>Hazır Prompt Çıktısı (Kopyalamaya Hazır)</span>
            <span className="text-[10px] bg-blue-950/80 text-blue-300 px-2.5 py-1 rounded border border-blue-900/40 font-bold">RGB Yapılandırılmış</span>
          </div>
          <div className="flex-1 bg-slate-950 text-slate-200 rounded-xl p-4 font-mono text-xs sm:text-sm overflow-auto min-h-[250px] relative leading-relaxed group border border-slate-850">
            <button
              onClick={handleCopy}
              className={`absolute top-3 right-3 p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                copied
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-850 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-750'
              }`}
              title="Kopyala"
              id="btn-copy-generated"
            >
              {copied ? <Check className="w-4 h-4 animate-scale shrink-0" /> : <Copy className="w-4 h-4 shrink-0" />}
            </button>
            <div className="whitespace-pre-wrap pr-10">
              <span className="text-red-400 font-bold">[ROL]:</span> Sen son derece deneyimli bir <span className="text-white underline decoration-red-405/40">{role}</span>sin.
              {'\n\n'}
              <span className="text-emerald-400 font-bold">[HEDEF]:</span> Senden ricam, şu görevi eksiksiz yerine getirmen:
              {'\n'}
              <span className="text-white italic">"{goal}"</span>
              {'\n\n'}
              <span className="text-blue-400 font-bold">[SINIRLAR & FORMAT]:</span> Bu görevi yaparken aşağıdaki kurallara kesinlikle uyman gerekiyor:
              {'\n'}
              <span className="text-white">- {boundary}</span>
              {'\n'}- Yanıtı Türkçe dilinde ver.
            </div>
          </div>
          <div className="text-slate-450 text-xs mt-3 flex items-center gap-1.5 font-light">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Kopyaladıktan sonra ChatGPT, Claude veya Gemini pencerelerine yapıştırıp test edebilirsiniz.
          </div>
        </div>
      </div>
    </div>
  );
}
