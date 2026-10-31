import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Down Plus — Digital Health Core Engine | البوابة الطبية والإكلينيكية',
  description: 'منظومة الرعاية الصحية الرقمية المتقدمة لمتلازمة داون - بوابة الأطباء وجواز الحياة الطبي',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🩺</text></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
