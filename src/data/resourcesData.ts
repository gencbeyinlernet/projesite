export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
}

export const additionalResources: Resource[] = [
  {
    id: "meb-etik-kilavuz",
    title: "1. Eğitimde Yapay Zekâ Uygulamaları Etik Kılavuzu (MEB)",
    description: "Eğitimde yapay zekânın güvenli, etik ve sorumlu kullanımına yönelik öğretmen rehberi.",
    url: "https://www.meb.gov.tr/egitimde-yapay-zeka-uygulamalari-etik-kilavuzu-yayimlandi/haber/39496/tr"
  },
  {
    id: "yok-etik-rehber",
    title: "2. Yükseköğretimde Üretken Yapay Zekâ Kullanımına Dair Etik Rehber (YÖK)",
    description: "Akademik çalışmalarda ve bilimsel yayınlarda yapay zekâ kullanım kurallarını açıklar.",
    url: "https://proje.yok.gov.tr/documentFiles/17539645334.Yükseköğretimde%20üretken%20yapay%20zeka%20kullanımı-tr.pdf"
  },
  {
    id: "unesco-ai-guide",
    title: "3. Eğitim ve Araştırmada Üretken Yapay Zekâ Kılavuzu (UNESCO)",
    description: "Yapay zekânın eğitim ve araştırmadaki fırsatları, riskleri ve etik boyutlarını ele alan uluslararası rehber.",
    url: "https://unesdoc.unesco.org/ark:/48223/pf0000390842/PDF"
  },
  {
    id: "meb-eylem-plani",
    title: "4. Eğitimde Yapay Zekâ Politika Belgesi ve Eylem Planı (2025-2029)",
    description: "Türkiye'nin eğitimde yapay zekâ yol haritası ve stratejik hedefleri.",
    url: "https://yazek.meb.gov.tr"
  },
  {
    id: "tubitak-ai-rehber",
    title: "5. TÜBİTAK Destek Süreçlerinde Üretken Yapay Zekâ Kullanım Rehberi",
    description: "TÜBİTAK proje başvuruları ve değerlendirme süreçlerinde yapay zekâ kullanım esasları.",
    url: "https://www.tubitak.gov.tr"
  },
  {
    id: "meb-ogretmen-rehber",
    title: "6. Yapay Zekâ ve Eğitim: Öğretmenler İçin Uygulama Rehberi",
    description: "Ders planlama, içerik üretimi ve ölçme-değerlendirmede yapay zekâ kullanım örnekleri sunar.",
    url: "https://gemlik.meb.gov.tr/www/ogretmenler-icin-yapay-zeka-destekli-egitim-rehberi-hazirlandi/icerik/1971"
  },
  {
    id: "unesco-tr-pdf",
    title: "7. Eğitim ve Araştırmada Üretken Yapay Zekâ Kılavuzu (Türkçe PDF)",
    description: "UNESCO rehberinin Türkçe sürümü; öğretmenler ve araştırmacılar için hazırlanmıştır.",
    url: "https://lapsekiplevneortaokulu.meb.k12.tr/meb_iys_dosyalar/17/11/722533/dosyalar/2025_02/03182741_egitimvearastirmadauretkenyapayzekkilavuzu.pdf"
  }
];
