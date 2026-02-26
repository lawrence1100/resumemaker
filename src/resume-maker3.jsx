import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";


// ─── TEMPLATE THUMBNAIL PREVIEWS ─────────────────────────────────────────────

function ModernThumb({ selected, onClick }) {
  return (
    <div onClick={onClick} style={thumbWrap(selected)}>
      <div style={{ display: "flex", height: "100%", borderRadius: 6, overflow: "hidden" }}>
        <div style={{ width: "38%", background: "#1e1b4b", padding: "8px 6px" }}>
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(135deg,#818cf8,#34d399)", margin: "0 auto 4px" }} />
          <div style={{ height: 4, background: "#818cf8", borderRadius: 2, marginBottom: 3 }} />
          <div style={{ height: 2, background: "#334155", borderRadius: 2, marginBottom: 6 }} />
          {[70, 55, 65, 50, 60].map((w, i) => <div key={i} style={{ height: 2, background: "#334155", borderRadius: 2, marginBottom: 2, width: w + "%" }} />)}
          <div style={{ marginTop: 6 }}>
            {["#818cf8", "#34d399", "#818cf8"].map((c, i) => <div key={i} style={{ height: 6, background: c + "33", borderRadius: 3, marginBottom: 2, border: `1px solid ${c}55` }} />)}
          </div>
        </div>
        <div style={{ flex: 1, background: "#fff", padding: "8px 7px" }}>
          <div style={{ height: 3, background: "#818cf8", borderRadius: 2, marginBottom: 4, width: "80%" }} />
          <div style={{ height: 2, background: "#e2e8f0", borderRadius: 2, marginBottom: 6, width: "60%" }} />
          {[1, 2].map(e => <div key={e} style={{ marginBottom: 6 }}>
            <div style={{ height: 2, background: "#cbd5e1", width: "90%", borderRadius: 2, marginBottom: 2 }} />
            <div style={{ height: 2, background: "#e2e8f0", width: "70%", borderRadius: 2, marginBottom: 2 }} />
            <div style={{ height: 2, background: "#e2e8f0", width: "80%", borderRadius: 2 }} />
          </div>)}
        </div>
      </div>
      <ThumbLabel selected={selected}>Modern</ThumbLabel>
    </div>
  );
}

function ClassicThumb({ selected, onClick }) {
  return (
    <div onClick={onClick} style={thumbWrap(selected)}>
      <div style={{ background: "#fff", height: "100%", borderRadius: 6, padding: "8px 10px", display: "flex", flexDirection: "column" }}>
        <div style={{ textAlign: "center", borderBottom: "2px solid #1e293b", paddingBottom: 6, marginBottom: 6 }}>
          <div style={{ height: 5, background: "#1e293b", borderRadius: 2, width: "60%", margin: "0 auto 3px" }} />
          <div style={{ height: 2, background: "#94a3b8", borderRadius: 2, width: "45%", margin: "0 auto 2px" }} />
          <div style={{ height: 2, background: "#cbd5e1", borderRadius: 2, width: "70%", margin: "0 auto" }} />
        </div>
        {["SUMMARY", "EXPERIENCE", "EDUCATION"].map((s, i) => (
          <div key={s} style={{ marginBottom: 5 }}>
            <div style={{ height: 2, background: "#1e293b", width: "40%", borderRadius: 2, marginBottom: 2 }} />
            {[80, 65, 75].slice(0, i + 1).map((w, j) => <div key={j} style={{ height: 2, background: "#e2e8f0", width: w + "%", borderRadius: 2, marginBottom: 1 }} />)}
          </div>
        ))}
      </div>
      <ThumbLabel selected={selected}>Classic</ThumbLabel>
    </div>
  );
}

function CreativeThumb({ selected, onClick }) {
  return (
    <div onClick={onClick} style={thumbWrap(selected)}>
      <div style={{ background: "#fff", height: "100%", borderRadius: 6, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "linear-gradient(135deg,#7c3aed,#db2777,#f97316)", padding: "7px 8px" }}>
          <div style={{ height: 5, background: "rgba(255,255,255,0.9)", borderRadius: 2, width: "55%", marginBottom: 2 }} />
          <div style={{ height: 2, background: "rgba(255,255,255,0.6)", borderRadius: 2, width: "40%", marginBottom: 4 }} />
          <div style={{ display: "flex", gap: 3 }}>
            {[28, 32, 22].map((w, i) => <div key={i} style={{ height: 5, background: "rgba(255,255,255,0.25)", borderRadius: 8, width: w }} />)}
          </div>
        </div>
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
          <div style={{ padding: "6px 7px", borderRight: "1px solid #f1f5f9" }}>
            {["#7c3aed", "#db2777"].map((c, i) => (
              <div key={i} style={{ marginBottom: 5 }}>
                <div style={{ height: 2, background: c, width: "50%", borderRadius: 2, marginBottom: 2 }} />
                <div style={{ height: 2, background: "#e2e8f0", width: "80%", borderRadius: 2, marginBottom: 1 }} />
                <div style={{ height: 2, background: "#e2e8f0", width: "65%", borderRadius: 2 }} />
              </div>
            ))}
          </div>
          <div style={{ padding: "6px 7px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 2, marginBottom: 5 }}>
              {["#f97316", "#7c3aed", "#db2777", "#059669"].map((c, i) => <div key={i} style={{ height: 6, width: 18, background: c + "22", border: `1px solid ${c}55`, borderRadius: 8 }} />)}
            </div>
            {[1, 2].map(i => <div key={i} style={{ height: 12, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 4, marginBottom: 3 }} />)}
          </div>
        </div>
      </div>
      <ThumbLabel selected={selected}>Creative</ThumbLabel>
    </div>
  );
}

function ATSThumb({ selected, onClick }) {
  return (
    <div onClick={onClick} style={thumbWrap(selected)}>
      <div style={{ background: "#fff", height: "100%", borderRadius: 6, padding: "8px 10px", display: "flex", flexDirection: "column" }}>
        <div style={{ height: 5, background: "#0f172a", borderRadius: 2, width: "55%", marginBottom: 2 }} />
        <div style={{ height: 2, background: "#475569", borderRadius: 2, width: "40%", marginBottom: 2 }} />
        <div style={{ height: 1, background: "#0f172a", width: "100%", marginBottom: 5 }} />
        {["SKILLS", "EXPERIENCE", "EDUCATION"].map((s, i) => (
          <div key={s} style={{ marginBottom: 5 }}>
            <div style={{ height: 2, background: "#0f172a", width: "35%", borderRadius: 2, marginBottom: 1 }} />
            <div style={{ height: 1, background: "#0f172a", width: "100%", marginBottom: 2 }} />
            {[90, 75, 80].map((w, j) => <div key={j} style={{ height: 2, background: "#94a3b8", width: w + "%", borderRadius: 2, marginBottom: 1 }} />)}
          </div>
        ))}
      </div>
      <ThumbLabel selected={selected}>ATS-Friendly</ThumbLabel>
    </div>
  );
}

function ThumbLabel({ selected, children }) {
  return (
    <div style={{ textAlign: "center", marginTop: 8, fontSize: 12, fontWeight: 700, color: selected ? "#4f46e5" : "#64748b", letterSpacing: 0.3 }}>
      {children}
      {selected && <div style={{ width: 20, height: 2, background: "#4f46e5", borderRadius: 2, margin: "4px auto 0" }} />}
    </div>
  );
}

function thumbWrap(selected) {
  return {
    cursor: "pointer", borderRadius: 10,
    border: `2px solid ${selected ? "#4f46e5" : "#e2e8f0"}`,
    padding: 8, background: selected ? "#f0f0ff" : "#fafafa",
    transition: "all 0.2s", height: 140,
    boxShadow: selected ? "0 4px 20px rgba(79,70,229,0.18)" : "0 1px 4px rgba(0,0,0,0.06)",
    transform: selected ? "translateY(-2px)" : "none",
  };
}

// ─── RESUME TEMPLATES ─────────────────────────────────────────────────────────

function ModernTemplate({ data }) {
  const { name, title, email, phone, location, linkedin, github, summary, skills, experience, education, projects } = data;
  const skillList = skills ? skills.split(",").map(s => s.trim()).filter(Boolean) : [];
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fff", color: "#1a1a2e", minHeight: 1056, display: "flex" }}>
      <div style={{ width: 230, background: "#1e1b4b", color: "#fff", padding: "40px 22px", flexShrink: 0 }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#818cf8,#34d399)", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800 }}>
          {name ? name.charAt(0).toUpperCase() : "?"}
        </div>
        {name && <h2 style={{ fontSize: 17, fontWeight: 800, margin: "0 0 3px" }}>{name}</h2>}
        {title && <p style={{ fontSize: 10, color: "#818cf8", margin: "0 0 24px", textTransform: "uppercase", letterSpacing: 1.2 }}>{title}</p>}
        <ModSideSection label="CONTACT">
          {email && <p style={msi}>✉ {email}</p>}
          {phone && <p style={msi}>☎ {phone}</p>}
          {location && <p style={msi}>⌖ {location}</p>}
          {linkedin && <p style={msi}>in {linkedin}</p>}
          {github && <p style={msi}>⌨ {github}</p>}
        </ModSideSection>
        {skillList.length > 0 && (
          <ModSideSection label="SKILLS">
            {skillList.map((s, i) => (
              <span key={i} style={{ display: "inline-block", background: "rgba(129,140,248,0.18)", color: "#a5b4fc", borderRadius: 4, padding: "2px 8px", fontSize: 9.5, margin: "2px 2px", border: "1px solid rgba(129,140,248,0.3)" }}>{s}</span>
            ))}
          </ModSideSection>
        )}
        {education.length > 0 && (
          <ModSideSection label="EDUCATION">
            {education.map((e, i) => e.degree && (
              <div key={i} style={{ marginBottom: 10 }}>
                <p style={{ fontSize: 11, fontWeight: 700, margin: 0 }}>{e.degree}</p>
                <p style={{ fontSize: 10, color: "#94a3b8", margin: "1px 0 0" }}>{e.institution}</p>
                {e.year && <p style={{ fontSize: 10, color: "#34d399", margin: 0 }}>{e.year}</p>}
              </div>
            ))}
          </ModSideSection>
        )}
      </div>
      <div style={{ flex: 1, padding: "40px 36px" }}>
        {summary && <ModMainSection label="PROFILE"><p style={{ fontSize: 12.5, lineHeight: 1.75, color: "#475569", margin: 0 }}>{summary}</p></ModMainSection>}
        {experience.some(e => e.role) && (
          <ModMainSection label="EXPERIENCE">
            {experience.map((e, i) => !e.role ? null : (
              <div key={i} style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <p style={{ fontWeight: 800, fontSize: 13, margin: 0, color: "#1e1b4b" }}>{e.role}</p>
                  <span style={{ fontSize: 10.5, color: "#818cf8", fontWeight: 700, whiteSpace: "nowrap" }}>{e.period}</span>
                </div>
                <p style={{ fontSize: 11.5, color: "#64748b", margin: "2px 0 7px" }}>{e.company}</p>
                {e.bullets.split("\n").filter(Boolean).map((b, j) => (
                  <p key={j} style={{ fontSize: 11.5, color: "#475569", margin: "3px 0", paddingLeft: 12, borderLeft: "2px solid #34d399", lineHeight: 1.5 }}>{b}</p>
                ))}
              </div>
            ))}
          </ModMainSection>
        )}
        {projects && (
          <ModMainSection label="PROJECTS">
            {projects.split("\n").filter(Boolean).map((p, i) => {
              const [pname, ...rest] = p.split("–");
              return <p key={i} style={{ fontSize: 12, margin: "5px 0" }}><strong style={{ color: "#1e1b4b" }}>{pname.trim()}</strong>{rest.length ? <span style={{ color: "#64748b" }}> — {rest.join("–")}</span> : null}</p>;
            })}
          </ModMainSection>
        )}
      </div>
    </div>
  );
}
const msi = { fontSize: 10, margin: "4px 0", color: "#cbd5e1", wordBreak: "break-all", lineHeight: 1.5 };
function ModSideSection({ label, children }) {
  return <div style={{ marginBottom: 22 }}><p style={{ fontSize: 8.5, letterSpacing: 2.5, color: "#34d399", fontWeight: 800, margin: "0 0 9px", textTransform: "uppercase" }}>{label}</p>{children}</div>;
}
function ModMainSection({ label, children }) {
  return <div style={{ marginBottom: 26 }}><p style={{ fontSize: 9, letterSpacing: 3, fontWeight: 800, color: "#818cf8", textTransform: "uppercase", margin: "0 0 12px", borderBottom: "2px solid #818cf8", paddingBottom: 5 }}>{label}</p>{children}</div>;
}

function ClassicTemplate({ data }) {
  const { name, title, email, phone, location, linkedin, summary, skills, experience, education, projects } = data;
  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#fff", color: "#1e293b", padding: "48px 56px", minHeight: 1056 }}>
      <div style={{ textAlign: "center", borderBottom: "3px double #1e293b", paddingBottom: 18, marginBottom: 22 }}>
        {name && <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 4px", letterSpacing: 3, textTransform: "uppercase" }}>{name}</h1>}
        {title && <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 6px", fontStyle: "italic" }}>{title}</p>}
        <p style={{ fontSize: 11, margin: 0, color: "#475569" }}>{[email, phone, location, linkedin].filter(Boolean).join("  ·  ")}</p>
      </div>
      {summary && <ClSection label="Professional Summary"><p style={{ fontSize: 12, lineHeight: 1.85, margin: 0 }}>{summary}</p></ClSection>}
      {experience.some(e => e.role) && (
        <ClSection label="Professional Experience">
          {experience.map((e, i) => !e.role ? null : (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <strong style={{ fontSize: 13 }}>{e.role}</strong>
                <em style={{ fontSize: 11, color: "#64748b" }}>{e.period}</em>
              </div>
              <p style={{ fontSize: 12, color: "#64748b", margin: "2px 0 6px", fontStyle: "italic" }}>{e.company}</p>
              {e.bullets.split("\n").filter(Boolean).map((b, j) => (
                <p key={j} style={{ fontSize: 11.5, margin: "2px 0 2px 18px", lineHeight: 1.6 }}>• {b}</p>
              ))}
            </div>
          ))}
        </ClSection>
      )}
      {education.some(e => e.degree) && (
        <ClSection label="Education">
          {education.map((e, i) => !e.degree ? null : (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <div><strong style={{ fontSize: 12 }}>{e.degree}</strong>{e.institution && <span style={{ fontSize: 11, color: "#64748b" }}> · {e.institution}</span>}</div>
              {e.year && <em style={{ fontSize: 11, color: "#64748b" }}>{e.year}</em>}
            </div>
          ))}
        </ClSection>
      )}
      {skills && <ClSection label="Skills"><p style={{ fontSize: 12, lineHeight: 1.8, margin: 0 }}>{skills}</p></ClSection>}
      {projects && (
        <ClSection label="Projects">
          {projects.split("\n").filter(Boolean).map((p, i) => (
            <p key={i} style={{ fontSize: 11.5, margin: "3px 0 3px 18px", lineHeight: 1.6 }}>• {p}</p>
          ))}
        </ClSection>
      )}
    </div>
  );
}
function ClSection({ label, children }) {
  return <div style={{ marginBottom: 20 }}><h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, borderBottom: "1px solid #1e293b", paddingBottom: 4, marginBottom: 10, color: "#1e293b" }}>{label}</h3>{children}</div>;
}

function CreativeTemplate({ data }) {
  const { name, title, email, phone, location, linkedin, github, summary, skills, experience, education, projects } = data;
  const colors = ["#7c3aed", "#db2777", "#f97316", "#059669"];
  const skillList = skills ? skills.split(",").map(s => s.trim()).filter(Boolean) : [];
  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#fff", minHeight: 1056 }}>
      <div style={{ background: "linear-gradient(135deg,#7c3aed 0%,#db2777 55%,#f97316 100%)", padding: "36px 48px 28px", color: "#fff" }}>
        {name && <h1 style={{ fontSize: 32, fontWeight: 900, margin: "0 0 4px", letterSpacing: -0.5 }}>{name}</h1>}
        {title && <p style={{ fontSize: 13, margin: "0 0 18px", opacity: 0.85, fontWeight: 300, letterSpacing: 2.5, textTransform: "uppercase" }}>{title}</p>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {[email, phone, location, linkedin, github].filter(Boolean).map((c, i) => (
            <span key={i} style={{ fontSize: 11, background: "rgba(255,255,255,0.18)", borderRadius: 20, padding: "4px 14px", border: "1px solid rgba(255,255,255,0.3)" }}>{c}</span>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ padding: "28px 36px", borderRight: "1px solid #f1f5f9" }}>
          {summary && <div style={{ marginBottom: 24 }}>
            <CrLabel color="#7c3aed">About Me</CrLabel>
            <p style={{ fontSize: 12, lineHeight: 1.8, color: "#475569", margin: 0 }}>{summary}</p>
          </div>}
          {experience.some(e => e.role) && (
            <div>
              <CrLabel color="#db2777">Experience</CrLabel>
              {experience.map((e, i) => !e.role ? null : (
                <div key={i} style={{ marginBottom: 18, paddingLeft: 14, borderLeft: `3px solid ${colors[i % colors.length]}` }}>
                  <p style={{ fontWeight: 800, fontSize: 13, margin: 0, color: "#1e293b" }}>{e.role}</p>
                  <p style={{ fontSize: 11.5, color: "#94a3b8", margin: "2px 0 5px" }}>{e.company}{e.period && ` · ${e.period}`}</p>
                  {e.bullets.split("\n").filter(Boolean).map((b, j) => (
                    <p key={j} style={{ fontSize: 11.5, color: "#64748b", margin: "3px 0", lineHeight: 1.5 }}>→ {b}</p>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ padding: "28px 36px" }}>
          {skillList.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <CrLabel color="#f97316">Skills</CrLabel>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 6 }}>
                {skillList.map((s, i) => (
                  <span key={i} style={{ fontSize: 11, background: colors[i % colors.length] + "15", color: colors[i % colors.length], borderRadius: 20, padding: "4px 12px", fontWeight: 700, border: `1px solid ${colors[i % colors.length]}30` }}>{s}</span>
                ))}
              </div>
            </div>
          )}
          {education.some(e => e.degree) && (
            <div style={{ marginBottom: 24 }}>
              <CrLabel color="#059669">Education</CrLabel>
              {education.map((e, i) => !e.degree ? null : (
                <div key={i} style={{ marginBottom: 8 }}>
                  <p style={{ fontWeight: 800, fontSize: 12, margin: 0, color: "#1e293b" }}>{e.degree}</p>
                  <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>{e.institution}{e.year && ` · ${e.year}`}</p>
                </div>
              ))}
            </div>
          )}
          {projects && (
            <div>
              <CrLabel color="#7c3aed">Projects</CrLabel>
              {projects.split("\n").filter(Boolean).map((p, i) => {
                const [pname, ...rest] = p.split("–");
                return (
                  <div key={i} style={{ marginBottom: 9, padding: "8px 12px", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                    <p style={{ fontWeight: 800, fontSize: 12, margin: 0, color: "#1e293b" }}>{pname.trim()}</p>
                    {rest.length > 0 && <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>{rest.join("–").trim()}</p>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function CrLabel({ color, children }) {
  return <p style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: 2.5, color, margin: "0 0 10px", display: "flex", alignItems: "center", gap: 7 }}>
    <span style={{ display: "inline-block", width: 18, height: 3, background: color, borderRadius: 2 }} />{children}
  </p>;
}

function ATSTemplate({ data }) {
  const { name, title, email, phone, location, linkedin, github, summary, skills, experience, education, projects } = data;
  return (
    <div style={{ fontFamily: "'Courier New', monospace", background: "#fff", color: "#0f172a", padding: "40px 52px", minHeight: 1056 }}>
      {name && <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: 1 }}>{name}</h1>}
      {title && <p style={{ fontSize: 13, margin: "0 0 5px", fontWeight: 700, color: "#334155" }}>{title}</p>}
      <p style={{ fontSize: 11, margin: "0 0 4px", color: "#475569" }}>{[email, phone, location, linkedin, github].filter(Boolean).join(" | ")}</p>
      <div style={{ height: 1, background: "#0f172a", margin: "10px 0 18px" }} />
      {summary && <ATSSec label="SUMMARY"><p style={{ fontSize: 12, lineHeight: 1.75, margin: 0 }}>{summary}</p></ATSSec>}
      {skills && <ATSSec label="SKILLS"><p style={{ fontSize: 12, lineHeight: 1.75, margin: 0 }}>{skills}</p></ATSSec>}
      {experience.some(e => e.role) && (
        <ATSSec label="WORK EXPERIENCE">
          {experience.map((e, i) => !e.role ? null : (
            <div key={i} style={{ marginBottom: 14 }}>
              <p style={{ fontWeight: 700, fontSize: 13, margin: "0 0 2px" }}>{e.role}{e.company && ` | ${e.company}`}{e.period && ` | ${e.period}`}</p>
              {e.bullets.split("\n").filter(Boolean).map((b, j) => (
                <p key={j} style={{ fontSize: 12, margin: "2px 0 2px 16px", lineHeight: 1.6 }}>- {b}</p>
              ))}
            </div>
          ))}
        </ATSSec>
      )}
      {education.some(e => e.degree) && (
        <ATSSec label="EDUCATION">
          {education.map((e, i) => !e.degree ? null : (
            <p key={i} style={{ fontSize: 12, margin: "2px 0" }}>{e.degree}{e.institution && ` | ${e.institution}`}{e.year && ` | ${e.year}`}</p>
          ))}
        </ATSSec>
      )}
      {projects && (
        <ATSSec label="PROJECTS">
          {projects.split("\n").filter(Boolean).map((p, i) => (
            <p key={i} style={{ fontSize: 12, margin: "2px 0 2px 16px", lineHeight: 1.6 }}>- {p}</p>
          ))}
        </ATSSec>
      )}
    </div>
  );
}
function ATSSec({ label, children }) {
  return <div style={{ marginBottom: 16 }}>
    <p style={{ fontWeight: 700, fontSize: 13, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 1 }}>{label}</p>
    <div style={{ height: 1, background: "#0f172a", marginBottom: 6 }} />
    {children}
  </div>;
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const INPUT = {
  width: "100%", padding: "9px 12px", background: "#fff", border: "1.5px solid #e2e8f0",
  borderRadius: 8, color: "#1e293b", fontSize: 13, outline: "none", boxSizing: "border-box",
  fontFamily: "inherit", transition: "border 0.2s",
};
const LABEL = { fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 5, display: "block" };
const CARD = { background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 14, padding: "22px 24px", marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" };
const SEC = { margin: "0 0 18px", fontWeight: 800, color: "#1e293b", fontSize: 13, textTransform: "uppercase", letterSpacing: 1.5, display: "flex", alignItems: "center", gap: 8 };

const emptyForm = {
  name: "", title: "", email: "", phone: "", location: "", linkedin: "", github: "",
  summary: "", skills: "",
  experience: [{ role: "", company: "", period: "", bullets: "" }],
  education: [{ degree: "", institution: "", year: "" }],
  projects: "",
};

const TEMPLATES = [
  { id: "modern", Thumb: ModernThumb, Cmp: ModernTemplate },
  { id: "classic", Thumb: ClassicThumb, Cmp: ClassicTemplate },
  { id: "creative", Thumb: CreativeThumb, Cmp: CreativeTemplate },
  { id: "ats", Thumb: ATSThumb, Cmp: ATSTemplate },
];

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function ResumeMaker() {
  const [form, setForm] = useState(emptyForm);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [step, setStep] = useState("form");
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  const upd = (f, v) => setForm(prev => ({ ...prev, [f]: v }));
  const updExp = (i, f, v) => setForm(prev => { const e = [...prev.experience]; e[i] = { ...e[i], [f]: v }; return { ...prev, experience: e }; });
  const updEdu = (i, f, v) => setForm(prev => { const e = [...prev.education]; e[i] = { ...e[i], [f]: v }; return { ...prev, education: e }; });
  const addExp = () => setForm(prev => ({ ...prev, experience: [...prev.experience, { role: "", company: "", period: "", bullets: "" }] }));
  const remExp = (i) => setForm(prev => ({ ...prev, experience: prev.experience.filter((_, idx) => idx !== i) }));
  const addEdu = () => setForm(prev => ({ ...prev, education: [...prev.education, { degree: "", institution: "", year: "" }] }));
  const remEdu = (i) => setForm(prev => ({ ...prev, education: prev.education.filter((_, idx) => idx !== i) }));

  const handlePDF = () => {
    const pw = window.open("", "_blank");
    pw.document.write(`<!DOCTYPE html><html><head>
      <meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;700;800&family=Nunito:wght@300;400;700;800;900&display=swap" rel="stylesheet">
      <style>body{margin:0;padding:0}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}@page{margin:0;size:A4}}</style>
    </head><body>${resumeRef.current.innerHTML}</body></html>`);
    pw.document.close();
    setTimeout(() => { pw.focus(); pw.print(); pw.close(); }, 900);
  };

  const ActiveCmp = TEMPLATES.find(t => t.id === selectedTemplate)?.Cmp || ModernTemplate;

  const focusOn = (e) => e.target.style.borderColor = "#4f46e5";
  const focusOff = (e) => e.target.style.borderColor = "#e2e8f0";

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'DM Sans', sans-serif", color: "#1e293b" }}>

      {/* NAVBAR */}
      <div style={{ background: "#fff", borderBottom: "1.5px solid #e2e8f0", padding: "0 36px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#4f46e5,#0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: "#fff", fontWeight: 900 }}>✦</div>
          <div>
            <span style={{ fontWeight: 900, fontSize: 16, color: "#1e293b", letterSpacing: -0.5 }}>ResumeForge</span>
            <span style={{ fontSize: 11, color: "#94a3b8", marginLeft: 8 }}>Build beautiful resumes</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#f1f5f9", borderRadius: 10, padding: 4 }}>
          {[["form", "✏️  Details"], ["preview", "👁  Preview & Template"]].map(([s, l]) => (
            <button key={s} onClick={() => setStep(s)} style={{ padding: "7px 18px", borderRadius: 7, border: "none", background: step === s ? "#fff" : "transparent", color: step === s ? "#4f46e5" : "#64748b", cursor: "pointer", fontWeight: 700, fontSize: 13, boxShadow: step === s ? "0 1px 4px rgba(0,0,0,0.1)" : "none", transition: "all 0.2s" }}>
              {l}
            </button>
          ))}
        </div>
        {step === "preview"
          ? <button onClick={handlePDF} style={{ padding: "9px 22px", borderRadius: 9, border: "none", background: "linear-gradient(135deg,#4f46e5,#0ea5e9)", color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer", boxShadow: "0 2px 12px rgba(79,70,229,0.3)", display: "flex", alignItems: "center", gap: 7 }}>⬇ Download PDF</button>
          : <button onClick={() => setStep("preview")} style={{ padding: "9px 22px", borderRadius: 9, border: "none", background: "#4f46e5", color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>Preview →</button>
        }
      </div>

      {/* ── FORM STEP ── */}
      {step === "form" && (
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "32px 20px 60px" }}>

          {/* Personal Info */}
          <div style={CARD}>
            <p style={SEC}><span style={{ width: 4, height: 16, background: "#4f46e5", borderRadius: 2, display: "inline-block" }} />Personal Information</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[["name", "Full Name"], ["title", "Job Title"], ["email", "Email Address"], ["phone", "Phone Number"], ["location", "City, Country"], ["linkedin", "LinkedIn URL"], ["github", "GitHub URL"]].map(([field, label]) => (
                <div key={field}>
                  <label style={LABEL}>{label}</label>
                  <input style={INPUT} value={form[field]} onChange={e => upd(field, e.target.value)} placeholder={`Enter ${label.toLowerCase()}`} onFocus={focusOn} onBlur={focusOff} />
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div style={CARD}>
            <p style={SEC}><span style={{ width: 4, height: 16, background: "#0ea5e9", borderRadius: 2, display: "inline-block" }} />Professional Summary</p>
            <textarea style={{ ...INPUT, minHeight: 90, resize: "vertical", lineHeight: 1.6 }} value={form.summary} onChange={e => upd("summary", e.target.value)} placeholder="Write a brief 2–3 sentence summary about your professional background, key strengths, and goals..." onFocus={focusOn} onBlur={focusOff} />
          </div>

          {/* Skills */}
          <div style={CARD}>
            <p style={SEC}><span style={{ width: 4, height: 16, background: "#10b981", borderRadius: 2, display: "inline-block" }} />Skills <span style={{ fontSize: 11, fontWeight: 400, color: "#94a3b8", textTransform: "none", letterSpacing: 0 }}>— separate with commas</span></p>
            <textarea style={{ ...INPUT, minHeight: 62, resize: "vertical" }} value={form.skills} onChange={e => upd("skills", e.target.value)} placeholder="e.g. React Native, Node.js, Python, MongoDB, Docker, Git..." onFocus={focusOn} onBlur={focusOff} />
          </div>

          {/* Experience */}
          <div style={CARD}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <p style={{ ...SEC, margin: 0 }}><span style={{ width: 4, height: 16, background: "#f59e0b", borderRadius: 2, display: "inline-block" }} />Work Experience</p>
              <button onClick={addExp} style={{ padding: "6px 14px", borderRadius: 7, border: "1.5px solid #4f46e5", background: "#eef2ff", color: "#4f46e5", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>+ Add Position</button>
            </div>
            {form.experience.map((e, i) => (
              <div key={i} style={{ marginBottom: 14, padding: "16px 18px", background: "#f8fafc", borderRadius: 10, border: "1.5px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#4f46e5", textTransform: "uppercase", letterSpacing: 1 }}>Position {i + 1}</span>
                  {form.experience.length > 1 && <button onClick={() => remExp(i)} style={{ border: "none", background: "#fee2e2", color: "#ef4444", cursor: "pointer", fontSize: 11, borderRadius: 6, padding: "3px 10px", fontWeight: 700 }}>Remove</button>}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 10 }}>
                  {[["role", "Job Title"], ["company", "Company"], ["period", "Period"]].map(([f, l]) => (
                    <div key={f}>
                      <label style={LABEL}>{l}</label>
                      <input style={{ ...INPUT, background: "#fff" }} value={e[f]} onChange={ev => updExp(i, f, ev.target.value)} placeholder={l} onFocus={focusOn} onBlur={focusOff} />
                    </div>
                  ))}
                </div>
                <label style={LABEL}>Key Achievements <span style={{ color: "#cbd5e1", fontWeight: 400, textTransform: "none" }}>— one per line</span></label>
                <textarea style={{ ...INPUT, background: "#fff", minHeight: 70, resize: "vertical", lineHeight: 1.6 }} value={e.bullets} onChange={ev => updExp(i, "bullets", ev.target.value)} placeholder={"Built X feature that improved Y by Z%\nLed team of N developers to deliver project on time"} onFocus={focusOn} onBlur={focusOff} />
              </div>
            ))}
          </div>

          {/* Education */}
          <div style={CARD}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <p style={{ ...SEC, margin: 0 }}><span style={{ width: 4, height: 16, background: "#8b5cf6", borderRadius: 2, display: "inline-block" }} />Education</p>
              <button onClick={addEdu} style={{ padding: "6px 14px", borderRadius: 7, border: "1.5px solid #4f46e5", background: "#eef2ff", color: "#4f46e5", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>+ Add Entry</button>
            </div>
            {form.education.map((e, i) => (
              <div key={i} style={{ marginBottom: 12, padding: "14px 16px", background: "#f8fafc", borderRadius: 10, border: "1.5px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#8b5cf6", textTransform: "uppercase", letterSpacing: 1 }}>Entry {i + 1}</span>
                  {form.education.length > 1 && <button onClick={() => remEdu(i)} style={{ border: "none", background: "#fee2e2", color: "#ef4444", cursor: "pointer", fontSize: 11, borderRadius: 6, padding: "3px 10px", fontWeight: 700 }}>Remove</button>}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr", gap: 10 }}>
                  {[["degree", "Degree / Course"], ["institution", "Institution"], ["year", "Year"]].map(([f, l]) => (
                    <div key={f}>
                      <label style={LABEL}>{l}</label>
                      <input style={{ ...INPUT, background: "#fff" }} value={e[f]} onChange={ev => updEdu(i, f, ev.target.value)} placeholder={l} onFocus={focusOn} onBlur={focusOff} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div style={CARD}>
            <p style={SEC}><span style={{ width: 4, height: 16, background: "#ec4899", borderRadius: 2, display: "inline-block" }} />Projects <span style={{ fontSize: 11, fontWeight: 400, color: "#94a3b8", textTransform: "none", letterSpacing: 0 }}>— format: Name – Description (one per line)</span></p>
            <textarea style={{ ...INPUT, minHeight: 90, resize: "vertical", lineHeight: 1.6 }} value={form.projects} onChange={e => upd("projects", e.target.value)} placeholder={"My App – A cross-platform mobile app built with React Native\nMy API – REST backend serving 10k+ daily requests"} onFocus={focusOn} onBlur={focusOff} />
          </div>

          <button onClick={() => setStep("preview")} style={{ width: "100%", padding: "15px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#4f46e5,#0ea5e9)", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 20px rgba(79,70,229,0.28)", letterSpacing: 0.3 }}>
            Preview & Choose Template →
          </button>
        </div>
      )}

      {/* ── PREVIEW STEP ── */}
      {step === "preview" && (
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "32px 20px 60px" }}>

          {/* Template thumbnails */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ margin: "0 0 14px", fontWeight: 800, color: "#1e293b", fontSize: 13, textTransform: "uppercase", letterSpacing: 1.5 }}>Select Template</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
              {TEMPLATES.map(({ id, Thumb }) => (
                <Thumb key={id} selected={selectedTemplate === id} onClick={() => setSelectedTemplate(id)} />
              ))}
            </div>
          </div>

          {/* Resume preview */}
          <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 48px rgba(0,0,0,0.12)", border: "1.5px solid #e2e8f0" }}>
            <div ref={resumeRef}>
              <ActiveCmp data={form} />
            </div>
          </div>
        </div>
      )}

      <div><button onClick={() => navigate("about")}>
        Go
      </button></div>
    </div>
  );
}