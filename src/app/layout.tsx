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
        <title>ColorScale</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="A tool for creating and manipulating colors"
        />
        <meta name="og:title" content="ColorScale" />
        <meta
          name="og:description"
          content="A tool for creating and manipulating color scales"
        />
        <meta name="og:image" content="/thumbnail.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Colorful" />
        <meta
          name="twitter:description"
          content="A tool for creating and manipulating color scales"
        />
        <meta name="twitter:image" content="/thumbnail.png" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ColorScale" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <script
          defer
          data-domain="colorscale.app"
          src="https://plausible.io/js/script.js"
        ></script>
      </head>
      <Context>
        <body className="font-sans">{children}</body>
      </Context>
    </html>
  );
}
