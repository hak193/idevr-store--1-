
'use client';

import { motion } from 'framer-motion';
import { Smartphone, Zap, Shield, Search, Clock, Headphones } from 'lucide-react';

const features = [
  {
    icon: Smartphone,
    title: 'Responsive & Mobile-Friendly',
    description: 'Seamless experience across all devices, from desktops to smartphones.',
  },
  {
    icon: Search,
    title: 'SEO Optimized',
    description: 'Built for high visibility on search engines to attract more customers.',
  },
  {
    icon: Zap,
    title: 'Fast Loading Speeds',
    description: 'Optimized for performance to ensure a great user experience and better rankings.',
  },
  {
    icon: Shield,
    title: 'Clean & Secure Code',
    description: 'Reliable and secure solutions built on modern, clean codebases.',
  },
  {
    icon: Clock,
    title: 'Quick Deployment',
    description: 'Get your applications up and running in record time with our optimized workflows.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock technical support to ensure your applications run smoothly.',
  },
];

export function FeaturesSection() {
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
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We deliver cutting-edge software solutions with the features that matter most to your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
