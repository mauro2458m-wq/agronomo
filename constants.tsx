
import React from 'react';
import type { Crop } from './types';
import { 
    BeanIcon, OkraIcon, PotatoIcon, CornIcon, OrangeIcon, PassionFruitIcon, 
    CassavaIcon, CoconutIcon, LemonIcon, CabbageIcon, TomatoIcon 
} from './components/CropIcons';

export const CROPS: Crop[] = [
  { id: 'feijao', name: 'Feijão', icon: <BeanIcon /> },
  { id: 'quiabo', name: 'Quiabo', icon: <OkraIcon /> },
  { id: 'batata', name: 'Batata', icon: <PotatoIcon /> },
  { id: 'milho', name: 'Milho', icon: <CornIcon /> },
  { id: 'laranja', name: 'Laranja', icon: <OrangeIcon /> },
  { id: 'maracuja', name: 'Maracujá', icon: <PassionFruitIcon /> },
  { id: 'mandioca', name: 'Mandioca', icon: <CassavaIcon /> },
  { id: 'coco', name: 'Coco', icon: <CoconutIcon /> },
  { id: 'limao', name: 'Limão', icon: <LemonIcon /> },
  { id: 'couve', name: 'Couve', icon: <CabbageIcon /> },
  { id: 'tomate', name: 'Tomate', icon: <TomatoIcon /> },
];
