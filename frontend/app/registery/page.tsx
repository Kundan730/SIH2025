'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ethers } from 'ethers';
import abi from '@/abi/CarbonRegistory.json';
import {
  Upload,
  Waves,
  MapPin,
  Sprout,
  Camera,
  Satellite,
  Cloud,
  FileText,
  ChevronLeft,
  ChevronRight,
  Send,
  ClipboardList,
  Sun,
  Moon,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from 'next-themes';

import { Client } from '@gradio/client';

interface FormData {
  projectName: string;
  location: string;
  plantCount: string;
  species: string;
  notes: string;
  photoFiles: FileList | null;
  droneFiles: FileList | null;
  sensorFiles: FileList | null;
  otherDocs: FileList | null;
}

const ProjectDataUpload: React.FC = () => {
  const [carbonCredits, setCarbonCredits] = useState<number>(0);
  const [areaHectares, setAreaHectares] = useState<number>(0); // Added for area

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [projectName, setProjectName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [plantCount, setPlantCount] = useState<string>('');
  const [species, setSpecies] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [photoFiles, setPhotoFiles] = useState<FileList | null>(null);
  const [droneFiles, setDroneFiles] = useState<FileList | null>(null);
  const [sensorFiles, setSensorFiles] = useState<FileList | null>(null);
  const [otherDocs, setOtherDocs] = useState<FileList | null>(null);
  const [formProgress, setFormProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<
    'project' | 'field' | 'evidence'
  >('project');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');
  const [txHash, setTxHash] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const [projectData, setProjectData] = useState<any>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Calculate form progress
  useEffect(() => {
    let progress = 0;
    const totalFields = 9; // Total required fields

    if (projectName) progress += 11;
    if (location) progress += 11;
    if (plantCount) progress += 11;
    if (species) progress += 11;
    if (notes) progress += 11;
    if (photoFiles && photoFiles.length > 0) progress += 15;
    if (droneFiles && droneFiles.length > 0) progress += 10;
    if (sensorFiles && sensorFiles.length > 0) progress += 10;
    if (otherDocs && otherDocs.length > 0) progress += 10;

    setFormProgress(progress);
  }, [
    projectName,
    location,
    plantCount,
    species,
    notes,
    photoFiles,
    droneFiles,
    sensorFiles,
    otherDocs,
  ]);

  // ✅ Call HF Space when user selects photos
  const handlePhotoUpload = async (files: FileList | null) => {
    setPhotoFiles(files);
    if (!files || files.length === 0) {
      // Reset values when no files
      setCarbonCredits(0);
      setAreaHectares(0);
      setProjectData(null);
      return;
    }

    try {
      setApiLoading(true);
      setApiError(null);
      setStatus('Analyzing uploaded image with AI...');

      // 🔗 Connect to Hugging Face Space
      const client = await Client.connect('Kundan30/blue-carbon');

      // 📤 Send first selected image
      const result = await client.predict('/predict', {
        input_img: files[0], // Gradio client accepts File directly in browser
      });

      console.log('HF API Response:', result.data);

      // ✅ Store full response for debugging
      setProjectData(result.data);

      // ✅ Extract CO2e_tonnes and area_hectares from array [ { area_hectares, CO2e_tonnes } ]
      // @ts-ignore
      const apiData = result.data?.[0];
      if (apiData) {
        const credits = apiData.CO2e_tonnes ?? 0;
        const area = apiData.area_hectares ?? 0;

        setCarbonCredits(credits);
        setAreaHectares(area);

        setStatus(
          `✅ AI Analysis Complete! Detected ${credits} CO2e tonnes from ${area} hectares`
        );
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (err: any) {
      console.error('HF API Error:', err);
      setApiError(err.message || 'API call failed');
      setStatus('❌ Failed to analyze image with AI');
      setCarbonCredits(0);
      setAreaHectares(0);
    } finally {
      setApiLoading(false);
    }
  };

  const contractAddress = '0x0C6E8Cd6C78278CcA0f69F0F185b4E5d4B7789BE';

  // Get contract instance
  const getContract = async () => {
    if (!window.ethereum) throw new Error('No wallet found');
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, abi, signer);
  };

  // Register project on blockchain with actual Carbon Credits from HF API
  const registerWithEvent = async (
    formdata: FormData,
    carbonCreditsValue: number
  ) => {
    try {
      setStatus('Connecting to blockchain...');
      const contract = await getContract();

      // Validate carbon credits from AI
      if (!carbonCreditsValue || carbonCreditsValue <= 0) {
        setStatus(
          '❌ Please upload a photo to get carbon credits calculated by AI'
        );
        return;
      }

      // Convert to wei if needed (assuming contract expects wei)
      // const carbonCreditsInWei = ethers.parseEther(
      //   carbonCreditsValue.toString()
      // );

      setStatus('Submitting transaction to blockchain...');

      console.log('Registering project with:', {
        carbonCredits: carbonCreditsValue,
        location: formdata.location,
        projectName: formdata.projectName,
        timestamp: Math.floor(Date.now() / 1000),
        plantCount: parseInt(formdata.plantCount || '0'),
      });

      const tx = await contract.registerProject(
        Math.floor(carbonCreditsValue), // Use AI-calculated carbon credits in wei
        formdata.location,
        formdata.projectName,
        Math.floor(Date.now() / 1000),
        parseInt(formdata.plantCount || '0')
      );

      setStatus('Transaction submitted, waiting for confirmation...');
      const receipt = await tx.wait();

      console.log('Transaction hash:', tx.hash);
      console.log('Transaction receipt:', receipt);
      console.log('Event logs:', receipt.logs);

      setTxHash(tx.hash);
      setStatus(
        `✅ Project registered successfully with ${carbonCreditsValue} CO2e tonnes!`
      );
      setSubmitSuccess(true);
    } catch (err: any) {
      console.error('Blockchain error:', err);
      let errorMessage = 'Unknown error occurred';

      if (err.message.includes('user rejected')) {
        errorMessage = 'Transaction was rejected by user';
      } else if (err.message.includes('insufficient funds')) {
        errorMessage = 'Insufficient funds for transaction';
      } else if (err.reason) {
        errorMessage = err.reason;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setStatus(`❌ Error: ${errorMessage}`);
      setSubmitSuccess(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');
    setTxHash(null);

    const formData: FormData = {
      projectName,
      location,
      plantCount,
      species,
      notes,
      photoFiles,
      droneFiles,
      sensorFiles,
      otherDocs,
    };

    try {
      // Validate required fields
      if (!projectName.trim()) {
        setStatus('❌ Project name is required');
        return;
      }
      if (!location.trim()) {
        setStatus('❌ Location is required');
        return;
      }
      if (!photoFiles || photoFiles.length === 0) {
        setStatus('❌ Please upload at least one photo for AI analysis');
        return;
      }
      if (carbonCredits <= 0) {
        setStatus(
          '❌ No carbon credits calculated. Please upload a valid photo.'
        );
        return;
      }

      console.log('Form submitted with AI carbon credits:', carbonCredits);

      // Register project with AI-calculated carbon credits
      await registerWithEvent(formData, carbonCredits);
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('❌ Failed to submit project data');
    } finally {
      setIsSubmitting(false);
    }
  };

  // File display helper
  const renderFileList = (files: FileList | null, label: string) => {
    if (!files || files.length === 0) return null;
    return (
      <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <p
          className={`text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          {label} ({files.length} file(s)):
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {Array.from(files).map((file, index) => (
            <span
              key={`${file.name}-${index}`}
              className={`px-2 py-1 rounded text-xs truncate max-w-[150px] ${
                isDark
                  ? 'bg-gray-600 text-gray-200'
                  : 'bg-white text-gray-800 border'
              }`}
            >
              {file.name}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // Status icon
  const getStatusIcon = () => {
    if (status.includes('✅'))
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status.includes('❌'))
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    return null;
  };

  // Styling classes
  const fileInputClasses = `flex items-center space-x-3 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
    isDark
      ? 'border-gray-600 hover:border-blue-400 bg-gray-800 hover:bg-gray-700'
      : 'border-blue-200 hover:border-blue-500 bg-blue-50 hover:bg-blue-100'
  }`;

  const iconClasses = `w-6 h-6 transition-colors duration-300 ${
    isDark ? 'text-blue-400' : 'text-blue-600'
  }`;

  const labelClasses = `font-semibold transition-colors duration-300 ${
    isDark ? 'text-gray-200' : 'text-gray-800'
  }`;

  const navButtonClasses = (section: string) =>
    `px-4 py-2 text-sm font-medium relative flex items-center space-x-2 transition-all duration-300 ${
      activeSection === section
        ? isDark
          ? 'text-blue-400'
          : 'text-blue-600'
        : isDark
        ? 'text-gray-400 hover:text-gray-200'
        : 'text-gray-500 hover:text-gray-700'
    }`;

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    active: {
      backgroundColor: '#f00',
      transition: { duration: 0.3 },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900'
          : 'bg-gradient-to-br from-blue-50 via-white to-green-50'
      }`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="active"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header with Theme Toggle */}
        <motion.div
          variants={childVariants}
          className="flex flex-col sm:flex-row justify-between items-center mb-8"
        >
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Project Data Upload
            </h1>
            <p
              className={`mt-2 text-lg ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Submit restoration project data for carbon credit assessment
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              // @ts-ignore
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`transition-all duration-300 ${
                isDark
                  ? 'bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-300'
                  : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
              aria-label={
                isDark ? 'Switch to light mode' : 'Switch to dark mode'
              }
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
            <span
              className={`text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              {Math.round(formProgress)}% Complete
            </span>
            <div className="w-32 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-green-600"
                initial={{ width: 0 }}
                animate={{ width: `${formProgress}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Carbon Credits Display */}
        {carbonCredits > 0 && (
          <motion.div
            variants={childVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-xl border-2 ${
              isDark
                ? 'bg-green-900/20 border-green-800 text-green-400'
                : 'bg-green-50 border-green-200 text-green-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Sprout className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">
                    AI-Calculated Carbon Credits
                  </h3>
                  <p className="text-sm opacity-80">
                    From uploaded image analysis
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {carbonCredits.toFixed(2)} CO₂e tonnes
                </div>
                <div className="text-sm opacity-80">
                  {areaHectares.toFixed(2)} hectares
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Tabs */}
        <motion.div
          variants={childVariants}
          className="flex space-x-2 mb-8 border-b border-gray-200 dark:border-gray-700"
        >
          {['project', 'field', 'evidence'].map((section) => (
            <button
              key={section}
              onClick={() =>
                setActiveSection(section as 'project' | 'field' | 'evidence')
              }
              className={navButtonClasses(section)}
              disabled={submitSuccess}
            >
              {section === 'project' && <FileText className="w-5 h-5" />}
              {section === 'field' && <ClipboardList className="w-5 h-5" />}
              {section === 'evidence' && <Camera className="w-5 h-5" />}
              <span className="capitalize">{section}</span>
              {activeSection === section && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-green-600"
                  layoutId="underline"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Status Display */}
        {status && (
          <motion.div
            variants={childVariants}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mb-6 p-4 rounded-xl ${
              status.includes('✅')
                ? 'bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800'
                : status.includes('❌')
                ? 'bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800'
                : 'bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-800'
            }`}
          >
            <div className="flex items-center space-x-2">
              {getStatusIcon()}
              <p
                className={`text-sm ${
                  isDark ? 'text-gray-200' : 'text-gray-800'
                }`}
              >
                {status}
              </p>
            </div>
          </motion.div>
        )}

        {/* Transaction Display */}
        {txHash && (
          <motion.div
            variants={childVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 ${
              isDark
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-100'
            } border rounded-lg shadow-lg`}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Transaction Successful</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p
                      className={`text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      Transaction Hash:
                    </p>
                    <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs font-mono block mt-1 break-all">
                      {txHash}
                    </code>
                  </div>
                  <div>
                    <p
                      className={`text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      Carbon Credits Registered:
                    </p>
                    <p className="text-lg font-semibold text-green-600 dark:text-green-400 mt-1">
                      {carbonCredits.toFixed(2)} CO₂e tonnes
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <a
                    href={`https://sepolia.etherscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-2">
                      <span>View on Etherscan</span>
                      <Send className="w-4 h-4" />
                    </div>
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Form - Hidden after success */}
        {!submitSuccess && (
          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence mode="wait">
              {/* Project Information Section */}
              {activeSection === 'project' && (
                <motion.div
                  key="project"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Card
                    className={`shadow-lg transition-all duration-300 ${
                      isDark
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white border-gray-100'
                    } hover:shadow-xl`}
                  >
                    <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                      <motion.div
                        variants={childVariants}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                            Project Information
                          </CardTitle>
                          <p
                            className={`mt-1 text-sm ${
                              isDark ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            Basic details about your restoration project
                          </p>
                        </div>
                        <div
                          className={`p-3 rounded-full transition-colors duration-300 ${
                            isDark ? 'bg-gray-700' : 'bg-blue-50'
                          }`}
                        >
                          <FileText
                            className={`w-6 h-6 ${
                              isDark ? 'text-blue-400' : 'text-blue-600'
                            }`}
                          />
                        </div>
                      </motion.div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <motion.div
                        variants={childVariants}
                        className="space-y-4"
                      >
                        <h3 className="text-xl font-semibold flex items-center space-x-2">
                          <Waves className="w-6 h-6 text-blue-500" />
                          <span>Project Details</span>
                        </h3>
                        <div className="grid gap-6 sm:grid-cols-2">
                          <motion.div variants={childVariants}>
                            <Label
                              htmlFor="projectName"
                              className={labelClasses}
                            >
                              Project / Site Name *
                            </Label>
                            <Input
                              id="projectName"
                              value={projectName}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => setProjectName(e.target.value)}
                              placeholder="e.g., Sundarbans Mangrove Restoration"
                              required
                              className={`mt-1 transition-all duration-300 ${
                                isDark
                                  ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-400'
                                  : 'bg-white border-gray-200 focus:ring-blue-500'
                              }`}
                            />
                          </motion.div>
                          <motion.div variants={childVariants}>
                            <Label htmlFor="location" className={labelClasses}>
                              Location / GPS *
                            </Label>
                            <Input
                              id="location"
                              value={location}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => setLocation(e.target.value)}
                              placeholder="e.g., 21.90° N, 88.92° E"
                              required
                              className={`mt-1 transition-all duration-300 ${
                                isDark
                                  ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-400'
                                  : 'bg-white border-gray-200 focus:ring-blue-500'
                              }`}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Field Reports Section */}
              {activeSection === 'field' && (
                <motion.div
                  key="field"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Card
                    className={`shadow-lg transition-all duration-300 ${
                      isDark
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white border-gray-100'
                    } hover:shadow-xl`}
                  >
                    <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                      <motion.div
                        variants={childVariants}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                            Field Reports
                          </CardTitle>
                          <p
                            className={`mt-1 text-sm ${
                              isDark ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            Details from on-site observations
                          </p>
                        </div>
                        <div
                          className={`p-3 rounded-full transition-colors duration-300 ${
                            isDark ? 'bg-gray-700' : 'bg-green-50'
                          }`}
                        >
                          <ClipboardList
                            className={`w-6 h-6 ${
                              isDark ? 'text-green-400' : 'text-green-600'
                            }`}
                          />
                        </div>
                      </motion.div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <motion.div
                        variants={childVariants}
                        className="space-y-4"
                      >
                        <h3 className="text-xl font-semibold flex items-center space-x-2">
                          <Sprout className="w-6 h-6 text-green-500" />
                          <span>Field Data</span>
                        </h3>
                        <div className="grid gap-6 sm:grid-cols-2">
                          <motion.div variants={childVariants}>
                            <Label
                              htmlFor="plantCount"
                              className={labelClasses}
                            >
                              Plant Count
                            </Label>
                            <Input
                              type="number"
                              id="plantCount"
                              value={plantCount}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => setPlantCount(e.target.value)}
                              placeholder="e.g., 5000"
                              className={`mt-1 transition-all duration-300 ${
                                isDark
                                  ? 'bg-gray-700 text-white border-gray-600 focus:ring-green-400'
                                  : 'bg-white border-gray-200 focus:ring-green-500'
                              }`}
                            />
                          </motion.div>
                          <motion.div variants={childVariants}>
                            <Label htmlFor="species" className={labelClasses}>
                              Plant Species
                            </Label>
                            <Input
                              id="species"
                              value={species}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => setSpecies(e.target.value)}
                              placeholder="e.g., Rhizophora apiculata"
                              className={`mt-1 transition-all duration-300 ${
                                isDark
                                  ? 'bg-gray-700 text-white border-gray-600 focus:ring-green-400'
                                  : 'bg-white border-gray-200 focus:ring-green-500'
                              }`}
                            />
                          </motion.div>
                        </div>
                        <motion.div variants={childVariants}>
                          <Label htmlFor="notes" className={labelClasses}>
                            Notes / Observations
                          </Label>
                          <Textarea
                            id="notes"
                            value={notes}
                            onChange={(
                              e: React.ChangeEvent<HTMLTextAreaElement>
                            ) => setNotes(e.target.value)}
                            placeholder="Enter observations from the field visit..."
                            rows={5}
                            className={`mt-1 transition-all duration-300 ${
                              isDark
                                ? 'bg-gray-700 text-white border-gray-600 focus:ring-green-400'
                                : 'bg-white border-gray-200 focus:ring-green-500'
                            }`}
                          />
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Evidence & Verification Section */}
              {activeSection === 'evidence' && (
                <motion.div
                  key="evidence"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Card
                    className={`shadow-lg transition-all duration-300 ${
                      isDark
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white border-gray-100'
                    } hover:shadow-xl`}
                  >
                    <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                      <motion.div
                        variants={childVariants}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                            Evidence & Verification
                          </CardTitle>
                          <p
                            className={`mt-1 text-sm ${
                              isDark ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            Upload supporting evidence for verification (photos
                            required for AI analysis)
                          </p>
                        </div>
                        <div
                          className={`p-3 rounded-full transition-colors duration-300 ${
                            isDark ? 'bg-gray-700' : 'bg-purple-50'
                          }`}
                        >
                          <Upload
                            className={`w-6 h-6 ${
                              isDark ? 'text-purple-400' : 'text-purple-600'
                            }`}
                          />
                        </div>
                      </motion.div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <motion.div
                        variants={childVariants}
                        className="space-y-4"
                      >
                        <h3 className="text-xl font-semibold flex items-center space-x-2">
                          <Upload className="w-6 h-6 text-purple-500" />
                          <span>Upload Evidence</span>
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="col-span-2">
                            <motion.label
                              variants={childVariants}
                              htmlFor="photos"
                              className={`${fileInputClasses} ${
                                carbonCredits > 0
                                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                  : ''
                              }`}
                            >
                              <Camera
                                className={`${iconClasses} ${
                                  carbonCredits > 0 ? 'text-green-500' : ''
                                }`}
                              />
                              <div className="flex-1">
                                <div
                                  className={`${labelClasses} ${
                                    carbonCredits > 0
                                      ? 'text-green-600 dark:text-green-400'
                                      : ''
                                  }`}
                                >
                                  Upload Photos *{' '}
                                  {carbonCredits > 0 && '✅ Analyzed'}
                                </div>
                                <div
                                  className={`text-sm ${
                                    isDark ? 'text-gray-400' : 'text-gray-500'
                                  }`}
                                >
                                  (Timestamped & GPS-tagged photos - Required
                                  for AI carbon analysis)
                                </div>
                              </div>
                              <Input
                                id="photos"
                                type="file"
                                multiple
                                accept="image/*"
                                className="sr-only"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handlePhotoUpload(e.target.files)}
                              />
                            </motion.label>
                            {renderFileList(photoFiles, 'Photos')}

                            {apiLoading && (
                              <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <div className="flex items-center space-x-2">
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                  <p className="text-sm text-blue-600 dark:text-blue-400">
                                    Analyzing image with AI...
                                  </p>
                                </div>
                              </div>
                            )}

                            {apiError && (
                              <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                <p className="text-sm text-red-600 dark:text-red-400">
                                  Error: {apiError}
                                </p>
                              </div>
                            )}

                            {projectData && carbonCredits > 0 && (
                              <div className="mt-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                                <h4 className="font-semibold text-lg mb-3 text-green-700 dark:text-green-400 flex items-center">
                                  <CheckCircle className="w-5 h-5 mr-2" />
                                  AI Analysis Results
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      Carbon Credits
                                    </p>
                                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                                      {carbonCredits.toFixed(2)} CO₂e tonnes
                                    </p>
                                  </div>
                                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      Area Detected
                                    </p>
                                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                                      {areaHectares.toFixed(2)} hectares
                                    </p>
                                  </div>
                                </div>
                                <details className="mt-3">
                                  <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                                    View Raw API Response
                                  </summary>
                                  <pre className="mt-2 text-xs overflow-x-auto bg-gray-100 dark:bg-gray-700 p-2 rounded">
                                    {JSON.stringify(projectData, null, 2)}
                                  </pre>
                                </details>
                              </div>
                            )}
                          </div>

                          <motion.label
                            variants={childVariants}
                            htmlFor="drone"
                            className={fileInputClasses}
                          >
                            <Satellite className={iconClasses} />
                            <div className="flex-1">
                              <div className={labelClasses}>
                                Drone / Satellite Imagery
                              </div>
                              <div
                                className={`text-sm ${
                                  isDark ? 'text-gray-400' : 'text-gray-500'
                                }`}
                              >
                                (High-resolution aerial data)
                              </div>
                            </div>
                            <Input
                              id="drone"
                              type="file"
                              multiple
                              accept="image/*"
                              className="sr-only"
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => setDroneFiles(e.target.files)}
                            />
                          </motion.label>
                          {renderFileList(droneFiles, 'Drone Imagery')}

                          <motion.label
                            variants={childVariants}
                            htmlFor="sensor"
                            className={fileInputClasses}
                          >
                            <Cloud className={iconClasses} />
                            <div className="flex-1">
                              <div className={labelClasses}>
                                IoT / Sensor Logs
                              </div>
                              <div
                                className={`text-sm ${
                                  isDark ? 'text-gray-400' : 'text-gray-500'
                                }`}
                              >
                                (Water quality, soil data, etc.)
                              </div>
                            </div>
                            <Input
                              id="sensor"
                              type="file"
                              multiple
                              accept=".csv,.json,.txt"
                              className="sr-only"
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => setSensorFiles(e.target.files)}
                            />
                          </motion.label>
                          {renderFileList(sensorFiles, 'Sensor Logs')}

                          <motion.label
                            variants={childVariants}
                            htmlFor="otherDocs"
                            className={fileInputClasses}
                          >
                            <FileText className={iconClasses} />
                            <div className="flex-1">
                              <div className={labelClasses}>
                                Other Documents
                              </div>
                              <div
                                className={`text-sm ${
                                  isDark ? 'text-gray-400' : 'text-gray-500'
                                }`}
                              >
                                (Permits, consent forms, etc.)
                              </div>
                            </div>
                            <Input
                              id="otherDocs"
                              type="file"
                              multiple
                              accept=".pdf,.doc,.docx"
                              className="sr-only"
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => setOtherDocs(e.target.files)}
                            />
                          </motion.label>
                          {renderFileList(otherDocs, 'Other Documents')}
                        </div>
                      </motion.div>
                      <motion.div
                        variants={childVariants}
                        className="space-y-3"
                      >
                        <h3
                          className={`text-sm font-medium ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          Verification Requirements
                        </h3>
                        <div className="space-y-2">
                          {[
                            {
                              text: 'Photos for AI carbon analysis',
                              status: 'required',
                              completed: carbonCredits > 0,
                            },
                            {
                              text: 'Project location and basic details',
                              status: 'required',
                              completed: projectName && location,
                            },
                            {
                              text: 'Satellite imagery of project area',
                              status: 'optional',
                              completed: false,
                            },
                            {
                              text: 'Species inventory documentation',
                              status: 'optional',
                              completed: species.length > 0,
                            },
                          ].map((item, i) => (
                            <motion.div
                              key={i}
                              variants={childVariants}
                              className="flex items-center space-x-3"
                            >
                              <div
                                className={`w-4 h-4 rounded-full ${
                                  item.completed
                                    ? 'bg-green-500'
                                    : item.status === 'required'
                                    ? 'bg-red-500'
                                    : 'bg-yellow-500'
                                }`}
                              />
                              <span
                                className={`text-sm flex-1 ${
                                  isDark ? 'text-gray-300' : 'text-gray-700'
                                } ${
                                  item.completed
                                    ? 'line-through opacity-60'
                                    : ''
                                }`}
                              >
                                {item.text}
                              </span>
                              <span
                                className={`text-xs px-2 py-0.5 rounded ${
                                  item.completed
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                                    : item.status === 'required'
                                    ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200'
                                }`}
                              >
                                {item.completed ? 'completed' : item.status}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.div
              variants={childVariants}
              className="flex justify-between items-center mt-8"
            >
              <div className="flex space-x-3">
                {activeSection !== 'project' && (
                  <Button
                    type="button"
                    variant="outline"
                    className={`flex items-center space-x-2 transition-all duration-300 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-300'
                        : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                    onClick={() => {
                      if (activeSection === 'field')
                        setActiveSection('project');
                      if (activeSection === 'evidence')
                        setActiveSection('field');
                    }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Previous</span>
                  </Button>
                )}
              </div>
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  className={`transition-all duration-300 ${
                    isDark
                      ? 'bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-300'
                      : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  Save Draft
                </Button>
                {activeSection !== 'evidence' ? (
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (activeSection === 'project')
                        setActiveSection('field');
                      if (activeSection === 'field')
                        setActiveSection('evidence');
                    }}
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white transition-all duration-300"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !projectName.trim() ||
                      !location.trim() ||
                      carbonCredits <= 0
                    }
                    className={`bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white transition-all duration-300 ${
                      isSubmitting ||
                      !projectName.trim() ||
                      !location.trim() ||
                      carbonCredits <= 0
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    <span>
                      {isSubmitting
                        ? 'Submitting...'
                        : carbonCredits > 0
                        ? `Submit with ${carbonCredits.toFixed(2)} CO₂e tonnes`
                        : 'Submit Project Data'}
                    </span>
                    <Send className="w-5 h-5 ml-2" />
                  </Button>
                )}
              </div>
            </motion.div>
          </form>
        )}

        {/* Success Message */}
        {submitSuccess && (
          <motion.div variants={childVariants} className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
              Project Successfully Registered!
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              } mb-4`}
            >
              Your project has been registered on the blockchain with{' '}
              {carbonCredits.toFixed(2)} CO₂e tonnes
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => {
                  setSubmitSuccess(false);
                  setTxHash(null);
                  setStatus('');
                  setCarbonCredits(0);
                  setAreaHectares(0);
                  setProjectData(null);
                  setProjectName('');
                  setLocation('');
                  setPlantCount('');
                  setSpecies('');
                  setNotes('');
                  setPhotoFiles(null);
                  setDroneFiles(null);
                  setSensorFiles(null);
                  setOtherDocs(null);
                  setActiveSection('project');
                }}
                variant="outline"
              >
                Register Another Project
              </Button>
              {txHash && (
                <Button>
                  <a
                    href={`https://sepolia.etherscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Transaction
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectDataUpload;
