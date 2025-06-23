
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Target, 
  Award, 
  Zap,
  Code,
  Smartphone,
  Globe,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const values = [
  {
    icon: Target,
    title: 'Innovation First',
    description: 'We stay ahead of technology trends to deliver cutting-edge solutions that give your business a competitive advantage.',
  },
  {
    icon: Users,
    title: 'Client-Centric',
    description: 'Your success is our success. We work closely with you throughout the entire development process to ensure we exceed expectations.',
  },
  {
    icon: Award,
    title: 'Quality Driven',
    description: 'We maintain the highest standards in code quality, security, and performance through rigorous testing and best practices.',
  },
  {
    icon: Zap,
    title: 'Rapid Delivery',
    description: 'Transform your ideas into reality in just 5 minutes with our ready-made solutions or launch custom projects in record time.',
  },
];

const expertise = [
  {
    icon: Code,
    title: 'Web Development',
    technologies: ['React', 'Next.js', 'Node.js', 'Python', 'TypeScript'],
    description: 'Full-stack web applications with modern frameworks and cloud deployment.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    technologies: ['React Native', 'Flutter', 'iOS', 'Android'],
    description: 'Native and cross-platform mobile apps for iOS and Android platforms.',
  },
  {
    icon: Globe,
    title: 'Enterprise Solutions',
    technologies: ['Microservices', 'Cloud', 'DevOps', 'Security'],
    description: 'Scalable enterprise systems with robust architecture and security.',
  },
];

const stats = [
  { number: '100+', label: 'Projects Completed' },
  { number: '50+', label: 'Happy Clients' },
  { number: '98%', label: 'Client Satisfaction' },
  { number: '24/7', label: 'Support Available' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              About i-devr code LLC
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              We're a Massachusetts-based software development company passionate about 
              transforming ideas into innovative digital solutions. Our mission is to help 
              businesses of all sizes leverage technology to achieve their goals.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                Founded in Massachusetts
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                100+ Projects Delivered
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                Online Only
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Statement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              To transform your app idea into reality in just 5 minutes! We believe that great 
              software should be accessible to everyone, whether you need a ready-to-deploy 
              solution or a fully custom application built from the ground up.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  What Sets Us Apart
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Ready-made solutions for instant deployment</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Custom development with flexible pricing models</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Expert team with proven track record</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Ongoing support and maintenance</span>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and ensure we deliver exceptional results for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-4">
                      <value.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Expertise */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Expertise</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in modern technologies and frameworks to deliver robust, scalable solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertise.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <area.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {area.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{area.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {area.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Company Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Based in Massachusetts
                </h3>
                <p className="text-gray-600 mb-6">
                  Located in Worcester, Massachusetts, we combine technical expertise with 
                  innovative solutions to serve clients worldwide. Our central location allows 
                  us to work efficiently with businesses across various industries.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>15 Monroe Avenue, Worcester, MA 01602</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>contact@i-devrcode.com</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>508-688-4378</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Approach
                </h3>
                <p className="text-gray-600 mb-6">
                  We believe in building long-term partnerships with our clients. Our collaborative 
                  approach ensures that we not only deliver what you need today but also prepare 
                  your business for future growth and success.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>Agile development methodology</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>Transparent communication</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>Continuous integration and deployment</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>Post-launch support and maintenance</span>
                  </li>
                </ul>
              </div>
            </div>
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
          <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how we can help transform your ideas into successful software solutions.
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
