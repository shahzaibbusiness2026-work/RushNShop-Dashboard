'use client';

import React, { useState } from 'react';
import './globals.css';
import { StoreProvider } from '../context/StoreContext';
import Sidebar from '../components/layout/Sidebar';
import TopHeader from '../components/layout/TopHeader';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>RushNshop - AI Operating System for TikTok Shop</title>
        <meta
          name="description"
          content="AI-powered TikTok Shop management dashboard for RushNshop with profit analytics, listing generator, customer service automation, and multi-store intelligence."
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
      </head>
      <body className="bg-[#f8fafc] text-gray-900 antialiased selection:bg-lime-400 selection:text-black">
        <StoreProvider>
          <div className="flex min-h-screen bg-[#f8fafc]">
            {/* Sidebar */}
            <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

            {/* Main Area */}
            <div className="flex flex-1 flex-col overflow-x-hidden min-w-0">
              <TopHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />
              <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
            </div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
