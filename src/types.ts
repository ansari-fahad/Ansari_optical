export interface Product {
  id: string;
  name: string;
  code: string;
  subtitle: string;
  price: number;
  category: 'Square' | 'Round' | 'Geometric' | 'Cat-Eye' | 'Rimless';
  material: string;
  colorways: {
    name: string;
    hex: string;
    border?: string;
  }[];
  dimensions: {
    lensWidth: number; // mm
    bridgeWidth: number; // mm
    templeLength: number; // mm
  };
  weight: string; // e.g. "21g"
  description: string;
  specs: string[];
  image: string;
  badge?: string;
}

export interface LensOption {
  id: string;
  name: string;
  description: string;
  price: number;
  highlight?: string;
}

export interface PrescriptionDetails {
  type: 'non-prescription' | 'single-vision' | 'progressive' | 'upload-later';
  odSphere?: string;
  osSphere?: string;
  pupillaryDistance?: string;
  engravingText?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColorway: string;
  selectedLens: LensOption;
  prescription: PrescriptionDetails;
  quantity: number;
}
