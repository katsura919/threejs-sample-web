export const GUNDAMS = [
  {
    id: '158eaae66c09463daf6bd39d56e7f4ac',
    name: 'Imperial Gundam',
    author: 'seiffahmi94',
  },
  {
    id: '128435f047d54783b3c9e3e660213272',
    name: 'Gundam Barbatos',
    author: 'Jijis3d',
  },
] as const;

export type Gundam = (typeof GUNDAMS)[number];
