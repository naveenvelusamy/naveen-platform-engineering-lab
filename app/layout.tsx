import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Naveen Velusamy",
  description:
    "Senior Platform Engineer and SRE focused on cloud platforms, reliability, infrastructure automation, CI/CD, and observability.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" data-theme="dark">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
