
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Code, Smartphone, Building, Settings } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const services = [
  {
    icon: Code,
    title: 'Custom Web Development',
    description: 'Full-stack web applications built with modern technologies and best practices.',
    features: ['React/Next.js', 'Node.js/Python', 'Cloud Deployment', 'API Integration'],
    link: '/services#web-development',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    features: ['React Native', 'Flutter', 'Native iOS/Android', 'App Store Publishing'],
    link: '/services#mobile-development',
  },
  {
    icon: Building,
    title: 'Enterprise Solutions',
    description: 'Scalable enterprise software solutions for complex business requirements.',
    features: ['Microservices', 'Enterprise Integration', 'Security & Compliance', 'Scalability'],
    link: '/services#enterprise',
  },
  {
    icon: Settings,
    title: 'Maintenance & Support',
    description: 'Ongoing support and maintenance to keep your applications running smoothly.',
    features: ['24/7 Monitoring', 'Bug Fixes', 'Performance Optimization', 'Security Updates'],
    link: '/services#support',
  },
];

export function ServicesShowcase() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Core Offerings
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide a spectrum of services to meet your business needs, whether you need 
            a quick launch or a long-term development partner.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 card-hover">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <service.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{service.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Key Features:</h4>
                    <ul className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="outline" asChild className="w-full mt-4">
                    <Link href={service.link} className="flex items-center justify-center">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Service Packages Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
          <p className="text-lg mb-6 opacity-90">
            From MVPs to enterprise solutions, we have flexible packages to fit your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="secondary" asChild size="lg">
              <Link href="/quote">Get Free Quote</Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
