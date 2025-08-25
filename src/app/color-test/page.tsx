"use client";
import React, { useState } from 'react';
import { useColors } from '@/hooks/useColors';
import { colors } from '@/styles/colors';

const ColorTestPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const themeColors = useColors(isDarkMode);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const ColorSwatch = ({ color, name, description }: { color: string; name: string; description?: string }) => (
    <div className="flex items-center space-x-3 p-3 rounded-lg border border-border-primary">
      <div 
        className="w-12 h-12 rounded-lg border border-border-secondary" 
        style={{ backgroundColor: color }}
      />
      <div>
        <p className="font-medium text-text-primary">{name}</p>
        <p className="text-sm text-text-secondary">{color}</p>
        {description && <p className="text-xs text-text-tertiary">{description}</p>}
      </div>
    </div>
  );

  const GradientSwatch = ({ gradient, name }: { gradient: string; name: string }) => (
    <div className="flex items-center space-x-3 p-3 rounded-lg border border-border-primary">
      <div 
        className="w-12 h-12 rounded-lg border border-border-secondary" 
        style={{ background: gradient }}
      />
      <div>
        <p className="font-medium text-text-primary">{name}</p>
        <p className="text-xs text-text-tertiary">{gradient}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Color System Test</h1>
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-brand-primary text-bg-primary rounded-lg hover:bg-brand-secondary transition-colors"
          >
            {isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Brand Colors */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-brand-primary">Brand Colors</h2>
            <div className="space-y-3">
              <ColorSwatch color={colors.brand.primary} name="Brand Primary" description="Main brand color" />
              <ColorSwatch color={colors.brand.secondary} name="Brand Secondary" description="Accent brand color" />
              <ColorSwatch color={colors.brand.tertiary} name="Brand Tertiary" description="Light brand variation" />
            </div>
          </section>

          {/* Accent Colors */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-accent-orange">Accent Colors</h2>
            <div className="space-y-3">
              <ColorSwatch color={colors.accent.orange} name="Orange" description="Gradient start" />
              <ColorSwatch color={colors.accent.orangeMid} name="Orange Mid" description="Gradient middle" />
              <ColorSwatch color={colors.accent.orangeEnd} name="Orange End" description="Gradient end" />
              <ColorSwatch color={colors.accent.success} name="Success" description="Success states" />
              <ColorSwatch color={colors.accent.warning} name="Warning" description="Warning states" />
              <ColorSwatch color={colors.accent.error} name="Error" description="Error states" />
            </div>
          </section>

          {/* Text Colors */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Text Colors</h2>
            <div className="space-y-3">
              <ColorSwatch color={themeColors.text.primary} name="Text Primary" description="Main text color" />
              <ColorSwatch color={themeColors.text.secondary} name="Text Secondary" description="Secondary text" />
              <ColorSwatch color={themeColors.text.tertiary} name="Text Tertiary" description="Muted text" />
              <ColorSwatch color={themeColors.text.disabled} name="Text Disabled" description="Disabled text" />
            </div>
          </section>

          {/* Background Colors */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Background Colors</h2>
            <div className="space-y-3">
              <ColorSwatch color={themeColors.background.primary} name="Background Primary" description="Main background" />
              <ColorSwatch color={themeColors.background.secondary} name="Background Secondary" description="Card backgrounds" />
              <ColorSwatch color={themeColors.background.tertiary} name="Background Tertiary" description="Subtle backgrounds" />
            </div>
          </section>

          {/* Border Colors */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Border Colors</h2>
            <div className="space-y-3">
              <ColorSwatch color={themeColors.border.primary} name="Border Primary" description="Main borders" />
              <ColorSwatch color={themeColors.border.secondary} name="Border Secondary" description="Subtle borders" />
              <ColorSwatch color={themeColors.border.focus} name="Border Focus" description="Focus states" />
            </div>
          </section>

          {/* Gradients */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Gradients</h2>
            <div className="space-y-3">
              <GradientSwatch gradient={themeColors.gradients.orange} name="Orange Gradient" />
              <GradientSwatch gradient={themeColors.gradients.brand} name="Brand Gradient" />
              <GradientSwatch gradient={themeColors.gradients.brandExtended} name="Extended Brand Gradient" />
            </div>
          </section>
        </div>

        {/* Usage Examples */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Usage Examples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card Example */}
            <div className="p-6 bg-bg-secondary border border-border-primary rounded-lg">
              <h3 className="text-xl font-semibold text-text-primary mb-2">Card Title</h3>
              <p className="text-text-secondary mb-4">This is a card with secondary background and proper text hierarchy.</p>
              <button className="px-4 py-2 bg-brand-primary text-bg-primary rounded hover:bg-brand-secondary transition-colors">
                Action Button
              </button>
            </div>

            {/* Gradient Text Example */}
            <div className="p-6 bg-bg-secondary border border-border-primary rounded-lg">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent mb-2">
                Gradient Title
              </h3>
              <p className="text-text-secondary mb-4">Text with gradient styling using brand colors.</p>
              <div className="w-full h-4 rounded" style={{ background: themeColors.gradients.orange }}></div>
            </div>

            {/* Interactive States */}
            <div className="p-6 bg-bg-secondary border border-border-primary rounded-lg">
              <h3 className="text-xl font-semibold text-text-primary mb-4">Interactive States</h3>
              <div className="space-y-2">
                <div className="p-2 rounded hover:bg-brand-primary hover:bg-opacity-10 transition-colors cursor-pointer">
                  Hover State
                </div>
                <div className="p-2 rounded bg-brand-primary bg-opacity-20 text-brand-primary">
                  Active State
                </div>
                <div className="p-2 rounded text-text-tertiary">
                  Disabled State
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Color Editing Instructions */}
        <section className="mt-12 p-6 bg-bg-secondary border border-border-primary rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-brand-primary">How to Edit Colors</h2>
          <div className="space-y-4 text-text-secondary">
            <p>
              <strong>1. Edit colors in:</strong> <code className="bg-bg-tertiary px-2 py-1 rounded">src/styles/colors.ts</code>
            </p>
            <p>
              <strong>2. All components automatically update</strong> when you change colors in the central file.
            </p>
            <p>
              <strong>3. Use the useColors hook</strong> in components: <code className="bg-bg-tertiary px-2 py-1 rounded">const colors = useColors(isDarkMode)</code>
            </p>
            <p>
              <strong>4. Use Tailwind classes</strong> like <code className="bg-bg-tertiary px-2 py-1 rounded">text-brand-primary</code> or <code className="bg-bg-tertiary px-2 py-1 rounded">bg-brand-secondary</code>
            </p>
            <p>
              <strong>5. Test changes</strong> by toggling between light and dark modes on this page.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ColorTestPage;