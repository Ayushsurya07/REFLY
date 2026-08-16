'use client';
import React from 'react';
import AppImage from '@/components/ui/AppImage';
import { Category } from './CollectionsClient';

const bannerData: Record<
  Category,
  { title: string; subtitle: string; image: string; imageAlt: string }
> = {
  all: {
    title: 'The Collection',
    subtitle: 'Premium bottom wear for the discerning man',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_176ecf970-1779315366432.png',
    imageAlt:
      "Men's fashion editorial — dark cinematic studio, dramatic shadows, low-key atmospheric lighting, premium clothing showcase",
  },
  cargos: {
    title: 'Cargos',
    subtitle: 'Tactical utility meets luxury finish.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_10b0dbefb-1784403722212.png',
    imageAlt:
      'Cargo pants editorial — dark atmospheric studio, military aesthetic, dramatic shadows',
  },
  linen: {
    title: 'Linen',
    subtitle: 'Belgian flax. Summer mastery.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_198d6bcc8-1772886565104.png',
    imageAlt:
      'Linen trousers editorial — bright airy studio, natural light, clean white background, premium fabric detail',
  },
  'cotton-pants': {
    title: 'Cotton Pants',
    subtitle: 'Classic twill & bold cuts. Effortless style.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1583d16c0-1772733407074.png',
    imageAlt:
      'Cotton pants editorial — clean minimal studio, well-lit professional photography, premium cotton detail',
  },
  shorts: {
    title: 'Shorts',
    subtitle: 'Summer essentials & performance comfort.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_17f1b0e30-1783714875477.png',
    imageAlt: 'Shorts editorial — bright summer studio, natural warm light, clean airy background',
  },
  formal: {
    title: 'Formal',
    subtitle: 'Italian twill. Boardroom authority.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16cef7734-1775922251748.png',
    imageAlt:
      'Formal trousers editorial — dark minimalist studio, sharp tailoring, dramatic directional lighting',
  },
};

interface CollectionsBannerProps {
  activeCategory: Category;
}

export default function CollectionsBanner({ activeCategory }: CollectionsBannerProps) {
  const data = bannerData[activeCategory];

  return (
    <div className="relative h-[300px] lg:h-[400px] overflow-hidden">
      <AppImage
        src={data.image}
        alt={data.imageAlt}
        fill
        priority
        className="object-cover transition-all duration-700"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex items-end pb-12 lg:pb-16 px-6 lg:px-12">
        <div>
          <h1 className="font-display font-bold text-white text-4xl lg:text-6xl leading-none tracking-tight mb-3">
            {data.title}
          </h1>
          <p className="font-body text-white/70 text-sm lg:text-base">{data.subtitle}</p>
        </div>
      </div>
    </div>
  );
}
