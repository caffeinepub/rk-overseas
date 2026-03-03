import { Link } from '@tanstack/react-router';
import { Globe, Award, Users, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

const stats = [
  { label: 'Years in Business', value: '15+' },
  { label: 'Products Available', value: '500+' },
  { label: 'Countries Served', value: '30+' },
  { label: 'Happy Customers', value: '10K+' },
];

const values = [
  {
    icon: Award,
    title: 'Quality Assurance',
    desc: 'Every product we carry is sourced directly from authorized manufacturers and distributors, ensuring 100% authenticity and quality.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    desc: 'We ship to over 30 countries worldwide, making premium home appliances accessible to customers everywhere.',
  },
  {
    icon: Users,
    title: 'Customer First',
    desc: 'Our dedicated support team is available to assist you before, during, and after your purchase.',
  },
  {
    icon: TrendingUp,
    title: 'Best Value',
    desc: 'We negotiate directly with manufacturers to offer you the most competitive prices without compromising on quality.',
  },
];

const brands = ['Samsung', 'LG', 'Bosch', 'Whirlpool', 'Daikin', 'Philips', 'Panasonic', 'Haier', 'Sony', 'Hitachi', 'IFB', 'Morphy Richards'];

const commitments = [
  'Genuine products with manufacturer warranty',
  'Competitive pricing with no hidden charges',
  'Secure and reliable worldwide shipping',
  'Expert product guidance and support',
  'Easy inquiry and order process',
  'After-sales service assistance',
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-charcoal py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-amber text-sm font-semibold uppercase tracking-wider mb-3">Our Story</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Bringing World-Class Appliances to Your Home
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              RK Overseas has been a trusted name in home appliances for over 15 years. We specialize in sourcing and supplying premium appliances from the world's leading brands to customers across the globe.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-amber py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="font-display text-4xl font-bold text-amber-foreground">{value}</div>
                <div className="text-amber-foreground/70 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-amber text-sm font-semibold uppercase tracking-wider mb-2">Our Mission</p>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Making Premium Appliances Accessible Worldwide
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Founded in 2009, RK Overseas started with a simple mission: to make high-quality home appliances accessible to customers around the world at fair prices. What began as a small import-export business has grown into a trusted international retailer serving thousands of satisfied customers.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We work directly with manufacturers and authorized distributors to ensure every product we sell is genuine, covered by warranty, and delivered safely to your door. Our team of appliance experts is always on hand to help you make the right choice.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-amber text-amber-foreground font-semibold px-6 py-3 rounded-md hover:bg-amber-dark transition-all duration-200 shadow-amber"
            >
              Explore Our Products <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card rounded-xl p-5 border border-border shadow-card">
                <div className="w-10 h-10 rounded-full bg-amber/10 flex items-center justify-center mb-3">
                  <Icon size={20} className="text-amber" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-2">{title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="bg-muted/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-amber text-sm font-semibold uppercase tracking-wider mb-2">Our Promise</p>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                Our Commitment to You
              </h2>
              <ul className="space-y-3">
                {commitments.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <CheckCircle size={18} className="text-amber flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-amber text-sm font-semibold uppercase tracking-wider mb-4">Trusted Brands</p>
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                We Carry the World's Best
              </h3>
              <div className="flex flex-wrap gap-3">
                {brands.map((brand) => (
                  <span
                    key={brand}
                    className="bg-card border border-border text-foreground text-sm font-medium px-4 py-2 rounded-full shadow-xs hover:border-amber hover:text-amber transition-colors duration-200"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Ready to Find Your Perfect Appliance?
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
            Browse our extensive catalog or get in touch with our team for personalized recommendations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-amber text-amber-foreground font-semibold px-8 py-4 rounded-md hover:bg-amber-dark transition-all duration-200 shadow-amber"
            >
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-8 py-4 rounded-md hover:bg-white/10 transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
