"use client";
import React, { useState } from "react";
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
  const [activeTab, setActiveTab] = useState("overview");
  const [isDark, setIsDark] = useState(false);

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

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-green-50 text-gray-900"
      }`}
    >

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex space-x-2 mb-8">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "approvals", label: "Approvals", icon: CheckCircle },
            { id: "stakeholders", label: "Stakeholders", icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg"
                  : isDark
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              {stakeholderStats.map((stat, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-2xl ${
                    isDark ? "bg-gray-800" : "bg-white shadow-lg"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-400">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p
                        className={`text-sm mt-1 ${
                          stat.change.includes("+") ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {stat.change}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-100`}
                    >
                      <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activities */}
            <div className={`p-6 rounded-2xl ${isDark ? "bg-gray-800" : "bg-white shadow-lg"}`}>
              <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
              <ul className="space-y-3">
                {recentActivities.map((act, idx) => (
                  <li key={idx} className="flex justify-between">
                    <div>
                      <p>
                        <span className="font-semibold">{act.user}</span> {act.action}
                      </p>
                      <p className="text-sm text-gray-400">{act.details}</p>
                    </div>
                    <span className="text-sm text-gray-400">{act.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "approvals" && (
          <div className="space-y-4">
            {pendingApprovals.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  isDark ? "border-gray-700 bg-gray-700/50" : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-400">
                      by {item.submitter} • {item.location}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-lg text-sm ${
                      item.priority === "high" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.priority.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "stakeholders" && (
          <div className="grid md:grid-cols-2 gap-6">
            {["West Bengal", "Kerala", "Tamil Nadu"].map((region, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl ${
                  isDark ? "bg-gray-800" : "bg-white shadow-lg"
                }`}
              >
                <h4 className="font-semibold mb-2">{region}</h4>
                <p className="text-sm text-gray-400">Projects: {Math.floor(Math.random() * 20)}</p>
                <p className="text-sm text-gray-400">Credits Issued: {Math.floor(Math.random() * 10000)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
