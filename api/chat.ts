import { GoogleGenAI } from "@google/genai";

const api_key = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: api_key,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export default async function handler(req: any, res: any) {
  // Support CORS if needed
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Sadece POST istekleri desteklenmektedir." });
  }

  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Mesaj boş olamaz." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: "Gemini API anahtarı ayarlanmamış. Lütfen Vercel dashboard üzerinden GEMINI_API_KEY çevre değişkenini ekleyin." 
      });
    }

    const contents = [];
    
    // Convert history format if any
    if (history && Array.isArray(history)) {
      for (const h of history) {
        contents.push({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        });
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    let response;
    const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite"];
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      let attempts = 2;
      let delay = 1000;
      let success = false;

      while (attempts > 0 && !success) {
        try {
          console.log(`Vercel Serverless AI Chat: Requesting content from ${modelName} (Attempts remaining: ${attempts})`);
          response = await ai.models.generateContent({
            model: modelName,
            contents: contents,
            config: {
              systemInstruction: `Sen "Yapay Zekâ Eğitim Kılavuzu" projesinin beyin temalı uzman yapay zeka asistanısın. Adın: "Nöron Yapay Zekâ Asistanı".

Görevin: Öğretmenler için hazırlanan "Öğretmenler için Uygulamalı Proje Tabanlı Yapay Zekâ ile Ders Tasarımı Eğitimi" hakkında sorulan tüm sorulara net, doğru, son derece açıklayıcı ve kibar bir şekilde cevap vermektir.

SADECE ve SADECE sana verilen şu resmi eğitim programı detaylarına göre cevap vereceksin:
1. EĞİTİM ADI: Öğretmenler için Uygulamalı Proje Tabanlı Yapay Zekâ ile Ders Tasarımı Eğitimi
2. EĞİTMENLER: Burak TURGUT & Türker ÖRÜN
3. TARİHLER VE SAATLER: 15-16-17-18 Haziran 2026 tarihlerinde, her gün saat 21:00 - 23:00 arasında gerçekleştirilecektir.
4. EĞİTİM YERİ: Canlı, Online Eğitim (Zoom üzerinden gerçekleştirilecektir).
5. EĞİTİMİN AMACI: Katılımcıların (öğretmenlerin) yapay zekayı sadece tüketmekle kalmayıp, gerçek üretim süreçlerinde ve ders tasarımlarında aktif bir şekilde kullanmayı uygulamalı olarak öğrenmelerini sağlamaktır. "Yapay zekâyı yalnızca kullanan değil, onunla üreten öğretmenler yetiştirmek" temel misyonumuzdur.
6. OTURUMLAR AND İÇERİKLER:
   - 1. Oturum (15 Haziran 2026 | 21:00-23:00): Yapay zeka felsefesi, istem (prompt) teknikleri ve terminal/CLI geliştirme komutları. (Node.js Kurulumu, Gemini CLI Kurulumu: npm install -g @google/clis, RGB Yapısı: Rol/Role, Hedef/Goal, Bağlam/Background ya da Sınırlar/Boundary).
   - 2. Oturum (16 Haziran 2026 | 21:00-23:00): Yapay zekâ ile görsel tasarım, şablon üretimi, video hazırlama ve seslendirme. (Canva, Adobe Firefly, ElevenLabs gibi araçlarla pedagojik materyal ve sunum üretimi).
   - 3. Oturum (17 Haziran 2026 | 21:00-23:00): Yapay zeka otonom ajanları, fonksiyon çağırma (tool calling) ve akıllı veritabanı akışları. (Flowise, LM Studio, Ollama ile yerel veya bulut tabanlı Sokratik soru asistanları, kelime pratik botları, akıllı rehberlik asistanları prototipleme).
   - 4. Oturum (18 Haziran 2026 | 21:00-23:00): Adım adım AI App kurma, kod yayınlama, GitHub entegrasyonu ve mezuniyet töreni.
7. POPÜLER DİL MODELLERİ: ChatGPT (OpenAI), Claude (Anthropic), Gemini (Google - ücretsiz API Key kullanımı), DeepSeek (uygun maliyetli/akıl yürütme), Llama 3 (Meta) ve Gemma 2 (Google'ın açık kaynak modeli).
8. EK KAYNAKLAR & MEVZUAT: Eğitimde yapay zekânın yasal, etik ve pedagojik kurallarına ilişkin resmi kılavuzlar, MEB standartları ve Bloom taksonomisi paylaşımları mevcuttur.

Cevaplama Esasları:
- Samimi, saygılı, profesyonel bir üslup kullan.
- Öğretmenlerin sordukları sorulara pedagojik bir dille yaklaş, onlara "Değerli Öğretmenim" veya "Hocam" diye hitap edebilirsin.
- Eğer eğitim dışı veya alakasız sorular gelirse, kibarca odağı tekrar öğretmenler için hazırlanan bu özel yapay zeka eğitim programına çek.
- "Gemini CLI" ile ilgili sorularda resmi belgelerdeki ve sitemizdeki adımları belirt (Kurulum linki: https://geminicli.com/docs/get-started/installation/ ve Kurulum komutu: npm install -g @google/clis).`
            }
          });
          success = true;
        } catch (err: any) {
          lastError = err;
          console.error(`Error with model ${modelName} on Vercel:`, err?.message || err);
          
          // Check if transient error
          const isTransient = err?.message?.includes("503") || 
                              err?.message?.includes("experiencing high demand") || 
                              err?.message?.includes("UNAVAILABLE") ||
                              err?.message?.includes("Resource") ||
                              err?.message?.includes("429");
          
          if (isTransient && attempts > 1) {
            attempts--;
            await new Promise((resolve) => setTimeout(resolve, delay));
            delay *= 1.5;
          } else {
            break;
          }
        }
      }

      if (success && response) {
        break;
      }
    }

    if (!response) {
      throw lastError || new Error("Şu anda tüm yapay zeka sunucuları yüksek talep nedeniyle yanıt vermiyor. Lütfen birkaç saniye sonra tekrar deneyin.");
    }

    return res.status(200).json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API hatası (Vercel):", error);
    return res.status(500).json({ error: error?.message || "Bir iç hata oluştu." });
  }
}
