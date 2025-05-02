// app/layout.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upload App',
  description: 'UploadThing в Next.js App Router',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
