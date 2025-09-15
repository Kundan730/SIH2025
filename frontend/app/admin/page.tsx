"use client";
import React, { useState } from "react";
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
  // Helper functions for styling
  const getGradientByColor = (color: string): string => {
    switch(color) {
      case 'blue': return 'from-blue-500 to-blue-700';
      case 'green': return 'from-green-500 to-green-700';
      case 'orange': return 'from-orange-500 to-orange-700';
      case 'purple': return 'from-purple-500 to-purple-700';
      default: return 'from-blue-500 to-blue-700';
    }
  };

  const getActivityBgColor = (type: string, isDark: boolean): string => {
    if (type === 'project') return isDark ? 'bg-blue-900/50' : 'bg-blue-100';
    if (type === 'verification') return isDark ? 'bg-purple-900/50' : 'bg-purple-100';
    if (type === 'approval') return isDark ? 'bg-green-900/50' : 'bg-green-100';
    if (type === 'upload') return isDark ? 'bg-orange-900/50' : 'bg-orange-100';
    return isDark ? 'bg-gray-700' : 'bg-gray-100';
  };

  const getActivityIcon = (type: string) => {
    if (type === 'project') return <Globe className="w-5 h-5 text-blue-600" />;
    if (type === 'verification') return <CheckCircle className="w-5 h-5 text-purple-600" />;
    if (type === 'approval') return <Shield className="w-5 h-5 text-green-600" />;
    if (type === 'upload') return <Upload className="w-5 h-5 text-orange-600" />;
    return <Activity className="w-5 h-5 text-gray-600" />;
  };

  const getApprovalTypeColor = (type: string): string => {
    if (type === 'project') return 'bg-gradient-to-br from-blue-500 to-blue-700';
    if (type === 'data') return 'bg-gradient-to-br from-purple-500 to-purple-700';
    if (type === 'credits') return 'bg-gradient-to-br from-green-500 to-green-700';
    return 'bg-gradient-to-br from-gray-500 to-gray-700';
  };

  const getApprovalTypeIcon = (type: string) => {
    if (type === 'project') return <Globe className="w-6 h-6 text-white" />;
    if (type === 'data') return <Database className="w-6 h-6 text-white" />;
    if (type === 'credits') return <Award className="w-6 h-6 text-white" />;
    return <FileText className="w-6 h-6 text-white" />;
  };

  const getStatusBadgeColor = (status: string): string => {
    if (status === 'pending_review') return 'bg-yellow-100 text-yellow-700';
    if (status === 'ai_verified') return 'bg-blue-100 text-blue-700';
    if (status === 'calculating') return 'bg-purple-100 text-purple-700';
    return 'bg-gray-100 text-gray-700';
  };

  const formatStatus = (status: string): string => {
    return status.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getRegionColor = (index: number): string => {
    const colors = [
      'bg-gradient-to-br from-blue-500 to-blue-700',
      'bg-gradient-to-br from-green-500 to-green-700',
      'bg-gradient-to-br from-purple-500 to-purple-700'
    ];
    return colors[index % colors.length];
  };
  const [activeTab, setActiveTab] = useState("overview");
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
      {/* Admin Header */}
      <div className={`w-full py-6 px-8 ${isDark ? 'bg-gray-800/50' : 'bg-white/50 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Admin Control Center
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`relative p-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <Bell className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className={`relative p-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <Settings className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Admin User</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Super Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Summary */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Dashboard Overview
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Welcome back! Here's the current status of the ecosystem monitoring platform.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "approvals", label: "Approvals", icon: CheckCircle },
            { id: "stakeholders", label: "Stakeholders", icon: Users },
          ].map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? "default" : "outline"}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg transform scale-105"
                  : isDark
                  ? "text-gray-300 hover:bg-gray-700/70 border border-gray-700"
                  : "text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </Button>
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
                  className={`p-6 rounded-2xl transition-all duration-300 hover:transform hover:scale-105 ${
                    isDark ? "bg-gray-800 border border-gray-700" : "bg-white shadow-lg border border-gray-100"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                      <p className={`text-3xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                      <p
                        className={`text-sm mt-2 flex items-center ${
                          stat.change.includes("+") ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {stat.change.includes("+") ? <TrendingUp className="w-3 h-3 mr-1" /> : <Activity className="w-3 h-3 mr-1" />}
                        {stat.change}
                      </p>
                    </div>
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${getGradientByColor(stat.color)}`}
                    >
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activities */}
            <div className={`p-6 rounded-2xl ${isDark ? "bg-gray-800 border border-gray-700" : "bg-white shadow-lg border border-gray-100"}`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Activities</h3>
                <Button variant="ghost" size="sm" className={`${isDark ? 'text-blue-400 hover:bg-gray-700' : 'text-blue-600 hover:bg-gray-100'}`}>
                  View All
                </Button>
              </div>
              <ul className="space-y-4">
                {recentActivities.map((act, idx) => (
                  <li key={idx} className={`flex justify-between p-3 rounded-xl ${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'} transition-colors duration-200`}>
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getActivityBgColor(act.type, isDark)}`}>
                        {getActivityIcon(act.type)}
                      </div>
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          <span className="font-semibold">{act.user}</span> {act.action}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{act.details}</p>
                      </div>
                    </div>
                    <span className={`text-sm whitespace-nowrap ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{act.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "approvals" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Pending Approvals</h2>
              <div className="flex space-x-2">
                <div className={`relative rounded-lg overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <input 
                    type="text" 
                    placeholder="Search approvals..." 
                    className={`py-2 px-4 pr-10 w-64 focus:outline-none ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`} 
                  />
                  <Search className={`absolute right-3 top-2.5 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <Button variant="ghost" size="sm" className={`${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  <Filter className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            {pendingApprovals.map((item) => (
              <div
                key={item.id}
                className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-md ${
                  isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getApprovalTypeColor(item.type)}`}>
                      {getApprovalTypeIcon(item.type)}
                    </div>
                    <div>
                      <h4 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h4>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                        by {item.submitter} • {item.location}
                      </p>
                      <div className="flex items-center mt-3 space-x-4">
                        {item.hectares && (
                          <div className="flex items-center">
                            <MapPin className={`w-4 h-4 mr-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.hectares} hectares</span>
                          </div>
                        )}
                        {item.dataPoints && (
                          <div className="flex items-center">
                            <Database className={`w-4 h-4 mr-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.dataPoints} data points</span>
                          </div>
                        )}
                        {item.creditAmount && (
                          <div className="flex items-center">
                            <Award className={`w-4 h-4 mr-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.creditAmount} credits</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        item.priority === "high" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.priority.toUpperCase()}
                    </span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Submitted {item.submitted}</span>
                    <div className={`text-sm px-3 py-1 rounded-lg ${getStatusBadgeColor(item.status)}`}>
                      {formatStatus(item.status)}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <Button variant="outline" size="sm" className={`${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    Review Details
                  </Button>
                  <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">
                    Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "stakeholders" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Stakeholder Management</h2>
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Stakeholder</span>
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {["West Bengal", "Kerala", "Tamil Nadu"].map((region, idx) => {
                const projects = Math.floor(Math.random() * 20) + 5;
                const credits = Math.floor(Math.random() * 10000) + 1000;
                const stakeholders = Math.floor(Math.random() * 30) + 10;
                
                return (
                  <div
                    key={idx}
                    className={`p-6 rounded-2xl transition-all duration-300 hover:transform hover:scale-105 ${
                      isDark ? "bg-gray-800 border border-gray-700" : "bg-white shadow-lg border border-gray-100"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{region}</h4>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRegionColor(idx)}`}>
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Stakeholders</span>
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{stakeholders}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Active Projects</span>
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{projects}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Credits Issued</span>
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{credits.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className={`w-full mt-4 py-2 rounded-lg text-center text-sm font-medium ${isDark ? 'bg-gray-700 text-blue-400 hover:bg-gray-600' : 'bg-gray-100 text-blue-600 hover:bg-gray-200'} transition-colors duration-200`}>
                      View Details
                    </Button>
                  </div>
                );
              })}
            </div>
            
            <div className={`p-6 rounded-2xl ${isDark ? "bg-gray-800 border border-gray-700" : "bg-white shadow-lg border border-gray-100"}`}>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Stakeholder Distribution</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                  <h4 className={`text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>By Type</h4>
                  <div className="space-y-3">
                    {[
                      { type: 'NGOs', count: 45, color: 'bg-blue-500' },
                      { type: 'Government Agencies', count: 28, color: 'bg-green-500' },
                      { type: 'Local Communities', count: 87, color: 'bg-purple-500' },
                      { type: 'Research Institutions', count: 32, color: 'bg-yellow-500' },
                      { type: 'Private Companies', count: 55, color: 'bg-red-500' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center">
                        <div className={`w-full flex-1`}>
                          <div className="flex justify-between mb-1">
                            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.type}</span>
                            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.count}</span>
                          </div>
                          <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
                            <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${(item.count / 247) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                  <h4 className={`text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>By Activity Level</h4>
                  <div className="flex items-center justify-center h-48">
                    <div className="relative w-40 h-40 rounded-full border-8 border-transparent bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center">
                      <div className="absolute inset-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-white'}"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>76%</p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Active</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Active (76%)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Occasional (15%)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Inactive (9%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
