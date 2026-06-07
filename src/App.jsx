import { useState, useEffect, useCallback } from "react";
import { CARDS_DATA, ALL_CARDS } from "./data/cards.js";

// ── LocalStorage helpers ─────────────────────────────────────────────────────

const LS_KEY = "dialogo_progress_v2";

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; }
  catch { return {}; }
}
function saveProgress(p) { localStorage.setItem(LS_KEY, JSON.stringify(p)); }

// ── Distractor generator — 3-tier: curated → same-category → other ───────────

function getChoices(card, allCards) {
  const correct = card.back_english;
  const curated = card.wrong && card.wrong !== correct ? [card.wrong] : [];
  const sameCategory = allCards
    .filter((c) => c.id !== card.id && c.category === card.category)
    .map((c) => c.back_english)
    .sort(() => Math.random() - 0.5);
  const otherCategory = allCards
    .filter((c) => c.id !== card.id && c.category !== card.category)
    .map((c) => c.back_english)
    .sort(() => Math.random() - 0.5);
  const distractors = [];
  if (curated.length) distractors.push(curated[0]);
  for (const d of [...sameCategory, ...otherCategory]) {
    if (distractors.length >= 3) break;
    if (!distractors.includes(d) && d !== correct) distractors.push(d);
  }
  return { choices: [...distractors.slice(0, 3), correct].sort(() => Math.random() - 0.5), correct };
}

