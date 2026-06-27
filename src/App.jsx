import { useState, useMemo, useEffect } from "react";

// ── Theme Oh! Campings ────────────────────────────────────────────────────────
const C = {
  bg: "#FFF8F0", surface: "#FFF0DC", card: "#FFFFFF", border: "#F0D9B5",
  teal: "#F5A623", tealDim: "#F5A62318", amber: "#E8890A", red: "#EF4444",
  purple: "#5B9BD5", green: "#22C55E", text: "#2C2C2C", muted: "#9A8A78",
};

const ROLE_COLORS = { Gérant: C.teal, Gestionnaire: C.purple, Invité: C.amber };

// ── Inventaire type Estival ───────────────────────────────────────────────────
const ESTIVAL_INVENTORY = [
  // Petit électroménager
  { category: "Petit électroménager", name: "Cafetière électrique 15T 1,5L à filtre", qty: 1 },
  { category: "Petit électroménager", name: "Micro ondes 20L", qty: 1 },
  { category: "Petit électroménager", name: "Cloche micro ondes", qty: 1 },
  // Cuisine - Vaisselle
  { category: "Cuisine - Vaisselle", name: "Assiette plate 26cm", qty: 6 },
  { category: "Cuisine - Vaisselle", name: "Assiette creuse 20cm", qty: 6 },
  { category: "Cuisine - Vaisselle", name: "Assiette dessert 19cm", qty: 6 },
  { category: "Cuisine - Vaisselle", name: "Bol 14cm", qty: 6 },
  { category: "Cuisine - Vaisselle", name: "Mugs", qty: 6 },
  { category: "Cuisine - Vaisselle", name: "Saladier 26cm", qty: 1 },
  { category: "Cuisine - Vaisselle", name: "Plat rond creux 28cm", qty: 1 },
  { category: "Cuisine - Vaisselle", name: "Gobelet norvège 27cl", qty: 8 },
  { category: "Cuisine - Vaisselle", name: "Verre amélia 19cl", qty: 8 },
  { category: "Cuisine - Vaisselle", name: "Couteau steack", qty: 8 },
  { category: "Cuisine - Vaisselle", name: "Fourchette table", qty: 8 },
  { category: "Cuisine - Vaisselle", name: "Cuillère table", qty: 8 },
  { category: "Cuisine - Vaisselle", name: "Cuillère café", qty: 8 },
  // Cuisine - Cuisson
  { category: "Cuisine - Cuisson", name: "Casserole inox 16cm", qty: 1 },
  { category: "Cuisine - Cuisson", name: "Casserole inox 18cm", qty: 1 },
  { category: "Cuisine - Cuisson", name: "Faitout inox 24cm", qty: 1 },
  { category: "Cuisine - Cuisson", name: "Poêle aluminium 28cm", qty: 1 },
  // Cuisine - Utilitaires
  { category: "Cuisine - Utilitaires", name: "Passoire légumes 27cm", qty: 1 },
  { category: "Cuisine - Utilitaires", name: "Couverts à salade", qty: 1 },
  { category: "Cuisine - Utilitaires", name: "Couvercle inox 21cm", qty: 1 },
  { category: "Cuisine - Utilitaires", name: "Couvercle inox 30cm", qty: 1 },
  { category: "Cuisine - Utilitaires", name: "Cloche micro ondes", qty: 1 },
  { category: "Cuisine - Utilitaires", name: "Cuillère bois", qty: 1 },
  { category: "Cuisine - Utilitaires", name: "Ecumoire nylon", qty: 1 },
  { category: "Cuisine - Utilitaires", name: "Spatule nylon", qty: 1 },
  { category: "Cuisine - Utilitaires", name: "Allume gaz", qty: 1 },
  { category: "Cuisine - Utilitaires", name: "Bac à glaçons", qty: 1 },
  { category: "Cuisine - Utilitaires", name: "Ouvre boite papillon", qty: 1 },
  { category: "Cuisine - Utilitaires", name: "Rappe universelle", qty: 1 },
  { category: "Cuisine - Utilitaires", name: "Tire bouchon sommelier", qty: 1 },
  { category: "Cuisine - Utilitaires", name: "Ciseaux de cuisine", qty: 1 },
  { category: "Cuisine - Utilitaires", name: "Couteau éplucheur", qty: 1 },
  { category: "Cuisine - Utilitaires", name: "Couteau à découper", qty: 1 },
  { category: "Cuisine - Utilitaires", name: "Planche à découper", qty: 1 },
  { category: "Cuisine - Utilitaires", name: "Boite plastique rectangulaire 2L", qty: 1 },
  { category: "Cuisine - Utilitaires", name: "Essoreuse à salade", qty: 1 },
  { category: "Cuisine - Utilitaires", name: "Pichet 1L", qty: 1 },
  { category: "Cuisine - Utilitaires", name: "Cendrier verre", qty: 1 },
  { category: "Cuisine - Utilitaires", name: "Dessous plat chromé", qty: 1 },
  { category: "Cuisine - Utilitaires", name: "Plateau 43x32cm", qty: 1 },
  // Articles ménagers - Aménagement
  { category: "Articles ménagers - Aménagement", name: "Egouttoir à vaisselle", qty: 1 },
  { category: "Articles ménagers - Aménagement", name: "Range couverts", qty: 1 },
  { category: "Articles ménagers - Aménagement", name: "Poubelle 25L", qty: 1 },
  { category: "Articles ménagers - Aménagement", name: "Tapis gratte pied", qty: 1 },
  { category: "Articles ménagers - Aménagement", name: "Tapis de bain", qty: 1 },
  { category: "Articles ménagers - Aménagement", name: "Séchoir à linge résine blanc", qty: 1 },
  { category: "Articles ménagers - Aménagement", name: "Pince à linge", qty: 24 },
  { category: "Articles ménagers - Aménagement", name: "Cintres", qty: 8 },
  // Articles ménagers - Entretien
  { category: "Articles ménagers - Entretien", name: "Balai vinyle", qty: 1 },
  { category: "Articles ménagers - Entretien", name: "Pelle balayette", qty: 1 },
  { category: "Articles ménagers - Entretien", name: "Brosse à vaisselle", qty: 1 },
  { category: "Articles ménagers - Entretien", name: "Cuvette ronde 32cm", qty: 1 },
  { category: "Articles ménagers - Entretien", name: "Ensemble seau espagnol", qty: 1 },
  { category: "Articles ménagers - Entretien", name: "Jerrican", qty: 1 },
  // Mobilier extérieur
  { category: "Mobilier extérieur", name: "Table rectangulaire 138x88 résine anthracite", qty: 1 },
  { category: "Mobilier extérieur", name: "Fauteuil haut dossier anthracite", qty: 5 },
  // Couchage
  { category: "Couchage", name: "Oreiller 60x60", qty: 5 },
  { category: "Couchage", name: "Housse protection oreiller", qty: 5 },
  { category: "Couchage", name: "Couette 1P 140x200 450g", qty: 3 },
  { category: "Couchage", name: "Couette 2P 240x220 450g", qty: 2 },
];

// ── Initial Data ──────────────────────────────────────────────────────────────
const INIT_COMPANIES = [
  { id: 1, name: "Oh! Campings", color: "#F5A623" },
];

const INIT_LODGING_MODELS = [
  {
    id: 1, companyId: 1, name: "Estival", description: "Logement estival standard",
    features: { sanitaire: false, eau: false, electricite: true },
    inventory: ESTIVAL_INVENTORY.map((item, i) => ({ id: i + 1, ...item }))
  },
];

const INIT_DESTINATIONS = [
  { id: 1, companyId: 1, name: "Camping Le Soleil", city: "Arcachon", address: "123 avenue de la plage", managerId: 1 },
  { id: 2, companyId: 1, name: "Camping Les Pins", city: "Hossegor", address: "45 rue des pins", managerId: 2 },
];

const INIT_LODGINGS = [
  { id: 1, companyId: 1, destinationId: 1, modelId: 1, name: "Estival A1", number: "A1" },
  { id: 2, companyId: 1, destinationId: 1, modelId: 1, name: "Estival A2", number: "A2" },
  { id: 3, companyId: 1, destinationId: 2, modelId: 1, name: "Estival B1", number: "B1" },
];

// Inventory items per lodging: { id, lodgingId, itemName, category, expectedQty, actualQty }
const buildLodgingInventory = (lodgings, models) => {
  const items = [];
  let nextId = 1;
  lodgings.forEach(l => {
    const model = models.find(m => m.id === l.modelId);
    if (!model) return;
    model.inventory.forEach(item => {
      items.push({ id: nextId++, lodgingId: l.id, companyId: l.companyId, itemName: item.name, category: item.category, expectedQty: item.qty, actualQty: item.qty });
    });
  });
  return items;
};

const INIT_INVENTORY_ITEMS = buildLodgingInventory(INIT_LODGINGS, INIT_LODGING_MODELS);

const INIT_REPAIRS = [];
const INIT_REPAIRERS = [
  { id: 1, companyId: 1, name: "Couturier Dupont", phone: "06 11 22 33 44", email: "dupont@couture.fr", address: "12 rue des artisans, Arcachon" },
];

const INIT_USERS = [
  { id: 1, companyId: 1, name: "Sophie Martin", email: "s.martin@ohcampings.fr", phone: "06 12 34 56 78", role: "Gérant", destinationId: null, seePrice: true, password: "1234" },
  { id: 2, companyId: 1, name: "Marc Dubois", email: "m.dubois@ohcampings.fr", phone: "06 98 76 54 32", role: "Gestionnaire", destinationId: null, seePrice: false, password: "1234" },
  { id: 3, companyId: 1, name: "Léa Bernard", email: "l.bernard@ohcampings.fr", phone: "07 11 22 33 44", role: "Invité", destinationId: 1, seePrice: false, password: "1234" },
];

// ── Icons ─────────────────────────────────────────────────────────────────────
const Ic = ({ d, size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const ic = {
  home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  dest: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 7a3 3 0 100 6 3 3 0 000-6z",
  lodge: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  model: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z M4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z M16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
  repair: "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 7a4 4 0 100 8 4 4 0 000-8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  plus: "M12 5v14 M5 12h14",
  edit: "M11 4H4a2 2 0 00-2 2v16a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  trash: "M3 6h18 M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6 M10 11v6 M14 11v6 M9 6V4h6v2",
  close: "M18 6L6 18 M6 6l12 12",
  menu: "M3 12h18 M3 6h18 M3 18h18",
  back: "M19 12H5 M12 19l-7-7 7-7",
  chart: "M18 20V10 M12 20V4 M6 20v-6",
  check: "M20 6L9 17l-5-5",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  eyeoff: "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94 M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19 M1 1l22 22",
  alert: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  phone: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  team: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75 M9 7a4 4 0 100 8 4 4 0 000-8z",
  journal: "M4 6h16 M4 10h16 M4 14h8 M4 18h4",
  box: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z",
  send: "M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z",
};

const useIsMobile = () => {
  const [m, setM] = useState(window.innerWidth < 769);
  useEffect(() => { const fn = () => setM(window.innerWidth < 769); window.addEventListener("resize", fn); return () => window.removeEventListener("resize", fn); }, []);
  return m;
};

// ── UI Components ─────────────────────────────────────────────────────────────
const Badge = ({ label, color = C.muted }) => (
  <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, background: color + "22", color, border: `1px solid ${color}44` }}>{label}</span>
);

