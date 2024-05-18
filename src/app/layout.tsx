import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Properti",
  description: "Property application by Muhammad Lakmana Indra",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='font-main text-slate-950 bg-slate-100 min-h-dvh'>{children}</body>
    </html>
  );
}
