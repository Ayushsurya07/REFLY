import React from 'react';
import type { Metadata } from 'next';
import HomepageClient from './components/HomepageClient';

export const metadata: Metadata = {
  title: 'Refly — Move Different. Premium Men\'s Bottom Wear India',
  description: 'Refly crafts premium men\'s bottom wear — cargos, linen, cotton pants, shorts, and formal. Free delivery across India. Shop now.',
  alternates: { canonical: 'https://refly.in' },
};

export default function HomePage() {
  return <HomepageClient />;
}