const Modal = ({ title, onClose, children }) => (
  <div onClick={e => e.target === e.currentTarget && onClose()} style={{ position: "fixed", inset: 0, background: "#000000aa", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
    <div style={{ background: C.card, borderRadius: "20px 20px 0 0", padding: "20px 20px 40px", width: "100%", maxWidth: 580, maxHeight: "92vh", overflowY: "auto", border: `1px solid ${C.border}` }}>
      <div style={{ width: 40, height: 4, background: C.border, borderRadius: 99, margin: "0 auto 18px" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: C.text }}>{title}</h2>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }}><Ic d={ic.close} size={20} /></button>
      </div>
      {children}
    </div>
  </div>
);

const Field = ({ label, children, half, ...props }) => (
  <div style={{ marginBottom: 13, flex: half ? "1 1 45%" : "1 1 100%", minWidth: half ? 120 : undefined }}>
    <label style={{ display: "block", fontSize: 11, color: C.muted, marginBottom: 5, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>{label}</label>
    {props.as === "select"
      ? <select {...props} as={undefined} style={{ width: "100%", padding: "11px 12px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, color: C.text, fontSize: 15, outline: "none" }}>{children}</select>
      : props.as === "textarea"
      ? <textarea {...props} as={undefined} style={{ width: "100%", padding: "11px 12px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, color: C.text, fontSize: 14, outline: "none", boxSizing: "border-box", resize: "vertical", minHeight: 70 }} />
      : <input {...props} style={{ width: "100%", padding: "11px 12px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, color: C.text, fontSize: 15, outline: "none", boxSizing: "border-box" }} />
    }
  </div>
);

const Row2 = ({ children }) => <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>{children}</div>;

const Btn = ({ children, onClick, variant = "primary", full, small, disabled }) => {
  const s = {
    primary: { background: disabled ? C.border : C.teal, color: "#fff", border: "none" },
    danger: { background: C.red, color: "#fff", border: "none" },
    ghost: { background: "transparent", color: C.muted, border: `1px solid ${C.border}` },
    purple: { background: C.purple, color: "#fff", border: "none" },
    amber: { background: C.amber, color: "#fff", border: "none" },
    green: { background: C.green, color: "#fff", border: "none" },
  };
  return (
    <button onClick={disabled ? undefined : onClick} style={{ ...s[variant], padding: small ? "7px 14px" : "12px 20px", borderRadius: 10, cursor: disabled ? "not-allowed" : "pointer", fontWeight: 700, fontSize: small ? 12 : 14, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, width: full ? "100%" : undefined, opacity: disabled ? 0.6 : 1 }}>
      {children}
    </button>
  );
};

const Confirm = ({ msg, onOk, onCancel, okLabel = "Confirmer", okVariant = "danger" }) => (
  <div style={{ position: "fixed", inset: 0, background: "#000000bb", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 28, maxWidth: 320, width: "100%", textAlign: "center" }}>
      <p style={{ color: C.text, fontSize: 15, margin: "0 0 22px" }}>{msg}</p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <Btn variant="ghost" onClick={onCancel}>Annuler</Btn>
        <Btn variant={okVariant} onClick={onOk}>{okLabel}</Btn>
      </div>
    </div>
  </div>
);

const Toggle = ({ label, value, onChange }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
    <span style={{ fontSize: 14, color: C.text }}>{label}</span>
    <div onClick={onChange} style={{ width: 44, height: 24, borderRadius: 99, background: value ? C.teal : C.border, cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: value ? 23 : 3, transition: "left 0.2s" }} />
    </div>
  </div>
);

// ── Login ─────────────────────────────────────────────────────────────────────
const LoginScreen = ({ users, onLogin }) => {
  const [sel, setSel] = useState(users[0]?.id || "");
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const tryLogin = () => {
    const user = users.find(u => u.id === +sel);
    if (!user) return;
    if (user.password && user.password !== pwd) { setErr("Mot de passe incorrect"); return; }
    setErr(""); onLogin(user);
  };
  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: 36, width: "100%", maxWidth: 360, textAlign: "center", boxShadow: "0 4px 24px #F5A62322" }}>
        <div style={{ width: 70, height: 70, borderRadius: 18, background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <span style={{ fontSize: 36 }}>⛺</span>
        </div>
        <h1 style={{ margin: "0 0 2px", fontSize: 24, fontWeight: 800, color: C.text }}>Oh! Campings</h1>
        <p style={{ margin: "0 0 28px", color: C.muted, fontSize: 13 }}>Gestion des équipements</p>
        <div style={{ marginBottom: 14, textAlign: "left" }}>
          <label style={{ display: "block", fontSize: 11, color: C.muted, marginBottom: 5, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>Compte</label>
          <select value={sel} onChange={e => { setSel(+e.target.value); setErr(""); }} style={{ width: "100%", padding: "12px 14px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, color: C.text, fontSize: 15, outline: "none" }}>
            {users.map(u => <option key={u.id} value={u.id}>{u.name} — {u.role}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 20, textAlign: "left" }}>
          <label style={{ display: "block", fontSize: 11, color: C.muted, marginBottom: 5, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>Mot de passe</label>
          <div style={{ position: "relative" }}>
            <input type={show ? "text" : "password"} value={pwd} onChange={e => { setPwd(e.target.value); setErr(""); }} onKeyDown={e => e.key === "Enter" && tryLogin()} placeholder="••••••" style={{ width: "100%", padding: "12px 44px 12px 14px", background: C.surface, border: `1px solid ${err ? C.red : C.border}`, borderRadius: 10, color: C.text, fontSize: 15, outline: "none", boxSizing: "border-box" }} />
            <button onClick={() => setShow(!show)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.muted }}><Ic d={show ? ic.eyeoff : ic.eye} size={16} /></button>
          </div>
          {err && <p style={{ color: C.red, fontSize: 12, margin: "6px 0 0" }}>{err}</p>}
        </div>
        <Btn full onClick={tryLogin}>Se connecter</Btn>
        <p style={{ color: C.muted, fontSize: 11, marginTop: 16 }}>Mot de passe par défaut : 1234</p>
      </div>
    </div>
  );
};

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const isMobile = useIsMobile();
  const [currentUser, setCurrentUser] = useState(null);
  const [tab, setTab] = useState("dashboard");
  const [sideOpen, setSideOpen] = useState(false);
  const [users, setUsers] = useState(INIT_USERS);
  const [destinations, setDestinations] = useState(INIT_DESTINATIONS);
  const [lodgingModels, setLodgingModels] = useState(INIT_LODGING_MODELS);
  const [lodgings, setLodgings] = useState(INIT_LODGINGS);
  const [inventoryItems, setInventoryItems] = useState(INIT_INVENTORY_ITEMS);
  const [repairs, setRepairs] = useState(INIT_REPAIRS);
  const [repairers, setRepairers] = useState(INIT_REPAIRERS);
  const [notifications, setNotifications] = useState([]);
  const [journal, setJournal] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [confirm, setConfirm] = useState(null);
  const [showNotifs, setShowNotifs] = useState(false);
  const [selectedDest, setSelectedDest] = useState(null);
  const [selectedLodging, setSelectedLodging] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [expandedCats, setExpandedCats] = useState({});
  const [selectedRepairer, setSelectedRepairer] = useState(null);

  const isGerant = currentUser?.role === "Gérant";
  const isAdmin = currentUser?.role === "Gérant" || currentUser?.role === "Gestionnaire";
  const isInvite = currentUser?.role === "Invité";
  const cid = currentUser?.companyId;

  // Filtered by company
  const myDests = destinations.filter(d => d.companyId === cid);
  const myUsers = users.filter(u => u.companyId === cid);
  const myModels = lodgingModels.filter(m => m.companyId === cid);
  const myLodgings = lodgings.filter(l => l.companyId === cid);
  const myRepairs = repairs.filter(r => r.companyId === cid);
  const myRepairers = repairers.filter(r => r.companyId === cid);

  // Invité sees only their destination
  const visibleDests = isInvite && currentUser.destinationId
    ? myDests.filter(d => d.id === currentUser.destinationId)
    : myDests;

  const unreadNotifs = notifications.filter(n => !n.read && n.userId === currentUser?.id).length;
  const myNotifs = notifications.filter(n => n.userId === currentUser?.id);

  if (!currentUser) return <LoginScreen users={users} onLogin={u => setCurrentUser(u)} />;

  const ff = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const dest = id => destinations.find(d => d.id === +id);
  const usr = id => users.find(u => u.id === +id);
  const model = id => lodgingModels.find(m => m.id === +id);
  const goTo = t => { setTab(t); setSideOpen(false); setSelectedDest(null); setSelectedLodging(null); setSelectedModel(null); };
  const askConfirm = (msg, fn, okLabel = "Supprimer", okVariant = "danger") => setConfirm({ msg, onOk: () => { fn(); setConfirm(null); }, okLabel, okVariant });

  const addJournal = (action, detail) => setJournal(j => [{ id: Date.now(), date: new Date().toLocaleString("fr"), userId: currentUser.id, userName: currentUser.name, action, detail }, ...j]);
  const addNotif = (msg, targetIds) => {
    const ids = targetIds || myUsers.filter(u => u.role === "Gérant" || u.role === "Gestionnaire").map(u => u.id);
    ids.forEach(uid => setNotifications(n => [{ id: Date.now() + Math.random(), userId: uid, msg, date: new Date().toLocaleString("fr"), read: false }, ...n]));
  };

  // ── Lodging inventory helpers ───────────────────────────────────────────────
  const getLodgingItems = lodgingId => inventoryItems.filter(i => i.lodgingId === lodgingId);

  const getDestSummary = destId => {
    const destLodgings = myLodgings.filter(l => l.destinationId === destId);
    const summary = {};
    destLodgings.forEach(l => {
      getLodgingItems(l.id).forEach(item => {
        if (!summary[item.itemName]) summary[item.itemName] = { category: item.category, expected: 0, actual: 0 };
        summary[item.itemName].expected += item.expectedQty;
        summary[item.itemName].actual += item.actualQty;
      });
    });
    return summary;
  };

  const getMissingCount = destId => {
    const s = getDestSummary(destId);
    return Object.values(s).reduce((total, item) => total + Math.max(0, item.expected - item.actual), 0);
  };

  const getLodgingMissing = lodgingId => {
    return getLodgingItems(lodgingId).reduce((t, i) => t + Math.max(0, i.expectedQty - i.actualQty), 0);
  };

  // ── Lodging models CRUD ─────────────────────────────────────────────────────
  const openAddModel = () => { setForm({ name: "", description: "" }); setModal({ type: "model" }); };
  const openEditModel = m => { setSelectedModel(m); setTab("modelDetail"); };
  const saveModel = () => {
    if (!form.name) return;
    const newModel = { id: Date.now(), companyId: cid, name: form.name, description: form.description || "", features: { sanitaire: false, eau: false, electricite: false }, inventory: [] };
    setLodgingModels(ms => [...ms, newModel]);
    addJournal("Modèle créé", form.name);
    setModal(null);
  };
  const addModelItem = () => {
    if (!form.itemName || !form.itemQty || !selectedModel) return;
    const cat = form.showNewModelCat && form.newModelCatName ? form.newModelCatName : form.itemCat || "Divers";
    const newItem = { id: Date.now(), category: cat, name: form.itemName, qty: +form.itemQty };
    setLodgingModels(ms => ms.map(m => m.id === selectedModel.id ? { ...m, inventory: [...m.inventory, newItem] } : m));
    setSelectedModel(prev => ({ ...prev, inventory: [...prev.inventory, newItem] }));
    // Auto-add to all lodgings of this model with actualQty: 0
    const affectedLodgings = myLodgings.filter(l => l.modelId === selectedModel.id);
    const newInvItems = affectedLodgings.map((l, i) => ({
      id: Date.now() + i + 1, lodgingId: l.id, companyId: cid,
      itemName: form.itemName, category: cat,
      expectedQty: +form.itemQty, actualQty: 0
    }));
    if (newInvItems.length > 0) setInventoryItems(items => [...items, ...newInvItems]);
    setForm(f => ({ ...f, itemName: "", itemQty: 1, showNewModelCat: false, newModelCatName: "" }));
  };
  const updateModelItemQty = (modelId, itemId, qty) => {
    // Update model
    setLodgingModels(ms => ms.map(m => m.id === modelId ? { ...m, inventory: m.inventory.map(i => i.id === itemId ? { ...i, qty: +qty } : i) } : m));
    setSelectedModel(prev => prev ? { ...prev, inventory: prev.inventory.map(i => i.id === itemId ? { ...i, qty: +qty } : i) } : prev);
    // Update expectedQty in all lodgings of this model
    const itemName = selectedModel?.inventory.find(i => i.id === itemId)?.name;
    if (itemName) {
      setInventoryItems(items => items.map(i => {
        const lodging = myLodgings.find(l => l.id === i.lodgingId && l.modelId === modelId);
        return lodging && i.itemName === itemName ? { ...i, expectedQty: +qty } : i;
      }));
    }
  };
  const deleteModelItem = (modelId, itemId) => {
    setLodgingModels(ms => ms.map(m => m.id === modelId ? { ...m, inventory: m.inventory.filter(i => i.id !== itemId) } : m));
    setSelectedModel(prev => prev ? { ...prev, inventory: prev.inventory.filter(i => i.id !== itemId) } : prev);
  };

  // ── Destinations CRUD ───────────────────────────────────────────────────────
  const openAddDest = () => { setForm({ name: "", city: "", address: "", managerId: myUsers[0]?.id || "" }); setModal({ type: "dest" }); };
  const saveDest = () => {
    if (!form.name) return;
    const d = { ...form, id: modal.id || Date.now(), companyId: cid, managerId: +form.managerId || null };
    setDestinations(ds => modal.id ? ds.map(x => x.id === modal.id ? d : x) : [...ds, d]);
    addJournal(modal.id ? "Destination modifiée" : "Destination créée", form.name);
    setModal(null);
  };

  // ── Lodgings CRUD ───────────────────────────────────────────────────────────
  const openAddLodging = destId => {
    setForm({ name: "", number: "", modelId: myModels[0]?.id || "", destinationId: destId });
    setModal({ type: "lodging" });
  };
  const saveLodging = () => {
    if (!form.name) return;
    const m = model(form.modelId);
    const newLodging = { id: Date.now(), companyId: cid, destinationId: +form.destinationId, modelId: +form.modelId || null, name: form.name, number: form.number || "" };
    setLodgings(ls => [...ls, newLodging]);
    // Auto-create inventory from model
    if (m && m.inventory.length > 0) {
      const newItems = m.inventory.map((item, i) => ({
        id: Date.now() + i + 1,
        lodgingId: newLodging.id,
        companyId: cid,
        itemName: item.name,
        category: item.category,
        expectedQty: item.qty,
        actualQty: item.qty
      }));
      setInventoryItems(items => [...items, ...newItems]);
    }
    addJournal("Logement créé", `${form.name}${m ? ` (${m.name} — ${m.inventory.length} articles)` : ""}`);
    setModal(null);
  };

  // ── Add articles to lodging ─────────────────────────────────────────────────
  const getAllKnownArticles = () => {
    const all = {};
    // From all model inventories
    myModels.forEach(mod => mod.inventory.forEach(item => {
      if (!all[item.name]) all[item.name] = { id: `art_${item.name}`, name: item.name, category: item.category, defaultQty: item.qty };
    }));
    // From all existing lodging inventories
    inventoryItems.filter(i => i.companyId === cid).forEach(item => {
      if (!all[item.itemName]) all[item.itemName] = { id: `art_${item.itemName}`, name: item.itemName, category: item.category, defaultQty: item.expectedQty };
    });
    return all;
  };

  const openAddArticles = lodging => {
    const all = getAllKnownArticles();
    const existing = getLodgingItems(lodging.id).map(i => i.itemName);
    const checked = {};
    const qtys = {};
    const m = model(lodging.modelId);
    // Pre-select all model articles not already in lodging
    Object.values(all).forEach(a => {
      const inModel = m ? m.inventory.some(i => i.name === a.name) : false;
      const alreadyHere = existing.includes(a.name);
      checked[a.id] = (inModel && !alreadyHere) ? true : false;
      // Use model quantity if available
      const modelItem = m ? m.inventory.find(i => i.name === a.name) : null;
      qtys[a.id] = modelItem ? modelItem.qty : a.defaultQty;
    });
    setForm({
      lodgingId: lodging.id,
      lodgingName: lodging.name,
      allArticles: all,
      checked,
      qtys,
      extraItems: [],
      newItemName: "",
      newItemCat: "",
      newItemQty: 1,
      showNewCat: false,
      newCatName: ""
    });
    setModal({ type: "addArticles" });
  };

  const saveAddArticles = () => {
    const checked = form.checked || {};
    const qtys = form.qtys || {};
    const all = form.allArticles || {};
    // Get all checked articles
    const selectedArticles = Object.values(all).filter(a => checked[a.id] === true);
    const newItems = selectedArticles.map((a, i) => ({
      id: Date.now() + i + 1,
      lodgingId: +form.lodgingId,
      companyId: cid,
      itemName: a.name,
      category: a.category,
      expectedQty: +(qtys[a.id] || a.defaultQty || 1),
      actualQty: +(qtys[a.id] || a.defaultQty || 1)
    }));
    // New articles created on the fly (via addArticleToForm)
    const extraItems = (form.extraItems || []).map((item, i) => ({
      id: Date.now() + 2000 + i,
      lodgingId: +form.lodgingId,
      companyId: cid,
      itemName: item.name,
      category: item.category,
      expectedQty: item.qty,
      actualQty: item.qty
    }));
    const allNew = [...newItems, ...extraItems];
    if (allNew.length === 0) { alert("Aucun article sélectionné !"); return; }
    setInventoryItems(items => [...items, ...allNew]);
    addJournal("Inventaire mis à jour", `${form.lodgingName} — ${allNew.length} article(s) ajouté(s)`);
    setModal(null);
  };

  const addArticleToForm = () => {
    if (!form.newItemName) return;
    const cat = form.showNewCat && form.newCatName ? form.newCatName : form.newItemCat || "Divers";
    const newItem = { id: `new_${Date.now()}`, name: form.newItemName, category: cat, defaultQty: +form.newItemQty || 1 };
    // Add to allArticles so it appears in the list checked
    const newAll = { ...form.allArticles, [newItem.name]: newItem };
    const newChecked = { ...form.checked, [newItem.id]: true };
    const newQtys = { ...form.qtys, [newItem.id]: newItem.defaultQty };
    setForm(f => ({ ...f, allArticles: newAll, checked: newChecked, qtys: newQtys, newItemName: "", newItemQty: 1, showNewCat: false, newCatName: "" }));
  };

  const lodgingModalAddItem = () => {}; // kept for compatibility

  // ── Inventory item update ───────────────────────────────────────────────────
  const updateActualQty = (itemId, qty) => {
    setInventoryItems(items => items.map(i => i.id === itemId ? { ...i, actualQty: Math.max(0, +qty) } : i));
  };

  // ── Repairs ─────────────────────────────────────────────────────────────────
  const openRepair = (item, lodging) => {
    setForm({ itemId: item.id, itemName: item.itemName, lodgingId: lodging.id, lodgingName: lodging.name, destId: lodging.destinationId, qty: 1, repairerId: myRepairers[0]?.id || "", note: "" });
    setModal({ type: "repair" });
  };
  const saveRepair = () => {
    if (!form.repairerId || !form.qty) return;
    const qty = +form.qty;
    const repairer = myRepairers.find(r => r.id === +form.repairerId);
    setInventoryItems(items => items.map(i => i.id === +form.itemId ? { ...i, actualQty: Math.max(0, i.actualQty - qty) } : i));
    const r = { id: Date.now(), companyId: cid, itemId: +form.itemId, itemName: form.itemName, lodgingId: +form.lodgingId, lodgingName: form.lodgingName, destId: +form.destId, qty, repairerId: +form.repairerId, repairer: repairer?.name || "", note: form.note || "", status: "En réparation", dateOut: new Date().toISOString().slice(0, 10), dateBack: null, returnedTo: null };
    setRepairs(rs => [r, ...rs]);
    addJournal("Envoi en réparation", `${qty} × ${form.itemName} → ${repairer?.name}`);
    addNotif(`🔧 ${qty} × ${form.itemName} envoyé en réparation chez ${repairer?.name} (depuis ${form.lodgingName})`);
    setModal(null);
  };

  const openReturnRepair = r => { setForm({ repairId: r.id, returnTo: r.lodgingId, status: "Réparé", note: "" }); setModal({ type: "returnRepair", repair: r }); };
  const saveReturnRepair = () => {
    const r = repairs.find(x => x.id === +form.repairId);
    if (!r) return;
    const newStatus = form.status;
    if (newStatus === "Réparé" && form.returnTo) {
      setInventoryItems(items => items.map(i => i.lodgingId === +form.returnTo && i.itemName === r.itemName ? { ...i, actualQty: i.actualQty + r.qty } : i));
    }
    setRepairs(rs => rs.map(x => x.id === r.id ? { ...x, status: newStatus, dateBack: new Date().toISOString().slice(0, 10), returnedTo: +form.returnTo || null, returnNote: form.note } : x));
    addJournal(`Réparation ${newStatus.toLowerCase()}`, `${r.qty} × ${r.itemName}`);
    if (newStatus === "Hors service") addNotif(`💀 ${r.qty} × ${r.itemName} déclaré hors service — à remplacer`);
    setModal(null);
  };

  // ── Repairers CRUD ──────────────────────────────────────────────────────────
  const openAddRepairer = () => { setForm({ name: "", phone: "", email: "", address: "" }); setModal({ type: "repairer" }); };
  const openEditRepairer = r => { setForm({ ...r }); setModal({ type: "repairer", id: r.id }); };
  const saveRepairer = () => {
    if (!form.name) return;
    const d = { ...form, id: modal.id || Date.now(), companyId: cid };
    setRepairers(rs => modal.id ? rs.map(r => r.id === modal.id ? d : r) : [...rs, d]);
    addJournal(modal.id ? "Réparateur modifié" : "Réparateur créé", form.name);
    setModal(null);
  };

  // ── Users CRUD ──────────────────────────────────────────────────────────────
  const openAddUser = () => { setForm({ name: "", email: "", phone: "", role: "Invité", destinationId: "", seePrice: false, password: "1234" }); setModal({ type: "user" }); };
  const openEditUser = u => { setForm({ ...u }); setModal({ type: "user", id: u.id }); };
  const saveUser = () => {
    if (!form.name) return;
    const d = { ...form, id: modal.id || Date.now(), companyId: cid, seePrice: !!(form.seePrice === true || form.seePrice === "true"), destinationId: form.destinationId ? +form.destinationId : null };
    setUsers(us => modal.id ? us.map(u => u.id === modal.id ? d : u) : [...us, d]);
    if (modal.id && currentUser.id === modal.id) setCurrentUser(d);
    addJournal(modal.id ? "Utilisateur modifié" : "Utilisateur créé", form.name);
    setModal(null);
  };

  // ── Nav ─────────────────────────────────────────────────────────────────────
  const activeRepairs = myRepairs.filter(r => r.status === "En réparation").length;
  const navItems = [
    { id: "dashboard", label: "Accueil", icon: ic.home },
    { id: "destinations", label: "Destinations", icon: ic.dest },
    { id: "repairs", label: "Réparations", icon: ic.repair, badge: activeRepairs, hi: activeRepairs > 0 },
    { id: "team", label: "Équipe", icon: ic.team },
    ...(isAdmin ? [{ id: "models", label: "Logements", icon: ic.model }] : []),
    ...(isGerant ? [{ id: "users", label: "Utilisateurs", icon: ic.users }] : []),
    ...(isAdmin ? [{ id: "journal", label: "Journal", icon: ic.journal }] : []),
  ];

  const sidebarStyle = {
    width: 230, background: C.surface, borderRight: `1px solid ${C.border}`,
    display: "flex", flexDirection: "column", padding: "24px 0",
    position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 160,
    transition: "transform 0.25s ease",
    transform: isMobile ? (sideOpen ? "translateX(0)" : "translateX(-100%)") : "translateX(0)",
  };

  const repairStatusColor = s => ({ "En réparation": C.amber, "Réparé": C.green, "Hors service": C.red }[s] || C.muted);

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", background: C.bg, color: C.text }}>
      {isMobile && sideOpen && <div onClick={() => setSideOpen(false)} style={{ position: "fixed", inset: 0, background: "#00000077", zIndex: 150 }} />}

      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={{ padding: "0 20px 24px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>⛺</div>
          <div><div style={{ fontSize: 14, fontWeight: 800, color: C.text }}>Oh! Campings</div><div style={{ fontSize: 10, color: C.muted, letterSpacing: 0.5 }}>GESTION ÉQUIPEMENTS</div></div>
        </div>
        <nav style={{ flex: 1, overflowY: "auto" }}>
          {navItems.map(item => {
            const active = tab === item.id || (item.id === "models" && tab === "modelDetail");
            return (
              <button key={item.id} onClick={() => goTo(item.id)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 20px", border: "none", cursor: "pointer", background: active ? C.tealDim : "transparent", color: active ? C.teal : item.hi ? C.red : C.muted, fontWeight: active ? 700 : 500, fontSize: 14, borderLeft: active ? `3px solid ${C.teal}` : "3px solid transparent" }}>
                <Ic d={item.icon} size={16} color={active ? C.teal : item.hi ? C.red : C.muted} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge > 0 && <span style={{ background: C.red, color: "#fff", borderRadius: 99, fontSize: 10, fontWeight: 800, padding: "1px 7px" }}>{item.badge}</span>}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: "14px 20px", borderTop: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.tealDim, border: `2px solid ${C.teal}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: C.teal, fontSize: 14 }}>{currentUser.name[0]}</div>
            <div><div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{currentUser.name}</div><Badge label={currentUser.role} color={ROLE_COLORS[currentUser.role]} /></div>
          </div>
          {isInvite && currentUser.destinationId && <div style={{ background: C.tealDim, border: `1px solid ${C.teal}33`, borderRadius: 8, padding: "6px 10px", fontSize: 12, color: C.teal, marginBottom: 8 }}>📍 {dest(currentUser.destinationId)?.name}</div>}
          <button onClick={() => { setCurrentUser(null); setTab("dashboard"); }} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", color: C.muted, padding: "6px 12px", fontSize: 12, width: "100%" }}>Se déconnecter</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", marginLeft: isMobile ? 0 : 230, minHeight: "100vh" }}>

        {/* Topbar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: C.surface, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 100 }}>
          {isMobile
            ? <button onClick={() => setSideOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: C.text, padding: 4 }}><Ic d={ic.menu} size={22} /></button>
            : <div style={{ fontWeight: 700, fontSize: 16, color: C.text }}>{navItems.find(n => n.id === tab)?.label || "Oh! Campings"}</div>}
          {isMobile && <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 20 }}>⛺</span><span style={{ fontWeight: 800, fontSize: 16, color: C.text }}>Oh! Campings</span></div>}
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowNotifs(!showNotifs)} style={{ background: "none", border: "none", cursor: "pointer", color: unreadNotifs > 0 ? C.red : C.muted, padding: 4, position: "relative" }}>
              <Ic d={ic.bell} size={22} />
              {unreadNotifs > 0 && <div style={{ position: "absolute", top: 0, right: 0, width: 16, height: 16, borderRadius: "50%", background: C.red, fontSize: 10, fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>{unreadNotifs}</div>}
            </button>
            {showNotifs && (
              <div style={{ position: "absolute", right: 0, top: 40, width: 300, background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, zIndex: 200, maxHeight: 380, overflowY: "auto", boxShadow: "0 8px 32px #00000022" }}>
                <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>Notifications</span>
                  <button onClick={() => setNotifications(n => n.map(x => x.userId === currentUser.id ? { ...x, read: true } : x))} style={{ background: "none", border: "none", cursor: "pointer", color: C.teal, fontSize: 12 }}>Tout lire</button>
                </div>
                {myNotifs.length === 0 && <div style={{ padding: 20, textAlign: "center", color: C.muted, fontSize: 13 }}>Aucune notification</div>}
                {myNotifs.map(n => (
                  <div key={n.id} style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}`, background: n.read ? "transparent" : C.tealDim, display: "flex", gap: 8 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: C.text }}>{n.msg}</div>
                      <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{n.date}</div>
                    </div>
                    <button onClick={e => { e.stopPropagation(); setNotifications(ns => ns.filter(x => x.id !== n.id)); }} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 18, padding: "0 4px", flexShrink: 0 }}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <main style={{ flex: 1, padding: isMobile ? "16px 14px 100px" : "24px 28px", maxWidth: 960, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>

          {/* ── DASHBOARD ── */}
          {tab === "dashboard" && (
            <div>
              <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800 }}>Bonjour, {currentUser.name.split(" ")[0]} 👋</h1>
              <p style={{ margin: "0 0 20px", color: C.muted, fontSize: 13 }}>{isInvite && currentUser.destinationId ? `Destination : ${dest(currentUser.destinationId)?.name}` : "Vue d'ensemble"}</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
                {[
                  { label: "Destinations →", value: visibleDests.length, color: C.teal, tab: "destinations" },
                  { label: "Logements", value: myLodgings.filter(l => visibleDests.some(d => d.id === l.destinationId)).length, color: C.purple },
                  { label: "En réparation", value: activeRepairs, color: activeRepairs > 0 ? C.red : C.muted, tab: "repairs" },
                  { label: "Hors service", value: myRepairs.filter(r => r.status === "Hors service").length, color: C.red },
                ].map((s, i) => (
                  <div key={i} onClick={s.tab ? () => goTo(s.tab) : undefined} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", flex: "1 1 40%", minWidth: 130, cursor: s.tab ? "pointer" : "default", boxShadow: "0 2px 8px #00000008" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {activeRepairs > 0 && (
                <div style={{ background: C.amber + "15", border: `1px solid ${C.amber}44`, borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, color: C.amber, marginBottom: 8 }}>🔧 Articles en réparation</div>
                  {myRepairs.filter(r => r.status === "En réparation").slice(0, 3).map(r => (
                    <div key={r.id} style={{ fontSize: 13, padding: "4px 0", borderBottom: `1px solid ${C.amber}22`, display: "flex", justifyContent: "space-between" }}>
                      <span>{r.qty} × {r.itemName}</span><span style={{ color: C.amber }}>{r.repairer}</span>
                    </div>
                  ))}
                </div>
              )}

              <h2 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 12px" }}>Mes destinations</h2>
              {visibleDests.map(d => {
                const dLodgings = myLodgings.filter(l => l.destinationId === d.id);
                const missing = getMissingCount(d.id);
                return (
                  <div key={d.id} onClick={() => { setSelectedDest(d); goTo("destinations"); }} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, marginBottom: 10, cursor: "pointer", boxShadow: "0 2px 8px #00000008" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div><div style={{ fontWeight: 700, fontSize: 16 }}>⛺ {d.name}</div><div style={{ fontSize: 12, color: C.muted }}>📍 {d.city} · {dLodgings.length} logement(s)</div></div>
                      {missing > 0 && <Badge label={`-${missing} manquants`} color={C.red} />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── DESTINATIONS ── */}
          {tab === "destinations" && !selectedDest && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div><h1 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Destinations</h1><p style={{ margin: "3px 0 0", color: C.muted, fontSize: 13 }}>{visibleDests.length} destination(s)</p></div>
                {isAdmin && <Btn onClick={openAddDest}><Ic d={ic.plus} size={14} /> Ajouter</Btn>}
              </div>
              {visibleDests.map(d => {
                const dLodgings = myLodgings.filter(l => l.destinationId === d.id);
                const missing = getMissingCount(d.id);
                const summary = getDestSummary(d.id);
                const missingItems = Object.entries(summary).filter(([, v]) => v.actual < v.expected);
                return (
                  <div key={d.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18, marginBottom: 14, boxShadow: "0 2px 8px #00000008" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, cursor: "pointer" }} onClick={() => setSelectedDest(d)}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 18 }}>⛺ {d.name} <span style={{ fontSize: 12, color: C.muted, fontWeight: 400 }}>→ voir</span></div>
                        <div style={{ fontSize: 13, color: C.muted }}>📍 {d.city}{d.address ? ` — ${d.address}` : ""}</div>
                        <div style={{ fontSize: 13, color: C.muted }}>Gérant : {usr(d.managerId)?.name || "Non assigné"}</div>
                      </div>
                      {isAdmin && <div style={{ display: "flex", gap: 6 }} onClick={e => e.stopPropagation()}>
                        <button onClick={() => { setForm({ ...d }); setModal({ type: "dest", id: d.id }); }} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", color: C.muted, padding: "6px 9px" }}><Ic d={ic.edit} size={14} /></button>
                        <button onClick={() => askConfirm("Supprimer cette destination ?", () => setDestinations(ds => ds.filter(x => x.id !== d.id)))} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", color: C.red, padding: "6px 9px" }}><Ic d={ic.trash} size={14} /></button>
                      </div>}
                    </div>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
                      <div style={{ flex: 1, minWidth: 80, background: C.surface, borderRadius: 10, padding: "10px 14px" }}><div style={{ fontSize: 22, fontWeight: 800, color: C.teal }}>{dLodgings.length}</div><div style={{ fontSize: 11, color: C.muted }}>logements</div></div>
                      <div style={{ flex: 1, minWidth: 80, background: C.surface, borderRadius: 10, padding: "10px 14px" }}><div style={{ fontSize: 22, fontWeight: 800, color: missing > 0 ? C.red : C.green }}>{missing}</div><div style={{ fontSize: 11, color: C.muted }}>articles manquants</div></div>
                      <div style={{ flex: 1, minWidth: 80, background: C.surface, borderRadius: 10, padding: "10px 14px" }}><div style={{ fontSize: 22, fontWeight: 800, color: C.amber }}>{myRepairs.filter(r => r.destId === d.id && r.status === "En réparation").length}</div><div style={{ fontSize: 11, color: C.muted }}>en réparation</div></div>
                    </div>
                    {missingItems.length > 0 && (
                      <div style={{ background: C.red + "10", border: `1px solid ${C.red}33`, borderRadius: 10, padding: "10px 14px" }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: C.red, marginBottom: 6 }}>Articles manquants sur la destination :</div>
                        {missingItems.slice(0, 5).map(([name, v]) => (
                          <div key={name} style={{ fontSize: 13, display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: `1px solid ${C.red}22` }}>
                            <span>{name}</span>
                            <span style={{ color: C.red, fontWeight: 700 }}>{v.actual}/{v.expected} <span style={{ color: C.red }}>(-{v.expected - v.actual})</span></span>
                          </div>
                        ))}
                        {missingItems.length > 5 && <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>+ {missingItems.length - 5} autres…</div>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ── DESTINATION DETAIL ── */}
          {tab === "destinations" && selectedDest && !selectedLodging && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <button onClick={() => setSelectedDest(null)} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", color: C.muted, padding: "8px 10px", display: "flex" }}><Ic d={ic.back} size={16} /></button>
                <div style={{ flex: 1 }}>
                  <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>⛺ {selectedDest.name}</h1>
                  <p style={{ margin: 0, color: C.muted, fontSize: 13 }}>📍 {selectedDest.city}</p>
                </div>
                <Btn small onClick={() => openAddLodging(selectedDest.id)}><Ic d={ic.plus} size={13} /> Logement</Btn>
              </div>

              {/* Destination summary */}
              {(() => {
                const summary = getDestSummary(selectedDest.id);
                const missing = Object.entries(summary).filter(([, v]) => v.actual < v.expected);
                if (missing.length === 0) return null;
                return (
                  <div style={{ background: C.red + "10", border: `1px solid ${C.red}33`, borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
                    <div style={{ fontWeight: 700, color: C.red, marginBottom: 8 }}>📊 Récapitulatif manquants — {selectedDest.name}</div>
                    {missing.map(([name, v]) => (
                      <div key={name} style={{ fontSize: 13, display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: `1px solid ${C.red}22` }}>
                        <span>{name}</span>
                        <span style={{ color: C.red, fontWeight: 700 }}>{v.actual}/{v.expected} (-{v.expected - v.actual})</span>
                      </div>
                    ))}
                  </div>
                );
              })()}

              {/* Lodgings list */}
              {myLodgings.filter(l => l.destinationId === selectedDest.id).map(l => {
                const missing = getLodgingMissing(l.id);
                const m = model(l.modelId);
                return (
                  <div key={l.id} onClick={() => setSelectedLodging(l)} style={{ background: C.card, border: `1px solid ${missing > 0 ? C.red + "55" : C.border}`, borderRadius: 14, padding: 16, marginBottom: 10, cursor: "pointer", boxShadow: "0 2px 8px #00000008" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>🏠 {l.name}</div>
                        <div style={{ fontSize: 12, color: C.muted }}>{m?.name || "—"} · voir inventaire →</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        {missing > 0
                          ? <Badge label={`-${missing} manquants`} color={C.red} />
                          : <Badge label="✅ Complet" color={C.green} />}
                      </div>
                    </div>
                  </div>
                );
              })}
              {myLodgings.filter(l => l.destinationId === selectedDest.id).length === 0 && (
                <div style={{ textAlign: "center", color: C.muted, padding: 40 }}>Aucun logement. Ajoutez-en un !</div>
              )}
            </div>
          )}

          {/* ── LODGING DETAIL ── */}
          {tab === "destinations" && selectedDest && selectedLodging && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <button onClick={() => setSelectedLodging(null)} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", color: C.muted, padding: "8px 10px", display: "flex" }}><Ic d={ic.back} size={16} /></button>
                <div style={{ flex: 1 }}>
                  <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>🏠 {selectedLodging.name}</h1>
                  <p style={{ margin: 0, color: C.muted, fontSize: 13 }}>{selectedDest.name} · {model(selectedLodging.modelId)?.name}</p>
                </div>
              </div>

              {/* Group items by category */}
              {getLodgingItems(selectedLodging.id).length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px", background: C.card, borderRadius: 14, border: `2px dashed ${C.teal}55` }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>📦</div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Inventaire vide</div>
                  <div style={{ color: C.muted, fontSize: 14, marginBottom: 20 }}>Cliquez sur le bouton ci-dessous pour ajouter les articles depuis la liste des articles existants.</div>
                  <Btn onClick={() => openAddArticles(selectedLodging)}><Ic d={ic.plus} size={14} /> Ajouter des articles</Btn>
                </div>
              ) : (
              <>{(() => {
                const items = getLodgingItems(selectedLodging.id);
                const cats = [...new Set(items.map(i => i.category))];
                return cats.map(cat => {
                  const catItems = items.filter(i => i.category === cat);
                  const expanded = expandedCats[cat] !== false;
                  const catMissing = catItems.reduce((t, i) => t + Math.max(0, i.expectedQty - i.actualQty), 0);
                  return (
                    <div key={cat} style={{ marginBottom: 10 }}>
                      <button onClick={() => setExpandedCats(e => ({ ...e, [cat]: !expanded }))} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: expanded ? "10px 10px 0 0" : 10, cursor: "pointer", color: C.text, fontWeight: 700, fontSize: 14 }}>
                        <span>{cat} {catMissing > 0 && <span style={{ color: C.red, fontWeight: 800 }}>(-{catMissing})</span>}</span>
                        <span style={{ color: C.muted, transform: expanded ? "rotate(0)" : "rotate(-90deg)", transition: "transform .2s" }}>▾</span>
                      </button>
                      {expanded && (
                        <div style={{ border: `1px solid ${C.border}`, borderTop: "none", borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
                          {catItems.map(item => {
                            const missing = Math.max(0, item.expectedQty - item.actualQty);
                            return (
                              <div key={item.id} style={{ padding: "12px 14px", borderBottom: `1px solid ${C.border}`, background: missing > 0 ? C.red + "08" : C.card }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                  <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 600 }}>{item.itemName}</div>
                                    {missing > 0 && <div style={{ fontSize: 12, color: C.red, fontWeight: 700 }}>⚠️ Manque {missing} / {item.expectedQty} attendus</div>}
                                  </div>
                                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <button onClick={() => updateActualQty(item.id, item.actualQty - 1)} style={{ width: 28, height: 28, borderRadius: 6, background: C.red + "22", border: `1px solid ${C.red}44`, cursor: "pointer", color: C.red, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                                    <input type="number" min="0" value={item.actualQty} onChange={e => updateActualQty(item.id, e.target.value)} style={{ width: 48, padding: "5px 4px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, fontSize: 14, fontWeight: 700, outline: "none", textAlign: "center" }} />
                                    <button onClick={() => updateActualQty(item.id, item.actualQty + 1)} style={{ width: 28, height: 28, borderRadius: 6, background: C.tealDim, border: `1px solid ${C.teal}44`, cursor: "pointer", color: C.teal, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                                    <span style={{ fontSize: 12, color: C.muted, minWidth: 40 }}>/ {item.expectedQty}</span>
                                  </div>
                                  <button onClick={() => openRepair(item, selectedLodging)} style={{ background: C.amber + "22", border: `1px solid ${C.amber}44`, borderRadius: 8, cursor: "pointer", color: C.amber, padding: "6px 10px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>🔧 Rép.</button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                });
              })()}</>
              )}
            </div>
          )}

          {/* ── MODELS ── */}
          {tab === "models" && isAdmin && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div><h1 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Types de logement</h1><p style={{ margin: "3px 0 0", color: C.muted, fontSize: 13 }}>{myModels.length} type(s)</p></div>
                <Btn onClick={openAddModel}><Ic d={ic.plus} size={14} /> Nouveau</Btn>
              </div>
              {myModels.map(m => (
                <div key={m.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18, marginBottom: 12, boxShadow: "0 2px 8px #00000008" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 16 }}>🏠 {m.name}</div>
                      {m.description && <div style={{ fontSize: 13, color: C.muted }}>{m.description}</div>}
                      <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{m.inventory.length} article(s) dans l'inventaire type</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Btn small onClick={() => openEditModel(m)}>Modifier</Btn>
                      <button onClick={() => askConfirm(`Supprimer le modèle "${m.name}" ?`, () => setLodgingModels(ms => ms.filter(x => x.id !== m.id)))} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", color: C.red, padding: "6px 9px" }}><Ic d={ic.trash} size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── MODEL DETAIL ── */}
          {tab === "modelDetail" && selectedModel && isAdmin && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <button onClick={() => goTo("models")} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", color: C.muted, padding: "8px 10px", display: "flex" }}><Ic d={ic.back} size={16} /></button>
                <div><h1 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>🏠 {selectedModel.name}</h1><p style={{ margin: 0, color: C.muted, fontSize: 13 }}>Inventaire type · {selectedModel.inventory.length} articles</p></div>
              </div>

              {/* Add item */}
              {isGerant && (
                <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>Ajouter des articles existants</div>
                  <p style={{ fontSize: 13, color: C.muted, margin: "0 0 12px" }}>Cochez les articles à ajouter à ce type de logement.</p>

                  {/* Liste des articles existants connus */}
                  {(() => {
                    const all = getAllKnownArticles();
                    const allList = Object.values(all);
                    const alreadyIn = selectedModel.inventory.map(i => i.name);
                    const available = allList.filter(a => !alreadyIn.includes(a.name));
                    const cats = [...new Set(available.map(a => a.category))];
                    if (available.length === 0) return (
                      <p style={{ fontSize: 13, color: C.muted, fontStyle: "italic" }}>Tous les articles connus sont déjà dans ce modèle.</p>
                    );
                    return (
                      <>
                        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                          <button onClick={() => setForm(f => { const c = {}; available.forEach(a => { c[a.id] = true; }); return { ...f, modelPickChecked: c }; })} style={{ background: C.tealDim, border: `1px solid ${C.teal}44`, borderRadius: 8, cursor: "pointer", color: C.teal, padding: "5px 12px", fontSize: 12, fontWeight: 700 }}>✓ Tout cocher</button>
                          <button onClick={() => setForm(f => ({ ...f, modelPickChecked: {} }))} style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", color: C.muted, padding: "5px 12px", fontSize: 12 }}>✗ Tout décocher</button>
                        </div>
                        {cats.map(cat => (
                          <div key={cat} style={{ marginBottom: 8 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: C.purple, padding: "4px 0", borderBottom: `1px solid ${C.purple}33`, marginBottom: 4 }}>{cat}</div>
                            {available.filter(a => a.category === cat).map(art => {
                              const isChecked = !!(form.modelPickChecked?.[art.id]);
                              const qty = form.modelPickQtys?.[art.id] ?? art.defaultQty;
                              return (
                                <div key={art.id}
                                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 4px", borderBottom: `1px solid ${C.border}`, background: isChecked ? C.tealDim : "transparent" }}>
                                  <div onClick={() => setForm(f => ({ ...f, modelPickChecked: { ...f.modelPickChecked, [art.id]: !isChecked } }))}
                                    style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${isChecked ? C.teal : C.border}`, background: isChecked ? C.teal : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer" }}>
                                    {isChecked && <span style={{ color: "#fff", fontSize: 12, fontWeight: 800 }}>✓</span>}
                                  </div>
                                  <span style={{ flex: 1, fontSize: 13, color: isChecked ? C.text : C.muted }}>{art.name}</span>
                                  <input type="number" min="1" value={qty} onChange={e => setForm(f => ({ ...f, modelPickQtys: { ...f.modelPickQtys, [art.id]: +e.target.value } }))}
                                    style={{ width: 48, padding: "4px 4px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, color: C.text, fontSize: 13, fontWeight: 700, outline: "none", textAlign: "center" }} />
                                </div>
                              );
                            })}
                          </div>
                        ))}
                        {Object.values(form.modelPickChecked || {}).some(Boolean) && (
                          <Btn small onClick={() => {
                            const all2 = getAllKnownArticles();
                            const toAdd = Object.entries(form.modelPickChecked || {}).filter(([, v]) => v).map(([id]) => Object.values(all2).find(a => a.id === id)).filter(Boolean);
                            const affectedLodgings = myLodgings.filter(l => l.modelId === selectedModel.id);
                            toAdd.forEach(art => {
                              const qty = form.modelPickQtys?.[art.id] ?? art.defaultQty;
                              const newItem = { id: Date.now() + Math.random(), category: art.category, name: art.name, qty };
                              setLodgingModels(ms => ms.map(m => m.id === selectedModel.id ? { ...m, inventory: [...m.inventory, newItem] } : m));
                              setSelectedModel(prev => ({ ...prev, inventory: [...prev.inventory, newItem] }));
                              // Add to all lodgings of this model with actualQty: 0
                              const newInvItems = affectedLodgings.map((l, i) => ({
                                id: Date.now() + Math.random() + i, lodgingId: l.id, companyId: cid,
                                itemName: art.name, category: art.category,
                                expectedQty: qty, actualQty: 0
                              }));
                              if (newInvItems.length > 0) setInventoryItems(items => [...items, ...newInvItems]);
                            });
                            setForm(f => ({ ...f, modelPickChecked: {}, modelPickQtys: {} }));
                          }} style={{ marginTop: 10 }}>✓ Ajouter la sélection</Btn>
                        )}
                      </>
                    );
                  })()}

                  {/* Séparateur */}
                  <div style={{ borderTop: `1px solid ${C.border}`, margin: "16px 0" }} />

                  {/* Créer un nouvel article */}
                  <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 14 }}>➕ Créer un nouvel article</div>
                  <div style={{ marginBottom: 10 }}>
                    <label style={{ display: "block", fontSize: 11, color: C.muted, marginBottom: 5, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>Catégorie</label>
                    {!form.showNewModelCat ? (
                      <div style={{ display: "flex", gap: 6 }}>
                        <select value={form.itemCat || ""} onChange={ff("itemCat")} style={{ flex: 1, padding: "9px 10px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, fontSize: 13, outline: "none" }}>
                          <option value="">— Choisir —</option>
                          {[...new Set([...selectedModel.inventory.map(i => i.category), ...Object.values(getAllKnownArticles()).map(a => a.category)])].filter(Boolean).map(c => <option key={c}>{c}</option>)}
                        </select>
                        <button onClick={() => setForm(f => ({ ...f, showNewModelCat: true }))} style={{ background: C.tealDim, border: `1px solid ${C.teal}44`, borderRadius: 8, cursor: "pointer", color: C.teal, padding: "0 10px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>+ Nouvelle</button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: 6 }}>
                        <input value={form.newModelCatName || ""} onChange={ff("newModelCatName")} placeholder="Nom de la nouvelle catégorie" style={{ flex: 1, padding: "9px 10px", background: C.card, border: `1px solid ${C.teal}`, borderRadius: 8, color: C.text, fontSize: 13, outline: "none" }} />
                        <button onClick={() => setForm(f => ({ ...f, showNewModelCat: false, newModelCatName: "" }))} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", color: C.muted, padding: "0 10px" }}>✕</button>
                      </div>
                    )}
                  </div>
                  <Row2>
                    <Field label="Nom de l'article" half value={form.itemName || ""} onChange={ff("itemName")} placeholder="Ex: Assiette plate 26cm" />
                    <Field label="Quantité" half type="number" value={form.itemQty || ""} onChange={ff("itemQty")} placeholder="1" />
                  </Row2>
                  <Btn small onClick={addModelItem}><Ic d={ic.plus} size={13} /> Créer et ajouter</Btn>
                </div>
              )}

              {/* Items grouped by category */}
              {(() => {
                const cats = [...new Set(selectedModel.inventory.map(i => i.category))];
                return cats.map(cat => {
                  const catItems = selectedModel.inventory.filter(i => i.category === cat);
                  return (
                    <div key={cat} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: C.purple, padding: "8px 0 4px", borderBottom: `2px solid ${C.purple}44`, marginBottom: 8 }}>{cat}</div>
                      {catItems.map(item => (
                        <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                          <div style={{ flex: 1, fontSize: 14 }}>{item.name}</div>
                          {isGerant ? (
                            <input type="number" min="0" value={item.qty} onChange={e => updateModelItemQty(selectedModel.id, item.id, e.target.value)} style={{ width: 60, padding: "6px 8px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, fontSize: 14, fontWeight: 700, outline: "none", textAlign: "center" }} />
                          ) : (
                            <span style={{ fontWeight: 700, color: C.teal }}>{item.qty}</span>
                          )}
                          {isGerant && (
                            <button onClick={() => deleteModelItem(selectedModel.id, item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: C.red }}><Ic d={ic.trash} size={14} /></button>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                });
              })()}
            </div>
          )}

          {/* ── REPAIRS ── */}
          {tab === "repairs" && !selectedRepairer && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div><h1 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Réparations</h1><p style={{ margin: "3px 0 0", color: C.muted, fontSize: 13 }}>Suivi et réparateurs</p></div>
                <Btn onClick={openAddRepairer}><Ic d={ic.plus} size={14} /> Réparateur</Btn>
              </div>

              {/* Récapitulatif global */}
              {myRepairs.filter(r => r.status === "En réparation").length > 0 && (
                <div style={{ background: C.amber + "15", border: `1px solid ${C.amber}44`, borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, color: C.amber, marginBottom: 8 }}>
                    📊 Total en réparation : {myRepairs.filter(r => r.status === "En réparation").reduce((s, r) => s + r.qty, 0)} article(s)
                  </div>
                  {myRepairers.map(rep => {
                    const reps = myRepairs.filter(r => r.repairerId === rep.id && r.status === "En réparation");
                    if (reps.length === 0) return null;
                    return (
                      <div key={rep.id} style={{ fontSize: 13, padding: "3px 0", display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.amber}22` }}>
                        <span>🏭 {rep.name}</span>
                        <span style={{ color: C.amber, fontWeight: 700 }}>{reps.reduce((s, r) => s + r.qty, 0)} article(s)</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Liste réparateurs */}
              {myRepairers.length === 0
                ? <div style={{ textAlign: "center", color: C.muted, padding: 40 }}>Aucun réparateur. Ajoutez-en un avec le bouton ci-dessus !</div>
                : (
                  <div style={{ marginBottom: 20 }}>
                    <h2 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 10px" }}>🏭 Mes réparateurs</h2>
                    {myRepairers.map(rep => {
                      const enCours = myRepairs.filter(r => r.repairerId === rep.id && r.status === "En réparation");
                      const hsCount = myRepairs.filter(r => r.repairerId === rep.id && r.status === "Hors service").length;
                      return (
                        <div key={rep.id} onClick={() => setSelectedRepairer(rep)} style={{ background: C.card, border: `1px solid ${enCours.length > 0 ? C.amber + "55" : C.border}`, borderRadius: 14, padding: 16, marginBottom: 10, cursor: "pointer" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 800, fontSize: 16 }}>🏭 {rep.name} <span style={{ fontSize: 12, color: C.muted, fontWeight: 400 }}>→ voir</span></div>
                              {rep.phone && <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>📞 {rep.phone}</div>}
                              {rep.email && <div style={{ fontSize: 13, color: C.muted }}>✉️ {rep.email}</div>}
                              {rep.address && <div style={{ fontSize: 13, color: C.muted }}>📍 {rep.address}</div>}
                              <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                                {enCours.length > 0 && <Badge label={`🔧 ${enCours.length} en réparation`} color={C.amber} />}
                                {hsCount > 0 && <Badge label={`💀 ${hsCount} hors service`} color={C.red} />}
                                {enCours.length === 0 && hsCount === 0 && <Badge label="✅ Rien en cours" color={C.green} />}
                              </div>
                            </div>
                            <div style={{ display: "flex", gap: 6, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                              <button onClick={() => openEditRepairer(rep)} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", color: C.muted, padding: "6px 9px" }}><Ic d={ic.edit} size={14} /></button>
                              <button onClick={() => askConfirm(`Supprimer "${rep.name}" ?`, () => setRepairers(rs => rs.filter(r => r.id !== rep.id)))} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", color: C.red, padding: "6px 9px" }}><Ic d={ic.trash} size={14} /></button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              }

              {/* Réparations hors service */}
              {myRepairs.filter(r => r.status === "Hors service").length > 0 && (
                <div>
                  <h2 style={{ fontSize: 14, fontWeight: 700, color: C.red, margin: "0 0 10px" }}>💀 Hors service ({myRepairs.filter(r => r.status === "Hors service").length})</h2>
                  {myRepairs.filter(r => r.status === "Hors service").map(r => (
                    <div key={r.id} style={{ background: C.card, border: `1px solid ${C.red}44`, borderRadius: 12, padding: "12px 16px", marginBottom: 8 }}>
                      <div style={{ fontWeight: 700 }}>{r.qty} × {r.itemName}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>📍 {r.lodgingName} · {dest(r.destId)?.name}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>🏭 {myRepairers.find(x => x.id === r.repairerId)?.name || r.repairer}</div>
                      {r.returnNote && <div style={{ fontSize: 12, color: C.muted, fontStyle: "italic" }}>💬 {r.returnNote}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── VUE DÉTAIL RÉPARATEUR ── */}
          {tab === "repairs" && selectedRepairer && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <button onClick={() => setSelectedRepairer(null)} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", color: C.muted, padding: "8px 10px", display: "flex" }}><Ic d={ic.back} size={16} /></button>
                <div style={{ flex: 1 }}>
                  <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>🏭 {selectedRepairer.name}</h1>
                  <p style={{ margin: 0, color: C.muted, fontSize: 13 }}>
                    {selectedRepairer.phone && `📞 ${selectedRepairer.phone}`}
                    {selectedRepairer.email && ` · ✉️ ${selectedRepairer.email}`}
                  </p>
                </div>
              </div>

              {["En réparation", "Réparé"].map(status => {
                const reps = myRepairs.filter(r => r.repairerId === selectedRepairer.id && r.status === status);
                if (reps.length === 0) return null;
                return (
                  <div key={status} style={{ marginBottom: 20 }}>
                    <h2 style={{ fontSize: 14, fontWeight: 700, color: repairStatusColor(status), margin: "0 0 10px" }}>
                      {status === "En réparation" ? "🔧" : "✅"} {status} ({reps.length})
                    </h2>
                    {reps.map(r => (
                      <div key={r.id} style={{ background: C.card, border: `1px solid ${repairStatusColor(r.status)}44`, borderRadius: 12, padding: "14px 16px", marginBottom: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 15 }}>{r.qty} × {r.itemName}</div>
                            <div style={{ fontSize: 12, color: C.muted }}>📍 {r.lodgingName} · {dest(r.destId)?.name}</div>
                            <div style={{ fontSize: 12, color: C.muted }}>📅 Sorti le {r.dateOut}</div>
                            {r.note && <div style={{ fontSize: 12, color: C.muted, fontStyle: "italic", marginTop: 2 }}>💬 {r.note}</div>}
                            {r.dateBack && <div style={{ fontSize: 12, color: C.green, marginTop: 2 }}>✅ Retour le {r.dateBack}{r.returnNote ? ` — ${r.returnNote}` : ""}</div>}
                          </div>
                          <Badge label={r.status} color={repairStatusColor(r.status)} />
                        </div>
                        {isAdmin && r.status === "En réparation" && (
                          <Btn small onClick={() => openReturnRepair(r)}>Retour de réparation</Btn>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}

              {myRepairs.filter(r => r.repairerId === selectedRepairer.id).length === 0 && (
                <div style={{ textAlign: "center", color: C.muted, padding: 40 }}>Aucune réparation pour ce réparateur.</div>
              )}
            </div>
          )}

          {/* ── TEAM ── */}
          {tab === "team" && (
            <div>
              <h1 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800 }}>Équipe</h1>
              <p style={{ margin: "0 0 16px", color: C.muted, fontSize: 13 }}>Coordonnées de votre équipe</p>
              {myUsers.filter(u => u.id !== currentUser.id).map(u => (
                <div key={u.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, marginBottom: 10, display: "flex", alignItems: "center", gap: 14, boxShadow: "0 2px 8px #00000008" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.tealDim, border: `2px solid ${C.teal}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, color: C.teal, flexShrink: 0 }}>{u.name[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{u.name}</div>
                    <Badge label={u.role} color={ROLE_COLORS[u.role] || C.muted} />
                    {u.email && <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>✉️ {u.email}</div>}
                    {u.phone && <div style={{ fontSize: 13, color: C.muted }}>📞 {u.phone}</div>}
                    {u.destinationId && <div style={{ fontSize: 12, color: C.purple }}>📍 {dest(u.destinationId)?.name}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── USERS ── */}
          {tab === "users" && isGerant && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div><h1 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Utilisateurs</h1></div>
                <Btn onClick={openAddUser}><Ic d={ic.plus} size={14} /> Créer</Btn>
              </div>
              {myUsers.map(u => (
                <div key={u.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, marginBottom: 10, display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.tealDim, border: `2px solid ${C.teal}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, color: C.teal, flexShrink: 0 }}>{u.name[0]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700 }}>{u.name}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>{u.email}</div>
                    {u.phone && <div style={{ fontSize: 12, color: C.muted }}>{u.phone}</div>}
                    <div style={{ marginTop: 4, display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <Badge label={u.role} color={ROLE_COLORS[u.role] || C.muted} />
                      {u.destinationId && <Badge label={dest(u.destinationId)?.name || ""} color={C.purple} />}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <button onClick={() => openEditUser(u)} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", color: C.muted, padding: "6px 9px" }}><Ic d={ic.edit} size={14} /></button>
                    {u.id !== currentUser.id && <button onClick={() => askConfirm("Supprimer cet utilisateur ?", () => setUsers(us => us.filter(x => x.id !== u.id)))} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", color: C.red, padding: "6px 9px" }}><Ic d={ic.trash} size={14} /></button>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── JOURNAL ── */}
          {tab === "journal" && isAdmin && (
            <div>
              <h1 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800 }}>Journal d'activité</h1>
              {journal.length === 0 && <div style={{ textAlign: "center", color: C.muted, padding: 40 }}>Aucune activité enregistrée</div>}
              {journal.map(j => (
                <div key={j.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 16px", marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                  <div><div style={{ fontWeight: 700, fontSize: 14 }}>{j.action}</div><div style={{ fontSize: 13, color: C.muted }}>{j.detail}</div><div style={{ fontSize: 11, color: C.muted }}>par {j.userName}</div></div>
                  <div style={{ fontSize: 11, color: C.muted, textAlign: "right", marginLeft: 12 }}>{j.date}</div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Bottom nav mobile */}
        {isMobile && (
          <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.surface, borderTop: `1px solid ${C.border}`, display: "flex", zIndex: 100 }}>
            {navItems.slice(0, 5).map(item => {
              const active = tab === item.id;
              return (
                <button key={item.id} onClick={() => goTo(item.id)} style={{ flex: 1, padding: "10px 4px 12px", border: "none", background: "transparent", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: active ? C.teal : item.hi ? C.red : C.muted, position: "relative" }}>
                  <Ic d={item.icon} size={20} color={active ? C.teal : item.hi ? C.red : C.muted} />
                  {item.badge > 0 && <div style={{ position: "absolute", top: 6, right: "50%", marginRight: -18, width: 14, height: 14, borderRadius: "50%", background: C.red, fontSize: 9, fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>{item.badge}</div>}
                  <span style={{ fontSize: 10, fontWeight: active ? 700 : 500 }}>{item.label.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── MODALS ── */}

      {modal?.type === "dest" && (
        <Modal title={modal.id ? "Modifier la destination" : "Nouvelle destination"} onClose={() => setModal(null)}>
          <Field label="Nom" value={form.name} onChange={ff("name")} placeholder="Camping Le Soleil" />
          <Row2><Field label="Ville" half value={form.city || ""} onChange={ff("city")} placeholder="Arcachon" /><Field label="Adresse" half value={form.address || ""} onChange={ff("address")} placeholder="123 avenue…" /></Row2>
          <Field label="Gérant responsable" as="select" value={form.managerId || ""} onChange={ff("managerId")}>
            <option value="">— Aucun —</option>
            {myUsers.map(u => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
          </Field>
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}><Btn variant="ghost" onClick={() => setModal(null)} full>Annuler</Btn><Btn onClick={saveDest} full>{modal.id ? "Sauvegarder" : "Créer"}</Btn></div>
        </Modal>
      )}

      {modal?.type === "lodging" && (
        <Modal title="Ajouter un logement" onClose={() => setModal(null)}>
          <Field label="Nom du logement" value={form.name} onChange={ff("name")} placeholder="Ex: Estival A1" />
          <Field label="Numéro / référence" value={form.number || ""} onChange={ff("number")} placeholder="Ex: A1, B3…" />
          <Field label="Type de logement" as="select" value={form.modelId || ""} onChange={ff("modelId")}>
            <option value="">— Aucun type —</option>
            {myModels.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </Field>
          <div style={{ background: C.surface, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: C.muted, marginBottom: 14 }}>
            💡 Une fois le logement créé, cliquez dessus pour ajouter son inventaire depuis la liste des articles existants.
          </div>
          <div style={{ display: "flex", gap: 10 }}><Btn variant="ghost" onClick={() => setModal(null)} full>Annuler</Btn><Btn onClick={saveLodging} full>Créer</Btn></div>
        </Modal>
      )}

      {modal?.type === "addArticles" && (
        <Modal title={`Inventaire — ${form.lodgingName}`} onClose={() => setModal(null)}>
          <p style={{ fontSize: 13, color: C.muted, margin: "0 0 14px" }}>Cochez les articles à ajouter et ajustez les quantités.</p>

          {/* Boutons tout cocher/décocher */}
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <button onClick={() => setForm(f => { const c = {}; Object.keys(f.allArticles || {}).forEach(k => { c[`art_${k}`] = true; }); return { ...f, checked: c }; })} style={{ background: C.tealDim, border: `1px solid ${C.teal}44`, borderRadius: 8, cursor: "pointer", color: C.teal, padding: "6px 14px", fontSize: 12, fontWeight: 700 }}>✓ Tout cocher</button>
            <button onClick={() => setForm(f => { const c = {}; Object.keys(f.checked || {}).forEach(k => { c[k] = false; }); return { ...f, checked: c }; })} style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", color: C.muted, padding: "6px 14px", fontSize: 12 }}>✗ Tout décocher</button>
          </div>

          {/* Articles par catégorie */}
          {(() => {
            const allArts = Object.values(form.allArticles || {});
            const cats = [...new Set(allArts.map(a => a.category))];
            return cats.map(cat => (
              <div key={cat} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.purple, padding: "5px 0", borderBottom: `1px solid ${C.purple}33`, marginBottom: 6 }}>{cat}</div>
                {allArts.filter(a => a.category === cat).map(art => {
                  const isChecked = !!form.checked?.[art.id];
                  const qty = form.qtys?.[art.id] ?? art.defaultQty;
                  return (
                    <div key={art.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 4px", borderBottom: `1px solid ${C.border}`, background: isChecked ? C.tealDim : "transparent" }}>
                      <div onClick={() => setForm(f => ({ ...f, checked: { ...f.checked, [art.id]: !isChecked } }))}
                        style={{ width: 22, height: 22, borderRadius: 5, border: `2px solid ${isChecked ? C.teal : C.border}`, background: isChecked ? C.teal : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {isChecked && <span style={{ color: "#fff", fontSize: 13, fontWeight: 800 }}>✓</span>}
                      </div>
                      <span style={{ flex: 1, fontSize: 13, color: isChecked ? C.text : C.muted }}>{art.name}</span>
                      <input type="number" min="0" value={qty} onChange={e => setForm(f => ({ ...f, qtys: { ...f.qtys, [art.id]: +e.target.value } }))}
                        disabled={!isChecked}
                        style={{ width: 52, padding: "5px 4px", background: isChecked ? C.card : C.surface, border: `1px solid ${isChecked ? C.border : "transparent"}`, borderRadius: 8, color: C.text, fontSize: 13, fontWeight: 700, outline: "none", textAlign: "center", opacity: isChecked ? 1 : 0.4 }} />
                    </div>
                  );
                })}
              </div>
            ));
          })()}

          {/* Créer un nouvel article */}
          <div style={{ background: C.surface, borderRadius: 10, padding: 12, margin: "14px 0" }}>
            <div style={{ fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 10 }}>➕ Créer un nouvel article</div>
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", fontSize: 11, color: C.muted, marginBottom: 4, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>Catégorie</label>
              {!form.showNewCat ? (
                <div style={{ display: "flex", gap: 6 }}>
                  <select value={form.newItemCat || ""} onChange={ff("newItemCat")} style={{ flex: 1, padding: "9px 10px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, fontSize: 13, outline: "none" }}>
                    <option value="">— Choisir —</option>
                    {[...new Set(Object.values(form.allArticles || {}).map(a => a.category))].filter(Boolean).map(c => <option key={c}>{c}</option>)}
                  </select>
                  <button onClick={() => setForm(f => ({ ...f, showNewCat: true }))} style={{ background: C.tealDim, border: `1px solid ${C.teal}44`, borderRadius: 8, cursor: "pointer", color: C.teal, padding: "0 10px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>+ Nouvelle</button>
                </div>
              ) : (
                <div style={{ display: "flex", gap: 6 }}>
                  <input value={form.newCatName || ""} onChange={ff("newCatName")} placeholder="Nouvelle catégorie" style={{ flex: 1, padding: "9px 10px", background: C.card, border: `1px solid ${C.teal}`, borderRadius: 8, color: C.text, fontSize: 13, outline: "none" }} />
                  <button onClick={() => setForm(f => ({ ...f, showNewCat: false, newCatName: "" }))} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", color: C.muted, padding: "0 10px" }}>✕</button>
                </div>
              )}
            </div>
            <Row2>
              <Field label="Nom de l'article" half value={form.newItemName || ""} onChange={ff("newItemName")} placeholder="Ex: Serviette bain" />
              <Field label="Quantité" half type="number" value={form.newItemQty || 1} onChange={ff("newItemQty")} />
            </Row2>
            <Btn small onClick={addArticleToForm}><Ic d={ic.plus} size={13} /> Ajouter à la liste</Btn>
          </div>

          <div style={{ background: C.tealDim, borderRadius: 8, padding: "8px 12px", marginBottom: 14, fontSize: 13, color: C.teal, fontWeight: 700 }}>
            {Object.values(form.checked || {}).filter(Boolean).length} article(s) sélectionné(s)
          </div>
          <div style={{ display: "flex", gap: 10 }}><Btn variant="ghost" onClick={() => setModal(null)} full>Annuler</Btn><Btn onClick={saveAddArticles} full>Valider l'inventaire</Btn></div>
        </Modal>
      )}

      {modal?.type === "model" && (
        <Modal title="Nouveau modèle de logement" onClose={() => setModal(null)}>
          <Field label="Nom du modèle" value={form.name} onChange={ff("name")} placeholder="Ex: Estival, Bungalow, Tente…" />
          <Field label="Description (facultatif)" value={form.description || ""} onChange={ff("description")} placeholder="Ex: Logement estival sans sanitaire" />
          <div style={{ background: C.surface, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: C.muted, marginBottom: 14 }}>
            Après création, vous pourrez ajouter les articles de l'inventaire type.
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}><Btn variant="ghost" onClick={() => setModal(null)} full>Annuler</Btn><Btn onClick={saveModel} full>Créer</Btn></div>
        </Modal>
      )}

      {modal?.type === "repair" && (
        <Modal title="Envoyer en réparation" onClose={() => setModal(null)}>
          <div style={{ background: C.amber + "15", border: `1px solid ${C.amber}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
            <div style={{ fontWeight: 700 }}>{form.itemName}</div>
            <div style={{ fontSize: 13, color: C.muted }}>Depuis : {form.lodgingName}</div>
          </div>
          <Field label="Quantité à envoyer" type="number" value={form.qty} onChange={ff("qty")} placeholder="1" />
          {myRepairers.length === 0 ? (
            <div style={{ background: C.red + "15", border: `1px solid ${C.red}33`, borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: C.red }}>
              ⚠️ Aucun réparateur enregistré. Ajoutez-en un depuis l'onglet Réparations.
            </div>
          ) : (
            <div style={{ marginBottom: 13 }}>
              <label style={{ display: "block", fontSize: 11, color: C.muted, marginBottom: 5, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>Réparateur</label>
              {myRepairers.map(rep => (
                <div key={rep.id} onClick={() => setForm(f => ({ ...f, repairerId: rep.id }))}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", marginBottom: 6, borderRadius: 10, border: `2px solid ${form.repairerId === rep.id ? C.teal : C.border}`, background: form.repairerId === rep.id ? C.tealDim : C.surface, cursor: "pointer" }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${form.repairerId === rep.id ? C.teal : C.border}`, background: form.repairerId === rep.id ? C.teal : "transparent", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>🏭 {rep.name}</div>
                    {rep.phone && <div style={{ fontSize: 12, color: C.muted }}>📞 {rep.phone}</div>}
                    {rep.address && <div style={{ fontSize: 12, color: C.muted }}>📍 {rep.address}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
          <Field label="Note (facultatif)" value={form.note || ""} onChange={ff("note")} placeholder="Ex: Bâche déchirée côté gauche…" as="textarea" />
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}><Btn variant="ghost" onClick={() => setModal(null)} full>Annuler</Btn><Btn variant="amber" onClick={saveRepair} full disabled={!form.repairerId || !form.qty}>Envoyer en réparation</Btn></div>
        </Modal>
      )}

      {modal?.type === "repairer" && (
        <Modal title={modal.id ? "Modifier le réparateur" : "Nouveau réparateur"} onClose={() => setModal(null)}>
          <Field label="Nom / Entreprise" value={form.name || ""} onChange={ff("name")} placeholder="Ex: Couturier Dupont, SAV Électro…" />
          <Field label="Téléphone" type="tel" value={form.phone || ""} onChange={ff("phone")} placeholder="06 12 34 56 78" />
          <Field label="Email (facultatif)" type="email" value={form.email || ""} onChange={ff("email")} placeholder="contact@reparateur.fr" />
          <Field label="Adresse (facultatif)" value={form.address || ""} onChange={ff("address")} placeholder="12 rue des artisans…" />
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}><Btn variant="ghost" onClick={() => setModal(null)} full>Annuler</Btn><Btn onClick={saveRepairer} full>{modal.id ? "Sauvegarder" : "Créer"}</Btn></div>
        </Modal>
      )}

      {modal?.type === "returnRepair" && (
        <Modal title="Retour de réparation" onClose={() => setModal(null)}>
          <div style={{ background: C.surface, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
            <div style={{ fontWeight: 700 }}>{modal.repair.qty} × {modal.repair.itemName}</div>
            <div style={{ fontSize: 13, color: C.muted }}>Chez {modal.repair.repairer} depuis le {modal.repair.dateOut}</div>
          </div>
          <Field label="Statut de retour" as="select" value={form.status} onChange={ff("status")}>
            <option>Réparé</option>
            <option>Hors service</option>
          </Field>
          {form.status === "Réparé" && (
            <Field label="Retour dans quel logement ?" as="select" value={form.returnTo} onChange={ff("returnTo")}>
              <option value="">— Choisir —</option>
              {myLodgings.filter(l => l.destinationId === modal.repair.destId).map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              {myLodgings.filter(l => l.destinationId !== modal.repair.destId).map(l => <option key={l.id} value={l.id}>{l.name} ({dest(l.destinationId)?.name})</option>)}
            </Field>
          )}
          {form.status === "Hors service" && (
            <div style={{ background: C.red + "15", border: `1px solid ${C.red}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: C.red }}>
              💀 Cet article sera marqué hors service. Pensez à le remplacer depuis une autre destination ou via une commande fournisseur.
            </div>
          )}
          <Field label="Note (facultatif)" value={form.note || ""} onChange={ff("note")} placeholder="Ex: Réparation complète, à surveiller…" as="textarea" />
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}><Btn variant="ghost" onClick={() => setModal(null)} full>Annuler</Btn><Btn variant={form.status === "Réparé" ? "green" : "danger"} onClick={saveReturnRepair} full>{form.status === "Réparé" ? "✅ Retour validé" : "💀 Hors service"}</Btn></div>
        </Modal>
      )}

      {modal?.type === "user" && (
        <Modal title={modal.id ? "Modifier l'utilisateur" : "Créer un compte"} onClose={() => setModal(null)}>
          <Field label="Nom complet" value={form.name} onChange={ff("name")} placeholder="Sophie Martin" />
          <Field label="Email" type="email" value={form.email || ""} onChange={ff("email")} placeholder="s.martin@ohcampings.fr" />
          <Field label="Téléphone" type="tel" value={form.phone || ""} onChange={ff("phone")} placeholder="06 12 34 56 78" />
          <Field label="Mot de passe" type="password" value={form.password || ""} onChange={ff("password")} placeholder="••••••" />
          <Field label="Rôle" as="select" value={form.role} onChange={ff("role")}>{["Gérant", "Gestionnaire", "Invité"].map(r => <option key={r}>{r}</option>)}</Field>
          {form.role === "Invité" && <Field label="Destination attribuée" as="select" value={form.destinationId || ""} onChange={ff("destinationId")}><option value="">— Aucune —</option>{myDests.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</Field>}
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}><Btn variant="ghost" onClick={() => setModal(null)} full>Annuler</Btn><Btn onClick={saveUser} full>{modal.id ? "Sauvegarder" : "Créer"}</Btn></div>
        </Modal>
      )}

      {confirm && <Confirm msg={confirm.msg} onOk={confirm.onOk} onCancel={() => setConfirm(null)} okLabel={confirm.okLabel} okVariant={confirm.okVariant} />}
      {showNotifs && <div style={{ position: "fixed", inset: 0, zIndex: 150 }} onClick={() => setShowNotifs(false)} />}
    </div>
  );
}