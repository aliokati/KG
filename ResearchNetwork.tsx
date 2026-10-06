"use client";
import React, { useState, useMemo } from "react";
import { useLanguage } from "../../context/LanguageContext";
interface DirectoryItem {
id: string;
type: "ORGANIZATIONS" | "JOURNALS";
acronym: string;
name: { en: string; fa: string };
link: string;
tags: string[];
}
const DIRECTORY_DATA: DirectoryItem[] = [
{
id: "d1",
type: "ORGANIZATIONS",
acronym: "ISMS",
name: { en: "Iranian Sleep Medicine Society", fa: "انجمن پزشکی خواب ایران" },
link: "https://isms.ir",
tags: ["National", "Clinical", "Governance"]
},
{
id: "d2",
type: "ORGANIZATIONS",
acronym: "WSS",
name: { en: "World Sleep Society", fa: "انجمن جهانی خواب" },
link: "https://worldsleepsociety.org",
tags: ["Global", "Research", "Conferences"]
},
{
id: "d3",
type: "ORGANIZATIONS",
acronym: "AASM",
name: { en: "American Academy of Sleep Medicine", fa: "آکادمی پزشکی خواب آمریکا" },
link: "https://aasm.org",
tags: ["International", "Standards", "Clinical"]
},
{
id: "d4",
type: "JOURNALS",
acronym: "JCSM",
name: { en: "Journal of Clinical Sleep Medicine", fa: "مجله بالینی پزشکی خواب" },
link: "aasm.org",
tags: ["Indexed", "Peer-Reviewed", "Clinical"]
},
{
id: "d5",
type: "JOURNALS",
acronym: "SLEEP",
name: { en: "SLEEP Journal", fa: "مجله علمی خواب" },
link: "oup.com",
tags: ["High-Impact", "Neuroscience", "Research"]
},
{
id: "d6",
type: "JOURNALS",
acronym: "SM",
name: { en: "Sleep Medicine", fa: "طب خواب" },
link: "sleepmedicinejournal.com",
tags: ["Clinical Studies", "Elsevier", "Research"]
}
];
export default function ResearchNetwork() {
const { lang } = useLanguage();
const [searchQuery, setSearchQuery] = useState("");
const [activeTab, setActiveTab] = useState<"ALL" | "ORGANIZATIONS" | "JOURNALS">("ALL");
const [selectedTag, setSelectedTag] = useState<string | null>(null);
const uiText = {
en: {
title: "Sleep Science Network",
subtitle: "Connecting regional questions with capable investigators and institutions.",
searchPlaceholder: "Search scientific nodes or journals...",
tabAll: "All Resources",
tabOrgs: "Scientific Organizations",
tabJournals: "Selected Journals",
empty: "No scientific matching nodes identified.",
visit: "Access Node ↗",
tagsLabel: "Filter by scope:"
},
fa: {
title: "شبکه علمی علوم خواب",
subtitle: "اتصال اولویت‌های پژوهشی منطقه‌ای با محققان و مؤسسات توانمند.",
searchPlaceholder: "جستجو در دایرکتوری پایگاه‌های علمی و مجلات...",
tabAll: "همه منابع",
tabOrgs: "سازمان‌های علمی",
tabJournals: "مجلات برگزیده علمی",
empty: "هیچ داده علمی منطبقی یافت نشد.",
visit: "ورود به پایگاه ↗",
tagsLabel: "فیلتر بر اساس حوزه:"
}
}[lang];
const distinctTags = useMemo(() => {
const tags = new Set();
DIRECTORY_DATA.forEach(item => item.tags.forEach(t => tags.add(t)));
return Array.from(tags);
}, []);
const filteredItems = useMemo(() => {
return DIRECTORY_DATA.filter(item => {
const matchesTab = activeTab === "ALL" || item.type === activeTab;
const matchesSearch =
item.acronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
item.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
item.name.fa.includes(searchQuery);
const matchesTag = !selectedTag || item.tags.includes(selectedTag);
return matchesTab && matchesSearch && matchesTag;
});
}, [searchQuery, activeTab, selectedTag]);
return (


PATH / 03 // RESEARCH
{uiText.title}
{uiText.subtitle}
<input
type="text"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
placeholder={uiText.searchPlaceholder}
className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
/>
{(["ALL", "ORGANIZATIONS", "JOURNALS"] as const).map((tab) => (
<button
key={tab}
onClick={() => { setActiveTab(tab); setSelectedTag(null); }}
className={rounded-lg px-3 py-1.5 text-xs font-bold border transition-all ${ activeTab === tab ? "bg-slate-800 text-teal-400 border-slate-700 shadow-sm" : "bg-transparent text-slate-500 border-transparent hover:text-slate-300" }}
>
{tab === "ALL" ? uiText.tabAll : tab === "ORGANIZATIONS" ? uiText.tabOrgs : uiText.tabJournals}

))}

{uiText.tagsLabel}
{distinctTags.map((tag) => (
<button
key={tag}
onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
className={rounded-full px-2.5 py-0.5 text-[11px] font-medium border transition-all ${ selectedTag === tag ? "bg-teal-500/10 text-teal-300 border-teal-500/30" : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-300" }}
>
#{tag}

))}
{selectedTag && (
<button onClick={() => setSelectedTag(null)} className="text-red-400 hover:text-red-300 font-bold font-mono">
[Clear]

)}
{filteredItems.length > 0 ? (
filteredItems.map((item) => (




{item.acronym}


{item.type}



{lang === "en" ? item.name.en : item.name.fa}

{item.tags.map((t) => (

{t}

))}


{uiText.visit}



))
) : (

{uiText.empty}

)}


);
}