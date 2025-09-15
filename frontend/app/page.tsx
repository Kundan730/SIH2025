"use client";
import React from "react";
import {
  Shield,
  Smartphone,
  Users,
  Leaf,
  BarChart3,
  Globe,
  CheckCircle,
  ArrowRight,
  Waves,
  TreePine,
  Database,
  Anchor,
  Camera,
  Apple,
  Zap
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Page() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Features array
  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Immutable storage of verified plantation and restoration data with cryptographic security.",
      color: "blue",
    },
    {
      icon: Leaf,
      title: "Tokenized Credits",
      description: "Smart contracts automatically generate and manage carbon credit tokens based on verified data.",
      color: "green",
    },
    {
      icon: Smartphone,
      title: "Mobile Integration",
      description: "Field data collection through mobile apps with real-time drone integration capabilities.",
      color: "purple",
    },
    {
      icon: Users,
      title: "Multi-Stakeholder",
      description: "Seamless onboarding for NGOs, communities, and coastal panchayats with role-based access.",
      color: "orange",
    }
  ];

  // Solution architecture cards
  const solutionStack = [
    {
      icon: Smartphone,
      title: "Mobile Interface",
      description: "Intuitive mobile app for field teams to upload restoration data, photos, and GPS coordinates with offline capability.",
    },
    {
      icon: Globe,
      title: "Drone Integration",
      description: "Automated aerial surveys and satellite imagery analysis for comprehensive ecosystem monitoring and verification.",
    },
    {
      icon: Database,
      title: "Blockchain Registry",
      description: "Decentralized ledger ensuring immutable records of all restoration activities with cryptographic proof of authenticity.",
    },
    {
      icon: CheckCircle,
      title: "Smart Contracts",
      description: "Automated carbon credit generation and distribution based on verified restoration milestones and growth metrics.",
    },
    {
      icon: BarChart3,
      title: "Admin Tools",
      description: "Comprehensive dashboard for NCCR with real-time analytics, compliance monitoring, and stakeholder management.",
    },
    {
      icon: Users,
      title: "Stakeholder Portal",
      description: "Dedicated interfaces for NGOs, communities, and panchayats with customized workflows and reporting capabilities.",
    }
  ];

  // Stats cards
  const stats = [
    { number: "1M+", label: "Hectares Monitored", icon: Globe },
    { number: "500K", label: "Carbon Credits Generated", icon: Leaf },
    { number: "150+", label: "Communities Onboarded", icon: Users },
    { number: "99.9%", label: "Data Integrity", icon: Shield },
  ];

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"
          : "bg-gradient-to-br from-blue-50 via-background to-green-50"
      }`}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-blue-600/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-[5%] w-96 h-96 rounded-full bg-green-600/10 blur-3xl"></div>
        <div className="absolute top-[40%] right-[20%] w-72 h-72 rounded-full bg-blue-400/5 blur-2xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-36">
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            isDark
              ? "bg-gradient-to-br from-blue-600/20 via-transparent to-green-600/20"
              : "bg-gradient-to-br from-blue-600/10 via-transparent to-green-600/10"
          }`}
        ></div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 animate-fadeIn ${
                  isDark
                    ? "bg-blue-900/50 text-blue-300 border border-blue-800"
                    : "bg-blue-100 text-blue-700 border border-blue-200"
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Blockchain-Powered Verification</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight animate-slideUp">
                <span className={isDark ? "text-white" : "text-foreground"}>
                  Transforming
                </span>{" "}
                <span className="relative">
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent inline-block">
                    Blue Carbon
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-green-600 rounded-full"></span>
                </span>{" "}
                <span className={isDark ? "text-white" : "text-foreground"}>
                  Restoration
                </span>
              </h1>

              <p
                className={`text-xl leading-relaxed transition-all duration-300 animate-fadeIn opacity-0 animation-delay-200 ${
                  isDark ? "text-gray-300" : "text-muted-foreground"
                }`}
              >
                India's first decentralized Monitoring, Reporting, and Verification (MRV) system for coastal ecosystem restoration. Generate verifiable carbon credits through blockchain technology.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn opacity-0 animation-delay-400">
                <Button
                  variant="gradient"
                  size="lg"
                  animation="scale"
                  className="font-medium"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Launch Platform
                </Button>
                <Button
                  variant="glass"
                  size="lg"
                  animation="bounce"
                  className="font-medium"
                >
                  View Documentation
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-6 animate-fadeIn opacity-0 animation-delay-600">
                <div className="text-center group cursor-pointer transition-all duration-300 hover:scale-110">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    100%
                  </div>
                  <div className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>
                    Transparent
                  </div>
                </div>
                <div className="text-center group cursor-pointer transition-all duration-300 hover:scale-110">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                    24/7
                  </div>
                  <div className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>
                    Monitoring
                  </div>
                </div>
                <div className="text-center group cursor-pointer transition-all duration-300 hover:scale-110">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                    ∞
                  </div>
                  <div className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>
                    Immutable
                  </div>
                </div>
              </div>
            </div>

            <div className="relative animate-fadeIn opacity-0 animation-delay-300">
              <div
                className={`absolute inset-0 rounded-3xl transform rotate-6 transition-all duration-300 animate-pulse ${
                  isDark
                    ? "bg-gradient-to-br from-blue-800 to-green-800 opacity-70"
                    : "bg-gradient-to-br from-blue-200 to-green-200 opacity-80"
                }`}
              ></div>
              <Card
                variant="glass"
                hover="scale"
                className="p-8 rounded-3xl shadow-2xl backdrop-blur-sm transition-all duration-300 border"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${isDark ? "bg-blue-900/50" : "bg-blue-100"}`}>
                        <Waves className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className={`font-semibold ${isDark ? "text-white" : "text-card-foreground"}`}>Coastal Areas</div>
                        <div className={`text-sm ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>Monitored</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${isDark ? "bg-green-900/50" : "bg-green-100"}`}>
                        <TreePine className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className={`font-semibold ${isDark ? "text-white" : "text-card-foreground"}`}>Restoration</div>
                        <div className={`text-sm ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>Verified</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${isDark ? "bg-purple-900/50" : "bg-purple-100"}`}>
                        <Database className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className={`font-semibold ${isDark ? "text-white" : "text-card-foreground"}`}>Blockchain</div>
                        <div className={`text-sm ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>Secured</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${isDark ? "bg-orange-900/50" : "bg-orange-100"}`}>
                        <CheckCircle className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className={`font-semibold ${isDark ? "text-white" : "text-card-foreground"}`}>Credits</div>
                        <div className={`text-sm ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>Tokenized</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-20 transition-all duration-300 ${isDark ? "bg-gray-800" : "bg-background"}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className={`text-4xl lg:text-5xl font-bold transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
              Comprehensive <span className="text-blue-600">MRV</span> Ecosystem
            </h2>
            <p className={`text-xl max-w-3xl mx-auto transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
              Our platform integrates cutting-edge technology to ensure transparent, verifiable, and scalable blue carbon restoration monitoring.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  variant={isDark ? "gradient" : "outline"}
                  hover="lift"
                  className="group p-8"
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                    isDark ? `bg-${feature.color}-900/50` : `bg-${feature.color}-100`
                  }`}>
                    <Icon className={`w-7 h-7 text-${feature.color}-600`} />
                  </div>
                  <h3 className={`text-xl font-bold mb-3 transition-all duration-300 ${isDark ? "text-white" : "text-card-foreground"}`}>
                    {feature.title}
                  </h3>
                  <p className={`leading-relaxed transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solution Architecture */}
      <section id="solution" className={`py-20 transition-all duration-300 ${isDark ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-muted to-blue-50"}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className={`text-4xl lg:text-5xl font-bold transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
              Complete <span className="text-green-600">Solution</span> Stack
            </h2>
            <p className={`text-xl max-w-3xl mx-auto transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
              From field data collection to carbon credit tokenization, our platform provides end-to-end blue carbon MRV capabilities.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {solutionStack.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={index}
                  variant="glass"
                  hover="scale"
                  className="p-6"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${isDark ? "bg-blue-900/50" : "bg-blue-100"}`}>
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className={`text-lg font-bold transition-all duration-300 ${isDark ? "text-white" : "text-card-foreground"}`}>{item.title}</h3>
                  </div>
                  <p className={`transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>{item.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className={`py-20 transition-all duration-300 ${isDark ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-green-50 to-blue-50"}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className={`text-4xl lg:text-5xl font-bold transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
              Project <span className="text-blue-600">Timeline</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
              Our roadmap to revolutionize blue carbon monitoring and verification
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-green-500 rounded-full"></div>
            
            {/* Timeline items */}
            <div className="space-y-24 relative">
              {/* Phase 1 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <Card variant="glass" hover="lift" className="p-6">
                    <h3 className={`text-2xl font-bold mb-2 transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>Phase 1: Platform Development</h3>
                    <p className={`transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
                      Building core infrastructure, mobile app, and blockchain integration
                    </p>
                    <div className="mt-4 text-sm text-blue-600">Q2 2025</div>
                  </Card>
                </div>
                <div className="md:w-1/2 flex justify-start md:justify-start">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center z-10 shadow-lg">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Phase 2 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:text-left order-2 md:order-2 md:pl-12">
                  <Card variant="glass" hover="lift" className="p-6">
                    <h3 className={`text-2xl font-bold mb-2 transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>Phase 2: Pilot Deployments</h3>
                    <p className={`transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
                      Initial deployments in selected coastal regions with community training
                    </p>
                    <div className="mt-4 text-sm text-green-600">Q3 2025</div>
                  </Card>
                </div>
                <div className="md:w-1/2 flex justify-end md:justify-end order-1 md:order-1">
                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center z-10 shadow-lg">
                    <Anchor className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Phase 3 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <Card variant="glass" hover="lift" className="p-6">
                    <h3 className={`text-2xl font-bold mb-2 transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>Phase 3: Full-Scale Launch</h3>
                    <p className={`transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
                      Nationwide deployment with carbon credit marketplace integration
                    </p>
                    <div className="mt-4 text-sm text-blue-600">Q1 2026</div>
                  </Card>
                </div>
                <div className="md:w-1/2 flex justify-start md:justify-start">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center z-10 shadow-lg">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 transition-all duration-300 ${isDark ? "bg-gray-900" : "bg-muted/50"}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className={`text-4xl lg:text-5xl font-bold transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
              What Our <span className="text-green-600">Partners</span> Say
            </h2>
            <p className={`text-xl max-w-3xl mx-auto transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
              Hear from the communities and organizations using our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card variant="glass" hover="lift" className="p-8">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className={`italic mb-6 flex-grow transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
                  "The BlueCarbon MRV platform has transformed how our community manages mangrove restoration. The transparency and ease of use have increased trust among all stakeholders."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">RS</div>
                  <div className="ml-4">
                    <h4 className={`font-bold transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>Rajesh Singh</h4>
                    <p className={`text-sm transition-all duration-300 ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>Coastal Panchayat Leader</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card variant="glass" hover="lift" className="p-8">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className={`italic mb-6 flex-grow transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
                  "As an environmental NGO, we've seen a 40% increase in community participation since implementing the BlueCarbon MRV system. The blockchain verification gives our donors confidence."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white font-bold">PK</div>
                  <div className="ml-4">
                    <h4 className={`font-bold transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>Priya Kumar</h4>
                    <p className={`text-sm transition-all duration-300 ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>NGO Director</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card variant="glass" hover="lift" className="p-8">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className={`italic mb-6 flex-grow transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
                  "The data integrity and verification capabilities of this platform have revolutionized how we monitor coastal ecosystem restoration projects across multiple states."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center text-white font-bold">AM</div>
                  <div className="ml-4">
                    <h4 className={`font-bold transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>Dr. Anil Mishra</h4>
                    <p className={`text-sm transition-all duration-300 ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>Government Scientist</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`py-20 transition-all duration-300 ${isDark ? "bg-gradient-to-br from-blue-900 to-gray-900" : "bg-gradient-to-br from-blue-50 to-green-50"}`}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center">
          <Card variant="gradient" className="p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-green-600/20 z-0"></div>
            <div className="relative z-10">
              <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
                Ready to Transform Coastal Ecosystem Monitoring?
              </h2>
              <p className={`text-xl max-w-3xl mx-auto mb-8 transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
                Join the revolution in blue carbon monitoring, verification, and reporting with our blockchain-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="gradient" size="lg" className="group">
                  Request Demo
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="glass" size="lg">
                  Contact Us
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-20 transition-all duration-300 ${isDark ? "bg-gray-800" : "bg-background"}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 ${
                    isDark ? "bg-gradient-to-br from-blue-900/50 to-green-900/50" : "bg-gradient-to-br from-blue-100 to-green-100"
                  }`}>
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className={`text-4xl font-bold mb-2 transition-all duration-300 ${
                    isDark ? "text-white" : "text-foreground"
                  }`}>{stat.number}</div>
                  <div className={`transition-all duration-300 ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners & Integrations */}
      <section className={`py-20 transition-all duration-300 ${isDark ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-blue-50 to-green-50"}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className={`text-4xl lg:text-5xl font-bold transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
              Our <span className="text-green-600">Ecosystem</span> Partners
            </h2>
            <p className={`text-xl max-w-3xl mx-auto transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
              Collaborating with leading organizations to scale blue carbon initiatives
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {/* Partner logos - using placeholder colored boxes with text for now */}
            <div className={`w-full h-24 flex items-center justify-center rounded-lg transition-all duration-300 ${isDark ? "bg-gray-800" : "bg-white"} shadow-md hover:shadow-lg`}>
              <div className="text-xl font-bold text-blue-600">NCCR</div>
            </div>
            <div className={`w-full h-24 flex items-center justify-center rounded-lg transition-all duration-300 ${isDark ? "bg-gray-800" : "bg-white"} shadow-md hover:shadow-lg`}>
              <div className="text-xl font-bold text-green-600">MoEFCC</div>
            </div>
            <div className={`w-full h-24 flex items-center justify-center rounded-lg transition-all duration-300 ${isDark ? "bg-gray-800" : "bg-white"} shadow-md hover:shadow-lg`}>
              <div className="text-xl font-bold text-purple-600">ISRO</div>
            </div>
            <div className={`w-full h-24 flex items-center justify-center rounded-lg transition-all duration-300 ${isDark ? "bg-gray-800" : "bg-white"} shadow-md hover:shadow-lg`}>
              <div className="text-xl font-bold text-orange-600">ICAR</div>
            </div>
            <div className={`w-full h-24 flex items-center justify-center rounded-lg transition-all duration-300 ${isDark ? "bg-gray-800" : "bg-white"} shadow-md hover:shadow-lg`}>
              <div className="text-xl font-bold text-red-600">WWF India</div>
            </div>
            <div className={`w-full h-24 flex items-center justify-center rounded-lg transition-all duration-300 ${isDark ? "bg-gray-800" : "bg-white"} shadow-md hover:shadow-lg`}>
              <div className="text-xl font-bold text-teal-600">C-CAMP</div>
            </div>
          </div>
          
          <div className="mt-20">
            <div className="text-center space-y-4 mb-16">
              <h3 className={`text-3xl font-bold transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
                Technology <span className="text-blue-600">Integrations</span>
              </h3>
              <p className={`text-xl max-w-3xl mx-auto transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
                Powered by cutting-edge technologies for maximum impact
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card variant="glass" hover="lift" className="p-4 flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 ${isDark ? "bg-blue-900/50" : "bg-blue-100"}`}>
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className={`font-bold transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>Blockchain</h4>
                <p className={`text-sm transition-all duration-300 ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>Ethereum & Polygon</p>
              </Card>
              
              <Card variant="glass" hover="lift" className="p-4 flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 ${isDark ? "bg-green-900/50" : "bg-green-100"}`}>
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <h4 className={`font-bold transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>Satellite Data</h4>
                <p className={`text-sm transition-all duration-300 ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>ISRO & NASA APIs</p>
              </Card>
              
              <Card variant="glass" hover="lift" className="p-4 flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 ${isDark ? "bg-purple-900/50" : "bg-purple-100"}`}>
                  <Smartphone className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className={`font-bold transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>Mobile SDK</h4>
                <p className={`text-sm transition-all duration-300 ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>React Native & Flutter</p>
              </Card>
              
              <Card variant="glass" hover="lift" className="p-4 flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 ${isDark ? "bg-orange-900/50" : "bg-orange-100"}`}>
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className={`font-bold transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>Analytics</h4>
                <p className={`text-sm transition-all duration-300 ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>TensorFlow & PyTorch</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Data Visualization Section */}
      <section className={`py-20 transition-all duration-300 ${isDark ? "bg-gray-900" : "bg-muted/30"}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className={`text-4xl lg:text-5xl font-bold transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
              Data-Driven <span className="text-blue-600">Insights</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
              Powerful analytics and visualizations for informed decision-making
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <Card variant="glass" hover="lift" className="p-6 overflow-hidden">
              <h3 className={`text-xl font-bold mb-4 transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
                Carbon Sequestration Trends
              </h3>
              
              {/* Simulated chart using CSS */}
              <div className="relative h-64 mt-4 mb-6">
                <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                  {/* Chart bars */}
                  <div className="w-1/12 h-[30%] bg-blue-600/80 rounded-t-md mx-0.5"></div>
                  <div className="w-1/12 h-[45%] bg-blue-600/80 rounded-t-md mx-0.5"></div>
                  <div className="w-1/12 h-[40%] bg-blue-600/80 rounded-t-md mx-0.5"></div>
                  <div className="w-1/12 h-[60%] bg-blue-600/80 rounded-t-md mx-0.5"></div>
                  <div className="w-1/12 h-[55%] bg-blue-600/80 rounded-t-md mx-0.5"></div>
                  <div className="w-1/12 h-[70%] bg-blue-600/80 rounded-t-md mx-0.5"></div>
                  <div className="w-1/12 h-[65%] bg-blue-600/80 rounded-t-md mx-0.5"></div>
                  <div className="w-1/12 h-[80%] bg-blue-600/80 rounded-t-md mx-0.5"></div>
                  <div className="w-1/12 h-[75%] bg-blue-600/80 rounded-t-md mx-0.5"></div>
                  <div className="w-1/12 h-[90%] bg-blue-600/80 rounded-t-md mx-0.5"></div>
                  <div className="w-1/12 h-[85%] bg-blue-600/80 rounded-t-md mx-0.5"></div>
                  <div className="w-1/12 h-[95%] bg-blue-600/80 rounded-t-md mx-0.5"></div>
                </div>
                
                {/* Overlay gradient */}
                <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-transparent to-transparent pointer-events-none"></div>
                
                {/* X and Y axis */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-300"></div>
                <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gray-300"></div>
              </div>
              
              <p className={`text-sm transition-all duration-300 ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>
                Monthly carbon sequestration rates across all monitored mangrove sites, showing consistent growth over the past year.
              </p>
            </Card>
            
            <Card variant="glass" hover="lift" className="p-6 overflow-hidden">
              <h3 className={`text-xl font-bold mb-4 transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
                Ecosystem Health Indicators
              </h3>
              
              {/* Simulated radar chart using CSS */}
              <div className="relative h-64 mt-4 mb-6 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border-2 border-gray-200 opacity-30"></div>
                <div className="absolute w-36 h-36 rounded-full border-2 border-gray-200 opacity-30"></div>
                <div className="absolute w-24 h-24 rounded-full border-2 border-gray-200 opacity-30"></div>
                <div className="absolute w-12 h-12 rounded-full border-2 border-gray-200 opacity-30"></div>
                
                {/* Radar chart lines */}
                <div className="absolute w-full h-0.5 bg-gray-200 opacity-30 transform rotate-0"></div>
                <div className="absolute w-full h-0.5 bg-gray-200 opacity-30 transform rotate-45"></div>
                <div className="absolute w-full h-0.5 bg-gray-200 opacity-30 transform rotate-90"></div>
                <div className="absolute w-full h-0.5 bg-gray-200 opacity-30 transform rotate-135"></div>
                
                {/* Data polygon */}
                <div className="absolute w-full h-full">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon 
                      points="50,10 85,25 90,60 65,85 35,85 10,60 15,25" 
                      fill="rgba(34, 197, 94, 0.2)" 
                      stroke="#22c55e" 
                      strokeWidth="1.5"
                    />
                    <circle cx="50" cy="10" r="2" fill="#22c55e" />
                    <circle cx="85" cy="25" r="2" fill="#22c55e" />
                    <circle cx="90" cy="60" r="2" fill="#22c55e" />
                    <circle cx="65" cy="85" r="2" fill="#22c55e" />
                    <circle cx="35" cy="85" r="2" fill="#22c55e" />
                    <circle cx="10" cy="60" r="2" fill="#22c55e" />
                    <circle cx="15" cy="25" r="2" fill="#22c55e" />
                  </svg>
                </div>
              </div>
              
              <p className={`text-sm transition-all duration-300 ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>
                Comprehensive health assessment of restored ecosystems based on biodiversity, growth rate, water quality, and soil composition metrics.
              </p>
            </Card>
            
            <Card variant="glass" hover="lift" className="p-6 overflow-hidden">
              <h3 className={`text-xl font-bold mb-4 transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
                Community Engagement Metrics
              </h3>
              
              {/* Simulated pie chart using CSS */}
              <div className="relative h-64 mt-4 mb-6 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full overflow-hidden relative">
                  <div className="absolute w-full h-full bg-blue-600 origin-bottom-right transform rotate-45"></div>
                  <div className="absolute w-full h-full bg-green-600 origin-bottom-left transform -rotate-45"></div>
                  <div className="absolute w-full h-full bg-purple-600 origin-top-left transform rotate-[135deg]"></div>
                  <div className="absolute w-full h-full bg-orange-600 origin-top-right transform rotate-[225deg] scale-[0.65]"></div>
                  <div className="absolute w-16 h-16 rounded-full bg-card top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                
                {/* Legend */}
                <div className="absolute bottom-0 right-0 flex flex-col space-y-1 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-600 mr-1"></div>
                    <span className={`transition-all duration-300 ${isDark ? "text-gray-300" : "text-foreground"}`}>NGOs</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-600 mr-1"></div>
                    <span className={`transition-all duration-300 ${isDark ? "text-gray-300" : "text-foreground"}`}>Panchayats</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-600 mr-1"></div>
                    <span className={`transition-all duration-300 ${isDark ? "text-gray-300" : "text-foreground"}`}>Schools</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-600 mr-1"></div>
                    <span className={`transition-all duration-300 ${isDark ? "text-gray-300" : "text-foreground"}`}>Others</span>
                  </div>
                </div>
              </div>
              
              <p className={`text-sm transition-all duration-300 ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>
                Distribution of stakeholder participation in restoration activities, showing strong engagement from local panchayats and educational institutions.
              </p>
            </Card>
            
            <Card variant="glass" hover="lift" className="p-6 overflow-hidden">
              <h3 className={`text-xl font-bold mb-4 transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
                Geographic Distribution
              </h3>
              
              {/* Simulated map using CSS */}
              <div className="relative h-64 mt-4 mb-6 bg-blue-50 rounded-lg overflow-hidden">
                {/* India outline shape - simplified representation */}
                <div className="absolute w-3/4 h-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path 
                      d="M30,10 C40,5 60,5 70,10 C80,15 85,25 90,40 C95,55 90,70 80,80 C70,90 50,95 30,85 C20,80 15,70 10,55 C5,40 10,25 20,15 C25,12 28,12 30,10 Z" 
                      fill="#e6f2ff" 
                      stroke="#3b82f6" 
                      strokeWidth="1"
                    />
                  </svg>
                  
                  {/* Data points */}
                  <div className="absolute top-[20%] left-[30%] w-3 h-3 bg-green-600 rounded-full transform scale-100 opacity-70 animate-pulse"></div>
                  <div className="absolute top-[40%] left-[20%] w-4 h-4 bg-green-600 rounded-full transform scale-100 opacity-70 animate-pulse"></div>
                  <div className="absolute top-[60%] left-[40%] w-5 h-5 bg-green-600 rounded-full transform scale-100 opacity-70 animate-pulse"></div>
                  <div className="absolute top-[70%] left-[70%] w-3 h-3 bg-green-600 rounded-full transform scale-100 opacity-70 animate-pulse"></div>
                  <div className="absolute top-[30%] left-[80%] w-2 h-2 bg-green-600 rounded-full transform scale-100 opacity-70 animate-pulse"></div>
                  <div className="absolute top-[50%] left-[60%] w-4 h-4 bg-green-600 rounded-full transform scale-100 opacity-70 animate-pulse"></div>
                </div>
              </div>
              
              <p className={`text-sm transition-all duration-300 ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>
                Coastal restoration project sites across India, with size indicating relative carbon sequestration potential of each location.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Mobile App Showcase */}
      <section className={`py-20 transition-all duration-300 ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative w-full max-w-xs mx-auto">
                {/* Phone frame */}
                <div className="relative z-10 border-8 border-gray-800 rounded-[3rem] overflow-hidden shadow-2xl aspect-[9/19] bg-gray-900">
                  {/* Phone screen content */}
                  <div className="absolute inset-0 overflow-hidden">
                    {/* App header */}
                    <div className="bg-blue-600 p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-white"></div>
                          </div>
                        </div>
                        <span className="text-white font-bold text-sm">BlueCarbon</span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-4 h-4 rounded-full bg-white/20"></div>
                        <div className="w-4 h-4 rounded-full bg-white/20"></div>
                      </div>
                    </div>
                    
                    {/* App content */}
                    <div className="p-3 bg-gray-100 h-full">
                      {/* Map view */}
                      <div className="rounded-lg overflow-hidden h-1/3 bg-blue-50 mb-3 relative">
                        <div className="absolute inset-0 bg-blue-200 opacity-50"></div>
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-600 rounded-full transform scale-100 opacity-70 animate-ping"></div>
                        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-green-600 rounded-full transform scale-100 opacity-70 animate-ping"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-blue-600 rounded-full transform scale-100 opacity-70 animate-ping"></div>
                      </div>
                      
                      {/* Stats cards */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                          <div className="text-xs text-gray-500">Carbon Credits</div>
                          <div className="text-sm font-bold text-blue-600">1,240 tCO₂</div>
                        </div>
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                          <div className="text-xs text-gray-500">Area Monitored</div>
                          <div className="text-sm font-bold text-green-600">328 ha</div>
                        </div>
                      </div>
                      
                      {/* Activity feed */}
                      <div className="bg-white rounded-lg p-2 shadow-sm">
                        <div className="text-xs font-bold mb-2">Recent Activity</div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <div className="text-[0.6rem] text-gray-600">New data collected at Site #42</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <div className="text-[0.6rem] text-gray-600">10 credits verified on blockchain</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                            <div className="text-[0.6rem] text-gray-600">Drone survey scheduled for tomorrow</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Phone highlights/reflections */}
                <div className="absolute top-[5%] left-[10%] right-[10%] h-[30%] bg-gradient-to-br from-white/20 to-transparent rounded-full blur-md z-20 opacity-30"></div>
                
                {/* Phone shadow */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[70%] h-6 bg-black/20 rounded-full blur-md"></div>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <h2 className={`text-4xl font-bold mb-6 transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
                Powerful Mobile <span className="text-blue-600">Companion</span>
              </h2>
              
              <div className="space-y-6">
                <Card variant="glass" hover="lift" className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold mb-1 transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>Field Data Collection</h3>
                      <p className={`text-sm transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
                        Collect georeferenced data even in offline mode with automatic sync when connectivity is restored.
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card variant="glass" hover="lift" className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold mb-1 transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>Visual Documentation</h3>
                      <p className={`text-sm transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
                        Capture photos and videos with embedded metadata for comprehensive ecosystem monitoring.
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card variant="glass" hover="lift" className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold mb-1 transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>Real-time Notifications</h3>
                      <p className={`text-sm transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
                        Stay updated with instant alerts on credit generation, verification events, and community activities.
                      </p>
                    </div>
                  </div>
                </Card>
                
                <div className="pt-4">
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg">
                      <Apple className="w-5 h-5" />
                      <span className="text-sm font-medium">App Store</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg">
                      <Smartphone className="w-5 h-5" />
                      <span className="text-sm font-medium">Google Play</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

      {/* FAQ Section */}
      <section className={`py-20 transition-all duration-300 ${isDark ? "bg-gray-800" : "bg-background"}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className={`text-4xl lg:text-5xl font-bold transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
              Everything you need to know about our blue carbon monitoring platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card variant="glass" hover="lift" className="p-6">
              <h3 className={`text-xl font-bold mb-3 transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
                How does the blockchain ensure data integrity?
              </h3>
              <p className={`transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
                Our platform uses a distributed ledger technology that creates an immutable record of all restoration activities. Each data point is cryptographically secured and verified by multiple nodes in the network, making it impossible to alter historical records without consensus.
              </p>
            </Card>
            
            <Card variant="glass" hover="lift" className="p-6">
              <h3 className={`text-xl font-bold mb-3 transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
                Can the system work in areas with limited connectivity?
              </h3>
              <p className={`transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
                Yes! Our mobile application is designed with offline capabilities. Field teams can collect data without internet access, and the app will automatically sync and verify the information once connectivity is restored.
              </p>
            </Card>
            
            <Card variant="glass" hover="lift" className="p-6">
              <h3 className={`text-xl font-bold mb-3 transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
                How are carbon credits generated and verified?
              </h3>
              <p className={`transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
                Carbon credits are generated through smart contracts that analyze verified restoration data against established methodologies. Our system combines satellite imagery, drone surveys, and field measurements to calculate carbon sequestration rates with high accuracy.
              </p>
            </Card>
            
            <Card variant="glass" hover="lift" className="p-6">
              <h3 className={`text-xl font-bold mb-3 transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
                What training is provided for community participants?
              </h3>
              <p className={`transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
                We provide comprehensive training programs for all stakeholders, including mobile app usage, data collection protocols, and verification procedures. Our training includes both in-person workshops and digital learning modules accessible through the platform.
              </p>
            </Card>
            
            <Card variant="glass" hover="lift" className="p-6">
              <h3 className={`text-xl font-bold mb-3 transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
                How does the platform handle different ecosystem types?
              </h3>
              <p className={`transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
                The platform is designed to support multiple blue carbon ecosystems including mangroves, salt marshes, and seagrass meadows. Each ecosystem type has specialized data collection protocols and carbon calculation methodologies built into the system.
              </p>
            </Card>
            
            <Card variant="glass" hover="lift" className="p-6">
              <h3 className={`text-xl font-bold mb-3 transition-all duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
                Is the platform compliant with international standards?
              </h3>
              <p className={`transition-all duration-300 ${isDark ? "text-gray-300" : "text-muted-foreground"}`}>
                Yes, our platform adheres to international carbon credit standards including Verra VCS, Gold Standard, and is aligned with UNFCCC methodologies. All verification processes are designed to meet or exceed these standards for maximum market acceptance.
              </p>
            </Card>
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

