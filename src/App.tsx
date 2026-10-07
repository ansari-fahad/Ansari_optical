import React, { useState } from 'react';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScrollSequence } from './components/ScrollSequence';
import { ProductCatalog } from './components/ProductCatalog';
import { LensCraftSection } from './components/LensCraftSection';
import { LookbookSection } from './components/LookbookSection';
import { Footer } from './components/Footer';

import { BespokeStudioModal } from './components/BespokeStudioModal';
import { VirtualTryOnModal } from './components/VirtualTryOnModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AtelierBookingModal } from './components/AtelierBookingModal';

import { Product, LensOption, PrescriptionDetails, CartItem } from './types';
import { PRODUCTS, LENS_OPTIONS } from './data/products';
import { playTactileClick, playShutterClick } from './utils/sound';

export function App() {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'initial-sample',
      product: PRODUCTS[0],
      selectedColorway: 'Brushed Obsidian',
      selectedLens: LENS_OPTIONS[1], // Essilor Visio 1.74 Ultra-Thin
      prescription: {
        type: 'single-vision',
        odSphere: '-1.50',
        osSphere: '-1.75',
        pupillaryDistance: '63',
        engravingText: 'A.N.',
      },
      quantity: 1,
    },
  ]);

  // Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const [isAtelierOpen, setIsAtelierOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);

  // Active product selections for modals
  const [studioProduct, setStudioProduct] = useState<Product | null>(null);
  const [tryOnProduct, setTryOnProduct] = useState<Product>(PRODUCTS[0]);

  // Sound feedback toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    selectedColorway: string,
    selectedLens: LensOption,
    prescription: PrescriptionDetails
  ) => {
    playShutterClick(soundEnabled);
    const newItem: CartItem = {
      id: `${product.id}-${selectedColorway}-${selectedLens.id}-${Date.now()}`,
      product,
      selectedColorway,
      selectedLens,
      prescription,
      quantity: 1,
    };
    setCart((prev) => [newItem, ...prev]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    playTactileClick(soundEnabled);
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    playTactileClick(soundEnabled);
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Scroll helpers
  const scrollToStory = () => {
    playTactileClick(soundEnabled);
    const element = document.getElementById('scrollytelling-experience');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCollection = () => {
    playTactileClick(soundEnabled);
    const element = document.getElementById('capsule-collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-white selection:text-black">
      {/* Primary Fixed Navigation */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => {
          playTactileClick(soundEnabled);
          setIsCartOpen(true);
        }}
        onOpenTryOn={() => {
          playTactileClick(soundEnabled);
          setTryOnProduct(PRODUCTS[0]);
          setIsTryOnOpen(true);
        }}
        onOpenAtelier={() => {
          playTactileClick(soundEnabled);
          setIsAtelierOpen(true);
        }}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Hero Entrance */}
      <Hero
        onScrollToStory={scrollToStory}
        onOpenVirtualTryOn={() => {
          playTactileClick(soundEnabled);
          setTryOnProduct(PRODUCTS[0]);
          setIsTryOnOpen(true);
        }}
        onExploreCollection={scrollToCollection}
      />

      {/* 240-Frame Interactive Scrollytelling Sequence */}
      <ScrollSequence
        framePath="/frames"
        frameCount={240}
        framePrefix="ezgif-frame-"
        framePadding={3}
        extension="jpg"
        containerHeight="450vh"
        onConfigureClick={() => {
          playTactileClick(soundEnabled);
          setStudioProduct(PRODUCTS[0]); // Opens Model G-100 Monolith customizer
        }}
      />

      {/* Capsule Collection (E-Commerce Catalog) */}
      <ProductCatalog
        onSelectProduct={(product) => {
          playTactileClick(soundEnabled);
          setStudioProduct(product);
        }}
        onTryOnProduct={(product) => {
          playTactileClick(soundEnabled);
          setTryOnProduct(product);
          setIsTryOnOpen(true);
        }}
      />
      <Analytics />
      {/* Ophthalmic Lens Technology & Coatings Lab */}
      <LensCraftSection />

      {/* Editorial Lookbook & Campaign Muses */}
      <LookbookSection
        onShopProduct={(product) => {
          playTactileClick(soundEnabled);
          setStudioProduct(product);
        }}
      />

      {/* Global Brand Manifesto & Footer */}
      <Footer />

      {/* ======================================================== */}
      {/* MODALS & DRAWERS                                         */}
      {/* ======================================================== */}

      {/* Bespoke Studio Frame & Lens Customizer Modal */}
      {studioProduct && (
        <BespokeStudioModal
          product={studioProduct}
          onClose={() => setStudioProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Virtual Try-On Mirror Simulator Modal */}
      {isTryOnOpen && (
        <VirtualTryOnModal
          initialProduct={tryOnProduct}
          onClose={() => setIsTryOnOpen(false)}
          onSelectForStudio={(product) => {
            setIsTryOnOpen(false);
            setStudioProduct(product);
          }}
        />
      )}

      <SpeedInsights />
      {/* Slide-out Cart Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={(discount) => {
          playTactileClick(soundEnabled);
          setCheckoutDiscount(discount);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Express Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          items={cart}
          discountAmount={checkoutDiscount}
          onClose={() => setIsCheckoutOpen(false)}
          onClearCart={handleClearCart}
        />
      )}

      {/* Private Atelier Booking Modal */}
      {isAtelierOpen && (
        <AtelierBookingModal onClose={() => setIsAtelierOpen(false)} />
      )}
    </div>
  );
}

export default App;
