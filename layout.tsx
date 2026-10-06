import "./globals.css";
import React from "react";
import { LanguageProvider } from "../context/LanguageContext";
export const metadata = {
title: "KRISM | Khorasan Sleep Medicine Society",
description: "A regional platform connecting research, education, public understanding and professional collaboration in sleep medicine.",
};
export default function RootLayout({
children,
}: {
children: React.ReactNode;
}) {
return (



{children}



);
}