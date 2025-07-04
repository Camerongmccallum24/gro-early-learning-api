'use client';

import { Heart, Users, Award, Target } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeader from '@/components/SectionHeader';
import FeatureCard from '@/components/FeatureCard';

export default function DevDesignPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gro-darkblue text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-2">GRO Early Learning - Design System Reference</h1>
          <p className="text-lg opacity-90">Development Design Guide • For Internal Use Only</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        
        {/* Brand Colors */}
        <section>
          <h2 className="text-3xl font-bold text-gro-darkblue mb-6">🎨 Brand Colors</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gro-darkblue mb-4">Primary Brand Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="w-full h-32 bg-gro-teal rounded-lg mb-3 shadow-lg"></div>
                <div className="font-mono text-sm">
                  <div className="font-semibold">gro-teal</div>
                  <div className="text-gray-600">#00A8B5</div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-full h-32 bg-gro-orange rounded-lg mb-3 shadow-lg"></div>
                <div className="font-mono text-sm">
                  <div className="font-semibold">gro-orange</div>
                  <div className="text-gray-600">#F28C38</div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-full h-32 bg-gro-green rounded-lg mb-3 shadow-lg"></div>
                <div className="font-mono text-sm">
                  <div className="font-semibold">gro-green</div>
                  <div className="text-gray-600">#4CAF50</div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-full h-32 bg-gro-blue rounded-lg mb-3 shadow-lg"></div>
                <div className="font-mono text-sm">
                  <div className="font-semibold">gro-blue</div>
                  <div className="text-gray-600">#2196F3</div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-full h-32 bg-gro-darkblue rounded-lg mb-3 shadow-lg"></div>
                <div className="font-mono text-sm text-white">
                  <div className="font-semibold">gro-darkblue</div>
                  <div className="text-gray-300">#1E3A8A</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gro-darkblue mb-4">Neutral Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="w-full h-32 bg-gro-gray rounded-lg mb-3 shadow-lg"></div>
                <div className="font-mono text-sm">
                  <div className="font-semibold">gro-gray</div>
                  <div className="text-gray-600">#6B7280</div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-full h-32 bg-gro-lightgray rounded-lg mb-3 shadow-lg border"></div>
                <div className="font-mono text-sm">
                  <div className="font-semibold">gro-lightgray</div>
                  <div className="text-gray-600">#F3F4F6</div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-full h-32 bg-gro-darkgray rounded-lg mb-3 shadow-lg"></div>
                <div className="font-mono text-sm text-white">
                  <div className="font-semibold">gro-darkgray</div>
                  <div className="text-gray-300">#1F2937</div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-full h-32 bg-foreground rounded-lg mb-3 shadow-lg"></div>
                <div className="font-mono text-sm text-white">
                  <div className="font-semibold">foreground</div>
                  <div className="text-gray-300">#171717</div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-full h-32 bg-background rounded-lg mb-3 shadow-lg border-2"></div>
                <div className="font-mono text-sm">
                  <div className="font-semibold">background</div>
                  <div className="text-gray-600">#FFFFFF</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-3xl font-bold text-gro-darkblue mb-6">📝 Typography</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gro-darkblue mb-4">Headings (Poppins)</h3>
            <div className="space-y-6">
              <div>
                <h1 className="h1 mb-2">Heading 1 - 4xl Bold</h1>
                <div className="text-sm text-gray-600">font-heading text-4xl font-bold</div>
              </div>
              
              <div>
                <h2 className="h2 mb-2">Heading 2 - 3xl Semibold</h2>
                <div className="text-sm text-gray-600">font-heading text-3xl font-semibold</div>
              </div>
              
              <div>
                <h3 className="h3 mb-2">Heading 3 - 2xl Semibold</h3>
                <div className="text-sm text-gray-600">font-heading text-2xl font-semibold</div>
              </div>
              
              <div>
                <h4 className="h4 mb-2">Heading 4 - xl Semibold</h4>
                <div className="text-sm text-gray-600">font-heading text-xl font-semibold</div>
              </div>
              
              <div>
                <h5 className="h5 mb-2">Heading 5 - lg Semibold</h5>
                <div className="text-sm text-gray-600">font-heading text-lg font-semibold</div>
              </div>
              
              <div>
                <h6 className="h6 mb-2">Heading 6 - base Semibold</h6>
                <div className="text-sm text-gray-600">font-heading text-base font-semibold</div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gro-darkblue mb-4">Body Text (Nunito)</h3>
            <div className="space-y-6">
              <div>
                <p className="body-lg mb-2">Large body text - lg (18px)</p>
                <div className="text-sm text-gray-600">font-body text-lg</div>
              </div>
              
              <div>
                <p className="body-base mb-2">Regular body text - base (16px)</p>
                <div className="text-sm text-gray-600">font-body text-base</div>
              </div>
              
              <div>
                <p className="body-sm mb-2">Small body text - sm (14px)</p>
                <div className="text-sm text-gray-600">font-body text-sm</div>
              </div>
              
              <div>
                <p className="body-xs mb-2">Extra small text - xs (12px)</p>
                <div className="text-sm text-gray-600">font-body text-xs</div>
              </div>
            </div>
          </div>
        </section>

        {/* Button System */}
        <section>
          <h2 className="text-3xl font-bold text-gro-darkblue mb-6">🔘 Button System</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gro-darkblue mb-4">GRO Button Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="gro">Default Orange</Button>
              <Button variant="gro-teal">Teal</Button>
              <Button variant="gro-green">Green</Button>
              <Button variant="gro-darkblue">Dark Blue</Button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gro-darkblue mb-4">Standard Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gro-darkblue mb-4">Button Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm" variant="gro-teal">Small</Button>
              <Button size="default" variant="gro-teal">Default</Button>
              <Button size="lg" variant="gro-teal">Large</Button>
              <Button size="xl" variant="gro-teal">Extra Large</Button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gro-darkblue mb-4">Legacy CSS Classes</h3>
            <div className="flex flex-wrap gap-4">
              <button className="btn-gro-teal">btn-gro-teal</button>
              <button className="btn-secondary">btn-secondary</button>
              <button className="btn-touch focus-ring bg-gro-orange text-white">btn-touch + custom</button>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-3xl font-bold text-gro-darkblue mb-6">🏷️ Badges</h2>
          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge className="bg-gro-teal text-white">Custom GRO</Badge>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-3xl font-bold text-gro-darkblue mb-6">🃏 Card Components</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gro-darkblue">
                  Standard Card
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gro-gray text-sm">
                  This is a standard card component with hover effects and proper styling.
                </p>
              </CardContent>
            </Card>

            <FeatureCard
              icon={<Heart className="h-8 w-8 text-gro-teal mb-2" />}
              title="Feature Card"
              description="This is a feature card component with icon, title, and description."
            />

            <Card className="bg-gradient-to-br from-gro-teal/10 to-gro-green/10 border-gro-teal/20">
              <CardHeader>
                <CardTitle className="text-gro-darkblue">Gradient Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gro-gray text-sm">Card with gradient background using GRO colors.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Location Color Schemes */}
        <section>
          <h2 className="text-3xl font-bold text-gro-darkblue mb-6">📍 Location Color Schemes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gro-mount-isa h-32 rounded-lg mb-4 flex items-center justify-center">
                <h3 className="text-white font-bold text-xl">Mount Isa</h3>
              </div>
              <div className="font-mono text-sm">
                <div className="font-semibold">gro-mount-isa</div>
                <div className="text-gray-600">#F79939</div>
              </div>
              <div className="bg-gradient-to-r from-gro-mount-isa to-gro-orange h-12 rounded-lg mt-2"></div>
              <code className="text-xs mt-1">from-gro-mount-isa to-gro-orange</code>
            </div>
            
            <div className="text-center">
              <div className="bg-gro-moranbah h-32 rounded-lg mb-4 flex items-center justify-center">
                <h3 className="text-white font-bold text-xl">Moranbah</h3>
              </div>
              <div className="font-mono text-sm">
                <div className="font-semibold">gro-moranbah</div>
                <div className="text-gray-600">#8DC63F</div>
              </div>
              <div className="bg-gradient-to-r from-gro-moranbah to-gro-green h-12 rounded-lg mt-2"></div>
              <code className="text-xs mt-1">from-gro-moranbah to-gro-green</code>
            </div>
            
            <div className="text-center">
              <div className="bg-gro-charters-towers h-32 rounded-lg mb-4 flex items-center justify-center">
                <h3 className="text-white font-bold text-xl">Charters Towers</h3>
              </div>
              <div className="font-mono text-sm">
                <div className="font-semibold">gro-charters-towers</div>
                <div className="text-gray-600">#80CAE5</div>
              </div>
              <div className="bg-gradient-to-r from-gro-charters-towers to-gro-blue h-12 rounded-lg mt-2"></div>
              <code className="text-xs mt-1">from-gro-charters-towers to-gro-blue</code>
            </div>
          </div>
        </section>

        {/* Section Patterns */}
        <section>
          <h2 className="text-3xl font-bold text-gro-darkblue mb-6">📄 Section Patterns</h2>
          
          <SectionWrapper className="bg-white border rounded-lg">
            <SectionHeader
              title="Section Header Example"
              subtitle="This shows the standard section header pattern used throughout the site."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Users className="h-8 w-8 text-gro-teal mb-2" />}
                title="Feature One"
                description="Example feature with proper styling and icon."
              />
              <FeatureCard
                icon={<Award className="h-8 w-8 text-gro-orange mb-2" />}
                title="Feature Two"
                description="Another feature showing consistent design patterns."
              />
              <FeatureCard
                icon={<Target className="h-8 w-8 text-gro-green mb-2" />}
                title="Feature Three"
                description="Third feature demonstrating the grid layout system."
              />
            </div>
          </SectionWrapper>
        </section>

        {/* Background Patterns */}
        <section>
          <h2 className="text-3xl font-bold text-gro-darkblue mb-6">🎨 Background Patterns</h2>
          
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-semibold mb-2">White Background</h3>
              <code>bg-white</code>
            </div>
            
            <div className="bg-gradient-to-br from-gro-green/5 to-gro-teal/5 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Light Gradient Background</h3>
              <code>bg-gradient-to-br from-gro-green/5 to-gro-teal/5</code>
            </div>
            
            <div className="bg-gro-lightgray p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Light Gray Background</h3>
              <code>bg-gro-lightgray</code>
            </div>
          </div>
        </section>

        {/* Spacing & Layout */}
        <section>
          <h2 className="text-3xl font-bold text-gro-darkblue mb-6">📐 Spacing & Layout</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gro-darkblue mb-4">Container System</h3>
              <div className="bg-blue-100 p-4 rounded-lg">
                <code>container mx-auto px-4 sm:px-6 lg:px-8</code>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gro-darkblue mb-4">Section Padding</h3>
              <div className="bg-green-100 p-4 rounded-lg">
                <code>py-8 sm:py-12 md:py-16 lg:py-20</code>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gro-darkblue mb-4">Max Widths</h3>
              <div className="space-y-2">
                <div className="bg-gray-100 p-2 rounded"><code>max-w-3xl mx-auto</code> - Text content</div>
                <div className="bg-gray-100 p-2 rounded"><code>max-w-4xl mx-auto</code> - Forms</div>
                <div className="bg-gray-100 p-2 rounded"><code>max-w-6xl mx-auto</code> - Card grids</div>
                <div className="bg-gray-100 p-2 rounded"><code>max-w-7xl mx-auto</code> - Wide layouts</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Notice */}
        <section className="border-t pt-8 mt-12">
          <div className="text-center text-gray-600">
            <p className="mb-2">⚠️ <strong>Development Reference Only</strong> ⚠️</p>
            <p>This page should be removed before production deployment.</p>
            <p className="text-sm mt-2">Route: <code>/dev-design</code></p>
          </div>
        </section>

      </div>
    </div>
  );
} 