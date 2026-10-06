"use client";
import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
interface NavbarProps {
activeHub: string;
setActiveHub: (hub: any) => void;
}
export default function Navbar({ activeHub, setActiveHub }: NavbarProps) {
const { lang, toggleLang } = useLanguage();
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const isRtl = lang === "fa";
const uiText = {
en: {
brand: "KRISM",
subtitle: "Khorasan Sleep Medicine",
coords: "36.2605° N · 59.6168° E",
public: "Public Hub",
professionals: "Professionals",
research: "Research Net",
langBtn: "فارسی",
},
fa: {
brand: "کریسم",
subtitle: "انجمن پزشکی خواب خراسان",
coords: "۳۶.۲۶۰۵° شمالی · ۵۹.۶۱۶۸° شرقی",
public: "بخش عمومی",
professionals: "متخصصین",
research: "شبکه پژوهش",
langBtn: "English",
},
}[lang];
const hubs = ["public", "professional", "research"];
return (
{/* Brand Meta Data Block */}


K


{uiText.brand}

{uiText.subtitle} · {uiText.coords}


{/* Desktop Hub Controls Segment */}

{hubs.map((hub) => (
<button
key={hub}
onClick={() => setActiveHub(hub)}
className={rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${ activeHub === hub ? "bg-teal-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200" }}
>
{hub === "public" ? uiText.public : hub === "professional" ? uiText.professionals : uiText.research}

))}
{/* Global Action Utility Layer */}


{uiText.langBtn}

{/* Mobile Dynamic Toggle */}


{lang === "en" ? "FA" : "EN"}

<button
onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
className="p-2 text-slate-400 hover:text-white transition-colors"
>

{isMobileMenuOpen ? (

) : (

)}



{/* Mobile Drawer Navigation Block */}
{isMobileMenuOpen && (

{hubs.map((hub) => (
<button
key={hub}
onClick={() => {
setActiveHub(hub);
setIsMobileMenuOpen(false);
}}
className={w-full rounded-xl p-3 text-start text-sm font-bold transition-all ${ activeHub === hub ? "bg-teal-600/20 text-teal-400 border border-teal-500/30" : "bg-slate-900/40 text-slate-400 border border-transparent" }}
>
{hub === "public" ? uiText.public : hub === "professional" ? uiText.professionals : uiText.research}

))}

)}

);
}