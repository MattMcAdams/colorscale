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
        <title>Colorful</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="A tool for creating and manipulating colors"
        />
        <meta name="og:title" content="Colorful" />
        <meta
          name="og:description"
          content="A tool for creating and manipulating colors"
        />
        <meta name="og:image" content="/thumbnail.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Colorful" />
        <meta
          name="twitter:description"
          content="A tool for creating and manipulating colors"
        />
        <meta name="twitter:image" content="/thumbnail.png" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <script
          defer
          data-domain="color.mattmcadams.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </head>
      <Context>
        <body className="font-sans">{children}</body>
      </Context>
    </html>
  );
}
