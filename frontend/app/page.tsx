"use client"
import React, { useState } from 'react';
import { Shield, Smartphone, Users, Leaf, BarChart3, Globe, CheckCircle, ArrowRight, Waves, TreePine, Database, Anchor, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';



export default function LandingPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900' 
        : 'bg-gradient-to-br from-blue-50 via-background to-green-50'
    }`}>
      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className={`absolute inset-0 transition-all duration-300 ${
          isDark 
            ? 'bg-gradient-to-br from-blue-600/20 via-transparent to-green-600/20' 
            : 'bg-gradient-to-br from-blue-600/10 via-transparent to-green-600/10'
        }`}></div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isDark 
                  ? 'bg-blue-900/50 text-blue-300' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                <Shield className="w-4 h-4" />
                <span>Blockchain-Powered Verification</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className={isDark ? 'text-white' : 'text-foreground'}>Transformings</span>{' '}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Blue Carbon
                </span>{' '}
                <span className={isDark ? 'text-white' : 'text-foreground'}>Restoration</span>
              </h1>
              
              <p className={`text-xl leading-relaxed transition-all duration-300 ${
                isDark ? 'text-gray-300' : 'text-muted-foreground'
              }`}>
                India's first decentralized Monitoring, Reporting, and Verification (MRV) system for coastal ecosystem restoration. Generate verifiable carbon credits through blockchain technology.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2">
                  <span>Launch Platform</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className={`border-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isDark 
                    ? 'border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400' 
                    : 'border-border text-muted-foreground hover:border-blue-500 hover:text-blue-600'
                }`}>
                  <span>View Documentation</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">100%</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-muted-foreground'}`}>Transparent</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">24/7</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-muted-foreground'}`}>Monitoring</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">∞</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-muted-foreground'}`}>Immutable</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className={`absolute inset-0 rounded-3xl transform rotate-6 transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-br from-blue-800 to-green-800' 
                  : 'bg-gradient-to-br from-blue-200 to-green-200'
              }`}></div>
              <div className={`relative p-8 rounded-3xl shadow-2xl transition-all duration-300 ${
                isDark ? 'bg-gray-800' : 'bg-card'
              }`}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isDark ? 'bg-blue-900/50' : 'bg-blue-100'
                      }`}>
                        <Waves className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className={`font-semibold ${isDark ? 'text-white' : 'text-card-foreground'}`}>Coastal Areas</div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-muted-foreground'}`}>Monitored</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isDark ? 'bg-green-900/50' : 'bg-green-100'
                      }`}>
                        <TreePine className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className={`font-semibold ${isDark ? 'text-white' : 'text-card-foreground'}`}>Restoration</div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-muted-foreground'}`}>Verified</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isDark ? 'bg-purple-900/50' : 'bg-purple-100'
                      }`}>
                        <Database className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className={`font-semibold ${isDark ? 'text-white' : 'text-card-foreground'}`}>Blockchain</div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-muted-foreground'}`}>Secured</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isDark ? 'bg-orange-900/50' : 'bg-orange-100'
                      }`}>
                        <CheckCircle className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className={`font-semibold ${isDark ? 'text-white' : 'text-card-foreground'}`}>Credits</div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-muted-foreground'}`}>Tokenized</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-20 transition-all duration-300 ${
        isDark ? 'bg-gray-800' : 'bg-background'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className={`text-4xl lg:text-5xl font-bold transition-all duration-300 ${
              isDark ? 'text-white' : 'text-foreground'
            }`}>
              Comprehensive <span className="text-blue-600">MRV</span> Ecosystem
            </h2>
            <p className={`text-xl max-w-3xl mx-auto transition-all duration-300 ${
              isDark ? 'text-gray-300' : 'text-muted-foreground'
            }`}>
              Our platform integrates cutting-edge technology to ensure transparent, verifiable, and scalable blue carbon restoration monitoring.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Blockchain Registry",
                description: "Immutable storage of verified plantation and restoration data with cryptographic security.",
                color: "blue"
              },
              {
                icon: Leaf,
                title: "Tokenized Credits",
                description: "Smart contracts automatically generate and manage carbon credit tokens based on verified data.",
                color: "green"
              },
              {
                icon: Smartphone,
                title: "Mobile Integration",
                description: "Field data collection through mobile apps with real-time drone integration capabilities.",
                color: "purple"
              },
              {
                icon: Users,
                title: "Multi-Stakeholder",
                description: "Seamless onboarding for NGOs, communities, and coastal panchayats with role-based access.",
                color: "orange"
              }
            ].map((feature, index) => (
              <div key={index} className={`group p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 hover:shadow-2xl' 
                  : 'bg-muted hover:bg-card hover:shadow-xl'
              }`}>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                  isDark 
                    ? `bg-${feature.color}-900/50` 
                    : `bg-${feature.color}-100`
                }`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}-600`} />
                </div>
                <h3 className={`text-xl font-bold mb-3 transition-all duration-300 ${
                  isDark ? 'text-white' : 'text-card-foreground'
                }`}>{feature.title}</h3>
                <p className={`leading-relaxed transition-all duration-300 ${
                  isDark ? 'text-gray-300' : 'text-muted-foreground'
                }`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Architecture */}
      <section id="solution" className={`py-20 transition-all duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
          : 'bg-gradient-to-br from-muted to-blue-50'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className={`text-4xl lg:text-5xl font-bold transition-all duration-300 ${
              isDark ? 'text-white' : 'text-foreground'
            }`}>
              Complete <span className="text-green-600">Solution</span> Stack
            </h2>
            <p className={`text-xl max-w-3xl mx-auto transition-all duration-300 ${
              isDark ? 'text-gray-300' : 'text-muted-foreground'
            }`}>
              From field data collection to carbon credit tokenization, our platform provides end-to-end blue carbon MRV capabilities.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                icon: Smartphone,
                title: "Mobile Interface",
                description: "Intuitive mobile app for field teams to upload restoration data, photos, and GPS coordinates with offline capability."
              },
              {
                icon: Globe,
                title: "Drone Integration",
                description: "Automated aerial surveys and satellite imagery analysis for comprehensive ecosystem monitoring and verification."
              },
              {
                icon: Database,
                title: "Blockchain Registry",
                description: "Decentralized ledger ensuring immutable records of all restoration activities with cryptographic proof of authenticity."
              },
              {
                icon: CheckCircle,
                title: "Smart Contracts",
                description: "Automated carbon credit generation and distribution based on verified restoration milestones and growth metrics."
              },
              {
                icon: BarChart3,
                title: "Admin Tools",
                description: "Comprehensive dashboard for NCCR with real-time analytics, compliance monitoring, and stakeholder management."
              },
              {
                icon: Users,
                title: "Stakeholder Portal",
                description: "Dedicated interfaces for NGOs, communities, and panchayats with customized workflows and reporting capabilities."
              }
            ].map((item, index) => (
              <div key={index} className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${
                isDark ? 'bg-gray-800' : 'bg-card'
              }`}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isDark ? 'bg-blue-900/50' : 'bg-blue-100'
                  }`}>
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className={`text-lg font-bold transition-all duration-300 ${
                    isDark ? 'text-white' : 'text-card-foreground'
                  }`}>{item.title}</h3>
                </div>
                <p className={`transition-all duration-300 ${
                  isDark ? 'text-gray-300' : 'text-muted-foreground'
                }`}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-20 transition-all duration-300 ${
        isDark ? 'bg-gray-800' : 'bg-background'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "1M+", label: "Hectares Monitored", icon: Globe },
              { number: "500K", label: "Carbon Credits Generated", icon: Leaf },
              { number: "150+", label: "Communities Onboarded", icon: Users },
              { number: "99.9%", label: "Data Integrity", icon: Shield }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-br from-blue-900/50 to-green-900/50' 
                    : 'bg-gradient-to-br from-blue-100 to-green-100'
                }`}>
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className={`text-4xl font-bold mb-2 transition-all duration-300 ${
                  isDark ? 'text-white' : 'text-foreground'
                }`}>{stat.number}</div>
                <div className={`transition-all duration-300 ${
                  isDark ? 'text-gray-400' : 'text-muted-foreground'
                }`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Blue Carbon Restoration?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join India's pioneering blockchain-powered MRV platform and contribute to transparent, verifiable coastal ecosystem restoration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Schedule Demo
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Anchor className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">BlueCarbon MRV</span>
              </div>
              <p className="text-gray-400 text-sm">
                Transforming coastal ecosystem restoration through blockchain technology and transparent carbon credit generation.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Blockchain Registry</div>
                <div>Mobile App</div>
                <div>Admin Dashboard</div>
                <div>API Documentation</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Documentation</div>
                <div>Case Studies</div>
                <div>White Paper</div>
                <div>Support Center</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>info@bluecarbonmrv.in</div>
                <div>+91 11 XXXX XXXX</div>
                <div>New Delhi, India</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            © 2025 BlueCarbon MRV. All rights reserved. | Privacy Policy | Terms of Service
          </div>
        </div>
      </footer>
    </div>
  );
}