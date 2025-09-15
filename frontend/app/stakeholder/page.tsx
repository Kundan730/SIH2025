"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Shield, Smartphone, Users, Leaf, BarChart3, Globe, CheckCircle, ArrowRight,
  Waves, TreePine, Database, Anchor, Sun, Moon, MapPin, Camera, Upload,
  Download, Eye, Calendar, TrendingUp, Award, FileText, Bell, Settings,
  Filter, Search, Plus, RefreshCw, ExternalLink, Activity, CreditCard
} from "lucide-react";

interface Project {
  id: number;
  name: string;
  location: string;
  status: "Active" | "Verified" | "Under Review";
  progress: number;
  hectares: number;
  credits: number;
  lastUpdate: string;
  images: number;
  species: string[];
}

interface Activity {
  type: "upload" | "credit" | "verification" | "report";
  action: string;
  time: string;
}

interface Stat {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "blue" | "green" | "orange" | "purple";
}

const StakeholderDashboard: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "credits" | "data" | "reports">("overview");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  const projects: Project[] = [
    {
      id: 1,
      name: "Sundarbans Mangrove Restoration",
      location: "West Bengal",
      status: "Active",
      progress: 75,
      hectares: 150,
      credits: 12500,
      lastUpdate: "2 days ago",
      images: 45,
      species: ["Rhizophora", "Avicennia", "Bruguiera"],
    },
    {
      id: 2,
      name: "Kerala Backwater Conservation",
      location: "Kerala",
      status: "Verified",
      progress: 90,
      hectares: 85,
      credits: 8750,
      lastUpdate: "1 week ago",
      images: 32,
      species: ["Rhizophora", "Kandelia"],
    },
    {
      id: 3,
      name: "Tamil Nadu Coastal Buffer",
      location: "Tamil Nadu",
      status: "Under Review",
      progress: 45,
      hectares: 200,
      credits: 0,
      lastUpdate: "3 days ago",
      images: 28,
      species: ["Avicennia", "Bruguiera", "Ceriops"],
    },
  ];

  const recentActivities: Activity[] = [
    { type: "upload", action: "Uploaded drone footage for Sundarbans project", time: "2 hours ago" },
    { type: "credit", action: "500 carbon credits generated", time: "1 day ago" },
    { type: "verification", action: "Project data verified by AI system", time: "2 days ago" },
    { type: "report", action: "Monthly progress report submitted", time: "1 week ago" },
  ];

  const stats: Stat[] = [
    { label: "Total Projects", value: "3", icon: Globe, color: "blue" },
    { label: "Hectares Monitored", value: "435", icon: TreePine, color: "green" },
    { label: "Credits Earned", value: "21,250", icon: Award, color: "purple" },
    { label: "Data Points", value: "1,247", icon: Database, color: "orange" },
  ];

  // Filter projects based on search query
  useEffect(() => {
    setFilteredProjects(
      projects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, projects]);

  // Helper functions for styling
  const getGradientByColor = (color: string): string => {
    switch (color) {
      case "blue":
        return "from-blue-500 to-blue-700";
      case "green":
        return "from-green-500 to-green-700";
      case "orange":
        return "from-orange-500 to-orange-700";
      case "purple":
        return "from-purple-500 to-purple-700";
      default:
        return "from-blue-500 to-blue-700";
    }
  };

  const getActivityBgColor = (type: string, isDark: boolean): string => {
    if (type === "upload") return isDark ? "bg-blue-900/50" : "bg-blue-100";
    if (type === "credit") return isDark ? "bg-green-900/50" : "bg-green-100";
    if (type === "verification") return isDark ? "bg-purple-900/50" : "bg-purple-100";
    if (type === "report") return isDark ? "bg-orange-900/50" : "bg-orange-100";
    return isDark ? "bg-gray-700" : "bg-gray-100";
  };

  const getActivityIcon = (type: string): JSX.Element => {
    if (type === "upload") return <Camera className="w-5 h-5 text-blue-600" />;
    if (type === "credit") return <Award className="w-5 h-5 text-green-600" />;
    if (type === "verification") return <CheckCircle className="w-5 h-5 text-purple-600" />;
    if (type === "report") return <FileText className="w-5 h-5 text-orange-600" />;
    return <Activity className="w-5 h-5 text-gray-600" />;
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    active: { backgroundColor: "#f00", transition: { duration: 0.3 } },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className={`min-h-screen transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-green-50 text-gray-900"
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="active"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Summary */}
        <motion.div variants={childVariants} className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                Stakeholder Dashboard
              </h2>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Welcome back! Here's the current status of your ecosystem restoration projects.
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`transition-all duration-300 ${
                isDark
                  ? "bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-300"
                  : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
              }`}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div variants={childVariants} className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "projects", label: "Projects", icon: TreePine },
            { id: "credits", label: "Carbon Credits", icon: Award },
            { id: "data", label: "Data Uploads", icon: Upload },
            { id: "reports", label: "Reports", icon: FileText },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              // @ts-ignore
              onClick={() => setActiveTab(tab.id)}
              variants={childVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg"
                  : isDark
                  ? "text-gray-300 hover:bg-gray-700/70 border border-gray-700"
                  : "text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Overview Tab */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={childVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-6 rounded-2xl transition-all duration-300 ${
                      isDark ? "bg-gray-800 border border-gray-700" : "bg-white shadow-lg border border-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{stat.label}</p>
                        <p className={`text-3xl font-bold mt-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                          {stat.value}
                        </p>
                        <p className="text-sm mt-2 text-green-500 flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +12% this month
                        </p>
                      </div>
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${getGradientByColor(
                          stat.color
                        )}`}
                      >
                        <stat.icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Projects */}
                <motion.div
                  variants={childVariants}
                  className={`lg:col-span-2 p-6 rounded-2xl ${
                    isDark ? "bg-gray-800 border border-gray-700" : "bg-white shadow-lg border border-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                      Active Projects
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`text-sm font-medium px-3 py-1 rounded-lg ${
                        isDark ? "text-blue-400 hover:bg-gray-700" : "text-blue-600 hover:bg-gray-100"
                      }`}
                    >
                      View All
                    </motion.button>
                  </div>
                  <div className="space-y-4">
                    {filteredProjects.slice(0, 2).map((project) => (
                      <motion.div
                        key={project.id}
                        variants={childVariants}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-xl border transition-all duration-300 ${
                          isDark ? "border-gray-700 bg-gray-700/50" : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                              {project.name}
                            </h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <MapPin className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                              <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                {project.location}
                              </span>
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              project.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : project.status === "Verified"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Progress</span>
                            <span className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                              {project.progress}%
                            </span>
                          </div>
                          <div className={`w-full h-2 rounded-full ${isDark ? "bg-gray-600" : "bg-gray-200"}`}>
                            <motion.div
                              className="h-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${project.progress}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                          <div className="flex justify-between text-sm mt-3">
                            <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                              {project.hectares} hectares • {project.credits} credits
                            </span>
                            <span className={isDark ? "text-gray-400" : "text-gray-600"}>Updated {project.lastUpdate}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                  variants={childVariants}
                  className={`p-6 rounded-2xl ${
                    isDark ? "bg-gray-800 border border-gray-700" : "bg-white shadow-lg border border-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Recent Activity</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`text-sm font-medium px-3 py-1 rounded-lg ${
                        isDark ? "text-blue-400 hover:bg-gray-700" : "text-blue-600 hover:bg-gray-100"
                      }`}
                    >
                      View All
                    </motion.button>
                  </div>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={index}
                        variants={childVariants}
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-start space-x-3 p-3 rounded-xl ${
                          isDark ? "hover:bg-gray-700/50" : "hover:bg-gray-50"
                        } transition-colors duration-200`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${getActivityBgColor(
                            activity.type,
                            isDark
                          )}`}
                        >
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                            {activity.action}
                          </p>
                          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-6"
            >
              <motion.div variants={childVariants} className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>My Projects</h2>
                <div className="flex space-x-2">
                  <div
                    className={`relative rounded-lg overflow-hidden ${
                      isDark ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                      className={`py-2 px-4 pr-10 w-64 focus:outline-none ${
                        isDark ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    />
                    <Search className={`absolute right-3 top-2.5 w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg ${isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  >
                    <Filter className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Project</span>
                  </motion.button>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={childVariants}
                    whileHover={{ scale: 1.05 }}
                    className={`p-6 rounded-2xl transition-all duration-300 ${
                      isDark ? "bg-gray-800 border border-gray-700" : "bg-white shadow-lg border border-gray-100"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                          {project.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <MapPin className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                          <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            {project.location}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : project.status === "Verified"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className={`text-2xl font-bold text-blue-600`}>{project.hectares}</div>
                        <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Hectares</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold text-green-600`}>{project.credits}</div>
                        <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Credits</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold text-purple-600`}>{project.images}</div>
                        <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Images</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                          Progress
                        </span>
                        <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          {project.progress}%
                        </span>
                      </div>
                      <div className={`w-full h-2 rounded-full ${isDark ? "bg-gray-600" : "bg-gray-200"}`}>
                        <motion.div
                          className="h-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {project.species.slice(0, 2).map((species, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 rounded-full text-xs ${
                              isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {species}
                          </span>
                        ))}
                        {project.species.length > 2 && (
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            +{project.species.length - 2}
                          </span>
                        )}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-blue-600 hover:text-blue-700 p-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Carbon Credits Tab */}
          {activeTab === "credits" && (
            <motion.div
              key="credits"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-6"
            >
              <motion.div variants={childVariants} className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  Carbon Credits
                </h2>
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg border transition-all duration-300 flex items-center space-x-2 ${
                      isDark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Report</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Transfer Credits</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Credits Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Total Credits", value: "21,250", icon: Award, color: "green", trend: "+15% from last month" },
                  { label: "Verified Credits", value: "18,750", icon: CheckCircle, color: "blue", trend: "Blockchain verified" },
                  { label: "Pending Credits", value: "2,500", icon: Activity, color: "purple", trend: "Under verification" },
                ].map((credit, index) => (
                  <motion.div
                    key={index}
                    variants={childVariants}
                    whileHover={{ scale: 1.05 }}
                    className={`p-6 rounded-2xl transition-all duration-300 ${
                      isDark ? "bg-gray-800 border border-gray-700" : "bg-white shadow-lg border border-gray-100"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{credit.label}</p>
                        <p className={`text-2xl font-bold mt-1 ${isDark ? "text-white" : "text-gray-900"}`}>{credit.value}</p>
                      </div>
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${getGradientByColor(
                          credit.color
                        )}`}
                      >
                        <credit.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className={`flex items-center text-${credit.color}-500 text-sm mt-2`}>
                      {credit.label.includes("Total") && <TrendingUp className="w-4 h-4 mr-1" />}
                      {credit.label.includes("Verified") && <Shield className="w-4 h-4 mr-1" />}
                      {credit.label.includes("Pending") && <RefreshCw className="w-4 h-4 mr-1" />}
                      {credit.trend}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Credits by Project */}
              <motion.div
                variants={childVariants}
                className={`p-6 rounded-2xl ${
                  isDark ? "bg-gray-800 border border-gray-700" : "bg-white shadow-lg border border-gray-100"
                }`}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Credits by Project</h3>
                  <div className="flex space-x-2">
                    {["All", "Active", "Verified"].map((filter) => (
                      <motion.button
                        key={filter}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 py-1 rounded-lg text-sm ${
                          isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {filter}
                      </motion.button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      variants={childVariants}
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                        isDark ? "bg-gray-700/50 hover:bg-gray-700" : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <div>
                        <h4 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{project.name}</h4>
                        <p className={`text-sm flex items-center mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          <MapPin className="w-3 h-3 mr-1" />
                          {project.location} • {project.hectares} hectares
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                          {project.credits.toLocaleString()}
                        </div>
                        <div className={`text-sm flex items-center justify-end ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          <Award className="w-3 h-3 mr-1" />
                          credits earned
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  variants={childVariants}
                  className="mt-6 flex justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`text-sm font-medium px-4 py-2 rounded-lg ${
                      isDark ? "bg-gray-700 text-blue-400 hover:bg-gray-600" : "bg-gray-100 text-blue-600 hover:bg-gray-200"
                    } transition-colors duration-200`}
                  >
                    Load More Projects
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Data Uploads Tab (Mock) */}
          {activeTab === "data" && (
            <motion.div
              key="data"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-6"
            >
              <motion.div variants={childVariants} className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Data Uploads</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload New Data</span>
                </motion.button>
              </motion.div>
              <motion.div
                variants={childVariants}
                className={`p-6 rounded-2xl ${
                  isDark ? "bg-gray-800 border border-gray-700" : "bg-white shadow-lg border border-gray-100"
                }`}
              >
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  Upload photos, drone footage, sensor logs, or other documents to support your projects.
                </p>
                <div className="mt-4">
                  <p className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                    Recent Uploads
                  </p>
                  <div className="mt-2 space-y-2">
                    {recentActivities
                      .filter((activity) => activity.type === "upload")
                      .map((activity, index) => (
                        <motion.div
                          key={index}
                          variants={childVariants}
                          whileHover={{ scale: 1.02 }}
                          className={`flex items-center space-x-3 p-3 rounded-xl ${
                            isDark ? "hover:bg-gray-700/50" : "hover:bg-gray-50"
                          }`}
                        >
                          <Camera className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}>{activity.action}</p>
                            <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{activity.time}</p>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Reports Tab (Mock) */}
          {activeTab === "reports" && (
            <motion.div
              key="reports"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-6"
            >
              <motion.div variants={childVariants} className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Reports</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg border transition-all duration-300 flex items-center space-x-2 ${
                    isDark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>Download All Reports</span>
                </motion.button>
              </motion.div>
              <motion.div
                variants={childVariants}
                className={`p-6 rounded-2xl ${
                  isDark ? "bg-gray-800 border border-gray-700" : "bg-white shadow-lg border border-gray-100"
                }`}
              >
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  View and download progress reports for your projects.
                </p>
                <div className="mt-4">
                  <p className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Recent Reports</p>
                  <div className="mt-2 space-y-2">
                    {recentActivities
                      .filter((activity) => activity.type === "report")
                      .map((activity, index) => (
                        <motion.div
                          key={index}
                          variants={childVariants}
                          whileHover={{ scale: 1.02 }}
                          className={`flex items-center space-x-3 p-3 rounded-xl ${
                            isDark ? "hover:bg-gray-700/50" : "hover:bg-gray-50"
                          }`}
                        >
                          <FileText className="w-5 h-5 text-orange-600" />
                          <div>
                            <p className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}>{activity.action}</p>
                            <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{activity.time}</p>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default StakeholderDashboard;