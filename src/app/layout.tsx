"use client";

import "./globals.css";
import Context from "../data/session";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Color Scale</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <Context>
        <body className="font-sans">{children}</body>
      </Context>
    </html>
  );
}
