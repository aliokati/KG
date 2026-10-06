"use client";
import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { DIAGNOSTIC_TREE, SleepCategory } from "../../constants/diagnosticTree";
export default function SleepCheckEngine() {
const { lang } = useLanguage();
const [isStarted, setIsStarted] = useState(false);
const [currentNodeId, setCurrentNodeId] = useState<string | null>("q1");
const [history, setHistory] = useState<string[]>([]);
const [scores, setScores] = useState<Record<SleepCategory, number>>({
Insomnia: 0,
Apnea: 0,
Hypersomnia: 0,
Movement: 0,
});
const isRtl = lang === "fa";
const uiText = {
en: {
title: "Public Sleep Checkup",
tagline: "Not sure whether your sleep concern needs attention?",
desc: "A short educational conversation organizes your symptoms into four recognized sleep-disorder areas and suggests a responsible next step.",
notice: "5–8 min · No account · No data saved",
startBtn: "Start my sleep check →",
step: "Step",
of: "of",
resultsTitle: "Your Screening Indicators",
resultsDesc: "This analysis provides general context. Please consult a qualified clinician for clinical diagnostic evaluations.",
highRisk: "Elevated Focus Area",
lowRisk: "Normal Scope",
resetBtn: "Reset Assessment",
backBtn: "← Back",
},
fa: {
title: "تست بررسی وضعیت خواب عمومی",
tagline: "آیا مطمئن نیستید که مشکل خواب شما نیاز به توجه تخصصی دارد؟",
desc: "یک گفتگوی کوتاه آموزشی علائم شما را در چهار حوزه شناخته‌شده اختلال خواب سازماندهی کرده و قدم بعدی مناسب را پیشنهاد می‌دهد.",
notice: "۵ تا ۸ دقیقه · بدون نیاز به حساب کاربری · بدون ذخیره اطلاعات",
startBtn: "شروع بررسی وضعیت خواب ←",
step: "مرحله",
of: "از",
resultsTitle: "شاخص‌های ارزیابی خواب شما",
resultsDesc: "این ارزیابی صرفاً جهت اطلاع‌رسانی اولیه است. برای تشخیص دقیق به پزشک متخصص خواب مراجعه کنید.",
highRisk: "نیازمند بررسی و توجه بیشتر",
lowRisk: "وضعیت عادی",
resetBtn: "شروع مجدد ارزیابی",
backBtn: "بازگشت →",
},
}[lang];
const currentNode = currentNodeId ? DIAGNOSTIC_TREE[currentNodeId] : null;
const totalQuestions = Object.keys(DIAGNOSTIC_TREE).length;
const handleOptionSelect = (score: number, category: SleepCategory, nextNodeId: string | null) => {
setScores((prev) => ({ ...prev, [category]: prev[category] + score }));
if (currentNodeId) {
setHistory((prev) => [...prev, currentNodeId]);
}
setCurrentNodeId(nextNodeId);
};
const handleBack = () => {
if (history.length === 0) return;
const previousNodeId = history[history.length - 1];
const previousNode = DIAGNOSTIC_TREE[previousNodeId];
setHistory((prev) => prev.slice(0, -1));
setCurrentNodeId(previousNodeId);
// Deduct placeholder score approximation if rolled back
setScores((prev) => ({
...prev,
[previousNode.category]: Math.max(0, prev[previousNode.category] - 2),
}));
};
const resetCheck = () => {
setIsStarted(false);
setCurrentNodeId("q1");
setHistory([]);
setScores({ Insomnia: 0, Apnea: 0, Hypersomnia: 0, Movement: 0 });
};
return (

{!isStarted ? (



{uiText.title}


{uiText.tagline}



{uiText.desc}



{uiText.notice}

<button
onClick={() => setIsStarted(true)}
className="w-full sm:w-auto rounded-xl bg-teal-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-teal-500/10 hover:bg-teal-500 active:scale-98 transition-all"
>
{uiText.startBtn}



) : currentNode ? (



{currentNode.category}


{uiText.step} {history.length + 1} {uiText.of} {totalQuestions}

{currentNode.questionText[lang]}
{currentNode.options.map((option, index) => (
<button
key={index}
onClick={() => handleOptionSelect(option.score, currentNode.category, option.nextNodeId)}
className="w-full rounded-xl border border-slate-800 bg-slate-950 p-4 text-start font-medium text-slate-300 hover:border-teal-500 hover:bg-slate-900/40 active:scale-[0.99] transition-all"
>
{option.text[lang]}

))}
{history.length > 0 && (


{uiText.backBtn}


)}

) : (


{uiText.resultsTitle}
{uiText.resultsDesc}
{Object.entries(scores).map(([category, value]) => {
const isElevated = value >= 3;
return (

{category}
<span
className={rounded-md px-2.5 py-1 text-xs font-mono font-bold ${ isElevated ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" }}
>
{isElevated ? uiText.highRisk : uiText.lowRisk} ({value} pts)


);
})}
{uiText.resetBtn}



)}

);
}