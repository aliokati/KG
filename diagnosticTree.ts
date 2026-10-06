export type SleepCategory = 'Insomnia' | 'Apnea' | 'Hypersomnia' | 'Movement';
export interface DiagnosticNode {
id: string;
category: SleepCategory;
questionText: { en: string; fa: string };
options: {
text: { en: string; fa: string };
score: number;
nextNodeId: string | null;
}[];
}
export const DIAGNOSTIC_TREE: Record<string, DiagnosticNode> = {
q1: {
id: 'q1',
category: 'Insomnia',
questionText: {
en: 'How often do you experience difficulty falling asleep or staying asleep?',
fa: 'چند وقت یک‌بار در به خواب رفتن یا بیدار شدن مکرر در شب مشکل دارید؟'
},
options: [
{ text: { en: 'Rarely or Never', fa: 'به ندرت یا هیچ‌وقت' }, score: 0, nextNodeId: 'q2' },
{ text: { en: '1 to 2 nights per week', fa: '۱ تا ۲ شب در هفته' }, score: 2, nextNodeId: 'q2' },
{ text: { en: '3 or more nights per week', fa: '۳ شب یا بیشتر در هفته' }, score: 4, nextNodeId: 'q2' }
]
},
q2: {
id: 'q2',
category: 'Apnea',
questionText: {
en: 'Has anyone informed you that you snore loudly or gasp for air during sleep?',
fa: 'آیا کسی به شما گفته است که حین خواب خرخر شدید می‌کنید یا نفس کم می‌آورید؟'
},
options: [
{ text: { en: 'No, never', fa: 'خیر، هیچ‌وقت' }, score: 0, nextNodeId: 'q3' },
{ text: { en: 'Occasional mild snoring', fa: 'گاهی اوقات خرخر خفیف' }, score: 2, nextNodeId: 'q3' },
{ text: { en: 'Frequent loud snoring or gasping', fa: 'خرخر شدید یا قطع تنفس مکرر' }, score: 5, nextNodeId: 'q3' }
]
},
q3: {
id: 'q3',
category: 'Hypersomnia',
questionText: {
en: 'Do you feel excessively sleepy during daytime hours despite sleeping enough hours?',
fa: 'آیا با وجود خواب کافی، در طول روز احساس خواب‌آلودگی شدید و مفرط دارید؟'
},
options: [
{ text: { en: 'No, I feel rested', fa: 'خیر، احساس شادابی می‌کنم' }, score: 0, nextNodeId: 'q4' },
{ text: { en: 'Mild daytime drowsiness', fa: 'خواب‌آلودگی خفیف روزانه' }, score: 2, nextNodeId: 'q4' },
{ text: { en: 'Severe drowsiness or falling asleep unexpectedly', fa: 'خواب‌آلودگی شدید یا به خواب رفتن ناگهانی' }, score: 4, nextNodeId: 'q4' }
]
},
q4: {
id: 'q4',
category: 'Movement',
questionText: {
en: 'Do you feel an uncomfortable, irresistible urge to move your legs in the evening?',
fa: 'آیا در هنگام عصر یا شب احساس ناخوشایند و تمایل شدیدی به تکان دادن پاهای خود دارید؟'
},
options: [
{ text: { en: 'Never', fa: 'هیچ‌وقت' }, score: 0, nextNodeId: null },
{ text: { en: 'Sometimes before sleep', fa: 'گاهی اوقات قبل از خواب' }, score: 2, nextNodeId: null },
{ text: { en: 'Regularly, preventing me from sleeping', fa: 'به طور مداوم که مانع خوابیدن من می‌شود' }, score: 4, nextNodeId: null }
]
}
};