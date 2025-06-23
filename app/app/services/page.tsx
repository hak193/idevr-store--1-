
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  Smartphone, 
  Building, 
  Settings,
  Clock,
  DollarSign,
  Users,
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const services = [
  {
    icon: Code,
    title: 'Custom Web Development',
    description: 'Full-stack web applications built with modern technologies and best practices.',
    features: [
      'React/Next.js Development',
      'Node.js/Python Backend',
      'Database Design & Integration',
      'API Development & Integration',
      'Cloud Deployment & Hosting',
      'Performance Optimization'
    ],
    startingPrice: 5000,
    anchor: 'web-development',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    features: [
      'React Native Development',
      'Flutter Development',
      'Native iOS/Android',
      'App Store Publishing',
      'Push Notifications',
      'Offline Functionality'
    ],
    startingPrice: 8000,
    anchor: 'mobile-development',
  },
  {
    icon: Building,
    title: 'Enterprise Solutions',
    description: 'Scalable enterprise software solutions for complex business requirements.',
    features: [
      'Microservices Architecture',
      'Enterprise Integration',
      'Security & Compliance',
      'Scalability Planning',
      'Legacy System Migration',
      'DevOps & CI/CD'
    ],
    startingPrice: 25000,
    anchor: 'enterprise',
  },
  {
    icon: Settings,
    title: 'Maintenance & Support',
    description: 'Ongoing support and maintenance to keep your applications running smoothly.',
    features: [
      '24/7 Monitoring',
      'Bug Fixes & Updates',
      'Performance Optimization',
      'Security Updates',
      'Backup & Recovery',
      'Technical Support'
    ],
    startingPrice: 2500,
    recurring: 'monthly',
    anchor: 'support',
  },
];

const pricingModels = [
  {
    icon: DollarSign,
    title: 'Fixed-Price',
    description: 'A predetermined price for a well-defined scope of work.',
    advantages: ['Predictable Budget', 'Minimized Client Risk', 'Clear Expectations'],
    bestFor: 'Small to medium-sized projects with clearly defined scope, such as MVPs or simple websites.',
  },
  {
    icon: Clock,
    title: 'Time & Materials (T&M)',
    description: 'Pay for actual hours worked and resources used with maximum flexibility.',
    advantages: ['High Flexibility', 'Transparency in Billing', 'Ideal for Complex Projects'],
    bestFor: 'Long-term, complex projects with uncertain or changing requirements where agility is key.',
  },
  {
    icon: Users,
    title: 'Milestone-Based',
    description: 'Project divided into phases with payment upon completion of each milestone.',
    advantages: ['Phased Risk Mitigation', 'Encourages Efficiency', 'Transparent Progress'],
    bestFor: 'Large-scale projects that can be broken down into distinct, measurable stages.',
  },
  {
    icon: Zap,
    title: 'Retainer',
    description: 'Fixed monthly fee for dedicated team or set number of hours.',
    advantages: ['Predictable Costs', 'Dedicated Resources', 'High Task Flexibility'],
    bestFor: 'Long-term maintenance, continuous feature enhancements, and ongoing support.',
  },
];

const servicePackages = [
  {
    name: 'Startup MVP Launchpad',
    description: 'Take your idea from concept to a market-ready MVP quickly and efficiently.',
    price: 15000,
    duration: '6-8 Weeks',
    features: [
      'Discovery & Scoping Workshop',
      'UI/UX Design (up to 10 screens)',
      'Core Feature Development',
      'Basic Admin Panel',
      'Quality Assurance & Testing',
      'Deployment to App Store / Server'
    ],
  },
  {
    name: 'Business Website Pro',
    description: 'Professional, multi-page corporate website to establish your online presence.',
    price: 5000,
    duration: '3-4 Weeks',
    features: [
      'Up to 7 Custom-Designed Pages',
      'Content Management System',
      'Responsive Design',
      'Contact Form & Interactive Map',
      'Basic SEO Setup'
    ],
  },
  {
    name: 'Ongoing Support & Maintenance',
    description: 'Keep your application secure, up-to-date, and performing optimally.',
    price: 2500,
    duration: 'Monthly',
    recurring: true,
    features: [
      '40 hours of development & support',
      'Priority Bug Fixes',
      'Performance Monitoring',
      'Regular Security Audits',
      'Monthly Status Report'
    ],
  },
];

export default function ServicesPage() {
  const formatPrice = (price: number, recurring?: string) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
    
    return recurring ? `${formatted}/${recurring}` : formatted;
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Custom Software Development Services
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              From concept to launch, we build tailored software solutions that drive business growth. 
              We work with you to understand your unique needs and deliver high-quality, scalable, and secure applications.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/quote">Get Free Quote</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Services Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Development Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive development services to bring your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                id={service.anchor}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <service.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </div>
                      <Badge variant="outline" className="text-blue-600">
                        From {formatPrice(service.startingPrice, service.recurring)}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">What's Included:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button asChild className="w-full">
                      <Link href="/quote">Request Quote</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Pricing Models */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Flexible Pricing Models</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the pricing model that best fits your project needs and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingModels.map((model, index) => (
              <motion.div
                key={model.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader className="text-center">
                    <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-4">
                      <model.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{model.title}</CardTitle>
                    <CardDescription>{model.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Advantages:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {model.advantages.map((advantage) => (
                          <li key={advantage} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 flex-shrink-0"></div>
                            {advantage}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Best For:</h4>
                      <p className="text-sm text-gray-600">{model.bestFor}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Service Packages */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Service Packages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pre-designed packages for common business needs with transparent pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicePackages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">{pkg.name}</CardTitle>
                      {pkg.recurring && (
                        <Badge variant="secondary">Monthly</Badge>
                      )}
                    </div>
                    <CardDescription className="text-base">
                      {pkg.description}
                    </CardDescription>
                    <div className="flex items-baseline space-x-2 mt-4">
                      <span className="text-3xl font-bold text-blue-600">
                        {formatPrice(pkg.price)}
                      </span>
                      {pkg.recurring && (
                        <span className="text-gray-600">/month</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">Duration: {pkg.duration}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button asChild className="w-full">
                      <Link href="/quote">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss your requirements and find the perfect solution for your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/quote">
                Get Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
