import { useState, useRef, useCallback } from "react";

// ============================================================
// STYLES
// ============================================================
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0f0e17;
    --paper: #fffffe;
    --cream: #f7f4ef;
    --accent: #e8563a;
    --accent2: #2a6496;
    --muted: #6b6b7b;
    --border: #e2ddd6;
    --success: #2ecc71;
    --shadow: 0 4px 24px rgba(15,14,23,0.08);
    --shadow-lg: 0 12px 48px rgba(15,14,23,0.14);
    --radius: 12px;
    --font-display: 'Playfair Display', serif;
    --font-body: 'DM Sans', sans-serif;
    --font-mono: 'Space Mono', monospace;
  }

  body { font-family: var(--font-body); background: var(--cream); color: var(--ink); min-height: 100vh; }

  /* ── HEADER ── */
  .header {
    background: var(--ink);
    position: sticky; top: 0; z-index: 100;
    padding: 0 2rem;
    display: flex; align-items: center; justify-content: space-between;
    height: 68px;
    box-shadow: 0 2px 20px rgba(0,0,0,0.3);
  }
  .header-logo {
    display: flex; align-items: center; gap: 10px;
    font-family: var(--font-display); font-size: 1.4rem; color: var(--paper);
    text-decoration: none;
  }
  .logo-dot { width: 10px; height: 10px; background: var(--accent); border-radius: 50%; }
  .header-nav { display: flex; align-items: center; gap: 1.5rem; }
  .nav-link {
    color: rgba(255,255,255,0.65); font-size: 0.875rem; font-weight: 500;
    text-decoration: none; transition: color 0.2s; letter-spacing: 0.03em;
    cursor: pointer; background: none; border: none;
  }
  .nav-link:hover, .nav-link.active { color: var(--paper); }
  .nav-btn {
    background: var(--accent); color: white; border: none; cursor: pointer;
    padding: 8px 18px; border-radius: 6px; font-size: 0.875rem; font-weight: 600;
    font-family: var(--font-body); transition: all 0.2s; letter-spacing: 0.02em;
  }
  .nav-btn:hover { background: #d44d33; transform: translateY(-1px); }

  /* ── HERO ── */
  .hero {
    background: linear-gradient(135deg, var(--ink) 0%, #1e1d2e 60%, #2a2435 100%);
    padding: 5rem 2rem 6rem;
    text-align: center; position: relative; overflow: hidden;
  }
  .hero::before {
    content: ''; position: absolute; top: -50%; left: -20%;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(232,86,58,0.15) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero::after {
    content: ''; position: absolute; bottom: -30%; right: -10%;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(42,100,150,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(232,86,58,0.15); border: 1px solid rgba(232,86,58,0.3);
    color: #ff8c7a; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; padding: 6px 14px; border-radius: 100px;
    margin-bottom: 1.5rem;
  }
  .hero h1 {
    font-family: var(--font-display); font-size: clamp(2.2rem, 5vw, 3.8rem);
    color: var(--paper); line-height: 1.15; margin-bottom: 1.2rem;
    position: relative; z-index: 1;
  }
  .hero h1 span { color: var(--accent); font-style: italic; }
  .hero p {
    color: rgba(255,255,255,0.6); font-size: 1.1rem; max-width: 500px;
    margin: 0 auto 2.5rem; line-height: 1.7; position: relative; z-index: 1;
  }
  .hero-cta {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--accent); color: white; font-weight: 700; font-size: 1rem;
    padding: 14px 32px; border-radius: 8px; border: none; cursor: pointer;
    font-family: var(--font-body); transition: all 0.25s;
    box-shadow: 0 4px 20px rgba(232,86,58,0.4);
    position: relative; z-index: 1;
  }
  .hero-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(232,86,58,0.5); }
  .hero-stats {
    display: flex; justify-content: center; gap: 3rem; margin-top: 3.5rem;
    position: relative; z-index: 1;
  }
  .stat { text-align: center; }
  .stat-num { font-family: var(--font-display); font-size: 1.8rem; color: var(--paper); font-weight: 700; }
  .stat-label { font-size: 0.78rem; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 2px; }

  /* ── FORM PAGE ── */
  .page-container { max-width: 900px; margin: 0 auto; padding: 3rem 1.5rem 5rem; }
  .section-header { margin-bottom: 2.5rem; }
  .section-header h2 { font-family: var(--font-display); font-size: 1.8rem; color: var(--ink); }
  .section-header p { color: var(--muted); margin-top: 6px; font-size: 0.95rem; }

  .form-card {
    background: var(--paper); border-radius: var(--radius);
    border: 1px solid var(--border); margin-bottom: 1.5rem;
    box-shadow: var(--shadow); overflow: hidden;
  }
  .form-card-header {
    display: flex; align-items: center; gap: 12px;
    padding: 1.2rem 1.5rem; border-bottom: 1px solid var(--border);
    cursor: pointer; user-select: none;
  }
  .form-card-header:hover { background: var(--cream); }
  .section-icon {
    width: 36px; height: 36px; border-radius: 8px;
    background: var(--ink); color: white;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem; flex-shrink: 0;
  }
  .section-title { font-weight: 600; font-size: 0.95rem; flex: 1; }
  .section-toggle { color: var(--muted); font-size: 1.2rem; transition: transform 0.3s; }
  .section-toggle.open { transform: rotate(180deg); }
  .form-card-body { padding: 1.5rem; animation: fadeIn 0.25s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }

  .form-row { display: grid; gap: 1rem; margin-bottom: 1rem; }
  .form-row.cols-2 { grid-template-columns: 1fr 1fr; }
  .form-row.cols-3 { grid-template-columns: 1fr 1fr 1fr; }
  @media (max-width: 640px) {
    .form-row.cols-2, .form-row.cols-3 { grid-template-columns: 1fr; }
    .hero-stats { gap: 1.5rem; }
    .header { padding: 0 1rem; }
  }

  .form-group { display: flex; flex-direction: column; gap: 5px; }
  .form-label { font-size: 0.82rem; font-weight: 600; color: var(--ink); letter-spacing: 0.02em; }
  .form-label span { color: var(--accent); margin-left: 2px; }
  .form-input, .form-textarea, .form-select {
    border: 1.5px solid var(--border); border-radius: 8px;
    padding: 10px 14px; font-size: 0.9rem; font-family: var(--font-body);
    color: var(--ink); background: var(--paper); transition: all 0.2s; outline: none;
    width: 100%;
  }
  .form-input:focus, .form-textarea:focus, .form-select:focus {
    border-color: var(--accent); box-shadow: 0 0 0 3px rgba(232,86,58,0.1);
  }
  .form-input.error, .form-textarea.error { border-color: #e74c3c; box-shadow: 0 0 0 3px rgba(231,76,60,0.1); }
  .form-textarea { resize: vertical; min-height: 90px; line-height: 1.6; }
  .error-msg { color: #e74c3c; font-size: 0.78rem; font-weight: 500; }

  .skills-container { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
  .skill-tag {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--ink); color: white; padding: 5px 12px;
    border-radius: 100px; font-size: 0.82rem; font-weight: 500;
  }
  .skill-remove {
    cursor: pointer; color: rgba(255,255,255,0.6); font-size: 1rem;
    line-height: 1; transition: color 0.2s; background: none; border: none;
  }
  .skill-remove:hover { color: white; }
  .skill-input-row { display: flex; gap: 8px; }
  .skill-input-row .form-input { flex: 1; }
  .add-btn {
    background: var(--ink); color: white; border: none; cursor: pointer;
    padding: 10px 16px; border-radius: 8px; font-size: 0.875rem; font-weight: 600;
    font-family: var(--font-body); transition: all 0.2s; white-space: nowrap;
  }
  .add-btn:hover { background: var(--accent); }

  .entry-card {
    border: 1.5px solid var(--border); border-radius: 10px;
    padding: 1.2rem; margin-bottom: 1rem; position: relative;
    background: var(--cream);
  }
  .entry-actions {
    position: absolute; top: 10px; right: 10px;
    display: flex; gap: 6px;
  }
  .entry-btn {
    background: none; border: 1px solid var(--border); cursor: pointer;
    width: 28px; height: 28px; border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.85rem; transition: all 0.2s; color: var(--muted);
  }
  .entry-btn:hover { background: white; border-color: var(--accent); color: var(--accent); }
  .entry-btn.danger:hover { border-color: #e74c3c; color: #e74c3c; }
  .add-entry-btn {
    display: flex; align-items: center; gap: 8px;
    border: 2px dashed var(--border); background: transparent; cursor: pointer;
    padding: 12px; border-radius: 10px; width: 100%;
    font-size: 0.875rem; font-weight: 600; color: var(--muted);
    font-family: var(--font-body); transition: all 0.2s;
  }
  .add-entry-btn:hover { border-color: var(--accent); color: var(--accent); background: rgba(232,86,58,0.03); }

  .generate-section { margin-top: 2.5rem; text-align: center; }
  .generate-btn {
    display: inline-flex; align-items: center; gap: 10px;
    background: linear-gradient(135deg, var(--ink) 0%, #2d2c3e 100%);
    color: white; border: none; cursor: pointer;
    padding: 16px 48px; border-radius: 10px; font-size: 1.05rem; font-weight: 700;
    font-family: var(--font-body); transition: all 0.25s; letter-spacing: 0.02em;
    box-shadow: 0 4px 20px rgba(15,14,23,0.25);
  }
  .generate-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(15,14,23,0.35); }

  /* ── TEMPLATES PAGE ── */
  .templates-page { padding: 2.5rem 1.5rem 5rem; max-width: 1300px; margin: 0 auto; }

  .templates-layout {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 2rem;
    align-items: start;
  }
  @media (max-width: 900px) { .templates-layout { grid-template-columns: 1fr; } }

  /* Sidebar scrolls independently */
  .templates-sidebar {
    position: sticky;
    top: 80px; /* header height + gap */
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-right: 4px;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
  }
  .templates-sidebar::-webkit-scrollbar { width: 4px; }
  .templates-sidebar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

  .template-thumb {
    border: 2px solid var(--border); border-radius: 10px; cursor: pointer;
    overflow: hidden; transition: all 0.2s; background: white; flex-shrink: 0;
  }
  .template-thumb:hover { border-color: var(--accent); transform: translateY(-1px); box-shadow: var(--shadow); }
  .template-thumb.selected { border-color: var(--accent); box-shadow: 0 0 0 4px rgba(232,86,58,0.12); }
  .template-thumb-header {
    padding: 10px 14px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    background: white; position: relative; z-index: 2;
  }
  .template-name { font-size: 0.82rem; font-weight: 700; }
  .template-badge {
    font-size: 0.68rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.06em; padding: 2px 8px; border-radius: 100px;
  }
  .badge-classic { background: #e8f4f8; color: #2a6496; }
  .badge-modern { background: #fef0ec; color: var(--accent); }
  .badge-minimal { background: #f0faf0; color: #27ae60; }
  .badge-bold { background: #1a1a2e; color: white; }
  .badge-creative { background: #f5e6ff; color: #8e44ad; }

  /* Thumbnail preview area — clip a scaled-down render */
  .template-thumb-clip {
    height: 140px;
    overflow: hidden;
    position: relative;
    background: #f9f8f6;
  }
  .template-thumb-clip::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0;
    height: 50px;
    background: linear-gradient(transparent, rgba(255,255,255,0.9));
    pointer-events: none; z-index: 1;
  }
  .template-thumb-scaler {
    transform: scale(0.28);
    transform-origin: top left;
    width: 357%; /* 1/0.28 * 100 */
    pointer-events: none;
    position: absolute; top: 0; left: 0;
  }

  /* Preview panel — sticky on the right */
  .resume-preview-wrapper {
    position: sticky;
    top: 80px;
    background: white;
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 100px);
    overflow: hidden;
  }
  .preview-toolbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 16px; border-bottom: 1px solid var(--border);
    background: var(--cream); flex-shrink: 0;
  }
  .preview-label { font-size: 0.82rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }
  .download-btn {
    display: flex; align-items: center; gap: 8px;
    background: var(--accent); color: white; border: none; cursor: pointer;
    padding: 9px 20px; border-radius: 7px; font-size: 0.875rem; font-weight: 700;
    font-family: var(--font-body); transition: all 0.2s;
  }
  .download-btn:hover { background: #d44d33; transform: translateY(-1px); }
  /* This inner scroll area grows to fill remaining space */
  .resume-preview-scroll {
    overflow-y: auto;
    flex: 1;
    padding: 1.5rem;
    background: #e8e5e0;
    scrollbar-width: thin;
    scrollbar-color: #c0bbb4 transparent;
  }
  .resume-preview-scroll::-webkit-scrollbar { width: 6px; }
  .resume-preview-scroll::-webkit-scrollbar-thumb { background: #c0bbb4; border-radius: 3px; }
  .resume-page {
    width: 100%; max-width: 760px; margin: 0 auto;
    background: white; box-shadow: 0 4px 32px rgba(0,0,0,0.15);
    min-height: 1000px;
  }

  /* ── RESUME TEMPLATES ── */

  /* CLASSIC */
  .resume-classic { font-family: 'Georgia', serif; padding: 48px; }
  .classic-header { border-bottom: 3px solid #0f0e17; padding-bottom: 20px; margin-bottom: 24px; }
  .classic-name { font-size: 2.4rem; font-weight: bold; letter-spacing: -0.02em; }
  .classic-contact { display: flex; flex-wrap: wrap; gap: 6px 20px; margin-top: 8px; font-size: 0.82rem; color: #444; }
  .classic-section { margin-bottom: 22px; }
  .classic-section-title {
    font-size: 0.78rem; font-weight: bold; text-transform: uppercase; letter-spacing: 0.12em;
    color: #0f0e17; border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-bottom: 12px;
  }
  .classic-entry { margin-bottom: 14px; }
  .classic-entry-header { display: flex; justify-content: space-between; align-items: baseline; }
  .classic-entry-title { font-weight: bold; font-size: 0.95rem; }
  .classic-entry-date { font-size: 0.8rem; color: #666; font-style: italic; }
  .classic-entry-sub { color: #555; font-size: 0.88rem; margin-top: 2px; }
  .classic-entry-desc { font-size: 0.85rem; color: #444; margin-top: 6px; line-height: 1.6; }
  .classic-skills-list { display: flex; flex-wrap: wrap; gap: 6px; }
  .classic-skill { background: #f0f0f0; padding: 4px 12px; border-radius: 4px; font-size: 0.82rem; }

  /* MODERN */
  .resume-modern { font-family: 'DM Sans', 'Helvetica Neue', sans-serif; display: grid; grid-template-columns: 240px 1fr; min-height: 1000px; }
  .modern-sidebar { background: #0f0e17; color: white; padding: 36px 24px; }
  .modern-photo-placeholder {
    width: 80px; height: 80px; border-radius: 50%;
    background: rgba(232,86,58,0.3); border: 3px solid var(--accent);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.8rem; font-weight: bold; color: white; margin-bottom: 16px;
  }
  .modern-name { font-size: 1.2rem; font-weight: 800; line-height: 1.25; margin-bottom: 4px; }
  .modern-title { font-size: 0.75rem; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 24px; }
  .modern-sidebar-section { margin-bottom: 22px; }
  .modern-sidebar-title {
    font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em;
    color: var(--accent); margin-bottom: 10px;
  }
  .modern-contact-item { display: flex; align-items: flex-start; gap: 8px; font-size: 0.78rem; margin-bottom: 6px; color: rgba(255,255,255,0.75); word-break: break-all; }
  .modern-skill-bar { margin-bottom: 8px; }
  .modern-skill-name { font-size: 0.78rem; margin-bottom: 3px; color: rgba(255,255,255,0.85); }
  .modern-skill-track { height: 3px; background: rgba(255,255,255,0.15); border-radius: 2px; }
  .modern-skill-fill { height: 3px; background: var(--accent); border-radius: 2px; width: 80%; }
  .modern-main { padding: 36px 32px; }
  .modern-main-name { font-size: 2rem; font-weight: 800; color: var(--ink); }
  .modern-section { margin-bottom: 24px; }
  .modern-section-title {
    font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em;
    color: var(--accent); display: flex; align-items: center; gap: 8px;
    margin-bottom: 12px;
  }
  .modern-section-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }
  .modern-entry { margin-bottom: 14px; display: grid; grid-template-columns: 8px 1fr; gap: 12px; }
  .modern-dot { width: 8px; height: 8px; background: var(--accent); border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
  .modern-entry-title { font-weight: 700; font-size: 0.92rem; }
  .modern-entry-sub { font-size: 0.8rem; color: var(--muted); margin-top: 2px; }
  .modern-entry-desc { font-size: 0.82rem; color: #555; margin-top: 5px; line-height: 1.6; }
  .modern-skills-inline { display: flex; flex-wrap: wrap; gap: 6px; }
  .modern-skill-tag { background: var(--cream); border: 1px solid var(--border); padding: 4px 10px; border-radius: 5px; font-size: 0.78rem; }

  /* MINIMAL */
  .resume-minimal { font-family: 'DM Sans', sans-serif; padding: 56px; }
  .minimal-header { margin-bottom: 36px; }
  .minimal-name { font-size: 2.8rem; font-weight: 300; letter-spacing: -0.03em; color: var(--ink); }
  .minimal-name strong { font-weight: 800; }
  .minimal-divider { width: 40px; height: 3px; background: var(--ink); margin: 14px 0; }
  .minimal-contact { display: flex; flex-wrap: wrap; gap: 4px 24px; font-size: 0.82rem; color: var(--muted); }
  .minimal-section { margin-bottom: 28px; }
  .minimal-section-title { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.18em; color: var(--muted); margin-bottom: 14px; }
  .minimal-entry { display: grid; grid-template-columns: 120px 1fr; gap: 16px; margin-bottom: 16px; }
  .minimal-date { font-size: 0.78rem; color: var(--muted); font-weight: 600; padding-top: 2px; }
  .minimal-entry-title { font-weight: 700; font-size: 0.92rem; }
  .minimal-entry-sub { font-size: 0.82rem; color: var(--muted); margin-top: 2px; }
  .minimal-entry-desc { font-size: 0.82rem; color: #555; margin-top: 5px; line-height: 1.65; }
  .minimal-skills { display: flex; flex-wrap: wrap; gap: 8px; }
  .minimal-skill { font-size: 0.82rem; color: var(--ink); }
  .minimal-skill::after { content: '·'; margin-left: 8px; color: var(--border); }
  .minimal-skill:last-child::after { display: none; }

  /* BOLD */
  .resume-bold { font-family: 'DM Sans', sans-serif; }
  .bold-header { background: var(--ink); color: white; padding: 40px 48px; }
  .bold-name { font-size: 2.6rem; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; }
  .bold-name span { color: var(--accent); }
  .bold-contact-strip {
    display: flex; flex-wrap: wrap; gap: 6px 24px;
    margin-top: 14px; font-size: 0.78rem; color: rgba(255,255,255,0.65);
  }
  .bold-body { display: grid; grid-template-columns: 1fr 260px; gap: 0; }
  .bold-main { padding: 36px 40px; }
  .bold-aside { background: #f5f3ef; padding: 36px 28px; border-left: 1px solid var(--border); }
  .bold-section { margin-bottom: 24px; }
  .bold-section-title {
    font-size: 0.78rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em;
    background: var(--ink); color: white; padding: 4px 10px; display: inline-block;
    margin-bottom: 14px; border-radius: 3px;
  }
  .bold-entry { margin-bottom: 14px; }
  .bold-entry-title { font-weight: 800; font-size: 0.95rem; }
  .bold-entry-sub { font-size: 0.82rem; color: var(--muted); }
  .bold-entry-date { font-size: 0.75rem; color: var(--accent); font-weight: 700; margin-top: 2px; }
  .bold-entry-desc { font-size: 0.82rem; color: #555; margin-top: 5px; line-height: 1.6; }
  .bold-aside-title { font-size: 0.72rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; color: var(--ink); margin-bottom: 10px; margin-top: 20px; }
  .bold-aside-title:first-child { margin-top: 0; }
  .bold-skill { display: flex; justify-content: space-between; align-items: center; padding: 5px 0; border-bottom: 1px solid var(--border); font-size: 0.82rem; }

  /* CREATIVE */
  .resume-creative { font-family: 'DM Sans', sans-serif; }
  .creative-header { background: linear-gradient(135deg, #2a6496, #1a3a5c); color: white; padding: 44px 48px; display: flex; gap: 28px; align-items: flex-start; }
  .creative-avatar {
    width: 90px; height: 90px; border-radius: 16px; flex-shrink: 0;
    background: rgba(255,255,255,0.15); display: flex; align-items: center;
    justify-content: center; font-size: 2.2rem; font-weight: 800; border: 2px solid rgba(255,255,255,0.3);
  }
  .creative-header-info { flex: 1; }
  .creative-name { font-size: 2rem; font-weight: 800; }
  .creative-tagline { font-size: 0.88rem; color: rgba(255,255,255,0.7); margin-top: 4px; }
  .creative-contact { display: flex; flex-wrap: wrap; gap: 5px 20px; margin-top: 12px; font-size: 0.8rem; color: rgba(255,255,255,0.8); }
  .creative-body { display: grid; grid-template-columns: 1fr 200px; gap: 0; padding: 0 48px 40px; }
  .creative-main { padding: 32px 32px 0 0; }
  .creative-aside { padding: 32px 0 0 28px; border-left: 2px solid var(--border); }
  .creative-section { margin-bottom: 24px; }
  .creative-section-title {
    font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em;
    color: #2a6496; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;
  }
  .creative-section-title::before { content: ''; width: 20px; height: 2px; background: #2a6496; border-radius: 1px; }
  .creative-entry { margin-bottom: 14px; }
  .creative-entry-title { font-weight: 700; font-size: 0.92rem; }
  .creative-entry-sub { font-size: 0.8rem; color: #2a6496; font-weight: 600; margin-top: 2px; }
  .creative-entry-date { font-size: 0.75rem; color: var(--muted); margin-top: 1px; }
  .creative-entry-desc { font-size: 0.82rem; color: #555; margin-top: 5px; line-height: 1.6; }
  .creative-aside-title { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); margin-bottom: 8px; margin-top: 18px; }
  .creative-aside-title:first-child { margin-top: 0; }
  .creative-skill-item { font-size: 0.82rem; padding: 4px 0; border-bottom: 1px solid var(--border); }


  /* ── EXECUTIVE ── */
  .resume-executive { font-family: 'Georgia', serif; }
  .exec-header { background: #1a1a2e; padding: 44px 52px; display: flex; align-items: center; gap: 32px; }
  .exec-monogram {
    width: 88px; height: 88px; border: 3px solid #c9a84c; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 2rem; font-weight: bold; color: #c9a84c; flex-shrink: 0;
  }
  .exec-header-text { flex: 1; }
  .exec-name { font-size: 2rem; color: white; font-weight: 700; letter-spacing: 0.04em; }
  .exec-title { color: #c9a84c; font-size: 0.88rem; letter-spacing: 0.12em; text-transform: uppercase; margin-top: 6px; }
  .exec-contact { display: flex; flex-wrap: wrap; gap: 5px 22px; margin-top: 12px; font-size: 0.78rem; color: rgba(255,255,255,0.6); }
  .exec-body { display: grid; grid-template-columns: 1fr 220px; }
  .exec-main { padding: 36px 44px; }
  .exec-aside { background: #f8f6f0; padding: 36px 24px; border-left: 3px solid #c9a84c; }
  .exec-section { margin-bottom: 26px; }
  .exec-section-title {
    font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; font-weight: bold;
    color: #1a1a2e; border-bottom: 2px solid #c9a84c; padding-bottom: 6px; margin-bottom: 14px;
    display: flex; align-items: center; gap: 10px;
  }
  .exec-entry { margin-bottom: 16px; }
  .exec-entry-row { display: flex; justify-content: space-between; align-items: baseline; }
  .exec-entry-title { font-weight: bold; font-size: 0.94rem; color: #1a1a2e; }
  .exec-entry-date { font-size: 0.78rem; color: #888; font-style: italic; }
  .exec-entry-sub { font-size: 0.84rem; color: #555; margin-top: 2px; }
  .exec-entry-desc { font-size: 0.83rem; color: #555; margin-top: 6px; line-height: 1.65; }
  .exec-aside-title { font-size: 0.68rem; font-weight: bold; text-transform: uppercase; letter-spacing: 0.14em; color: #1a1a2e; margin-bottom: 10px; margin-top: 22px; }
  .exec-aside-title:first-child { margin-top: 0; }
  .exec-skill { padding: 5px 0; font-size: 0.82rem; border-bottom: 1px solid #e8e2d8; display: flex; align-items: center; gap: 8px; }
  .exec-skill::before { content: '◆'; color: #c9a84c; font-size: 0.5rem; }

  /* ── TECH ── */
  .resume-tech { font-family: 'Space Mono', monospace; background: #0d1117; color: #c9d1d9; padding: 40px 48px; }
  .tech-header { border-bottom: 1px solid #30363d; padding-bottom: 24px; margin-bottom: 28px; }
  .tech-prompt { color: #7ee787; font-size: 0.78rem; margin-bottom: 6px; }
  .tech-name { font-size: 2rem; color: #e6edf3; font-weight: 700; }
  .tech-contact { display: flex; flex-wrap: wrap; gap: 5px 20px; margin-top: 10px; font-size: 0.72rem; color: #8b949e; }
  .tech-contact span::before { content: '> '; color: #58a6ff; }
  .tech-section { margin-bottom: 26px; }
  .tech-section-title { font-size: 0.72rem; color: #58a6ff; margin-bottom: 14px; letter-spacing: 0.1em; }
  .tech-section-title::before { content: '// '; color: #6e7681; }
  .tech-entry { margin-bottom: 14px; padding-left: 14px; border-left: 2px solid #21262d; }
  .tech-entry-title { color: #e6edf3; font-size: 0.88rem; font-weight: 700; }
  .tech-entry-meta { font-size: 0.72rem; color: #8b949e; margin-top: 3px; }
  .tech-entry-meta span { color: #7ee787; }
  .tech-entry-desc { font-size: 0.78rem; color: #8b949e; margin-top: 6px; line-height: 1.7; }
  .tech-skills-grid { display: flex; flex-wrap: wrap; gap: 8px; }
  .tech-skill { background: #161b22; border: 1px solid #30363d; color: #79c0ff; padding: 4px 12px; border-radius: 20px; font-size: 0.72rem; }
  .tech-summary { font-size: 0.82rem; color: #8b949e; line-height: 1.7; padding: 14px; background: #161b22; border: 1px solid #30363d; border-radius: 6px; margin-bottom: 24px; }
  .tech-summary::before { content: '/* '; color: #6e7681; }
  .tech-summary::after { content: ' */'; color: #6e7681; }

  /* ── ELEGANT ── */
  .resume-elegant { font-family: 'Playfair Display', serif; padding: 56px; }
  .elegant-header { text-align: center; padding-bottom: 32px; margin-bottom: 32px; border-bottom: 1px solid #d4af7a; position: relative; }
  .elegant-header::before, .elegant-header::after {
    content: '◆'; position: absolute; bottom: -8px; font-size: 0.7rem; color: #d4af7a;
  }
  .elegant-header::before { left: calc(50% - 60px); }
  .elegant-header::after { left: calc(50% + 48px); }
  .elegant-name { font-size: 2.8rem; font-weight: 700; letter-spacing: 0.06em; color: #2c2c2c; }
  .elegant-subtitle { font-size: 0.9rem; color: #888; letter-spacing: 0.2em; text-transform: uppercase; margin-top: 8px; font-family: 'DM Sans', sans-serif; font-weight: 400; }
  .elegant-contact { display: flex; justify-content: center; flex-wrap: wrap; gap: 6px 28px; margin-top: 14px; font-size: 0.8rem; color: #666; font-family: 'DM Sans', sans-serif; }
  .elegant-section { margin-bottom: 28px; }
  .elegant-section-title { text-align: center; font-size: 0.72rem; letter-spacing: 0.24em; text-transform: uppercase; color: #d4af7a; margin-bottom: 18px; font-family: 'DM Sans', sans-serif; font-weight: 700; }
  .elegant-entry { margin-bottom: 16px; }
  .elegant-entry-row { display: flex; justify-content: space-between; }
  .elegant-entry-title { font-size: 1rem; font-weight: 600; color: #2c2c2c; }
  .elegant-entry-date { font-size: 0.8rem; color: #d4af7a; font-style: italic; }
  .elegant-entry-sub { font-size: 0.86rem; color: #888; margin-top: 3px; font-family: 'DM Sans', sans-serif; }
  .elegant-entry-desc { font-size: 0.83rem; color: #555; margin-top: 7px; line-height: 1.7; font-family: 'DM Sans', sans-serif; }
  .elegant-skills { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
  .elegant-skill { border: 1px solid #d4af7a; color: #2c2c2c; padding: 5px 16px; font-size: 0.78rem; letter-spacing: 0.06em; font-family: 'DM Sans', sans-serif; }

  /* ── STARTUP ── */
  .resume-startup { font-family: 'DM Sans', sans-serif; }
  .startup-header { background: linear-gradient(120deg, #6c63ff 0%, #3ecfcf 100%); padding: 44px 48px; color: white; }
  .startup-name { font-size: 2.4rem; font-weight: 900; letter-spacing: -0.02em; }
  .startup-role { font-size: 0.9rem; opacity: 0.8; margin-top: 4px; letter-spacing: 0.04em; }
  .startup-contact { display: flex; flex-wrap: wrap; gap: 6px 20px; margin-top: 14px; font-size: 0.8rem; opacity: 0.85; }
  .startup-body { padding: 36px 48px; }
  .startup-summary { background: #f0edff; border-left: 4px solid #6c63ff; padding: 14px 18px; border-radius: 0 8px 8px 0; font-size: 0.86rem; line-height: 1.7; color: #444; margin-bottom: 28px; }
  .startup-section { margin-bottom: 26px; }
  .startup-section-title {
    font-size: 0.72rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.14em;
    color: #6c63ff; margin-bottom: 14px;
  }
  .startup-entry { background: #fafafa; border: 1px solid #eee; border-radius: 8px; padding: 14px 16px; margin-bottom: 10px; }
  .startup-entry-row { display: flex; justify-content: space-between; align-items: flex-start; }
  .startup-entry-title { font-weight: 700; font-size: 0.92rem; }
  .startup-entry-date { font-size: 0.75rem; background: #f0edff; color: #6c63ff; padding: 2px 8px; border-radius: 20px; font-weight: 600; white-space: nowrap; }
  .startup-entry-sub { font-size: 0.82rem; color: #777; margin-top: 3px; }
  .startup-entry-desc { font-size: 0.82rem; color: #555; margin-top: 6px; line-height: 1.6; }
  .startup-skills { display: flex; flex-wrap: wrap; gap: 8px; }
  .startup-skill { background: linear-gradient(120deg, #6c63ff, #3ecfcf); color: white; padding: 5px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 600; }

  /* ── CORPORATE ── */
  .resume-corporate { font-family: 'DM Sans', sans-serif; }
  .corp-header { background: #003366; padding: 36px 48px; color: white; display: flex; justify-content: space-between; align-items: flex-end; }
  .corp-name { font-size: 2rem; font-weight: 700; }
  .corp-title { font-size: 0.88rem; color: rgba(255,255,255,0.65); margin-top: 4px; }
  .corp-contact-block { text-align: right; }
  .corp-contact-item { font-size: 0.78rem; color: rgba(255,255,255,0.7); line-height: 1.8; }
  .corp-accent-bar { height: 6px; background: linear-gradient(90deg, #0066cc, #00aaff); }
  .corp-body { display: grid; grid-template-columns: 1fr 240px; }
  .corp-main { padding: 32px 40px; }
  .corp-aside { padding: 32px 28px; background: #f0f5fa; border-left: 1px solid #d0dde8; }
  .corp-section { margin-bottom: 24px; }
  .corp-section-title {
    font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.14em;
    color: #003366; border-left: 4px solid #0066cc; padding-left: 10px; margin-bottom: 14px;
  }
  .corp-entry { margin-bottom: 14px; }
  .corp-entry-title { font-weight: 700; font-size: 0.92rem; color: #003366; }
  .corp-entry-sub { font-size: 0.82rem; color: #555; margin-top: 2px; }
  .corp-entry-date { font-size: 0.75rem; color: #0066cc; font-weight: 600; margin-top: 2px; }
  .corp-entry-desc { font-size: 0.82rem; color: #555; margin-top: 5px; line-height: 1.6; }
  .corp-aside-title { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #003366; margin-bottom: 10px; margin-top: 20px; }
  .corp-aside-title:first-child { margin-top: 0; }
  .corp-skill { font-size: 0.82rem; padding: 5px 0; border-bottom: 1px solid #d0dde8; color: #333; }

  /* ── INFOGRAPHIC ── */
  .resume-infographic { font-family: 'DM Sans', sans-serif; display: grid; grid-template-columns: 220px 1fr; min-height: 1000px; }
  .info-left { background: linear-gradient(180deg, #2d3748 0%, #1a202c 100%); padding: 40px 24px; color: white; }
  .info-avatar { width: 84px; height: 84px; border-radius: 50%; background: linear-gradient(135deg, #ed8936, #e53e3e); display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 900; color: white; margin-bottom: 16px; border: 3px solid rgba(255,255,255,0.2); }
  .info-left-name { font-size: 1.1rem; font-weight: 800; line-height: 1.3; }
  .info-left-role { font-size: 0.72rem; color: #ed8936; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px; margin-bottom: 24px; }
  .info-left-section { margin-bottom: 22px; }
  .info-left-title { font-size: 0.62rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.14em; color: #ed8936; margin-bottom: 10px; }
  .info-contact-item { font-size: 0.75rem; color: rgba(255,255,255,0.7); margin-bottom: 6px; line-height: 1.4; word-break: break-all; }
  .info-skill-row { margin-bottom: 8px; }
  .info-skill-label { font-size: 0.74rem; color: rgba(255,255,255,0.8); margin-bottom: 4px; }
  .info-skill-dots { display: flex; gap: 4px; }
  .info-dot { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.2); }
  .info-dot.filled { background: #ed8936; }
  .info-right { padding: 36px 32px; }
  .info-section { margin-bottom: 24px; }
  .info-section-title { font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #2d3748; display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
  .info-section-title::after { content: ''; flex: 1; height: 2px; background: linear-gradient(90deg, #ed8936, transparent); }
  .info-entry { margin-bottom: 14px; position: relative; padding-left: 14px; }
  .info-entry::before { content: ''; position: absolute; left: 0; top: 6px; width: 6px; height: 6px; background: #ed8936; border-radius: 50%; }
  .info-entry-title { font-weight: 700; font-size: 0.9rem; }
  .info-entry-sub { font-size: 0.8rem; color: #718096; margin-top: 2px; }
  .info-entry-desc { font-size: 0.8rem; color: #555; margin-top: 4px; line-height: 1.6; }

  /* ── ACADEMIC ── */
  .resume-academic { font-family: 'Georgia', serif; padding: 52px 60px; }
  .acad-header { margin-bottom: 32px; padding-bottom: 20px; border-bottom: 1px solid #333; }
  .acad-name { font-size: 2.2rem; font-weight: bold; text-align: center; letter-spacing: 0.02em; }
  .acad-contact { display: flex; justify-content: center; flex-wrap: wrap; gap: 4px 24px; margin-top: 10px; font-size: 0.82rem; color: #444; font-style: italic; }
  .acad-section { margin-bottom: 24px; }
  .acad-section-title { font-size: 1rem; font-variant: small-caps; letter-spacing: 0.08em; font-weight: bold; border-bottom: 1px solid #333; padding-bottom: 4px; margin-bottom: 14px; }
  .acad-entry { margin-bottom: 14px; }
  .acad-entry-header { display: flex; justify-content: space-between; }
  .acad-entry-title { font-weight: bold; font-size: 0.92rem; }
  .acad-entry-date { font-size: 0.82rem; font-style: italic; color: #555; }
  .acad-entry-sub { font-size: 0.86rem; color: #555; margin-top: 2px; font-style: italic; }
  .acad-entry-desc { font-size: 0.84rem; color: #444; margin-top: 6px; line-height: 1.7; }
  .acad-skills { columns: 2; font-size: 0.84rem; line-height: 1.9; color: #333; }
  .acad-skill::before { content: '• '; }

  /* ── NEON ── */
  .resume-neon { font-family: 'DM Sans', sans-serif; background: #0a0a0f; color: #e0e0e0; }
  .neon-header { padding: 44px 48px; border-bottom: 1px solid rgba(0,255,200,0.2); position: relative; overflow: hidden; }
  .neon-header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(ellipse at 20% 50%, rgba(0,255,200,0.06) 0%, transparent 60%); pointer-events: none; }
  .neon-name { font-size: 2.6rem; font-weight: 900; letter-spacing: -0.02em; }
  .neon-name span { color: #00ffc8; text-shadow: 0 0 20px rgba(0,255,200,0.5); }
  .neon-role { font-size: 0.85rem; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.12em; margin-top: 6px; }
  .neon-contact { display: flex; flex-wrap: wrap; gap: 6px 20px; margin-top: 14px; font-size: 0.78rem; color: rgba(255,255,255,0.5); }
  .neon-body { display: grid; grid-template-columns: 1fr 220px; }
  .neon-main { padding: 32px 40px; }
  .neon-aside { padding: 32px 28px; border-left: 1px solid rgba(0,255,200,0.15); }
  .neon-section { margin-bottom: 26px; }
  .neon-section-title { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.16em; color: #00ffc8; margin-bottom: 14px; }
  .neon-entry { margin-bottom: 14px; border-left: 2px solid rgba(0,255,200,0.25); padding-left: 14px; }
  .neon-entry-title { font-weight: 700; font-size: 0.9rem; color: #e0e0e0; }
  .neon-entry-sub { font-size: 0.78rem; color: rgba(255,255,255,0.45); margin-top: 2px; }
  .neon-entry-date { font-size: 0.72rem; color: #00ffc8; margin-top: 2px; }
  .neon-entry-desc { font-size: 0.8rem; color: rgba(255,255,255,0.55); margin-top: 5px; line-height: 1.65; }
  .neon-skill { background: rgba(0,255,200,0.07); border: 1px solid rgba(0,255,200,0.2); color: #00ffc8; padding: 4px 10px; border-radius: 4px; font-size: 0.74rem; margin-bottom: 6px; display: block; }
  .neon-summary { font-size: 0.84rem; color: rgba(255,255,255,0.6); line-height: 1.75; margin-bottom: 24px; border: 1px solid rgba(0,255,200,0.15); padding: 14px 16px; border-radius: 8px; }

  /* ── PASTEL ── */
  .resume-pastel { font-family: 'DM Sans', sans-serif; }
  .pastel-header { background: linear-gradient(135deg, #fce4ec, #f3e5f5, #e8eaf6); padding: 44px 48px; display: flex; align-items: center; gap: 28px; }
  .pastel-avatar { width: 84px; height: 84px; border-radius: 50%; background: linear-gradient(135deg, #f48fb1, #ce93d8); display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 800; color: white; border: 4px solid white; box-shadow: 0 4px 16px rgba(206,147,216,0.3); flex-shrink: 0; }
  .pastel-header-info { flex: 1; }
  .pastel-name { font-size: 2rem; font-weight: 800; color: #4a148c; }
  .pastel-role { font-size: 0.84rem; color: #7b1fa2; margin-top: 4px; font-weight: 500; }
  .pastel-contact { display: flex; flex-wrap: wrap; gap: 5px 18px; margin-top: 10px; font-size: 0.78rem; color: #555; }
  .pastel-body { padding: 36px 48px; }
  .pastel-summary { background: linear-gradient(135deg, #fce4ec, #f3e5f5); border-radius: 12px; padding: 16px 20px; font-size: 0.86rem; line-height: 1.7; color: #444; margin-bottom: 28px; }
  .pastel-section { margin-bottom: 26px; }
  .pastel-section-title { font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.14em; color: #7b1fa2; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
  .pastel-section-title::before { content: ''; width: 8px; height: 8px; background: #ce93d8; border-radius: 50%; }
  .pastel-entry { background: #fafafa; border: 1px solid #f0e6f6; border-radius: 10px; padding: 12px 16px; margin-bottom: 10px; }
  .pastel-entry-title { font-weight: 700; font-size: 0.9rem; color: #4a148c; }
  .pastel-entry-sub { font-size: 0.8rem; color: #7b1fa2; margin-top: 2px; }
  .pastel-entry-date { font-size: 0.75rem; color: #999; margin-top: 2px; }
  .pastel-entry-desc { font-size: 0.82rem; color: #555; margin-top: 5px; line-height: 1.6; }
  .pastel-skills { display: flex; flex-wrap: wrap; gap: 8px; }
  .pastel-skill { background: linear-gradient(135deg, #fce4ec, #f3e5f5); border: 1px solid #ce93d8; color: #7b1fa2; padding: 5px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 600; }

  /* ── TIMELINE ── */
  .resume-timeline { font-family: 'DM Sans', sans-serif; padding: 44px 48px; }
  .tl-header { margin-bottom: 36px; }
  .tl-name { font-size: 2.4rem; font-weight: 900; color: #1a1a2e; letter-spacing: -0.02em; }
  .tl-name span { color: #f5a623; }
  .tl-bar { width: 60px; height: 4px; background: linear-gradient(90deg, #f5a623, #e8563a); margin: 12px 0; border-radius: 2px; }
  .tl-contact { display: flex; flex-wrap: wrap; gap: 5px 20px; font-size: 0.8rem; color: #666; }
  .tl-layout { display: grid; grid-template-columns: 1fr 200px; gap: 0; }
  .tl-main { padding-right: 36px; }
  .tl-aside { border-left: 2px solid #eee; padding-left: 28px; }
  .tl-section { margin-bottom: 28px; }
  .tl-section-title { font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.14em; color: #f5a623; margin-bottom: 16px; }
  .tl-entry { display: grid; grid-template-columns: 80px 1fr; gap: 16px; margin-bottom: 16px; align-items: start; }
  .tl-date-col { text-align: right; }
  .tl-date { font-size: 0.72rem; font-weight: 700; color: #f5a623; white-space: nowrap; }
  .tl-date-end { font-size: 0.68rem; color: #aaa; }
  .tl-content { border-left: 3px solid #f5a623; padding-left: 14px; position: relative; }
  .tl-content::before { content: ''; position: absolute; left: -6px; top: 5px; width: 9px; height: 9px; border-radius: 50%; background: #f5a623; }
  .tl-entry-title { font-weight: 700; font-size: 0.9rem; }
  .tl-entry-sub { font-size: 0.8rem; color: #777; margin-top: 2px; }
  .tl-entry-desc { font-size: 0.8rem; color: #555; margin-top: 4px; line-height: 1.6; }
  .tl-aside-title { font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #aaa; margin-bottom: 8px; margin-top: 20px; }
  .tl-aside-title:first-child { margin-top: 0; }
  .tl-aside-item { font-size: 0.82rem; padding: 5px 0; border-bottom: 1px solid #eee; color: #444; }
  .tl-summary { font-size: 0.86rem; color: #555; line-height: 1.7; margin-bottom: 24px; padding: 14px; background: #fffbf0; border-left: 4px solid #f5a623; }


  .badge-executive { background: #1a1a2e; color: #c9a84c; }
  .badge-tech { background: #0d1117; color: #7ee787; }
  .badge-elegant { background: #f8f4ec; color: #b8860b; }
  .badge-startup { background: #f0edff; color: #6c63ff; }
  .badge-corporate { background: #e8f0f8; color: #003366; }
  .badge-infographic { background: #fff5eb; color: #ed8936; }
  .badge-academic { background: #f5f5f5; color: #333; }
  .badge-neon { background: #0a0a0f; color: #00ffc8; }
  .badge-pastel { background: #fce4ec; color: #7b1fa2; }
  .badge-timeline { background: #fffbf0; color: #f5a623; }

  /* ── FOOTER ── */
  .footer { background: var(--ink); color: rgba(255,255,255,0.55); padding: 3rem 2rem; margin-top: auto; }
  .footer-inner { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2rem; }
  @media (max-width: 640px) { .footer-inner { grid-template-columns: 1fr; } }
  .footer-brand .logo { font-family: var(--font-display); font-size: 1.3rem; color: white; display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
  .footer-brand p { font-size: 0.85rem; line-height: 1.6; }
  .footer-col h4 { color: white; font-size: 0.85rem; font-weight: 700; margin-bottom: 12px; letter-spacing: 0.04em; }
  .footer-col p, .footer-col a { font-size: 0.82rem; line-height: 1.8; display: block; color: rgba(255,255,255,0.55); text-decoration: none; }
  .footer-col a:hover { color: white; }
  .footer-link-btn { background: none; border: none; cursor: pointer; font-family: var(--font-body); font-size: 0.82rem; line-height: 1.8; display: block; color: rgba(255,255,255,0.55); text-align: left; padding: 0; }
  .footer-link-btn:hover { color: white; }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); margin-top: 2rem; padding-top: 1.5rem; text-align: center; font-size: 0.78rem; }

  .progress-bar { display: flex; gap: 8px; margin-bottom: 2rem; }
  .progress-step { flex: 1; height: 4px; background: var(--border); border-radius: 2px; transition: background 0.3s; }
  .progress-step.done { background: var(--accent); }

  /* ── EXTRA PAGES (About / Contact / Privacy) ── */
  .xpage { min-height: 70vh; }

  /* shared inner page hero */
  .xpage-hero {
    background: linear-gradient(135deg, var(--ink) 0%, #1e1d2e 60%, #2a2435 100%);
    padding: 4rem 2rem 5rem; text-align: center; position: relative; overflow: hidden;
  }
  .xpage-hero::before {
    content: ''; position: absolute; top: -40%; left: -10%; width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(232,86,58,0.12) 0%, transparent 70%); pointer-events: none;
  }
  .xpage-hero-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(232,86,58,0.15); border: 1px solid rgba(232,86,58,0.3);
    color: #ff8c7a; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; padding: 5px 14px; border-radius: 100px; margin-bottom: 1.2rem;
  }
  .xpage-hero h1 {
    font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3.2rem);
    color: white; line-height: 1.15; margin-bottom: 0.8rem; position: relative; z-index: 1;
  }
  .xpage-hero h1 span { color: var(--accent); font-style: italic; }
  .xpage-hero p { color: rgba(255,255,255,0.55); font-size: 1rem; max-width: 460px; margin: 0 auto; line-height: 1.7; position: relative; z-index: 1; }

  /* page body wrapper */
  .xpage-body { max-width: 860px; margin: 0 auto; padding: 3.5rem 1.5rem 5rem; }

  /* ── ABOUT ── */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 3rem; }
  @media (max-width: 640px) { .about-grid { grid-template-columns: 1fr; } }
  .about-card {
    background: var(--paper); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 1.8rem; box-shadow: var(--shadow); transition: transform 0.2s, box-shadow 0.2s;
  }
  .about-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
  .about-card-icon { font-size: 2rem; margin-bottom: 1rem; }
  .about-card h3 { font-family: var(--font-display); font-size: 1.2rem; margin-bottom: 0.6rem; color: var(--ink); }
  .about-card p { font-size: 0.88rem; color: var(--muted); line-height: 1.7; }
  .about-mission {
    background: linear-gradient(135deg, var(--ink) 0%, #1e1d2e 100%);
    border-radius: var(--radius); padding: 2.5rem; margin-bottom: 3rem; text-align: center;
  }
  .about-mission h2 { font-family: var(--font-display); font-size: 1.8rem; color: white; margin-bottom: 0.8rem; }
  .about-mission p { color: rgba(255,255,255,0.6); font-size: 0.95rem; line-height: 1.8; max-width: 560px; margin: 0 auto; }
  .about-team-title { font-family: var(--font-display); font-size: 1.6rem; text-align: center; margin-bottom: 1.8rem; }
  .about-team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  @media (max-width: 640px) { .about-team-grid { grid-template-columns: 1fr; } }
  .team-card {
    background: var(--paper); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 1.5rem; text-align: center; box-shadow: var(--shadow);
  }
  .team-avatar {
    width: 70px; height: 70px; border-radius: 50%; margin: 0 auto 1rem;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.6rem; font-weight: 800; color: white;
  }
  .team-name { font-weight: 700; font-size: 0.95rem; }
  .team-role { font-size: 0.8rem; color: var(--muted); margin-top: 3px; }
  .about-stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 3rem; }
  @media (max-width: 640px) { .about-stats-row { grid-template-columns: 1fr; } }
  .about-stat-card {
    background: var(--paper); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 1.5rem; text-align: center; box-shadow: var(--shadow);
  }
  .about-stat-num { font-family: var(--font-display); font-size: 2.4rem; font-weight: 700; color: var(--accent); }
  .about-stat-label { font-size: 0.82rem; color: var(--muted); margin-top: 4px; text-transform: uppercase; letter-spacing: 0.08em; }

  /* ── CONTACT ── */
  .contact-layout { display: grid; grid-template-columns: 1fr 1.4fr; gap: 2.5rem; }
  @media (max-width: 700px) { .contact-layout { grid-template-columns: 1fr; } }
  .contact-info-card {
    background: var(--paper); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 2rem; box-shadow: var(--shadow); height: fit-content;
  }
  .contact-info-card h2 { font-family: var(--font-display); font-size: 1.4rem; margin-bottom: 1.4rem; }
  .contact-info-item {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 14px 0; border-bottom: 1px solid var(--border);
  }
  .contact-info-item:last-child { border-bottom: none; }
  .contact-info-icon {
    width: 40px; height: 40px; border-radius: 10px; background: var(--ink);
    display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;
  }
  .contact-info-label { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin-bottom: 3px; }
  .contact-info-value { font-size: 0.9rem; color: var(--ink); font-weight: 500; }
  .contact-info-value a { color: var(--accent); text-decoration: none; }
  .contact-info-value a:hover { text-decoration: underline; }
  .contact-form-card {
    background: var(--paper); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 2rem; box-shadow: var(--shadow);
  }
  .contact-form-card h2 { font-family: var(--font-display); font-size: 1.4rem; margin-bottom: 1.4rem; }
  .contact-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
  @media (max-width: 500px) { .contact-form-row { grid-template-columns: 1fr; } }
  .contact-submit-btn {
    width: 100%; background: var(--ink); color: white; border: none; cursor: pointer;
    padding: 13px; border-radius: 8px; font-size: 0.95rem; font-weight: 700;
    font-family: var(--font-body); transition: all 0.2s; margin-top: 8px;
  }
  .contact-submit-btn:hover { background: var(--accent); transform: translateY(-1px); }
  .contact-success {
    background: #f0faf4; border: 1px solid #a8d5b5; border-radius: 10px;
    padding: 1.2rem 1.5rem; display: flex; align-items: center; gap: 12px;
    margin-top: 1rem; font-size: 0.9rem; color: #1e6e3e; font-weight: 500;
  }
  .contact-map-band {
    background: var(--ink); border-radius: var(--radius); padding: 2rem;
    margin-top: 2.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;
  }
  .contact-map-text h3 { font-family: var(--font-display); color: white; font-size: 1.2rem; }
  .contact-map-text p { color: rgba(255,255,255,0.55); font-size: 0.85rem; margin-top: 4px; }
  .contact-map-badge { background: rgba(232,86,58,0.15); border: 1px solid rgba(232,86,58,0.3); color: #ff8c7a; font-size: 0.8rem; font-weight: 600; padding: 6px 14px; border-radius: 6px; }

  /* ── PRIVACY ── */
  .privacy-toc {
    background: var(--paper); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 1.5rem; margin-bottom: 2rem; box-shadow: var(--shadow);
  }
  .privacy-toc h3 { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); margin-bottom: 10px; }
  .privacy-toc-list { display: flex; flex-direction: column; gap: 6px; }
  .privacy-toc-item {
    font-size: 0.88rem; color: var(--accent); cursor: pointer; font-weight: 500;
    display: flex; align-items: center; gap: 8px; background: none; border: none;
    font-family: var(--font-body); text-align: left; padding: 3px 0;
  }
  .privacy-toc-item:hover { color: var(--ink); }
  .privacy-section { margin-bottom: 2.5rem; }
  .privacy-section h2 { font-family: var(--font-display); font-size: 1.4rem; color: var(--ink); margin-bottom: 1rem; padding-bottom: 8px; border-bottom: 2px solid var(--accent); display: inline-block; }
  .privacy-section p { font-size: 0.9rem; color: #444; line-height: 1.8; margin-bottom: 0.8rem; }
  .privacy-section ul { padding-left: 1.2rem; margin: 0.6rem 0; }
  .privacy-section ul li { font-size: 0.9rem; color: #444; line-height: 1.8; margin-bottom: 4px; }
  .privacy-highlight {
    background: #fef0ec; border-left: 4px solid var(--accent);
    border-radius: 0 8px 8px 0; padding: 14px 18px; margin: 1rem 0;
    font-size: 0.88rem; color: #555; line-height: 1.7;
  }
  .privacy-updated { font-size: 0.78rem; color: var(--muted); margin-bottom: 2rem; font-style: italic; }

`;

// ============================================================
// INITIAL DATA
// ============================================================
const initialData = {
  personal: { name: '', email: '', phone: '', address: '', linkedin: '' },
  summary: '',
  skills: [],
  experience: [],
  education: [],
  projects: [],
};

const TEMPLATES = [
  { id: 'classic', name: 'Classic', badge: 'Classic', badgeClass: 'badge-classic' },
  { id: 'modern', name: 'Modern', badge: 'Modern', badgeClass: 'badge-modern' },
  { id: 'minimal', name: 'Minimal', badge: 'Minimal', badgeClass: 'badge-minimal' },
  { id: 'bold', name: 'Bold', badge: 'Bold', badgeClass: 'badge-bold' },
  { id: 'creative', name: 'Creative', badge: 'Creative', badgeClass: 'badge-creative' },

  { id: 'executive', name: 'Executive', badge: 'Executive', badgeClass: 'badge-executive' },
  { id: 'tech', name: 'Tech / Dev', badge: 'Tech', badgeClass: 'badge-tech' },
  { id: 'elegant', name: 'Elegant', badge: 'Elegant', badgeClass: 'badge-elegant' },
  { id: 'startup', name: 'Startup', badge: 'Startup', badgeClass: 'badge-startup' },
  { id: 'corporate', name: 'Corporate', badge: 'Corporate', badgeClass: 'badge-corporate' },
  { id: 'infographic', name: 'Infographic', badge: 'Info', badgeClass: 'badge-infographic' },
  { id: 'academic', name: 'Academic', badge: 'Academic', badgeClass: 'badge-academic' },
  { id: 'neon', name: 'Neon Dark', badge: 'Neon', badgeClass: 'badge-neon' },
  { id: 'pastel', name: 'Pastel', badge: 'Pastel', badgeClass: 'badge-pastel' },
  { id: 'timeline', name: 'Timeline', badge: 'Timeline', badgeClass: 'badge-timeline' },
];

// ============================================================
// RESUME TEMPLATES (rendering components)
// ============================================================

function initials(name) {
  if (!name) return '?';
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

function ResumeClassic({ data }) {
  const d = data;
  return (
    <div className="resume-classic">
      <div className="classic-header">
        <div className="classic-name">{d.personal.name || 'Your Name'}</div>
        <div className="classic-contact">
          {d.personal.email && <span>✉ {d.personal.email}</span>}
          {d.personal.phone && <span>✆ {d.personal.phone}</span>}
          {d.personal.address && <span>⌖ {d.personal.address}</span>}
          {d.personal.linkedin && <span>in {d.personal.linkedin}</span>}
        </div>
      </div>
      {d.summary && (
        <div className="classic-section">
          <div className="classic-section-title">Professional Summary</div>
          <p style={{fontSize:'0.88rem',lineHeight:'1.7',color:'#444'}}>{d.summary}</p>
        </div>
      )}
      {d.experience.length > 0 && (
        <div className="classic-section">
          <div className="classic-section-title">Work Experience</div>
          {d.experience.map((e, i) => (
            <div className="classic-entry" key={i}>
              <div className="classic-entry-header">
                <div className="classic-entry-title">{e.title}</div>
                <div className="classic-entry-date">{e.startDate}{e.startDate && e.endDate ? ' – ' : ''}{e.endDate}</div>
              </div>
              <div className="classic-entry-sub">{e.company}{e.location ? `, ${e.location}` : ''}</div>
              {e.description && <div className="classic-entry-desc">{e.description}</div>}
            </div>
          ))}
        </div>
      )}
      {d.education.length > 0 && (
        <div className="classic-section">
          <div className="classic-section-title">Education</div>
          {d.education.map((e, i) => (
            <div className="classic-entry" key={i}>
              <div className="classic-entry-header">
                <div className="classic-entry-title">{e.degree}</div>
                <div className="classic-entry-date">{e.startDate}{e.startDate && e.endDate ? ' – ' : ''}{e.endDate}</div>
              </div>
              <div className="classic-entry-sub">{e.institution}</div>
              {e.description && <div className="classic-entry-desc">{e.description}</div>}
            </div>
          ))}
        </div>
      )}
      {d.projects.length > 0 && (
        <div className="classic-section">
          <div className="classic-section-title">Projects</div>
          {d.projects.map((p, i) => (
            <div className="classic-entry" key={i}>
              <div className="classic-entry-header">
                <div className="classic-entry-title">{p.name}</div>
                <div className="classic-entry-date">{p.link}</div>
              </div>
              {p.technologies && <div className="classic-entry-sub">{p.technologies}</div>}
              {p.description && <div className="classic-entry-desc">{p.description}</div>}
            </div>
          ))}
        </div>
      )}
      {d.skills.length > 0 && (
        <div className="classic-section">
          <div className="classic-section-title">Skills</div>
          <div className="classic-skills-list">
            {d.skills.map((s, i) => <span className="classic-skill" key={i}>{s}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}

function ResumeModern({ data }) {
  const d = data;
  return (
    <div className="resume-modern">
      <div className="modern-sidebar">
        <div className="modern-photo-placeholder">{initials(d.personal.name)}</div>
        <div className="modern-name">{d.personal.name || 'Your Name'}</div>
        <div className="modern-title">{d.experience[0]?.title || 'Professional'}</div>
        <div className="modern-sidebar-section">
          <div className="modern-sidebar-title">Contact</div>
          {d.personal.email && <div className="modern-contact-item"><span>✉</span>{d.personal.email}</div>}
          {d.personal.phone && <div className="modern-contact-item"><span>✆</span>{d.personal.phone}</div>}
          {d.personal.address && <div className="modern-contact-item"><span>⌖</span>{d.personal.address}</div>}
          {d.personal.linkedin && <div className="modern-contact-item"><span>in</span>{d.personal.linkedin}</div>}
        </div>
        {d.skills.length > 0 && (
          <div className="modern-sidebar-section">
            <div className="modern-sidebar-title">Skills</div>
            {d.skills.map((s, i) => (
              <div className="modern-skill-bar" key={i}>
                <div className="modern-skill-name">{s}</div>
                <div className="modern-skill-track"><div className="modern-skill-fill" style={{width:`${70+Math.random()*30}%`}}></div></div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="modern-main">
        {d.summary && (
          <div className="modern-section">
            <div className="modern-section-title">About Me</div>
            <p style={{fontSize:'0.85rem',lineHeight:'1.7',color:'#555'}}>{d.summary}</p>
          </div>
        )}
        {d.experience.length > 0 && (
          <div className="modern-section">
            <div className="modern-section-title">Experience</div>
            {d.experience.map((e, i) => (
              <div className="modern-entry" key={i}>
                <div className="modern-dot"></div>
                <div>
                  <div className="modern-entry-title">{e.title}</div>
                  <div className="modern-entry-sub">{e.company}{e.location ? ` · ${e.location}` : ''}{e.startDate ? ` · ${e.startDate}${e.endDate ? ` – ${e.endDate}` : ''}` : ''}</div>
                  {e.description && <div className="modern-entry-desc">{e.description}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
        {d.education.length > 0 && (
          <div className="modern-section">
            <div className="modern-section-title">Education</div>
            {d.education.map((e, i) => (
              <div className="modern-entry" key={i}>
                <div className="modern-dot"></div>
                <div>
                  <div className="modern-entry-title">{e.degree}</div>
                  <div className="modern-entry-sub">{e.institution}{e.startDate ? ` · ${e.startDate}${e.endDate ? ` – ${e.endDate}` : ''}` : ''}</div>
                  {e.description && <div className="modern-entry-desc">{e.description}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
        {d.projects.length > 0 && (
          <div className="modern-section">
            <div className="modern-section-title">Projects</div>
            {d.projects.map((p, i) => (
              <div className="modern-entry" key={i}>
                <div className="modern-dot"></div>
                <div>
                  <div className="modern-entry-title">{p.name}</div>
                  {p.technologies && <div className="modern-entry-sub">{p.technologies}</div>}
                  {p.description && <div className="modern-entry-desc">{p.description}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ResumeMinimal({ data }) {
  const d = data;
  return (
    <div className="resume-minimal">
      <div className="minimal-header">
        <div className="minimal-name">
          {d.personal.name ? (
            <>{d.personal.name.split(' ').slice(0,-1).join(' ')} <strong>{d.personal.name.split(' ').slice(-1)}</strong></>
          ) : <strong>Your Name</strong>}
        </div>
        <div className="minimal-divider"></div>
        <div className="minimal-contact">
          {d.personal.email && <span>{d.personal.email}</span>}
          {d.personal.phone && <span>{d.personal.phone}</span>}
          {d.personal.address && <span>{d.personal.address}</span>}
          {d.personal.linkedin && <span>{d.personal.linkedin}</span>}
        </div>
      </div>
      {d.summary && (
        <div className="minimal-section">
          <div className="minimal-section-title">Summary</div>
          <p style={{fontSize:'0.88rem',lineHeight:'1.7',color:'#555'}}>{d.summary}</p>
        </div>
      )}
      {d.experience.length > 0 && (
        <div className="minimal-section">
          <div className="minimal-section-title">Experience</div>
          {d.experience.map((e, i) => (
            <div className="minimal-entry" key={i}>
              <div className="minimal-date">{e.startDate}{e.endDate ? `–${e.endDate}` : ''}</div>
              <div>
                <div className="minimal-entry-title">{e.title}</div>
                <div className="minimal-entry-sub">{e.company}{e.location ? `, ${e.location}` : ''}</div>
                {e.description && <div className="minimal-entry-desc">{e.description}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
      {d.education.length > 0 && (
        <div className="minimal-section">
          <div className="minimal-section-title">Education</div>
          {d.education.map((e, i) => (
            <div className="minimal-entry" key={i}>
              <div className="minimal-date">{e.startDate}{e.endDate ? `–${e.endDate}` : ''}</div>
              <div>
                <div className="minimal-entry-title">{e.degree}</div>
                <div className="minimal-entry-sub">{e.institution}</div>
                {e.description && <div className="minimal-entry-desc">{e.description}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
      {d.projects.length > 0 && (
        <div className="minimal-section">
          <div className="minimal-section-title">Projects</div>
          {d.projects.map((p, i) => (
            <div className="minimal-entry" key={i}>
              <div className="minimal-date">{p.link || ''}</div>
              <div>
                <div className="minimal-entry-title">{p.name}</div>
                {p.technologies && <div className="minimal-entry-sub">{p.technologies}</div>}
                {p.description && <div className="minimal-entry-desc">{p.description}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
      {d.skills.length > 0 && (
        <div className="minimal-section">
          <div className="minimal-section-title">Skills</div>
          <div className="minimal-skills">
            {d.skills.map((s, i) => <span className="minimal-skill" key={i}>{s}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}

function ResumeBold({ data }) {
  const d = data;
  return (
    <div className="resume-bold">
      <div className="bold-header">
        <div className="bold-name">
          {d.personal.name ? (
            <>{d.personal.name.split(' ').slice(0,-1).join(' ')} <span>{d.personal.name.split(' ').slice(-1)}</span></>
          ) : <span>Your Name</span>}
        </div>
        <div className="bold-contact-strip">
          {d.personal.email && <span>✉ {d.personal.email}</span>}
          {d.personal.phone && <span>✆ {d.personal.phone}</span>}
          {d.personal.address && <span>⌖ {d.personal.address}</span>}
          {d.personal.linkedin && <span>in {d.personal.linkedin}</span>}
        </div>
      </div>
      <div className="bold-body">
        <div className="bold-main">
          {d.summary && (
            <div className="bold-section">
              <div className="bold-section-title">About</div>
              <p style={{fontSize:'0.85rem',lineHeight:'1.7',color:'#555'}}>{d.summary}</p>
            </div>
          )}
          {d.experience.length > 0 && (
            <div className="bold-section">
              <div className="bold-section-title">Experience</div>
              {d.experience.map((e, i) => (
                <div className="bold-entry" key={i}>
                  <div className="bold-entry-title">{e.title}</div>
                  <div className="bold-entry-sub">{e.company}{e.location ? ` · ${e.location}` : ''}</div>
                  <div className="bold-entry-date">{e.startDate}{e.endDate ? ` — ${e.endDate}` : ''}</div>
                  {e.description && <div className="bold-entry-desc">{e.description}</div>}
                </div>
              ))}
            </div>
          )}
          {d.education.length > 0 && (
            <div className="bold-section">
              <div className="bold-section-title">Education</div>
              {d.education.map((e, i) => (
                <div className="bold-entry" key={i}>
                  <div className="bold-entry-title">{e.degree}</div>
                  <div className="bold-entry-sub">{e.institution}</div>
                  <div className="bold-entry-date">{e.startDate}{e.endDate ? ` — ${e.endDate}` : ''}</div>
                  {e.description && <div className="bold-entry-desc">{e.description}</div>}
                </div>
              ))}
            </div>
          )}
          {d.projects.length > 0 && (
            <div className="bold-section">
              <div className="bold-section-title">Projects</div>
              {d.projects.map((p, i) => (
                <div className="bold-entry" key={i}>
                  <div className="bold-entry-title">{p.name}</div>
                  {p.technologies && <div className="bold-entry-sub">{p.technologies}</div>}
                  {p.description && <div className="bold-entry-desc">{p.description}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bold-aside">
          {d.skills.length > 0 && (
            <>
              <div className="bold-aside-title">Skills</div>
              {d.skills.map((s, i) => (
                <div className="bold-skill" key={i}>{s}</div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ResumeCreative({ data }) {
  const d = data;
  return (
    <div className="resume-creative">
      <div className="creative-header">
        <div className="creative-avatar">{initials(d.personal.name)}</div>
        <div className="creative-header-info">
          <div className="creative-name">{d.personal.name || 'Your Name'}</div>
          <div className="creative-tagline">{d.experience[0]?.title || 'Professional'}</div>
          <div className="creative-contact">
            {d.personal.email && <span>{d.personal.email}</span>}
            {d.personal.phone && <span>{d.personal.phone}</span>}
            {d.personal.address && <span>{d.personal.address}</span>}
            {d.personal.linkedin && <span>{d.personal.linkedin}</span>}
          </div>
        </div>
      </div>
      <div className="creative-body">
        <div className="creative-main">
          {d.summary && (
            <div className="creative-section">
              <div className="creative-section-title">Profile</div>
              <p style={{fontSize:'0.85rem',lineHeight:'1.7',color:'#555'}}>{d.summary}</p>
            </div>
          )}
          {d.experience.length > 0 && (
            <div className="creative-section">
              <div className="creative-section-title">Experience</div>
              {d.experience.map((e, i) => (
                <div className="creative-entry" key={i}>
                  <div className="creative-entry-title">{e.title}</div>
                  <div className="creative-entry-sub">{e.company}{e.location ? ` · ${e.location}` : ''}</div>
                  <div className="creative-entry-date">{e.startDate}{e.endDate ? ` – ${e.endDate}` : ''}</div>
                  {e.description && <div className="creative-entry-desc">{e.description}</div>}
                </div>
              ))}
            </div>
          )}
          {d.projects.length > 0 && (
            <div className="creative-section">
              <div className="creative-section-title">Projects</div>
              {d.projects.map((p, i) => (
                <div className="creative-entry" key={i}>
                  <div className="creative-entry-title">{p.name}</div>
                  {p.technologies && <div className="creative-entry-sub">{p.technologies}</div>}
                  {p.description && <div className="creative-entry-desc">{p.description}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="creative-aside">
          {d.education.length > 0 && (
            <>
              <div className="creative-aside-title">Education</div>
              {d.education.map((e, i) => (
                <div key={i} style={{marginBottom:'12px'}}>
                  <div style={{fontWeight:700,fontSize:'0.82rem'}}>{e.degree}</div>
                  <div style={{fontSize:'0.78rem',color:'#2a6496'}}>{e.institution}</div>
                  <div style={{fontSize:'0.75rem',color:'#888'}}>{e.startDate}{e.endDate ? `–${e.endDate}` : ''}</div>
                </div>
              ))}
            </>
          )}
          {d.skills.length > 0 && (
            <>
              <div className="creative-aside-title">Skills</div>
              {d.skills.map((s, i) => (
                <div className="creative-skill-item" key={i}>{s}</div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}


function ResumeExecutive({ data }) {
  const d = data;
  return (
    <div className="resume-executive">
      <div className="exec-header">
        <div className="exec-monogram">{initials(d.personal.name)}</div>
        <div className="exec-header-text">
          <div className="exec-name">{d.personal.name || 'Your Name'}</div>
          <div className="exec-title">{d.experience[0]?.title || 'Executive Professional'}</div>
          <div className="exec-contact">
            {d.personal.email && <span>{d.personal.email}</span>}
            {d.personal.phone && <span>{d.personal.phone}</span>}
            {d.personal.address && <span>{d.personal.address}</span>}
            {d.personal.linkedin && <span>{d.personal.linkedin}</span>}
          </div>
        </div>
      </div>
      <div className="exec-body">
        <div className="exec-main">
          {d.summary && (<div className="exec-section"><div className="exec-section-title">Executive Summary</div><p style={{fontSize:'0.86rem',lineHeight:'1.75',color:'#444'}}>{d.summary}</p></div>)}
          {d.experience.length > 0 && (<div className="exec-section"><div className="exec-section-title">Professional Experience</div>{d.experience.map((e,i)=>(
            <div className="exec-entry" key={i}><div className="exec-entry-row"><div className="exec-entry-title">{e.title}</div><div className="exec-entry-date">{e.startDate}{e.endDate?` – ${e.endDate}`:''}</div></div>
            <div className="exec-entry-sub">{e.company}{e.location?`, ${e.location}`:''}</div>{e.description&&<div className="exec-entry-desc">{e.description}</div>}</div>
          ))}</div>)}
          {d.education.length > 0 && (<div className="exec-section"><div className="exec-section-title">Education</div>{d.education.map((e,i)=>(
            <div className="exec-entry" key={i}><div className="exec-entry-row"><div className="exec-entry-title">{e.degree}</div><div className="exec-entry-date">{e.startDate}{e.endDate?` – ${e.endDate}`:''}</div></div>
            <div className="exec-entry-sub">{e.institution}</div></div>
          ))}</div>)}
          {d.projects.length > 0 && (<div className="exec-section"><div className="exec-section-title">Key Projects</div>{d.projects.map((p,i)=>(
            <div className="exec-entry" key={i}><div className="exec-entry-title">{p.name}</div>{p.technologies&&<div className="exec-entry-sub">{p.technologies}</div>}{p.description&&<div className="exec-entry-desc">{p.description}</div>}</div>
          ))}</div>)}
        </div>
        <div className="exec-aside">
          {d.skills.length > 0 && (<><div className="exec-aside-title">Core Competencies</div>{d.skills.map((s,i)=><div className="exec-skill" key={i}>{s}</div>)}</>)}
        </div>
      </div>
    </div>
  );
}

function ResumeTech({ data }) {
  const d = data;
  return (
    <div className="resume-tech">
      <div className="tech-header">
        <div className="tech-prompt">$ whoami</div>
        <div className="tech-name">{d.personal.name || 'Your Name'}</div>
        <div className="tech-contact">
          {d.personal.email && <span>{d.personal.email}</span>}
          {d.personal.phone && <span>{d.personal.phone}</span>}
          {d.personal.address && <span>{d.personal.address}</span>}
          {d.personal.linkedin && <span>{d.personal.linkedin}</span>}
        </div>
      </div>
      {d.summary && <div className="tech-summary">{d.summary}</div>}
      {d.experience.length > 0 && (<div className="tech-section"><div className="tech-section-title">experience</div>{d.experience.map((e,i)=>(
        <div className="tech-entry" key={i}><div className="tech-entry-title">{e.title}</div>
        <div className="tech-entry-meta">{e.company}{e.location?` @ ${e.location}`:''} <span>{e.startDate}{e.endDate?` → ${e.endDate}`:''}</span></div>
        {e.description&&<div className="tech-entry-desc">{e.description}</div>}</div>
      ))}</div>)}
      {d.projects.length > 0 && (<div className="tech-section"><div className="tech-section-title">projects</div>{d.projects.map((p,i)=>(
        <div className="tech-entry" key={i}><div className="tech-entry-title">{p.name}</div>
        {p.technologies&&<div className="tech-entry-meta"><span>{p.technologies}</span></div>}
        {p.description&&<div className="tech-entry-desc">{p.description}</div>}</div>
      ))}</div>)}
      {d.education.length > 0 && (<div className="tech-section"><div className="tech-section-title">education</div>{d.education.map((e,i)=>(
        <div className="tech-entry" key={i}><div className="tech-entry-title">{e.degree}</div>
        <div className="tech-entry-meta">{e.institution} <span>{e.startDate}{e.endDate?`–${e.endDate}`:''}</span></div></div>
      ))}</div>)}
      {d.skills.length > 0 && (<div className="tech-section"><div className="tech-section-title">skills</div><div className="tech-skills-grid">{d.skills.map((s,i)=><span className="tech-skill" key={i}>{s}</span>)}</div></div>)}
    </div>
  );
}

function ResumeElegant({ data }) {
  const d = data;
  return (
    <div className="resume-elegant">
      <div className="elegant-header">
        <div className="elegant-name">{d.personal.name || 'Your Name'}</div>
        <div className="elegant-subtitle">{d.experience[0]?.title || 'Professional'}</div>
        <div className="elegant-contact">
          {d.personal.email && <span>{d.personal.email}</span>}
          {d.personal.phone && <span>{d.personal.phone}</span>}
          {d.personal.address && <span>{d.personal.address}</span>}
          {d.personal.linkedin && <span>{d.personal.linkedin}</span>}
        </div>
      </div>
      {d.summary && (<div className="elegant-section"><div className="elegant-section-title">Profile</div><p style={{fontSize:'0.86rem',lineHeight:'1.75',color:'#555',textAlign:'center',maxWidth:'540px',margin:'0 auto'}}>{d.summary}</p></div>)}
      {d.experience.length > 0 && (<div className="elegant-section"><div className="elegant-section-title">Experience</div>{d.experience.map((e,i)=>(
        <div className="elegant-entry" key={i}><div className="elegant-entry-row"><div className="elegant-entry-title">{e.title}</div><div className="elegant-entry-date">{e.startDate}{e.endDate?` – ${e.endDate}`:''}</div></div>
        <div className="elegant-entry-sub">{e.company}{e.location?`, ${e.location}`:''}</div>{e.description&&<div className="elegant-entry-desc">{e.description}</div>}</div>
      ))}</div>)}
      {d.education.length > 0 && (<div className="elegant-section"><div className="elegant-section-title">Education</div>{d.education.map((e,i)=>(
        <div className="elegant-entry" key={i}><div className="elegant-entry-row"><div className="elegant-entry-title">{e.degree}</div><div className="elegant-entry-date">{e.startDate}{e.endDate?` – ${e.endDate}`:''}</div></div>
        <div className="elegant-entry-sub">{e.institution}</div></div>
      ))}</div>)}
      {d.projects.length > 0 && (<div className="elegant-section"><div className="elegant-section-title">Projects</div>{d.projects.map((p,i)=>(
        <div className="elegant-entry" key={i}><div className="elegant-entry-row"><div className="elegant-entry-title">{p.name}</div><div className="elegant-entry-date">{p.link||''}</div></div>
        {p.technologies&&<div className="elegant-entry-sub">{p.technologies}</div>}{p.description&&<div className="elegant-entry-desc">{p.description}</div>}</div>
      ))}</div>)}
      {d.skills.length > 0 && (<div className="elegant-section"><div className="elegant-section-title">Skills</div><div className="elegant-skills">{d.skills.map((s,i)=><span className="elegant-skill" key={i}>{s}</span>)}</div></div>)}
    </div>
  );
}

function ResumeStartup({ data }) {
  const d = data;
  return (
    <div className="resume-startup">
      <div className="startup-header">
        <div className="startup-name">{d.personal.name || 'Your Name'}</div>
        <div className="startup-role">{d.experience[0]?.title || 'Professional'}</div>
        <div className="startup-contact">
          {d.personal.email && <span>{d.personal.email}</span>}
          {d.personal.phone && <span>{d.personal.phone}</span>}
          {d.personal.address && <span>{d.personal.address}</span>}
          {d.personal.linkedin && <span>{d.personal.linkedin}</span>}
        </div>
      </div>
      <div className="startup-body">
        {d.summary && <div className="startup-summary">{d.summary}</div>}
        {d.experience.length > 0 && (<div className="startup-section"><div className="startup-section-title">Experience</div>{d.experience.map((e,i)=>(
          <div className="startup-entry" key={i}><div className="startup-entry-row"><div className="startup-entry-title">{e.title}</div><div className="startup-entry-date">{e.startDate}{e.endDate?`–${e.endDate}`:''}</div></div>
          <div className="startup-entry-sub">{e.company}{e.location?` · ${e.location}`:''}</div>{e.description&&<div className="startup-entry-desc">{e.description}</div>}</div>
        ))}</div>)}
        {d.education.length > 0 && (<div className="startup-section"><div className="startup-section-title">Education</div>{d.education.map((e,i)=>(
          <div className="startup-entry" key={i}><div className="startup-entry-row"><div className="startup-entry-title">{e.degree}</div><div className="startup-entry-date">{e.startDate}{e.endDate?`–${e.endDate}`:''}</div></div>
          <div className="startup-entry-sub">{e.institution}</div></div>
        ))}</div>)}
        {d.projects.length > 0 && (<div className="startup-section"><div className="startup-section-title">Projects</div>{d.projects.map((p,i)=>(
          <div className="startup-entry" key={i}><div className="startup-entry-row"><div className="startup-entry-title">{p.name}</div>{p.link&&<div className="startup-entry-date">{p.link}</div>}</div>
          {p.technologies&&<div className="startup-entry-sub">{p.technologies}</div>}{p.description&&<div className="startup-entry-desc">{p.description}</div>}</div>
        ))}</div>)}
        {d.skills.length > 0 && (<div className="startup-section"><div className="startup-section-title">Skills</div><div className="startup-skills">{d.skills.map((s,i)=><span className="startup-skill" key={i}>{s}</span>)}</div></div>)}
      </div>
    </div>
  );
}

function ResumeCorporate({ data }) {
  const d = data;
  return (
    <div className="resume-corporate">
      <div className="corp-header">
        <div><div className="corp-name">{d.personal.name || 'Your Name'}</div><div className="corp-title">{d.experience[0]?.title || 'Professional'}</div></div>
        <div className="corp-contact-block">
          {d.personal.email && <div className="corp-contact-item">{d.personal.email}</div>}
          {d.personal.phone && <div className="corp-contact-item">{d.personal.phone}</div>}
          {d.personal.address && <div className="corp-contact-item">{d.personal.address}</div>}
        </div>
      </div>
      <div className="corp-accent-bar"></div>
      <div className="corp-body">
        <div className="corp-main">
          {d.summary && (<div className="corp-section"><div className="corp-section-title">Summary</div><p style={{fontSize:'0.85rem',lineHeight:'1.7',color:'#444'}}>{d.summary}</p></div>)}
          {d.experience.length > 0 && (<div className="corp-section"><div className="corp-section-title">Work Experience</div>{d.experience.map((e,i)=>(
            <div className="corp-entry" key={i}><div className="corp-entry-title">{e.title}</div>
            <div className="corp-entry-sub">{e.company}{e.location?` · ${e.location}`:''}</div>
            <div className="corp-entry-date">{e.startDate}{e.endDate?` – ${e.endDate}`:''}</div>
            {e.description&&<div className="corp-entry-desc">{e.description}</div>}</div>
          ))}</div>)}
          {d.projects.length > 0 && (<div className="corp-section"><div className="corp-section-title">Projects</div>{d.projects.map((p,i)=>(
            <div className="corp-entry" key={i}><div className="corp-entry-title">{p.name}</div>{p.technologies&&<div className="corp-entry-sub">{p.technologies}</div>}{p.description&&<div className="corp-entry-desc">{p.description}</div>}</div>
          ))}</div>)}
        </div>
        <div className="corp-aside">
          {d.education.length > 0 && (<><div className="corp-aside-title">Education</div>{d.education.map((e,i)=>(
            <div key={i} style={{marginBottom:'12px'}}><div className="corp-entry-title" style={{fontSize:'0.82rem'}}>{e.degree}</div><div style={{fontSize:'0.78rem',color:'#0066cc'}}>{e.institution}</div><div style={{fontSize:'0.72rem',color:'#888'}}>{e.startDate}{e.endDate?`–${e.endDate}`:''}</div></div>
          ))}</>)}
          {d.skills.length > 0 && (<><div className="corp-aside-title">Skills</div>{d.skills.map((s,i)=><div className="corp-skill" key={i}>{s}</div>)}</>)}
        </div>
      </div>
    </div>
  );
}

function ResumeInfographic({ data }) {
  const d = data;
  const skillDots = (idx) => {
    const level = 3 + (idx % 3);
    return [1,2,3,4,5].map(n => <div key={n} className={`info-dot${n<=level?' filled':''}`}></div>);
  };
  return (
    <div className="resume-infographic">
      <div className="info-left">
        <div className="info-avatar">{initials(d.personal.name)}</div>
        <div className="info-left-name">{d.personal.name || 'Your Name'}</div>
        <div className="info-left-role">{d.experience[0]?.title || 'Professional'}</div>
        <div className="info-left-section">
          <div className="info-left-title">Contact</div>
          {d.personal.email && <div className="info-contact-item">{d.personal.email}</div>}
          {d.personal.phone && <div className="info-contact-item">{d.personal.phone}</div>}
          {d.personal.address && <div className="info-contact-item">{d.personal.address}</div>}
          {d.personal.linkedin && <div className="info-contact-item">{d.personal.linkedin}</div>}
        </div>
        {d.skills.length > 0 && (<div className="info-left-section"><div className="info-left-title">Skills</div>{d.skills.map((s,i)=>(
          <div className="info-skill-row" key={i}><div className="info-skill-label">{s}</div><div className="info-skill-dots">{skillDots(i)}</div></div>
        ))}</div>)}
      </div>
      <div className="info-right">
        {d.summary && (<div className="info-section"><div className="info-section-title">About</div><p style={{fontSize:'0.84rem',lineHeight:'1.7',color:'#555'}}>{d.summary}</p></div>)}
        {d.experience.length > 0 && (<div className="info-section"><div className="info-section-title">Experience</div>{d.experience.map((e,i)=>(
          <div className="info-entry" key={i}><div className="info-entry-title">{e.title}</div>
          <div className="info-entry-sub">{e.company}{e.location?` · ${e.location}`:''}{e.startDate?` · ${e.startDate}${e.endDate?`–${e.endDate}`:''}`:''}</div>
          {e.description&&<div className="info-entry-desc">{e.description}</div>}</div>
        ))}</div>)}
        {d.education.length > 0 && (<div className="info-section"><div className="info-section-title">Education</div>{d.education.map((e,i)=>(
          <div className="info-entry" key={i}><div className="info-entry-title">{e.degree}</div>
          <div className="info-entry-sub">{e.institution}{e.startDate?` · ${e.startDate}${e.endDate?`–${e.endDate}`:''}`:''}</div></div>
        ))}</div>)}
        {d.projects.length > 0 && (<div className="info-section"><div className="info-section-title">Projects</div>{d.projects.map((p,i)=>(
          <div className="info-entry" key={i}><div className="info-entry-title">{p.name}</div>{p.technologies&&<div className="info-entry-sub">{p.technologies}</div>}{p.description&&<div className="info-entry-desc">{p.description}</div>}</div>
        ))}</div>)}
      </div>
    </div>
  );
}

function ResumeAcademic({ data }) {
  const d = data;
  return (
    <div className="resume-academic">
      <div className="acad-header">
        <div className="acad-name">{d.personal.name || 'Your Name'}</div>
        <div className="acad-contact">
          {d.personal.email && <span>{d.personal.email}</span>}
          {d.personal.phone && <span>{d.personal.phone}</span>}
          {d.personal.address && <span>{d.personal.address}</span>}
          {d.personal.linkedin && <span>{d.personal.linkedin}</span>}
        </div>
      </div>
      {d.summary && (<div className="acad-section"><div className="acad-section-title">Research Interests / Summary</div><p style={{fontSize:'0.86rem',lineHeight:'1.8',color:'#333'}}>{d.summary}</p></div>)}
      {d.education.length > 0 && (<div className="acad-section"><div className="acad-section-title">Education</div>{d.education.map((e,i)=>(
        <div className="acad-entry" key={i}><div className="acad-entry-header"><div className="acad-entry-title">{e.degree}</div><div className="acad-entry-date">{e.startDate}{e.endDate?`–${e.endDate}`:''}</div></div>
        <div className="acad-entry-sub">{e.institution}</div>{e.description&&<div className="acad-entry-desc">{e.description}</div>}</div>
      ))}</div>)}
      {d.experience.length > 0 && (<div className="acad-section"><div className="acad-section-title">Professional Experience</div>{d.experience.map((e,i)=>(
        <div className="acad-entry" key={i}><div className="acad-entry-header"><div className="acad-entry-title">{e.title}</div><div className="acad-entry-date">{e.startDate}{e.endDate?`–${e.endDate}`:''}</div></div>
        <div className="acad-entry-sub">{e.company}{e.location?`, ${e.location}`:''}</div>{e.description&&<div className="acad-entry-desc">{e.description}</div>}</div>
      ))}</div>)}
      {d.projects.length > 0 && (<div className="acad-section"><div className="acad-section-title">Publications & Projects</div>{d.projects.map((p,i)=>(
        <div className="acad-entry" key={i}><div className="acad-entry-title">{p.name}{p.link?<span style={{fontWeight:'normal',fontStyle:'italic',color:'#666'}}> — {p.link}</span>:''}</div>
        {p.technologies&&<div className="acad-entry-sub">{p.technologies}</div>}{p.description&&<div className="acad-entry-desc">{p.description}</div>}</div>
      ))}</div>)}
      {d.skills.length > 0 && (<div className="acad-section"><div className="acad-section-title">Skills & Expertise</div><div className="acad-skills">{d.skills.map((s,i)=><span className="acad-skill" key={i}>{s}</span>)}</div></div>)}
    </div>
  );
}

function ResumeNeon({ data }) {
  const d = data;
  return (
    <div className="resume-neon">
      <div className="neon-header">
        <div className="neon-name">{d.personal.name ? <>{d.personal.name.split(' ').slice(0,-1).join(' ')} <span>{d.personal.name.split(' ').slice(-1)}</span></> : <span>Your Name</span>}</div>
        <div className="neon-role">{d.experience[0]?.title || 'Professional'}</div>
        <div className="neon-contact">
          {d.personal.email && <span>{d.personal.email}</span>}
          {d.personal.phone && <span>{d.personal.phone}</span>}
          {d.personal.address && <span>{d.personal.address}</span>}
          {d.personal.linkedin && <span>{d.personal.linkedin}</span>}
        </div>
      </div>
      <div className="neon-body">
        <div className="neon-main">
          {d.summary && <div className="neon-summary">{d.summary}</div>}
          {d.experience.length > 0 && (<div className="neon-section"><div className="neon-section-title">Experience</div>{d.experience.map((e,i)=>(
            <div className="neon-entry" key={i}><div className="neon-entry-title">{e.title}</div>
            <div className="neon-entry-sub">{e.company}{e.location?` · ${e.location}`:''}</div>
            <div className="neon-entry-date">{e.startDate}{e.endDate?` – ${e.endDate}`:''}</div>
            {e.description&&<div className="neon-entry-desc">{e.description}</div>}</div>
          ))}</div>)}
          {d.projects.length > 0 && (<div className="neon-section"><div className="neon-section-title">Projects</div>{d.projects.map((p,i)=>(
            <div className="neon-entry" key={i}><div className="neon-entry-title">{p.name}</div>
            {p.technologies&&<div className="neon-entry-sub">{p.technologies}</div>}
            {p.description&&<div className="neon-entry-desc">{p.description}</div>}</div>
          ))}</div>)}
          {d.education.length > 0 && (<div className="neon-section"><div className="neon-section-title">Education</div>{d.education.map((e,i)=>(
            <div className="neon-entry" key={i}><div className="neon-entry-title">{e.degree}</div>
            <div className="neon-entry-sub">{e.institution}</div>
            <div className="neon-entry-date">{e.startDate}{e.endDate?`–${e.endDate}`:''}</div></div>
          ))}</div>)}
        </div>
        <div className="neon-aside">
          {d.skills.length > 0 && (<div className="neon-section"><div className="neon-section-title">Skills</div>{d.skills.map((s,i)=><span className="neon-skill" key={i}>{s}</span>)}</div>)}
        </div>
      </div>
    </div>
  );
}

function ResumePastel({ data }) {
  const d = data;
  return (
    <div className="resume-pastel">
      <div className="pastel-header">
        <div className="pastel-avatar">{initials(d.personal.name)}</div>
        <div className="pastel-header-info">
          <div className="pastel-name">{d.personal.name || 'Your Name'}</div>
          <div className="pastel-role">{d.experience[0]?.title || 'Professional'}</div>
          <div className="pastel-contact">
            {d.personal.email && <span>{d.personal.email}</span>}
            {d.personal.phone && <span>{d.personal.phone}</span>}
            {d.personal.address && <span>{d.personal.address}</span>}
            {d.personal.linkedin && <span>{d.personal.linkedin}</span>}
          </div>
        </div>
      </div>
      <div className="pastel-body">
        {d.summary && <div className="pastel-summary">{d.summary}</div>}
        {d.experience.length > 0 && (<div className="pastel-section"><div className="pastel-section-title">Experience</div>{d.experience.map((e,i)=>(
          <div className="pastel-entry" key={i}><div className="pastel-entry-title">{e.title}</div>
          <div className="pastel-entry-sub">{e.company}{e.location?` · ${e.location}`:''}</div>
          <div className="pastel-entry-date">{e.startDate}{e.endDate?` – ${e.endDate}`:''}</div>
          {e.description&&<div className="pastel-entry-desc">{e.description}</div>}</div>
        ))}</div>)}
        {d.education.length > 0 && (<div className="pastel-section"><div className="pastel-section-title">Education</div>{d.education.map((e,i)=>(
          <div className="pastel-entry" key={i}><div className="pastel-entry-title">{e.degree}</div>
          <div className="pastel-entry-sub">{e.institution}</div>
          <div className="pastel-entry-date">{e.startDate}{e.endDate?`–${e.endDate}`:''}</div></div>
        ))}</div>)}
        {d.projects.length > 0 && (<div className="pastel-section"><div className="pastel-section-title">Projects</div>{d.projects.map((p,i)=>(
          <div className="pastel-entry" key={i}><div className="pastel-entry-title">{p.name}</div>
          {p.technologies&&<div className="pastel-entry-sub">{p.technologies}</div>}
          {p.description&&<div className="pastel-entry-desc">{p.description}</div>}</div>
        ))}</div>)}
        {d.skills.length > 0 && (<div className="pastel-section"><div className="pastel-section-title">Skills</div><div className="pastel-skills">{d.skills.map((s,i)=><span className="pastel-skill" key={i}>{s}</span>)}</div></div>)}
      </div>
    </div>
  );
}

function ResumeTimeline({ data }) {
  const d = data;
  return (
    <div className="resume-timeline">
      <div className="tl-header">
        <div className="tl-name">{d.personal.name ? <>{d.personal.name.split(' ').slice(0,-1).join(' ')} <span>{d.personal.name.split(' ').slice(-1)}</span></> : <span>Your Name</span>}</div>
        <div className="tl-bar"></div>
        <div className="tl-contact">
          {d.personal.email && <span>{d.personal.email}</span>}
          {d.personal.phone && <span>{d.personal.phone}</span>}
          {d.personal.address && <span>{d.personal.address}</span>}
          {d.personal.linkedin && <span>{d.personal.linkedin}</span>}
        </div>
      </div>
      {d.summary && <div className="tl-summary">{d.summary}</div>}
      <div className="tl-layout">
        <div className="tl-main">
          {d.experience.length > 0 && (<div className="tl-section"><div className="tl-section-title">Work Experience</div>{d.experience.map((e,i)=>(
            <div className="tl-entry" key={i}>
              <div className="tl-date-col"><div className="tl-date">{e.startDate}</div><div className="tl-date-end">{e.endDate||'Present'}</div></div>
              <div className="tl-content"><div className="tl-entry-title">{e.title}</div><div className="tl-entry-sub">{e.company}{e.location?`, ${e.location}`:''}</div>{e.description&&<div className="tl-entry-desc">{e.description}</div>}</div>
            </div>
          ))}</div>)}
          {d.projects.length > 0 && (<div className="tl-section"><div className="tl-section-title">Projects</div>{d.projects.map((p,i)=>(
            <div className="tl-entry" key={i}>
              <div className="tl-date-col"><div className="tl-date">{p.link||''}</div></div>
              <div className="tl-content"><div className="tl-entry-title">{p.name}</div>{p.technologies&&<div className="tl-entry-sub">{p.technologies}</div>}{p.description&&<div className="tl-entry-desc">{p.description}</div>}</div>
            </div>
          ))}</div>)}
          {d.education.length > 0 && (<div className="tl-section"><div className="tl-section-title">Education</div>{d.education.map((e,i)=>(
            <div className="tl-entry" key={i}>
              <div className="tl-date-col"><div className="tl-date">{e.startDate}</div><div className="tl-date-end">{e.endDate||''}</div></div>
              <div className="tl-content"><div className="tl-entry-title">{e.degree}</div><div className="tl-entry-sub">{e.institution}</div></div>
            </div>
          ))}</div>)}
        </div>
        <div className="tl-aside">
          {d.skills.length > 0 && (<><div className="tl-aside-title">Skills</div>{d.skills.map((s,i)=><div className="tl-aside-item" key={i}>{s}</div>)}</>)}
        </div>
      </div>
    </div>
  );
}


const ResumeComponents = {
  classic: ResumeClassic,
  modern: ResumeModern,
  minimal: ResumeMinimal,
  bold: ResumeBold,
  creative: ResumeCreative,
  executive: ResumeExecutive,
  tech: ResumeTech,
  elegant: ResumeElegant,
  startup: ResumeStartup,
  corporate: ResumeCorporate,
  infographic: ResumeInfographic,
  academic: ResumeAcademic,
  neon: ResumeNeon,
  pastel: ResumePastel,
  timeline: ResumeTimeline,
};

// ============================================================
// COLLAPSIBLE SECTION
// ============================================================
function FormSection({ icon, title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="form-card">
      <div className="form-card-header" onClick={() => setOpen(o => !o)}>
        <div className="section-icon">{icon}</div>
        <div className="section-title">{title}</div>
        <div className={`section-toggle${open ? ' open' : ''}`}>▾</div>
      </div>
      {open && <div className="form-card-body">{children}</div>}
    </div>
  );
}

// ============================================================
// PAGE 1: FORM
// ============================================================
function FormPage({ data, setData, onGenerate }) {
  const [errors, setErrors] = useState({});
  const [skillInput, setSkillInput] = useState('');

  const updatePersonal = (field, value) => setData(d => ({ ...d, personal: { ...d.personal, [field]: value } }));
  const updateSummary = (value) => setData(d => ({ ...d, summary: value }));

  const addSkill = () => {
    if (skillInput.trim()) {
      setData(d => ({ ...d, skills: [...d.skills, skillInput.trim()] }));
      setSkillInput('');
    }
  };
  const removeSkill = (i) => setData(d => ({ ...d, skills: d.skills.filter((_, idx) => idx !== i) }));

  const addEntry = (section, empty) => setData(d => ({ ...d, [section]: [...d[section], empty] }));
  const updateEntry = (section, i, field, value) => setData(d => ({
    ...d, [section]: d[section].map((e, idx) => idx === i ? { ...e, [field]: value } : e)
  }));
  const removeEntry = (section, i) => setData(d => ({ ...d, [section]: d[section].filter((_, idx) => idx !== i) }));

  const validate = () => {
    const e = {};
    if (!data.personal.name.trim()) e.name = 'Name is required';
    if (!data.personal.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personal.email)) e.email = 'Enter a valid email';
    if (!data.personal.phone.trim()) e.phone = 'Phone is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleGenerate = () => { if (validate()) onGenerate(); };

  return (
    <div>
      <div style={{ background: 'linear-gradient(135deg, #0f0e17 0%, #1e1d2e 100%)', padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(232,86,58,0.9)', marginBottom: '0.8rem' }}>Step 1 of 2</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'white', marginBottom: '0.8rem' }}>
          Build Your <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Resume</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '420px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
          Fill in your details below. All fields marked with * are required.
        </p>
      </div>

      <div className="page-container">
        {/* Personal */}
        <FormSection icon="👤" title="Personal Information" defaultOpen>
          <div className="form-row cols-2">
            <div className="form-group">
              <label className="form-label">Full Name <span>*</span></label>
              <input className={`form-input${errors.name ? ' error' : ''}`} placeholder="Aravind Kumar" value={data.personal.name} onChange={e => { updatePersonal('name', e.target.value); setErrors(er => ({...er, name: ''})); }} />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Email Address <span>*</span></label>
              <input className={`form-input${errors.email ? ' error' : ''}`} type="email" placeholder="aravind@example.com" value={data.personal.email} onChange={e => { updatePersonal('email', e.target.value); setErrors(er => ({...er, email: ''})); }} />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>
          </div>
          <div className="form-row cols-2">
            <div className="form-group">
              <label className="form-label">Phone <span>*</span></label>
              <input className={`form-input${errors.phone ? ' error' : ''}`} placeholder="+91 98765 43210" value={data.personal.phone} onChange={e => { updatePersonal('phone', e.target.value); setErrors(er => ({...er, phone: ''})); }} />
              {errors.phone && <span className="error-msg">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input className="form-input" placeholder="Kakinada, Andhra Pradesh" value={data.personal.address} onChange={e => updatePersonal('address', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">LinkedIn URL</label>
            <input className="form-input" placeholder="linkedin.com/in/aravindkumar" value={data.personal.linkedin} onChange={e => updatePersonal('linkedin', e.target.value)} />
          </div>
        </FormSection>

        {/* Summary */}
        <FormSection icon="📋" title="Career Summary">
          <div className="form-group">
            <label className="form-label">Professional Summary</label>
            <textarea className="form-textarea" rows={5} placeholder="A results-driven software engineer with 3+ years of experience in building real-time systems and scalable backends using Node.js and Python..." value={data.summary} onChange={e => updateSummary(e.target.value)} style={{minHeight: '120px'}} />
          </div>
        </FormSection>

        {/* Skills */}
        <FormSection icon="⚡" title="Skills">
          <div className="skills-container">
            {data.skills.map((s, i) => (
              <span className="skill-tag" key={i}>{s} <button className="skill-remove" onClick={() => removeSkill(i)}>×</button></span>
            ))}
          </div>
          <div className="skill-input-row">
            <input className="form-input" placeholder="e.g. React Native, Node.js, Python..." value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill()} />
            <button className="add-btn" onClick={addSkill}>+ Add</button>
          </div>
        </FormSection>

        {/* Experience */}
        <FormSection icon="💼" title="Work Experience">
          {data.experience.map((exp, i) => (
            <div className="entry-card" key={i}>
              <div className="entry-actions">
                <button className="entry-btn danger" onClick={() => removeEntry('experience', i)} title="Remove">✕</button>
              </div>
              <div className="form-row cols-2" style={{marginRight:'40px'}}>
                <div className="form-group">
                  <label className="form-label">Job Title</label>
                  <input className="form-input" placeholder="Software Engineer" value={exp.title} onChange={e => updateEntry('experience', i, 'title', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Company</label>
                  <input className="form-input" placeholder="Techno Software" value={exp.company} onChange={e => updateEntry('experience', i, 'company', e.target.value)} />
                </div>
              </div>
              <div className="form-row cols-3">
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input className="form-input" placeholder="Kakinada" value={exp.location} onChange={e => updateEntry('experience', i, 'location', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input className="form-input" placeholder="Jan 2022" value={exp.startDate} onChange={e => updateEntry('experience', i, 'startDate', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input className="form-input" placeholder="Present" value={exp.endDate} onChange={e => updateEntry('experience', i, 'endDate', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" placeholder="Describe your responsibilities and achievements..." value={exp.description} onChange={e => updateEntry('experience', i, 'description', e.target.value)} rows={3} />
              </div>
            </div>
          ))}
          <button className="add-entry-btn" onClick={() => addEntry('experience', { title: '', company: '', location: '', startDate: '', endDate: '', description: '' })}>
            + Add Work Experience
          </button>
        </FormSection>

        {/* Education */}
        <FormSection icon="🎓" title="Education">
          {data.education.map((edu, i) => (
            <div className="entry-card" key={i}>
              <div className="entry-actions">
                <button className="entry-btn danger" onClick={() => removeEntry('education', i)}>✕</button>
              </div>
              <div className="form-row cols-2" style={{marginRight:'40px'}}>
                <div className="form-group">
                  <label className="form-label">Degree / Certificate</label>
                  <input className="form-input" placeholder="B.Tech Computer Science" value={edu.degree} onChange={e => updateEntry('education', i, 'degree', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Institution</label>
                  <input className="form-input" placeholder="JNTU Kakinada" value={edu.institution} onChange={e => updateEntry('education', i, 'institution', e.target.value)} />
                </div>
              </div>
              <div className="form-row cols-2">
                <div className="form-group">
                  <label className="form-label">Start Year</label>
                  <input className="form-input" placeholder="2018" value={edu.startDate} onChange={e => updateEntry('education', i, 'startDate', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">End Year</label>
                  <input className="form-input" placeholder="2022" value={edu.endDate} onChange={e => updateEntry('education', i, 'endDate', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Additional Info</label>
                <textarea className="form-textarea" placeholder="GPA, achievements, relevant coursework..." value={edu.description} onChange={e => updateEntry('education', i, 'description', e.target.value)} rows={2} />
              </div>
            </div>
          ))}
          <button className="add-entry-btn" onClick={() => addEntry('education', { degree: '', institution: '', startDate: '', endDate: '', description: '' })}>
            + Add Education
          </button>
        </FormSection>

        {/* Projects */}
        <FormSection icon="🚀" title="Projects">
          {data.projects.map((proj, i) => (
            <div className="entry-card" key={i}>
              <div className="entry-actions">
                <button className="entry-btn danger" onClick={() => removeEntry('projects', i)}>✕</button>
              </div>
              <div className="form-row cols-2" style={{marginRight:'40px'}}>
                <div className="form-group">
                  <label className="form-label">Project Name</label>
                  <input className="form-input" placeholder="Swiggy App" value={proj.name} onChange={e => updateEntry('projects', i, 'name', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Link / URL</label>
                  <input className="form-input" placeholder="github.com/..." value={proj.link} onChange={e => updateEntry('projects', i, 'link', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Technologies Used</label>
                <input className="form-input" placeholder="React Native, Node.js, MongoDB, WebSockets" value={proj.technologies} onChange={e => updateEntry('projects', i, 'technologies', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" placeholder="Brief description of the project, its features and impact..." value={proj.description} onChange={e => updateEntry('projects', i, 'description', e.target.value)} rows={3} />
              </div>
            </div>
          ))}
          <button className="add-entry-btn" onClick={() => addEntry('projects', { name: '', link: '', technologies: '', description: '' })}>
            + Add Project
          </button>
        </FormSection>

        <div className="generate-section">
          <button className="generate-btn" onClick={handleGenerate}>
            Generate My Resume →
          </button>
          <p style={{marginTop:'12px',fontSize:'0.82rem',color:'var(--muted)'}}>Choose from 5 professional templates on the next page</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PAGE 2: TEMPLATES + PREVIEW
// ============================================================
function TemplatesPage({ data, onBack }) {
  const [selected, setSelected] = useState('modern');
  const previewRef = useRef(null);

  const downloadPDF = useCallback(async () => {
    const el = previewRef.current;
    if (!el) return;
    // Dynamically load html2pdf
    if (!window.html2pdf) {
      await new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }
    window.html2pdf().from(el).set({
      margin: 0,
      filename: `${data.personal.name || 'Resume'}_Resume.pdf`,
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).save();
  }, [data]);

  const ResumeComp = ResumeComponents[selected];

  return (
    <div>
      <div style={{ background: 'linear-gradient(135deg, #0f0e17 0%, #1e1d2e 100%)', padding: '3rem 2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(232,86,58,0.9)', marginBottom: '0.8rem' }}>Step 2 of 2</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'white', marginBottom: '0.8rem' }}>
          Choose Your <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Template</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '420px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
          Select a template, preview your resume live, and download as PDF.
        </p>
      </div>

      <div className="templates-page">
        <div style={{ marginBottom: '1.5rem' }}>
          <button onClick={onBack} style={{ background: 'none', border: '1.5px solid var(--border)', borderRadius: '8px', padding: '8px 18px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--muted)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--muted)'; }}
          >
            ← Edit Details
          </button>
        </div>

        <div className="templates-layout">
          {/* Sidebar — sticky + scrollable */}
          <div className="templates-sidebar">
            <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: '4px', flexShrink: 0 }}>Templates</div>
            {TEMPLATES.map(t => {
              const ThumbComp = ResumeComponents[t.id];
              return (
                <div key={t.id} className={`template-thumb${selected === t.id ? ' selected' : ''}`} onClick={() => setSelected(t.id)}>
                  <div className="template-thumb-header">
                    <span className="template-name">{t.name}</span>
                    <span className={`template-badge ${t.badgeClass}`}>{t.badge}</span>
                  </div>
                  <div className="template-thumb-clip">
                    <div className="template-thumb-scaler">
                      <ThumbComp data={data} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Preview */}
          <div className="resume-preview-wrapper">
            <div className="preview-toolbar">
              <span className="preview-label">Live Preview · {TEMPLATES.find(t => t.id === selected)?.name}</span>
              <button className="download-btn" onClick={downloadPDF}>
                ⬇ Download PDF
              </button>
            </div>
            <div className="resume-preview-scroll">
              <div className="resume-page" ref={previewRef}>
                <ResumeComp data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// PAGE: ABOUT
// ============================================================
function AboutPage({ onNav }) {
  return (
    <div className="xpage">
      <div className="xpage-hero">
        <div className="xpage-hero-badge">✦ Our Story</div>
        <h1>About <span>luckyzResumé</span></h1>
        <p>We believe every professional deserves a resume that opens doors — beautifully designed and effortlessly created.</p>
      </div>
      <div className="xpage-body">

        {/* Mission */}
        <div className="about-mission">
          <h2>Our Mission</h2>
          <p>To democratize professional resume building by giving every job seeker — from fresh graduates to C-suite executives — access to world-class resume templates that would otherwise cost hundreds of dollars, completely free.</p>
        </div>

        {/* Stats */}
        <div className="about-stats-row">
          <div className="about-stat-card"><div className="about-stat-num">50+</div><div className="about-stat-label">Templates</div></div>
          <div className="about-stat-card"><div className="about-stat-num">100%</div><div className="about-stat-label">Free Forever</div></div>
          <div className="about-stat-card"><div className="about-stat-num">PDF</div><div className="about-stat-label">Instant Export</div></div>
        </div>

        {/* Feature cards */}
        <div className="about-grid">
          <div className="about-card">
            <div className="about-card-icon">🎨</div>
            <h3>15 Unique Templates</h3>
            <p>From sleek minimal designs to bold executive layouts — every template is carefully crafted to pass ATS systems and impress hiring managers.</p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">⚡</div>
            <h3>Real-Time Preview</h3>
            <p>See your resume update live as you type. No waiting, no guessing — what you see is exactly what you download.</p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">📄</div>
            <h3>Instant PDF Download</h3>
            <p>One click to download a pixel-perfect, print-ready PDF. Compatible with all major job portals and email clients.</p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">🔒</div>
            <h3>Your Data Stays Yours</h3>
            <p>Everything you type stays in your browser. We don't store, sell, or process any of your personal information on our servers.</p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">📱</div>
            <h3>Fully Responsive</h3>
            <p>Build your resume on any device — desktop, tablet, or mobile. The interface adapts perfectly to every screen size.</p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">🌍</div>
            <h3>Built for Everyone</h3>
            <p>Whether you're a software engineer, academic, executive, or creative professional — there's a template designed exactly for your field.</p>
          </div>
        </div>

        {/* Team */}
        {/* <h2 className="about-team-title">Meet the Team</h2>
        <div className="about-team-grid">
          <div className="team-card">
            <div className="team-avatar" style={{background:'linear-gradient(135deg,#e8563a,#c0392b)'}}>LK</div>
            <div className="team-name">Lawrence Eluri</div>
            <div className="team-role">Founder & Full-Stack Developer</div>
          </div>
          <div className="team-card">
            <div className="team-avatar" style={{background:'linear-gradient(135deg,#2a6496,#1a3a5c)'}}>UI</div>
            <div className="team-name">UI Design Team</div>
            <div className="team-role">Template Design & UX</div>
          </div>
          <div className="team-card">
            <div className="team-avatar" style={{background:'linear-gradient(135deg,#27ae60,#1e8449)'}}>QA</div>
            <div className="team-name">QA & Testing</div>
            <div className="team-role">Quality Assurance</div>
          </div>
        </div> */}

        <div style={{textAlign:'center',marginTop:'3rem'}}>
          <button className="generate-btn" onClick={() => onNav('home')}>
            Start Building Your Resume →
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PAGE: CONTACT
// ============================================================
function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (f, v) => setForm(p => ({ ...p, [f]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div className="xpage">
      <div className="xpage-hero">
        <div className="xpage-hero-badge">✦ Get In Touch</div>
        <h1>Contact <span>Us</span></h1>
        <p>Have a question, suggestion, or just want to say hello? We'd love to hear from you.</p>
      </div>
      <div className="xpage-body">
        <div className="contact-layout">

          {/* Info */}
          <div className="contact-info-card">
            <h2>Contact Info</h2>
            <div className="contact-info-item">
              <div className="contact-info-icon">📞</div>
              <div>
                <div className="contact-info-label">Phone</div>
                <div className="contact-info-value"><a href="tel:7382368499">+91 7382368499</a></div>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">✉️</div>
              <div>
                <div className="contact-info-label">Email</div>
                <div className="contact-info-value"><a href="mailto:elurilawrence.dev@gmail.com">elurilawrence.dev@gmail.com</a></div>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">📍</div>
              <div>
                <div className="contact-info-label">Location</div>
                <div className="contact-info-value">Rajahmundry, Andhra Pradesh, India</div>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">⏰</div>
              <div>
                <div className="contact-info-label">Response Time</div>
                <div className="contact-info-value">Within 24 hours</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-card">
            <h2>Send a Message</h2>
            {submitted && (
              <div className="contact-success">
                ✅ Thank you! Your message has been sent. We'll get back to you soon.
              </div>
            )}
            <div className="contact-form-row">
              <div className="form-group">
                <label className="form-label">Your Name <span style={{color:'var(--accent)'}}>*</span></label>
                <input className={`form-input${errors.name ? ' error' : ''}`} placeholder="Aravind Kumar" value={form.name} onChange={e => { update('name', e.target.value); setErrors(p => ({...p, name: ''})); }} />
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Email Address <span style={{color:'var(--accent)'}}>*</span></label>
                <input className={`form-input${errors.email ? ' error' : ''}`} type="email" placeholder="you@example.com" value={form.email} onChange={e => { update('email', e.target.value); setErrors(p => ({...p, email: ''})); }} />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>
            </div>
            <div className="form-group" style={{marginBottom:'1rem'}}>
              <label className="form-label">Subject</label>
              <input className="form-input" placeholder="Template request, bug report, general query..." value={form.subject} onChange={e => update('subject', e.target.value)} />
            </div>
            <div className="form-group" style={{marginBottom:'1rem'}}>
              <label className="form-label">Message <span style={{color:'var(--accent)'}}>*</span></label>
              <textarea className={`form-textarea${errors.message ? ' error' : ''}`} rows={5} placeholder="Write your message here..." value={form.message} onChange={e => { update('message', e.target.value); setErrors(p => ({...p, message: ''})); }} style={{minHeight:'130px'}} />
              {errors.message && <span className="error-msg">{errors.message}</span>}
            </div>
            <button className="contact-submit-btn" onClick={handleSubmit}>Send Message →</button>
          </div>
        </div>

        {/* Location band */}
        <div className="contact-map-band">
          <div className="contact-map-text">
            <h3>📍 Based in Rajahmundry, Andhra Pradesh</h3>
            <p>Serving job seekers across India and around the world.</p>
          </div>
          <div className="contact-map-badge">🇮🇳 Made in India</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PAGE: PRIVACY POLICY
// ============================================================
function PrivacyPage() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const sections = [
    { id: 'pp-info',      label: '1. Information We Collect' },
    { id: 'pp-use',       label: '2. How We Use Your Information' },
    { id: 'pp-storage',   label: '3. Data Storage & Security' },
    { id: 'pp-cookies',   label: '4. Cookies & Tracking' },
    { id: 'pp-third',     label: '5. Third-Party Services' },
    { id: 'pp-rights',    label: '6. Your Rights' },
    { id: 'pp-children',  label: '7. Children\'s Privacy' },
    { id: 'pp-changes',   label: '8. Changes to This Policy' },
    { id: 'pp-contact',   label: '9. Contact Us' },
  ];

  return (
    <div className="xpage">
      <div className="xpage-hero">
        <div className="xpage-hero-badge">✦ Legal</div>
        <h1>Privacy <span>Policy</span></h1>
        <p>We take your privacy seriously. Here's exactly how we handle your data — in plain language.</p>
      </div>
      <div className="xpage-body">
        <p className="privacy-updated">Last updated: {new Date().toLocaleDateString('en-IN', { year:'numeric', month:'long', day:'numeric' })}</p>

        {/* Table of Contents */}
        <div className="privacy-toc">
          <h3>Table of Contents</h3>
          <div className="privacy-toc-list">
            {sections.map(s => (
              <button key={s.id} className="privacy-toc-item" onClick={() => scrollTo(s.id)}>
                → {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="privacy-highlight">
          <strong>Summary:</strong> luckyzResumé is a client-side application. Your resume data is processed entirely in your browser and is never transmitted to or stored on our servers. We don't sell, share, or monetize your personal information.
        </div>

        <div className="privacy-section" id="pp-info">
          <h2>1. Information We Collect</h2>
          <p>luckyzResumé operates entirely in your web browser. When you use our resume builder, the information you enter (name, email, phone number, work history, education, skills, etc.) is stored only in your browser's memory during your session.</p>
          <p>We may collect the following non-personal, anonymized data automatically:</p>
          <ul>
            <li>Browser type and version (for compatibility purposes)</li>
            <li>General geographic region (country/city level, not precise location)</li>
            <li>Pages visited and time spent on the application</li>
            <li>Device type (desktop, tablet, or mobile)</li>
          </ul>
          <p>We do <strong>not</strong> collect: Social Security Numbers, financial information, precise GPS location, or any biometric data.</p>
        </div>

        <div className="privacy-section" id="pp-use">
          <h2>2. How We Use Your Information</h2>
          <p>The resume content you enter is used solely to render your resume preview and generate your downloadable PDF. This processing happens entirely in your browser — no data is transmitted to our servers.</p>
          <p>Any anonymized analytics data we collect is used to:</p>
          <ul>
            <li>Understand which features are most popular</li>
            <li>Improve the performance and usability of the application</li>
            <li>Fix bugs and compatibility issues across browsers and devices</li>
            <li>Make informed decisions about future template additions</li>
          </ul>
        </div>

        <div className="privacy-section" id="pp-storage">
          <h2>3. Data Storage & Security</h2>
          <p>Your resume data exists only in your browser's temporary memory (React state). When you close or refresh the tab, all entered data is cleared. We do not use localStorage, sessionStorage, or any browser database to persist your resume data.</p>
          <div className="privacy-highlight">
            Your data never leaves your device. No server-side storage. No databases. No backups of your personal information on our end.
          </div>
          <p>The PDF generation is handled entirely client-side using the html2pdf.js library. Your document is created and downloaded directly in your browser without any data being sent to external servers.</p>
        </div>

        <div className="privacy-section" id="pp-cookies">
          <h2>4. Cookies & Tracking</h2>
          <p>We use minimal, privacy-respecting analytics to understand aggregate usage patterns. We do not use:</p>
          <ul>
            <li>Advertising cookies or tracking pixels</li>
            <li>Cross-site tracking technologies</li>
            <li>Fingerprinting or device identification</li>
            <li>Third-party advertising networks</li>
          </ul>
          <p>You can disable cookies in your browser settings without affecting the core functionality of the resume builder.</p>
        </div>

        <div className="privacy-section" id="pp-third">
          <h2>5. Third-Party Services</h2>
          <p>luckyzResumé uses the following third-party services:</p>
          <ul>
            <li><strong>Google Fonts:</strong> Used to load custom typography (Playfair Display, DM Sans, Space Mono). Google may collect standard web request data. See <a href="https://policies.google.com/privacy" rel="noreferrer" target="_blank" style={{color:'var(--accent)'}}>Google's Privacy Policy</a>.</li>
            <li><strong>html2pdf.js via Cloudflare CDN:</strong> Loaded on demand when you click "Download PDF." Cloudflare may log the request. See <a href="https://www.cloudflare.com/privacypolicy/" rel="noreferrer" target="_blank" style={{color:'var(--accent)'}}>Cloudflare's Privacy Policy</a>.</li>
            <li><strong>Netlify (Hosting):</strong> Our application is hosted on Netlify. Netlify collects standard server access logs. See <a href="https://www.netlify.com/privacy/" rel="noreferrer" target="_blank" style={{color:'var(--accent)'}}>Netlify's Privacy Policy</a>.</li>
          </ul>
        </div>

        <div className="privacy-section" id="pp-rights">
          <h2>6. Your Rights</h2>
          <p>Since we do not store your personal data on our servers, most traditional data rights (access, erasure, portability) are automatically fulfilled — your data never leaves your browser in the first place.</p>
          <p>If you have questions about any anonymized analytics data, you may contact us and we will respond within 30 days.</p>
          <ul>
            <li><strong>Right to access:</strong> Contact us for any analytics data associated with your session</li>
            <li><strong>Right to erasure:</strong> Clear your browser cache/cookies to remove any local data</li>
            <li><strong>Right to opt-out:</strong> Use an ad blocker or privacy browser extension to opt out of analytics</li>
          </ul>
        </div>

        <div className="privacy-section" id="pp-children">
          <h2>7. Children's Privacy</h2>
          <p>luckyzResumé is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we will take steps to delete that information.</p>
        </div>

        <div className="privacy-section" id="pp-changes">
          <h2>8. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will update the "Last updated" date at the top of this page when we make changes.</p>
          <p>We encourage you to review this Privacy Policy periodically. Continued use of luckyzResumé after any changes constitutes your acceptance of the updated policy.</p>
        </div>

        <div className="privacy-section" id="pp-contact">
          <h2>9. Contact Us</h2>
          <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
          <ul>
            <li><strong>Email:</strong> elurilawrence.dev@gmail.com</li>
            <li><strong>Phone:</strong> +91 7382368499</li>
            <li><strong>Location:</strong> Rajahmundry, Andhra Pradesh, India</li>
          </ul>
          <p>We are committed to resolving any privacy concerns and will respond to all legitimate requests within 30 days.</p>
        </div>

      </div>
    </div>
  );
}

// ============================================================
// HEADER
// ============================================================
function Header({ page, onNav }) {
  return (
    <header className="header">
      <span className="header-logo" onClick={() => onNav('home')} style={{ cursor: 'pointer' }}>
        <span className="logo-dot"></span>
        luckyzResumé
      </span>
      <nav className="header-nav">
        <button className={`nav-link${page === 'home' ? ' active' : ''}`} onClick={() => onNav('home')}>Builder</button>
        <button className={`nav-link${page === 'templates' ? ' active' : ''}`} onClick={() => onNav('templates')}>Templates</button>
        {/* <button className="nav-link" onClick={() => {}}>Tips</button> */}
      </nav>
    </header>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer({ onNav }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="logo"><span style={{ width: 8, height: 8, background: 'var(--accent)', borderRadius: '50%', display: 'inline-block', marginRight: 6 }}></span>luckyzResumé</div>
          <p>Build a professional resume in minutes. Choose from 15 modern templates and download as PDF — completely free.</p>
        </div>
        <div className="footer-col">
          <h4>Navigate</h4>
          <button className="footer-link-btn" onClick={() => onNav('home')}>Resume Builder</button>
          <button className="footer-link-btn" onClick={() => onNav('templates')}>Templates</button>
          <button className="footer-link-btn" onClick={() => onNav('about')}>About Us</button>
          <button className="footer-link-btn" onClick={() => onNav('contact')}>Contact</button>
          <button className="footer-link-btn" onClick={() => onNav('privacy')}>Privacy Policy</button>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <a href="tel:7382368499">+91 7382368499</a>
          <p>elurilawrence.dev@gmail.com</p>
          <p>Rajahmundry, Andhra Pradesh</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} luckyzResumé — Built with ♥ for job seekers everywhere &nbsp;·&nbsp;
          <button className="footer-link-btn" style={{display:'inline',padding:0,fontSize:'inherit'}} onClick={() => onNav('privacy')}>Privacy Policy</button>
        </p>
      </div>
    </footer>
  );
}

// ============================================================
// APP
// ============================================================
export default function App() {
  const [page, setPage] = useState('home');
  const [data, setData] = useState(initialData);

  const navigate = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{styles}</style>
      <Header page={page} onNav={navigate} />

      {page === 'home' && (
        <>
          <div className="hero">
            <h1>Land Your Dream Job with a <span>Perfect Resume</span></h1>
            <p>Professional templates, real-time preview, and instant PDF download — all in one place.</p>
            <button className="hero-cta" onClick={() => { document.getElementById('form-start')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Start Building Free →
            </button>
            <div className="hero-stats">
              <div className="stat"><div className="stat-num">15</div><div className="stat-label">Templates</div></div>
              <div className="stat"><div className="stat-num">PDF</div><div className="stat-label">Instant Export</div></div>
              <div className="stat"><div className="stat-num">100%</div><div className="stat-label">Free</div></div>
            </div>
          </div>
          <div id="form-start">
            <FormPage data={data} setData={setData} onGenerate={() => navigate('templates')} />
          </div>
          <Footer onNav={navigate} />
        </>
      )}

      {page === 'templates' && (
        <>
          <TemplatesPage data={data} onBack={() => navigate('home')} />
          <Footer onNav={navigate} />
        </>
      )}

      {page === 'about' && (
        <>
          <AboutPage onNav={navigate} />
          <Footer onNav={navigate} />
        </>
      )}

      {page === 'contact' && (
        <>
          <ContactPage />
          <Footer onNav={navigate} />
        </>
      )}

      {page === 'privacy' && (
        <>
          <PrivacyPage />
          <Footer onNav={navigate} />
        </>
      )}
    </div>
  );
}