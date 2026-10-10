import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Brand from "../components/Brand";
import { useApp } from "../context/AppContext";

const roles = [
  ["student", "Étudiant", "Commande, panier, fidélité"],
  ["employe", "Employé", "KDS, menu, production"],
  ["gerant", "Gérant", "Commandes, comptes, pilotage"],
  ["reseau", "Direction", "Réseau, qualité, gouvernance"]
];

export default function Auth({ mode="login" }) {
 const isLogin = mode === "login";
 const { login, register } = useApp();
 const nav = useNavigate();
 const location = useLocation();
 const [form, setForm] = useState({ nom:"", email:"", password:"", role:"student" });
 const [error, setError] = useState("");

 const submit = async e => {
   e.preventDefault();
   setError("");
   const r = isLogin ? await login(form.email, form.password, form.role) : register(form);
   if (!r.success) {
     setError(r.message || "Une erreur est survenue.");
     return;
   }
   const fallback = isLogin ? {
     student: "/etudiant/menu",
     employe: "/employe/kds",
     gerant: "/gerant/commandes",
     reseau: "/reseau/dashboard"
   }[r.user.role] : "/etudiant/menu";
   nav(location.state?.from || fallback, { replace: true });
 };

 return <div className="auth-page">
  <div className="auth-card">
   <div className="auth-brand-panel">
    <Brand light/>
    <div className="auth-quote"><span>THE CLIMATE OF TASTE & CHILL</span><h1>Un campus qui se vit aussi autour de la table.</h1><p>Commandez, mangez, cumulez des points et utilisez un espace adapté à votre rôle dans ZEDUC.</p></div>
    <div className="auth-benefits"><span>✓ Carte Resto</span><span>✓ Livraison Campus</span><span>✓ Pilotage par rôle</span></div>
   </div>
   <div className="auth-form-panel">
    <div className="auth-switch"><Link className={isLogin?"active":""} to="/connexion">Connexion</Link><Link className={!isLogin?"active":""} to="/inscription">Inscription</Link></div>
    <h2>{isLogin ? "Accéder à ZEDUC-SP@CE" : "Créer mon compte étudiant"}</h2>
    <p className="muted">{isLogin ? "Le rôle détermine automatiquement l'interface et les droits accessibles." : "Les comptes créés depuis cette page sont des comptes étudiants."}</p>

    {isLogin && <div className="role-selector">
      <div className="role-selector-title"><b>Choisir l'espace</b><small>En production, ce rôle provient de l'authentification backend.</small></div>
      <div className="role-grid">
       {roles.map(([value,label,desc]) => <button type="button" key={value} className={`role-option ${form.role===value?"active":""}`} onClick={()=>setForm({...form,role:value})}>
        <b>{label}</b><span>{desc}</span>
       </button>)}
      </div>
    </div>}

    <form onSubmit={submit}>
     {!isLogin && <label>Nom complet<input required value={form.nom} onChange={e=>setForm({...form,nom:e.target.value})} /></label>}
     <label>Email institutionnel<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="votre.email@campus.cm" /></label>
     <label>Mot de passe<input required type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} /></label>
     {error && <div className="form-error">{error}</div>}
     {isLogin && <div className="forgot"><a href="#forgot">Mot de passe oublié ?</a></div>}
     <button className="btn-primary w-100" type="submit">{isLogin?"Se connecter →":"Créer mon compte étudiant"}</button>
    </form>
    <div className="auth-note">Les droits réels doivent être vérifiés par le serveur. Le sélecteur de rôle sert ici à tester les différentes interfaces du prototype.</div>
   </div>
  </div>
 </div>
}
