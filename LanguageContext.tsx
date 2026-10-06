"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
type Language = 'en' | 'fa';
type Direction = 'ltr' | 'rtl';
interface LanguageContextType {
lang: Language;
dir: Direction;
toggleLang: () => void;
}
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
export function LanguageProvider({ children }: { children: React.ReactNode }) {
const [lang, setLang] = useState('en');
const [dir, setDir] = useState('ltr');
useEffect(() => {
const nextDir = lang === 'fa' ? 'rtl' : 'ltr';
setDir(nextDir);
document.documentElement.dir = nextDir;
document.documentElement.lang = lang;
}, [lang]);
const toggleLang = () => {
setLang((prev) => (prev === 'en' ? 'fa' : 'en'));
};
return (
<LanguageContext.Provider value={{ lang, dir, toggleLang }}>
{children}
</LanguageContext.Provider>
);
}
export function useLanguage() {
const context = useContext(LanguageContext);
if (!context) {
throw new Error('useLanguage must be used within a LanguageProvider');
}
return context;
}