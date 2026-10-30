import React from 'react';

export const metadata = {
  title: 'Down Plus — Doctor & Clinical Portal',
  description: 'Digital Health Engine clinical portal for pediatric specialists',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <style>{`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Cairo', system-ui, -apple-system, sans-serif;
          }
          body {
            background-color: #F8FAFC;
            color: #0F172A;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
