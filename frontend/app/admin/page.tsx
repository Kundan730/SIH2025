"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Users,
  Leaf,
  BarChart3,
  Globe,
  CheckCircle,
  AlertTriangle,
  Database,
  Anchor,
  Sun,
  Moon,
  MapPin,
  Camera,
  Upload,
  Download,
  Eye,
  Calendar,
  TrendingUp,
  Award,
  FileText,
  Bell,
  Settings,
  Filter,
  Search,
  Plus,
  RefreshCw,
  ExternalLink,
  Activity,
  CreditCard,
  Flag,
  UserCheck,
  Clock,
  AlertCircle,
  FileCheck,
  Map,
  Zap,
  Target,
  PieChart,
  LineChart,
} from "lucide-react";

export default function AdminDashboard() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

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
    if (type === "project") return isDark ? "bg-blue-900/50" : "bg-blue-100";
    if (type === "verification") return isDark ? "bg-purple-900/50" : "bg-purple-100";
    if (type === "approval") return isDark ? "bg-green-900/50" : "bg-green-100";
    if (type === "upload") return isDark ? "bg-orange-900/50" : "bg-orange-100";
    return isDark ? "bg-gray-700" : "bg-gray-100";
  };

  const getActivityIcon = (type: string) => {
    if (type === "project") return <Globe className="w-5 h-5 text-blue-600" />;
    if (type === "verification") return <CheckCircle className="w-5 h-5 text-purple-600" />;
    if (type === "approval") return <Shield className="w-5 h-5 text-green-600" />;
    if (type === "upload") return <Upload className="w-5 h-5 text-orange-600" />;
    return <Activity className="w-5 h-5 text-gray-600" />;
  };

  const getApprovalTypeColor = (type: string): string => {
    if (type === "project") return "bg-gradient-to-br from-blue-500 to-blue-700";
    if (type === "data") return "bg-gradient-to-br from-purple-500 to-purple-700";
    if (type === "credits") return "bg-gradient-to-br from-green-500 to-green-700";
    return "bg-gradient-to-br from-gray-500 to-gray-700";
  };

  const getApprovalTypeIcon = (type: string) => {
    if (type === "project") return <Globe className="w-6 h-6 text-white" />;
    if (type === "data") return <Database className="w-6 h-6 text-white" />;
    if (type === "credits") return <Award className="w-6 h-6 text-white" />;
    return <FileText className="w-6 h-6 text-white" />;
  };

  const getStatusBadgeColor = (status: string): string => {
    if (status === "pending_review") return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200";
    if (status === "ai_verified") return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200";
    if (status === "calculating") return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200";
    return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
  };

  const formatStatus = (status: string): string => {
    return status.split("_").map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  const getRegionColor = (index: number): string => {
    const colors = [
      "bg-gradient-to-br from-blue-500 to-blue-700",
      "bg-gradient-to-br from-green-500 to-green-700",
      "bg-gradient-to-br from-purple-500 to-purple-700",
    ];
    return colors[index % colors.length];
  };

  const [activeTab, setActiveTab] = useState("overview");

  const pendingApprovals = [
    {
      id: 1,
      type: "project",
      title: "Gujarat Mangrove Restoration",
      submitter: "Ocean Conservation NGO",
      location: "Gujarat",
      hectares: 120,
      status: "pending_review",
      submitted: "2 days ago",
      priority: "high",
    },
    {
      id: 2,
      type: "data",
      title: "Monthly Drone Survey Data",
      submitter: "Coastal Community Kerala",
      location: "Kerala",
      dataPoints: 450,
      status: "ai_verified",
      submitted: "1 day ago",
      priority: "medium",
    },
    {
      id: 3,
      type: "credits",
      title: "Carbon Credit Generation Request",
      submitter: "Sundarbans Foundation",
      location: "West Bengal",
      creditAmount: 3500,
      status: "calculating",
      submitted: "4 hours ago",
      priority: "high",
    },
  ];

  const stakeholderStats = [
    { label: "Total Stakeholders", value: "247", change: "+12", icon: Users, color: "blue" },
    { label: "Active Projects", value: "89", change: "+5", icon: Globe, color: "green" },
    { label: "Pending Approvals", value: "23", change: "+8", icon: Clock, color: "orange" },
    { label: "Credits Issued", value: "1.2M", change: "+15%", icon: Award, color: "purple" },
  ];

  const recentActivities = [
    {
      user: "Ocean Conservation NGO",
      action: "submitted new project proposal",
      details: "Gujarat Mangrove Restoration - 120 hectares",
      time: "2 hours ago",
      type: "project",
    },
    {
      user: "System AI",
      action: "verified restoration data",
      details: "Kerala Backwater project - 450 data points validated",
      time: "4 hours ago",
      type: "verification",
    },
    {
      user: "Admin (Rajesh K)",
      action: "approved carbon credit generation",
      details: "Sundarbans project - 2,500 credits issued",
      time: "1 day ago",
      type: "approval",
    },
    {
      user: "Coastal Community TN",
      action: "uploaded drone imagery",
      details: "Tamil Nadu Coastal Buffer - 45 new images with GPS data",
      time: "1 day ago",
      type: "upload",
    },
  ];

  // Animation variants
  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
    }),
  };

  const activityVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: i * 0.1 },
    }),
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-green-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Summary with Theme Toggle */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h2 className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
              Dashboard Overview
            </h2>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Welcome back! Here's the current status of the ecosystem monitoring platform.
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`transition-all duration-300 border-2 ${
              isDark
                ? "bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-300"
                : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
            }`}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex space-x-2 mb-8 overflow-x-auto pb-2"
        >
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "approvals", label: "Approvals", icon: CheckCircle },
            { id: "stakeholders", label: "Stakeholders", icon: Users },
          ].map((tab, index) => (
            <motion.div
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? "default" : "outline"}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg"
                    : isDark
                    ? "text-gray-300 hover:bg-gray-700/70 border border-gray-700"
                    : "text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8"
            >
              {/* Stats */}
              <motion.div
                className="grid md:grid-cols-4 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {stakeholderStats.map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={cardVariants}
                    custom={i}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                      isDark ? "bg-gray-800 border border-gray-700" : "bg-white shadow-lg border border-gray-100"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{stat.label}</p>
                        <p className={`text-3xl font-bold mt-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                          {stat.value}
                        </p>
                        <p
                          className={`text-sm mt-2 flex items-center ${
                            stat.change.includes("+") ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {stat.change.includes("+") ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <Activity className="w-3 h-3 mr-1" />
                          )}
                          {stat.change}
                        </p>
                      </div>
                      <motion.div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${getGradientByColor(
                          stat.color
                        )}`}
                        whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                      >
                        <stat.icon className="w-7 h-7 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Recent Activities */}
              <motion.div
                variants={cardVariants}
                custom={0}
                className={`p-6 rounded-2xl ${isDark ? "bg-gray-800 border border-gray-700" : "bg-white shadow-lg border border-gray-100"}`}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Recent Activities</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`${isDark ? "text-blue-400 hover:bg-gray-700" : "text-blue-600 hover:bg-gray-100"}`}
                  >
                    View All
                  </Button>
                </div>
                <ul className="space-y-4">
                  {recentActivities.map((act, idx) => (
                    <motion.li
                      key={idx}
                      variants={activityVariants}
                      custom={idx}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ x: 5 }}
                      className={`flex justify-between p-3 rounded-xl ${
                        isDark ? "hover:bg-gray-700/50" : "hover:bg-gray-50"
                      } transition-colors duration-200`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${getActivityBgColor(
                            act.type,
                            isDark
                          )}`}
                        >
                          {getActivityIcon(act.type)}
                        </div>
                        <div>
                          <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                            <span className="font-semibold">{act.user}</span> {act.action}
                          </p>
                          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{act.details}</p>
                        </div>
                      </div>
                      <span className={`text-sm whitespace-nowrap ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        {act.time}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "approvals" && (
            <motion.div
              key="approvals"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center mb-4"
              >
                <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Pending Approvals</h2>
                <div className="flex space-x-2">
                  <div
                    className={`relative rounded-lg overflow-hidden ${
                      isDark ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <input
                      type="text"
                      placeholder="Search approvals..."
                      className={`py-2 px-4 pr-10 w-64 focus:outline-none transition-all duration-200 ${
                        isDark ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
                      } focus:ring-2 focus:ring-blue-500`}
                    />
                    <Search
                      className={`absolute right-3 top-2.5 w-4 h-4 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`${
                      isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Filter className="w-5 h-5" />
                  </Button>
                </div>
              </motion.div>

              <motion.div
                className="space-y-4"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {pendingApprovals.map((item, i) => (
                  <motion.div
                    key={item.id}
                    variants={cardVariants}
                    custom={i}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-md ${
                      isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex space-x-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${getApprovalTypeColor(
                            item.type
                          )}`}
                        >
                          {getApprovalTypeIcon(item.type)}
                        </div>
                        <div>
                          <h4 className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
                            {item.title}
                          </h4>
                          <p
                            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mt-1`}
                          >
                            by {item.submitter} • {item.location}
                          </p>
                          <div className="flex items-center mt-3 space-x-4">
                            {item.hectares && (
                              <div className="flex items-center">
                                <MapPin
                                  className={`w-4 h-4 mr-1 ${
                                    isDark ? "text-gray-400" : "text-gray-500"
                                  }`}
                                />
                                <span
                                  className={`text-sm ${
                                    isDark ? "text-gray-400" : "text-gray-500"
                                  }`}
                                >
                                  {item.hectares} hectares
                                </span>
                              </div>
                            )}
                            {item.dataPoints && (
                              <div className="flex items-center">
                                <Database
                                  className={`w-4 h-4 mr-1 ${
                                    isDark ? "text-gray-400" : "text-gray-500"
                                  }`}
                                />
                                <span
                                  className={`text-sm ${
                                    isDark ? "text-gray-400" : "text-gray-500"
                                  }`}
                                >
                                  {item.dataPoints} data points
                                </span>
                              </div>
                            )}
                            {item.creditAmount && (
                              <div className="flex items-center">
                                <Award
                                  className={`w-4 h-4 mr-1 ${
                                    isDark ? "text-gray-400" : "text-gray-500"
                                  }`}
                                />
                                <span
                                  className={`text-sm ${
                                    isDark ? "text-gray-400" : "text-gray-500"
                                  }`}
                                >
                                  {item.creditAmount} credits
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span
                          className={`px-3 py-1 rounded-lg text-sm font-medium ${
                            item.priority === "high"
                              ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}
                        >
                          {item.priority.toUpperCase()}
                        </span>
                        <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                          Submitted {item.submitted}
                        </span>
                        <div className={`text-sm px-3 py-1 rounded-lg ${getStatusBadgeColor(item.status)}`}>
                          {formatStatus(item.status)}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4 space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`${
                          isDark
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Review Details
                      </Button>
                      <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">
                        Approve
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {activeTab === "stakeholders" && (
            <motion.div
              key="stakeholders"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center mb-4"
              >
                <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  Stakeholder Management
                </h2>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Stakeholder</span>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                className="grid md:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {["West Bengal", "Kerala", "Tamil Nadu"].map((region, idx) => {
                  const projects = Math.floor(Math.random() * 20) + 5;
                  const credits = Math.floor(Math.random() * 10000) + 1000;
                  const stakeholders = Math.floor(Math.random() * 30) + 10;

                  return (
                    <motion.div
                      key={idx}
                      variants={cardVariants}
                      custom={idx}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                        isDark ? "bg-gray-800 border border-gray-700" : "bg-white shadow-lg border border-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h4 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{region}</h4>
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${getRegionColor(idx)}`}
                        >
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Stakeholders</span>
                          <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{stakeholders}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Active Projects</span>
                          <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{projects}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Credits Issued</span>
                          <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                            {credits.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className={`w-full mt-4 py-2 rounded-lg text-center text-sm font-medium ${
                          isDark
                            ? "bg-gray-700 text-blue-400 hover:bg-gray-600"
                            : "bg-gray-100 text-blue-600 hover:bg-gray-200"
                        } transition-colors duration-200`}
                      >
                        View Details
                      </Button>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div
                variants={cardVariants}
                custom={0}
                className={`p-6 rounded-2xl ${
                  isDark ? "bg-gray-800 border border-gray-700" : "bg-white shadow-lg border border-gray-100"
                }`}
              >
                <h3 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Stakeholder Distribution
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    className={`p-4 rounded-xl ${isDark ? "bg-gray-700/50" : "bg-gray-50"}`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className={`text-lg font-medium mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>By Type</h4>
                    <div className="space-y-3">
                      {[
                        { type: "NGOs", count: 45, color: "bg-blue-500" },
                        { type: "Government Agencies", count: 28, color: "bg-green-500" },
                        { type: "Local Communities", count: 87, color: "bg-purple-500" },
                        { type: "Research Institutions", count: 32, color: "bg-yellow-500" },
                        { type: "Private Companies", count: 55, color: "bg-red-500" },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center"
                        >
                          <div className="w-full flex-1">
                            <div className="flex justify-between mb-1">
                              <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{item.type}</span>
                              <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{item.count}</span>
                            </div>
                            <div className={`w-full h-2 rounded-full ${isDark ? "bg-gray-600" : "bg-gray-200"}`}>
                              <motion.div
                                className={`h-2 rounded-full ${item.color}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${(item.count / 247) * 100}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    className={`p-4 rounded-xl ${isDark ? "bg-gray-700/50" : "bg-gray-50"}`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className={`text-lg font-medium mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                      By Activity Level
                    </h4>
                    <motion.div
                      className="flex items-center justify-center h-48"
                      initial={{ opacity: 0, rotate: -180 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="relative w-40 h-40 rounded-full border-8 border-transparent bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center">
                        <div
                          className={`absolute inset-2 rounded-full ${
                            isDark ? "bg-gray-700" : "bg-white"
                          }`}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <p className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>76%</p>
                            <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Active</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {[
                        { color: "bg-green-500", label: "Active (76%)" },
                        { color: "bg-yellow-500", label: "Occasional (15%)" },
                        { color: "bg-red-500", label: "Inactive (9%)" },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color.replace("bg-", "") }}></div>
                          <span className={`text-xs ${isDark ? "text-gray-300" : "text-gray-700"}`}>{item.label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}