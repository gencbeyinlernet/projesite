/* =========================================================================
   Proje Tabanlı Yapay Zekâ Eğitim Kılavuzu — Ortak JavaScript
   Header / Footer enjeksiyonu, mobil menü, açılır liste, kod kopyalama,
   içindekiler (TOC) scrollspy, akordeon ve "yukarı çık" butonu.
   Build aracı gerektirmez; doğrudan tarayıcıda çalışır.
   ========================================================================= */

(function () {
  "use strict";

  /* ---- 10 Modüllük Claude Programı (dropdown + hub sayfası + prev/next için tek kaynak) ---- */
  var MODULES = [
    { n: 1,  file: "modul-1.html",  title: "Yapay Zekâ Ajanlarına Giriş ve Doğru Zihniyet", short: "Asistan mı, ajan mı? Doğru bakış açısını kur.", color: "blue" },
    { n: 2,  file: "modul-2.html",  title: "Kurulum, Hesaplar ve Çalışma Ortamı", short: "Claude, Node.js, terminal ve VS Code kurulumu.", color: "teal" },
    { n: 3,  file: "modul-3.html",  title: "Terminal Kullanımı ve Ajanla Etkili İletişim", short: "Komut satırı temelleri ve görev tanımlama sanatı.", color: "indigo" },
    { n: 4,  file: "modul-4.html",  title: "Claude Chat, Projeler, Artifacts ve Özelleştirme", short: "Sohbetten kalıcı projelere ve becerilere (Skills).", color: "amber" },
    { n: 5,  file: "modul-5.html",  title: "Bağlayıcılar, MCP ve Claude Cowork", short: "Gmail, Takvim, GitHub bağlantıları ve klasör otomasyonu.", color: "blue" },
    { n: 6,  file: "modul-6.html",  title: "Zamanlanmış Görevler, Canlı Paneller", short: "Otomatik çalışan görevler ve anlık kontrol panelleri.", color: "teal" },
    { n: 7,  file: "modul-7.html",  title: "Claude Code, Git ve Güvenli Proje Geliştirme", short: "Kod üretimi, sürüm kontrolü ve güvenli geri alma.", color: "indigo" },
    { n: 8,  file: "modul-8.html",  title: "Uygulama Geliştirme, Veritabanı ve Yayınlama", short: "Mini CRM geliştir, veritabanına bağla, internete aç.", color: "amber" },
    { n: 9,  file: "modul-9.html",  title: "Tasarım, Ofis Uygulamaları ve Sektörel Çözümler", short: "Claude Design, Excel/Word/PowerPoint ve meslek senaryoları.", color: "blue" },
    { n: 10, file: "modul-10.html", title: "Güvenlik, KVKK, Maliyet ve Sürdürülebilirlik", short: "Veri güvenliği, bütçe yönetimi ve final projesi.", color: "teal" }
  ];
  window.EGITIM_MODULES = MODULES;

  var NAV = [
    { href: "index.html", key: "home", label: "Ana Sayfa" },
    { href: "baslangic.html", key: "baslangic", label: "Başlangıç Rehberi" },
    { href: "gun-1.html", key: "gun1", label: "1. Gün: Temeller" },
    { href: "claude-egitimi.html", key: "claude", label: "Claude Programı", dropdown: true },
    { href: "modeller.html", key: "modeller", label: "AI Modelleri" },
    { href: "araclar.html", key: "araclar", label: "Araçlar" },
    { href: "kaynaklar.html", key: "kaynaklar", label: "Kaynaklar" },
    { href: "sozluk.html", key: "sozluk", label: "Sözlük & SSS" }
  ];

  function ddHtml() {
    var rows = MODULES.map(function (m) {
      return (
        '<a href="' + m.file + '">' +
          '<span class="dd-num">' + m.n + '</span>' +
          '<span><b>' + m.title + '</b><span>' + m.short + '</span></span>' +
        '</a>'
      );
    }).join("");
    return (
      '<div class="dropdown">' +
        '<a href="claude-egitimi.html" style="border-bottom:1px solid var(--border-soft);margin-bottom:6px;padding-bottom:11px;">' +
          '<span class="dd-num">★</span>' +
          '<span><b>Program Anasayfası</b><span>10 modülün tamamına ve önerilen gün akışına göz at</span></span>' +
        '</a>' +
        rows +
      '</div>'
    );
  }

  function headerHtml(active) {
    var links = NAV.map(function (item) {
      var isActive = item.key === active ? " active" : "";
      if (item.dropdown) {
        var ddOpenClass = active && active.indexOf("modul") === 0 ? " dd-open" : "";
        return (
          '<div class="nav-item has-dd' + ddOpenClass + '">' +
            '<span class="nav-link' + isActive + '" tabindex="0">' + item.label + ' <span class="car">▾</span></span>' +
            ddHtml() +
          '</div>'
        );
      }
      return '<a class="nav-link' + isActive + '" href="' + item.href + '">' + item.label + '</a>';
    }).join("");

    var mobileLinks = NAV.map(function (item) {
      if (item.dropdown) {
        var subs = MODULES.map(function (m) {
          return '<a href="' + m.file + '"><span class="dd-num">' + m.n + '</span>' + m.title + '</a>';
        }).join("");
        return (
          '<div class="mobile-link" data-mob-toggle="claude"><span>' + item.label + '</span><span class="car">▾</span></div>' +
          '<div class="mobile-sub" id="mob-claude" style="display:none;">' +
            '<a href="claude-egitimi.html"><span class="dd-num">★</span>Program Anasayfası</a>' + subs +
          '</div>'
        );
      }
      return '<a class="mobile-link" href="' + item.href + '">' + item.label + '</a>';
    }).join("");

    return (
      '<div class="nav-wrap"><div class="nav-inner">' +
        '<a class="brand" href="index.html">' +
          '<span class="brand-mark">🧠</span>' +
          '<span class="brand-text"><strong>AI Eğitim Kılavuzu</strong><span>GencBeyinler · Burak TURGUT</span></span>' +
        '</a>' +
        '<nav class="nav-links">' + links + '</nav>' +
        '<a class="nav-cta" href="baslangic.html">🚀 Hemen Başla</a>' +
        '<button class="nav-burger" id="burgerBtn" aria-label="Menüyü aç">☰</button>' +
      '</div></div>' +
      '<div class="mobile-panel" id="mobilePanel">' + mobileLinks +
        '<div style="padding:18px 14px;"><a class="btn btn-primary" style="width:100%;justify-content:center;" href="baslangic.html">🚀 Hemen Başla</a></div>' +
      '</div>'
    );
  }

  function footerHtml() {
    var year = "2026";
    var modLinks = MODULES.slice(0, 5).map(function (m) {
      return '<a href="' + m.file + '">' + m.n + '. ' + m.title.split(",")[0] + '</a>';
    }).join("");
    return (
      '<footer id="site-footer-inner">' +
        '<div class="container"><div class="footer-grid">' +
          '<div>' +
            '<div class="brand" style="margin-bottom:14px;">' +
              '<span class="brand-mark">🧠</span>' +
              '<span class="brand-text"><strong>AI Eğitim Kılavuzu</strong><span>Proje Tabanlı Yapay Zekâ Eğitimi</span></span>' +
            '</div>' +
            '<p style="font-size:13px;color:var(--text-soft);line-height:1.7;max-width:320px;">Yapay zekâyı yalnızca kullanan değil, onunla üreten öğretmenler ve profesyoneller yetiştirmek için hazırlanan uygulamalı, adım adım kılavuz.</p>' +
          '</div>' +
          '<div><h5>Eğitim Akışı</h5>' +
            '<a href="baslangic.html">Başlangıç Rehberi</a>' +
            '<a href="gun-1.html">1. Gün: Temeller</a>' +
            '<a href="claude-egitimi.html">Claude Programı</a>' +
            '<a href="sozluk.html">Sözlük &amp; SSS</a>' +
          '</div>' +
          '<div><h5>Claude Modülleri</h5>' + modLinks + '<a href="claude-egitimi.html">Tüm modüller →</a></div>' +
          '<div><h5>Kaynaklar</h5>' +
            '<a href="modeller.html">AI Modelleri</a>' +
            '<a href="araclar.html">Eğitim Araçları</a>' +
            '<a href="kaynaklar.html">Kılavuzlar &amp; Mevzuat</a>' +
            '<a href="mailto:burakturgut53@gmail.com">İletişim</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>© ' + year + ' Burak TURGUT — Proje Tabanlı Yapay Zekâ Eğitim Kılavuzu</span>' +
          '<span>Tüm bağlantılar yeni sekmede açılır ve düzenli olarak kontrol edilir.</span>' +
        '</div></div>' +
      '</footer>'
    );
  }

  function injectChrome() {
    var page = document.body.getAttribute("data-page") || "";
    var hEl = document.getElementById("site-header");
    var fEl = document.getElementById("site-footer");
    if (hEl) hEl.innerHTML = headerHtml(page);
    if (fEl) fEl.innerHTML = footerHtml();
  }

  function initMobileMenu() {
    var burger = document.getElementById("burgerBtn");
    var panel = document.getElementById("mobilePanel");
    if (!burger || !panel) return;
    burger.addEventListener("click", function () {
      panel.classList.toggle("open");
      burger.textContent = panel.classList.contains("open") ? "✕" : "☰";
      document.body.style.overflow = panel.classList.contains("open") ? "hidden" : "";
    });
    panel.addEventListener("click", function (e) {
      var toggle = e.target.closest("[data-mob-toggle]");
      if (toggle) {
        var sub = document.getElementById("mob-" + toggle.getAttribute("data-mob-toggle"));
        if (sub) sub.style.display = sub.style.display === "none" ? "block" : "none";
        return;
      }
      if (e.target.closest("a")) {
        panel.classList.remove("open");
        burger.textContent = "☰";
        document.body.style.overflow = "";
      }
    });
  }

  /* touch cihazlarda dropdown açma (hover olmadığı için tap ile) */
  function initDropdownTap() {
    document.addEventListener("click", function (e) {
      var trigger = e.target.closest(".nav-item.has-dd > .nav-link");
      if (trigger) {
        var item = trigger.closest(".nav-item");
        var wasOpen = item.classList.contains("dd-open");
        document.querySelectorAll(".nav-item.dd-open").forEach(function (i) { i.classList.remove("dd-open"); });
        if (!wasOpen) item.classList.add("dd-open");
      } else if (!e.target.closest(".dropdown")) {
        document.querySelectorAll(".nav-item.dd-open").forEach(function (i) { i.classList.remove("dd-open"); });
      }
    });
  }

  function initCopyButtons() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".copy-btn");
      if (!btn) return;
      var block = btn.closest(".code-block");
      var codeEl = block && block.querySelector("pre");
      if (!codeEl) return;
      var text = codeEl.innerText;
      var done = function () {
        var original = btn.innerHTML;
        btn.innerHTML = "✓ Kopyalandı";
        btn.classList.add("copied");
        setTimeout(function () { btn.innerHTML = original; btn.classList.remove("copied"); }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (err) {}
        document.body.removeChild(ta);
        done();
      }
    });
  }

  function initAccordion() {
    document.addEventListener("click", function (e) {
      var head = e.target.closest(".accordion-head");
      if (!head) return;
      var item = head.closest(".accordion-item");
      var wasOpen = item.classList.contains("open");
      if (item.hasAttribute("data-solo")) {
        item.parentElement.querySelectorAll(".accordion-item.open").forEach(function (i) { i.classList.remove("open"); });
      }
      item.classList.toggle("open", !wasOpen);
    });
  }

  function initTOC() {
    var toc = document.getElementById("pageToc");
    var prose = document.querySelector(".prose");
    if (!toc || !prose) return;
    var headings = Array.prototype.slice.call(prose.querySelectorAll("h2[id]"));
    if (!headings.length) { toc.style.display = "none"; return; }
    var list = document.createElement("div");
    headings.forEach(function (h) {
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent.replace(/^\d+\.\s*/, "");
      list.appendChild(a);
    });
    var h4 = document.createElement("h4");
    h4.textContent = "İçindekiler";
    toc.appendChild(h4);
    toc.appendChild(list);

    var links = Array.prototype.slice.call(list.querySelectorAll("a"));
    function onScroll() {
      var pos = window.scrollY + 120;
      var current = headings[0];
      headings.forEach(function (h) { if (h.offsetTop <= pos) current = h; });
      links.forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("href") === "#" + current.id);
      });
    }
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initBackToTop() {
    var btn = document.createElement("button");
    btn.className = "top-btn"; btn.id = "topBtn"; btn.setAttribute("aria-label", "Sayfa başına dön");
    btn.textContent = "↑";
    document.body.appendChild(btn);
    document.addEventListener("scroll", function () {
      btn.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectChrome();
    initMobileMenu();
    initDropdownTap();
    initCopyButtons();
    initAccordion();
    initTOC();
    initBackToTop();
  });
})();
