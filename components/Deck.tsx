"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getDeck, type Lang } from "@/lib/deck";
import { ui } from "@/lib/i18n";
import Background from "./Background";
import Slide from "./Slide";
import Lightbox, { type ZoomMedia } from "./Lightbox";

// Slide nào dùng nền tối (giống các section tối của SuperAI) để tạo nhịp.
const DARK_KINDS = new Set(["section", "quote"]);
// Slide nhiều nội dung → ribbon mờ đi để chữ luôn rõ.
const CONTENT_KINDS = new Set([
  "bullets",
  "stats",
  "columns",
  "tools",
  "gitflow",
  "steps",
  "compare",
  "split",
  "image",
  "gallery",
  "profile",
  "exercise",
]);

const LANG_KEY = "reelme-paypal-lang";

export default function Deck() {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState<ZoomMedia>(null);
  // Mặc định tiếng Anh (link trần gửi cho team PayPal ra EN luôn); người dùng
  // đổi sang VI bằng nút 🌐, và localStorage / ?lang=vi vẫn ghi đè được.
  const [lang, setLang] = useState<Lang>("en");

  // Khôi phục ngôn ngữ đã chọn (localStorage); cho phép override qua ?lang=en.
  useEffect(() => {
    const saved = window.localStorage.getItem(LANG_KEY);
    if (saved === "vi" || saved === "en") setLang(saved);
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q === "vi" || q === "en") setLang(q);
  }, []);

  const deck = useMemo(() => getDeck(lang), [lang]);
  const t = ui(lang);
  const total = deck.length;

  // Preload toàn bộ ảnh/video trong deck ngay từ đầu → chuyển slide là ảnh hiện
  // liền, không còn cảnh "tới slide mới bắt đầu load". Ảnh tải ngầm vào cache.
  useEffect(() => {
    const urls = new Set<string>();
    const walk = (n: unknown) => {
      if (typeof n === "string") {
        if (/\.(png|jpe?g|svg|webp|gif|mp4|webm)$/i.test(n)) urls.add(n);
      } else if (Array.isArray(n)) {
        n.forEach(walk);
      } else if (n && typeof n === "object") {
        Object.values(n as Record<string, unknown>).forEach(walk);
      }
    };
    walk(getDeck("vi")); // đường dẫn ảnh giống nhau ở mọi ngôn ngữ
    urls.forEach((u) => {
      if (/\.(mp4|webm)$/i.test(u)) {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.as = "video";
        link.href = u;
        document.head.appendChild(link);
      } else {
        const img = new Image();
        img.decoding = "async";
        img.src = u;
      }
    });
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next: Lang = prev === "vi" ? "en" : "vi";
      try {
        window.localStorage.setItem(LANG_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  // Deep-link: mở #3 để vào thẳng slide 3 (tiện trình chiếu / kiểm tra).
  useEffect(() => {
    const fromHash = parseInt(window.location.hash.slice(1), 10);
    if (!Number.isNaN(fromHash)) {
      setI(Math.min(total - 1, Math.max(0, fromHash - 1)));
    }
  }, [total]);

  const go = useCallback(
    (dir: number) => {
      setI((prev) => Math.min(total - 1, Math.max(0, prev + dir)));
    },
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (zoom) return; // đang phóng to: để Lightbox tự xử lý (Esc)
      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "PageDown":
          e.preventDefault();
          go(1);
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          go(-1);
          break;
        case "Home":
          setI(0);
          break;
        case "End":
          setI(total - 1);
          break;
        case "f":
        case "F":
          if (document.fullscreenElement) document.exitFullscreen();
          else document.documentElement.requestFullscreen();
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, total, zoom]);

  // Bấm vào ảnh/video có class .zoomable -> mở lightbox (không chuyển slide).
  const onStageClick = useCallback((e: React.MouseEvent) => {
    const el = (e.target as HTMLElement).closest(".zoomable");
    if (el) {
      e.stopPropagation();
      const src = el.getAttribute("src") || "";
      if (src) setZoom({ src, video: el.tagName === "VIDEO" });
      return;
    }
    go(1);
  }, [go]);

  const pct = total > 1 ? (i / (total - 1)) * 100 : 100;
  const current = deck[Math.min(i, total - 1)];
  const kind = current.kind;
  const isDark = DARK_KINDS.has(kind);
  const theme = isDark ? "theme-dark" : "theme-light";
  const ribbon = CONTENT_KINDS.has(kind) ? "ribbon-subtle" : "";

  return (
    <div className={`app ${theme} ${ribbon}`}>
      <Background />
      <div className="progress" style={{ width: `${pct}%` }} />

      <main className="stage" onClick={onStageClick}>
        {/* key buộc remount để chạy lại animation mỗi lần chuyển slide / đổi ngôn ngữ */}
        <Slide key={`${lang}-${i}`} slide={current} lang={lang} />
      </main>

      <Lightbox media={zoom} onClose={() => setZoom(null)} />

      <button
        className="lang-toggle"
        onClick={(e) => {
          e.stopPropagation();
          toggleLang();
        }}
        aria-label="Switch language"
        title={lang === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
      >
        <span className="lang-globe" aria-hidden>
          🌐
        </span>
        {t.langSwitchTo}
      </button>

      <div className="hint">
        <kbd>←</kbd> <kbd>→</kbd> {t.hintNav} · <kbd>F</kbd> {t.hintFull}
      </div>

      <div className="brand" style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em", color: "var(--ink)", opacity: 0.9 }}>
        ReelMe<span style={{ color: "var(--violet)" }}>.AI</span>
      </div>

      <nav className="nav" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => go(-1)} disabled={i === 0} aria-label={t.navPrev}>
          ‹
        </button>
        <button
          onClick={() => go(1)}
          disabled={i === total - 1}
          aria-label={t.navNext}
        >
          ›
        </button>
      </nav>

      <div className="counter">
        <b>{String(i + 1).padStart(2, "0")}</b> / {String(total).padStart(2, "0")}
      </div>
    </div>
  );
}
