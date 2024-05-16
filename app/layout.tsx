import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { AntdRegistry } from '@ant-design/nextjs-registry';

export const metadata: Metadata = {
  title: "Personal Budget Tracker",
  description: "Personal Budget Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <AntdRegistry>
        <html lang="en">
          <body style={{margin: 0, fontFamily: "sans-serif"}}>{children}</body>
        </html>
      </AntdRegistry>
    </ClerkProvider>
  );
}