// ── Styles ───────────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --cream: #111111; --cream2: #2A2A2A; --terra: #D4614A; --terra-dark: #A83C28;
    --terra-light: #5C2D20; --ink: #EDE7DF; --ink-mid: #B5A498; --ink-soft: #857870;
    --sage: #6B9E77; --sage-light: #1A3326; --gold: #D4A030; --gold-light: #2D2010;
    --white: #1C1C1C; --shadow: 0 4px 24px rgba(0,0,0,0.45);
    --shadow-hover: 0 8px 40px rgba(0,0,0,0.65); --radius: 16px; --radius-sm: 10px;
  }
  body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--ink); min-height: 100vh; -webkit-font-smoothing: antialiased; }
  .app { min-height: 100vh; display: flex; flex-direction: column; }
  .header { padding: 20px 32px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--cream2); background: var(--white); position: sticky; top: 0; z-index: 10; }
  .logo { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--terra); letter-spacing: -0.02em; }
  .logo span { color: var(--ink); }
  .total-badge { font-size: 12px; font-weight: 500; color: var(--ink-soft); background: var(--cream2); padding: 4px 10px; border-radius: 20px; }
  .home { padding: 40px 32px; max-width: 900px; margin: 0 auto; width: 100%; }
  .home-title { font-family: 'Playfair Display', serif; font-size: 42px; font-weight: 700; line-height: 1.15; color: var(--ink); margin-bottom: 12px; }
  .home-title em { color: var(--terra); font-style: italic; }
  .home-subtitle { font-size: 16px; color: var(--ink-soft); font-weight: 300; line-height: 1.6; max-width: 520px; }
  .home-source { font-size: 11px; color: var(--ink-soft); margin-top: 10px; font-style: italic; }
  .home-hero { margin-bottom: 40px; }
  .mode-toggle { display: flex; background: var(--cream2); border-radius: 10px; padding: 4px; width: fit-content; margin-bottom: 36px; }
  .mode-btn { padding: 8px 18px; border: none; background: transparent; border-radius: 7px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: var(--ink-soft); cursor: pointer; transition: all 0.18s; }
  .mode-btn.active { background: #333333; color: var(--ink); box-shadow: 0 1px 4px rgba(0,0,0,0.4); }
  .section-label { font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-soft); margin-bottom: 16px; }
  .category-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; margin-bottom: 24px; }
  .cat-card { background: var(--white); border-radius: var(--radius); padding: 22px 24px; cursor: pointer; border: 1.5px solid transparent; box-shadow: var(--shadow); transition: all 0.2s; }
  .cat-card:hover { border-color: var(--terra-light); box-shadow: var(--shadow-hover); transform: translateY(-2px); }
  .cat-emoji { font-size: 24px; margin-bottom: 12px; display: block; }
  .cat-name { font-size: 15px; font-weight: 500; color: var(--ink); margin-bottom: 4px; }
  .cat-desc { font-size: 11px; color: var(--ink-soft); margin-bottom: 10px; line-height: 1.5; }
  .cat-count { font-size: 12px; color: var(--ink-soft); margin-bottom: 10px; }
  .progress-bar-wrap { height: 4px; background: var(--cream2); border-radius: 2px; overflow: hidden; }
  .progress-bar-fill { height: 100%; background: var(--terra); border-radius: 2px; transition: width 0.4s; }
  .progress-label { font-size: 11px; color: var(--ink-soft); margin-top: 6px; }
  .mixed-btn { width: 100%; padding: 16px 24px; background: var(--terra); color: var(--ink); border: none; border-radius: var(--radius); font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 8px; }
  .mixed-btn:hover { background: var(--terra-dark); }
  .reset-btn { background: none; border: none; color: var(--ink-soft); font-size: 12px; font-family: 'DM Sans', sans-serif; cursor: pointer; padding: 8px 0; text-decoration: underline; text-underline-offset: 3px; display: block; margin: 16px auto 0; }
  .reset-btn:hover { color: var(--terra); }
  .session { padding: 32px 24px; max-width: 640px; margin: 0 auto; width: 100%; }
  .session-header { display: flex; align-items: center; gap: 12px; margin-bottom: 28px; }
  .back-btn { background: var(--white); border: 1px solid var(--cream2); border-radius: 8px; padding: 6px 12px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--ink-mid); cursor: pointer; transition: all 0.15s; white-space: nowrap; }
  .back-btn:hover { border-color: var(--terra-light); color: var(--terra); }
  .session-title { font-size: 15px; font-weight: 500; color: var(--ink); }
  .session-progress-text { font-size: 13px; color: var(--ink-soft); margin-left: auto; white-space: nowrap; }
  .session-progress-bar { height: 3px; background: var(--cream2); border-radius: 2px; margin-bottom: 32px; overflow: hidden; }
  .session-progress-fill { height: 100%; background: var(--terra); border-radius: 2px; transition: width 0.35s ease; }
  .flashcard-scene { perspective: 1200px; width: 100%; aspect-ratio: 3/2; margin-bottom: 24px; cursor: pointer; }
  .flashcard-inner { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.52s cubic-bezier(0.4,0.2,0.2,1); }
  .flashcard-inner.flipped { transform: rotateY(180deg); }
  .flashcard-face { position: absolute; inset: 0; border-radius: var(--radius); backface-visibility: hidden; -webkit-backface-visibility: hidden; display: flex; flex-direction: column; justify-content: center; padding: 36px 40px; box-shadow: var(--shadow); }
  .flashcard-front { background: var(--white); border: 1.5px solid var(--cream2); }
  .flashcard-back { background: #1E0F0A; transform: rotateY(180deg); }
  .card-face-label { font-size: 10px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 16px; }
  .flashcard-front .card-face-label { color: var(--ink-soft); }
  .flashcard-back .card-face-label { color: var(--terra); }
  .card-category-tag { font-size: 10px; background: var(--cream2); color: var(--ink-soft); padding: 3px 8px; border-radius: 20px; display: inline-block; margin-bottom: 14px; font-weight: 500; }
  .card-prompt { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 500; font-style: italic; color: var(--ink); line-height: 1.4; margin-bottom: 20px; }
  .card-hint { font-size: 12px; color: var(--ink-soft); display: flex; align-items: center; gap: 6px; }
  .card-answer-en { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 500; color: var(--ink); line-height: 1.4; margin-bottom: 14px; }
  .card-answer-es { font-size: 14px; color: var(--terra); font-style: italic; font-weight: 300; margin-bottom: 18px; }
  .card-explanation { font-size: 12px; color: var(--ink-soft); background: rgba(255,255,255,0.06); border-radius: 8px; padding: 10px 14px; border-left: 2px solid var(--terra); line-height: 1.5; }
  .card-actions { display: flex; gap: 12px; margin-top: 4px; }
  .action-btn { flex: 1; padding: 13px; border: 1.5px solid; border-radius: var(--radius-sm); font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.18s; }
  .action-btn.still-learning { background: transparent; border-color: var(--cream2); color: var(--ink-mid); }
  .action-btn.still-learning:hover { border-color: var(--gold); color: var(--gold); background: var(--gold-light); }
  .action-btn.got-it { background: transparent; border-color: var(--sage-light); color: var(--sage); }
  .action-btn.got-it:hover { background: var(--sage-light); }
  .mc-card { background: var(--white); border-radius: var(--radius); padding: 36px 40px; box-shadow: var(--shadow); margin-bottom: 24px; }
  .mc-prompt { font-family: 'Playfair Display', serif; font-size: 22px; font-style: italic; font-weight: 500; color: var(--ink); line-height: 1.45; margin-bottom: 28px; }
  .mc-choices { display: flex; flex-direction: column; gap: 10px; }
  .mc-choice { padding: 14px 18px; border: 1.5px solid var(--cream2); border-radius: var(--radius-sm); background: transparent; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--ink-mid); text-align: left; cursor: pointer; transition: all 0.15s; line-height: 1.4; }
  .mc-choice:hover:not(:disabled) { border-color: var(--terra); color: var(--ink); background: #282828; }
  .mc-choice:disabled { cursor: default; }
  .mc-choice.correct { border-color: var(--sage); background: var(--sage-light); color: var(--sage); font-weight: 500; }
  .mc-choice.wrong { border-color: var(--terra-light); background: #FAF0EE; color: var(--terra); }
  .mc-feedback { margin-top: 20px; padding: 14px 18px; border-radius: var(--radius-sm); font-size: 13px; line-height: 1.55; }
  .mc-feedback.correct-fb { background: var(--sage-light); color: var(--sage); }
  .mc-feedback.wrong-fb { background: #FAF0EE; color: var(--terra-dark); }
  .mc-feedback strong { font-weight: 500; display: block; margin-bottom: 4px; }
  .done-screen { text-align: center; padding: 60px 32px; max-width: 520px; margin: 0 auto; }
  .done-emoji { font-size: 56px; margin-bottom: 20px; }
  .done-title { font-family: 'Playfair Display', serif; font-size: 34px; font-weight: 700; color: var(--ink); margin-bottom: 12px; }
  .done-subtitle { font-size: 16px; color: var(--ink-soft); font-weight: 300; margin-bottom: 32px; line-height: 1.6; }
  .done-stats { display: flex; gap: 16px; justify-content: center; margin-bottom: 36px; flex-wrap: wrap; }
  .done-stat { background: var(--white); border-radius: var(--radius-sm); padding: 16px 24px; box-shadow: var(--shadow); min-width: 90px; }
  .done-stat-num { font-size: 28px; font-weight: 700; color: var(--terra); font-family: 'Playfair Display', serif; }
  .done-stat-label { font-size: 12px; color: var(--ink-soft); margin-top: 2px; }
  .done-actions { display: flex; flex-direction: column; gap: 10px; }
  .done-primary { padding: 14px; background: var(--terra); color: var(--ink); border: none; border-radius: var(--radius-sm); font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; cursor: pointer; transition: background 0.18s; }
  .done-primary:hover { background: var(--terra-dark); }
  .done-secondary { padding: 14px; background: transparent; color: var(--ink-mid); border: 1.5px solid var(--cream2); border-radius: var(--radius-sm); font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; cursor: pointer; transition: all 0.18s; }
  .done-secondary:hover { border-color: var(--terra-light); color: var(--terra); }
  @media (max-width: 600px) {
    .header { padding: 16px 20px; }
    .home { padding: 28px 20px; }
    .home-title { font-size: 32px; }
    .flashcard-face { padding: 24px 28px; }
    .card-prompt { font-size: 20px; }
    .mc-card { padding: 24px 20px; }
    .session { padding: 24px 16px; }
  }
`;

// ── Sub-components ────────────────────────────────────────────────────────────

function ProgressBar({ value, max }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100);
  return <div className="progress-bar-wrap"><div className="progress-bar-fill" style={{ width: `${pct}%` }} /></div>;
}

function FlashCard({ card, onGotIt, onStillLearning }) {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => { setFlipped(false); }, [card.id]);
  return (
    <div>
      <div className="flashcard-scene" onClick={() => setFlipped(f => !f)} role="button" aria-label="Flip card">
        <div className={`flashcard-inner${flipped ? " flipped" : ""}`}>
          <div className="flashcard-face flashcard-front">
            <div className="card-face-label">Can you correct this?</div>
            <span className="card-category-tag">{card.category}</span>
            <div className="card-prompt">"{card.front}"</div>
            <div className="card-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 10l5 5 5-5"/></svg>
              Tap to reveal the answer
            </div>
          </div>
          <div className="flashcard-face flashcard-back">
            <div className="card-face-label">Correct English</div>
            <div className="card-answer-en">"{card.back_english}"</div>
            <div className="card-answer-es">{card.back_spanish}</div>
            <div className="card-explanation">💡 {card.explanation}</div>
          </div>
        </div>
      </div>
      {flipped && (
        <div className="card-actions">
          <button className="action-btn still-learning" onClick={onStillLearning}>Still learning</button>
          <button className="action-btn got-it" onClick={onGotIt}>Got it ✓</button>
        </div>
      )}
    </div>
  );
}

function MultipleChoiceCard({ card, allCards, onAnswer }) {
  const [state, setState] = useState(() => ({ ...getChoices(card, allCards), selected: null }));
  useEffect(() => { setState({ ...getChoices(card, allCards), selected: null }); }, [card.id]);
  const handleSelect = (choice) => {
    if (state.selected) return;
    setState(s => ({ ...s, selected: choice }));
    setTimeout(() => onAnswer(choice === state.correct), 1400);
  };
  const isAnswered = !!state.selected;
  const isCorrect = state.selected === state.correct;
  return (
    <div className="mc-card">
      <div className="card-face-label" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 8 }}>Choose the correct English</div>
      <span className="card-category-tag">{card.category}</span>
      <div className="mc-prompt" style={{ marginTop: 12 }}>"{card.front}"</div>
      <div className="mc-choices">
        {state.choices.map((choice, i) => {
          let cls = "mc-choice";
          if (isAnswered) { if (choice === state.correct) cls += " correct"; else if (choice === state.selected) cls += " wrong"; }
          return <button key={i} className={cls} disabled={isAnswered} onClick={() => handleSelect(choice)}>{choice}</button>;
        })}
      </div>
      {isAnswered && (
        <div className={`mc-feedback ${isCorrect ? "correct-fb" : "wrong-fb"}`}>
          <strong>{isCorrect ? "Correct! 🎉" : "Not quite."}</strong>
          💡 {card.explanation}
        </div>
      )}
    </div>
  );
}

function DoneScreen({ category, gotIt, total, onRestart, onHome }) {
  return (
    <div className="done-screen">
      <div className="done-emoji">{gotIt === total ? "🌟" : gotIt > total / 2 ? "🎉" : "💪"}</div>
      <div className="done-title">{gotIt === total ? "Perfect round!" : gotIt > total / 2 ? "Great work!" : "Keep going!"}</div>
      <div className="done-subtitle">You completed <em style={{ fontStyle: "italic", color: "var(--terra)" }}>{category}</em>. Practice makes permanent.</div>
      <div className="done-stats">
        <div className="done-stat"><div className="done-stat-num">{gotIt}</div><div className="done-stat-label">Got it</div></div>
        <div className="done-stat"><div className="done-stat-num">{total - gotIt}</div><div className="done-stat-label">Still learning</div></div>
        <div className="done-stat"><div className="done-stat-num">{total}</div><div className="done-stat-label">Total</div></div>
      </div>
      <div className="done-actions">
        <button className="done-primary" onClick={onRestart}>Practice again</button>
        <button className="done-secondary" onClick={onHome}>Back to categories</button>
      </div>
    </div>
  );
}

function Session({ cards, categoryName, mode, onProgress, onHome }) {
  const [queue] = useState(() => [...cards].sort(() => Math.random() - 0.5));
  const [idx, setIdx] = useState(0);
  const [sessionGotIt, setSessionGotIt] = useState(0);
  const [done, setDone] = useState(false);
  const current = queue[idx];
  const total = queue.length;
  const advance = useCallback((gotIt) => {
    if (gotIt) setSessionGotIt(n => n + 1);
    onProgress(current.id, gotIt);
    if (idx + 1 >= total) setDone(true);
    else setIdx(i => i + 1);
  }, [current, idx, total, onProgress]);

  if (done) return (
    <div className="session">
      <DoneScreen category={categoryName} gotIt={sessionGotIt} total={total}
        onRestart={() => { setIdx(0); setSessionGotIt(0); setDone(false); }}
        onHome={onHome} />
    </div>
  );

  return (
    <div className="session">
      <div className="session-header">
        <button className="back-btn" onClick={onHome}>← Categories</button>
        <span className="session-title">{categoryName}</span>
        <span className="session-progress-text">{idx + 1} / {total}</span>
      </div>
      <div className="session-progress-bar"><div className="session-progress-fill" style={{ width: `${(idx / total) * 100}%` }} /></div>
      {mode === "flashcard"
        ? <FlashCard card={current} onGotIt={() => advance(true)} onStillLearning={() => advance(false)} />
        : <MultipleChoiceCard card={current} allCards={ALL_CARDS} onAnswer={(correct) => advance(correct)} />}
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [mode, setMode] = useState("flashcard");
  const [session, setSession] = useState(null);
  const [progress, setProgress] = useState(loadProgress);

  const handleProgress = useCallback((id, gotIt) => {
    setProgress(prev => {
      const next = { ...prev, [id]: gotIt ? "got_it" : "learning" };
      saveProgress(next);
      return next;
    });
  }, []);

  const resetProgress = () => {
    if (window.confirm("Reset all progress? This can't be undone.")) { localStorage.removeItem(LS_KEY); setProgress({}); }
  };

  const totalMastered = Object.values(progress).filter(v => v === "got_it").length;

  if (session) return (
    <div className="app">
      <style>{styles}</style>
      <header className="header">
        <div className="logo">diá<span>logo</span></div>
      </header>
      <Session cards={session.cards} categoryName={session.categoryName} mode={mode} onProgress={handleProgress} onHome={() => setSession(null)} />
    </div>
  );

  return (
    <div className="app">
      <style>{styles}</style>
      <header className="header">
        <div className="logo">diá<span>logo</span></div>
        <div className="total-badge">{totalMastered} / {ALL_CARDS.length} mastered</div>
      </header>
      <main className="home">
        <div className="home-hero">
          <h1 className="home-title">English, <em>sin rodeos.</em></h1>
          <p className="home-subtitle">Fix the exact mistakes Spanish speakers make most — one card at a time. Categories ranked by error frequency from peer-reviewed research.</p>
          <p className="home-source">Based on Cabrera Solano et al. (2014), Hasbún (2009), Hevia-Tuero et al. (2023) & Swan/Smith <em>Learner English</em></p>
        </div>
        <div className="mode-toggle">
          <button className={`mode-btn${mode === "flashcard" ? " active" : ""}`} onClick={() => setMode("flashcard")}>Flashcards</button>
          <button className={`mode-btn${mode === "multiple_choice" ? " active" : ""}`} onClick={() => setMode("multiple_choice")}>Multiple choice</button>
        </div>
        <div className="section-label">Categories — ranked by frequency</div>
        <div className="category-grid">
          {CARDS_DATA.map((cat) => {
            const mastered = cat.cards.filter(c => progress[c.id] === "got_it").length;
            const seen = cat.cards.filter(c => !!progress[c.id]).length;
            return (
              <div key={cat.category} className="cat-card" onClick={() => setSession({ cards: cat.cards, categoryName: cat.category })} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && setSession({ cards: cat.cards, categoryName: cat.category })}>
                <span className="cat-emoji">{cat.emoji}</span>
                <div className="cat-name">{cat.category}</div>
                <div className="cat-desc">{cat.description}</div>
                <div className="cat-count">{cat.cards.length} cards</div>
                <ProgressBar value={mastered} max={cat.cards.length} />
                <div className="progress-label">{mastered === cat.cards.length && mastered > 0 ? "✓ Complete" : mastered > 0 ? `${mastered} mastered · ${cat.cards.length - seen} unseen` : "Not started"}</div>
              </div>
            );
          })}
        </div>
        <button className="mixed-btn" onClick={() => setSession({ cards: [...ALL_CARDS].sort(() => Math.random() - 0.5), categoryName: "Mixed deck" })}>
          🔀 Shuffle all {ALL_CARDS.length} cards
        </button>
        <button className="reset-btn" onClick={resetProgress}>Reset progress</button>
      </main>
    </div>
  );
}
