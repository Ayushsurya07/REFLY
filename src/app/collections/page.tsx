import React from 'react';
import type { Metadata } from 'next';
import CollectionsClient from './components/CollectionsClient';

export const metadata: Metadata = {
  title: 'Collections — Premium Men\'s Bottom Wear | Refly',
  description: 'Browse Refly\'s complete collection of premium men\'s bottom wear. Jeans, cargo, formal, linen, chinos, joggers and shorts. Free delivery across India.',
  alternates: { canonical: 'https://refly.in/collections' },
};

export default function CollectionsPage() {
  return <CollectionsClient />;
}