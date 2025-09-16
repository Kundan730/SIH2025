"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ethers } from "ethers";
import abi from "@/abi/CarbonRegistory.json";
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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";

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
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [projectName, setProjectName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [plantCount, setPlantCount] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [photoFiles, setPhotoFiles] = useState<FileList | null>(null);
  const [droneFiles, setDroneFiles] = useState<FileList | null>(null);
  const [sensorFiles, setSensorFiles] = useState<FileList | null>(null);
  const [otherDocs, setOtherDocs] = useState<FileList | null>(null);
  const [formProgress, setFormProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<"project" | "field" | "evidence">("project");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const contractAddress = "0x0C6E8Cd6C78278CcA0f69F0F185b4E5d4B7789BE";

  const getContract = async () =>{
    if (!window.ethereum) throw new Error("No wallet found");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, abi, signer);
  }

  const registerWithEvent = async (formdata: FormData, CarbonCredits: Number ) => {
    try {
      setStatus("Registering (event check)...");
      const contract = await getContract();

      const tx = await contract.registerProject(
        CarbonCredits,
        formdata.location,
        formdata.projectName,
        Math.floor(Date.now() / 1000),
        formdata.plantCount
      );
      const receipt = await tx.wait();
      console.log(tx.hash);
      console.log("Event logs:", receipt.logs);
      setStatus("✅ Project registered & event emitted (check console)");
    } catch (err: any) {
      setStatus("❌ Error: " + err.message);
    }
  };

  useEffect(() => {
    let completed = 0;
    if (projectName) completed += 1;
    if (location) completed += 1;
    if (plantCount) completed += 1;
    if (species) completed += 1;
    if (notes) completed += 1;
    if (photoFiles || droneFiles || sensorFiles || otherDocs) completed += 1;
    setFormProgress((completed / 6) * 100);
  }, [projectName, location, plantCount, species, notes, photoFiles, droneFiles, sensorFiles, otherDocs]);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log(projectName, location, plantCount, species, notes, photoFiles, droneFiles, sensorFiles, otherDocs);

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
    // formData.append("projectName", projectName);
    // formData.append("location", location);
    // formData.append("plantCount", plantCount);
    // formData.append("species", species);
    // formData.append("notes", notes);
    // if (photoFiles) Array.from(photoFiles).forEach((f) => formData.append("photos", f));
    // if (droneFiles) Array.from(droneFiles).forEach((f) => formData.append("drone", f));
    // if (sensorFiles) Array.from(sensorFiles).forEach((f) => formData.append("sensorLogs", f));
    // if (otherDocs) Array.from(otherDocs).forEach((f) => formData.append("otherDocs", f));

    try {
      console.log("Form submitted", formData.projectName);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      registerWithEvent(formData, 10);
      alert("Project data submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit project data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Styling classes
  const fileInputClasses = `flex items-center space-x-3 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
    isDark
      ? "border-gray-600 hover:border-blue-400 bg-gray-800 hover:bg-gray-700"
      : "border-blue-200 hover:border-blue-500 bg-blue-50 hover:bg-blue-100"
  }`;

  const iconClasses = `w-6 h-6 transition-colors duration-300 ${
    isDark ? "text-blue-400" : "text-blue-600"
  }`;

  const labelClasses = `font-semibold transition-colors duration-300 ${
    isDark ? "text-gray-200" : "text-gray-800"
  }`;

  const navButtonClasses = (section: string) =>
    `px-4 py-2 text-sm font-medium relative flex items-center space-x-2 transition-all duration-300 ${
      activeSection === section
        ? isDark
          ? "text-blue-400"
          : "text-blue-600"
        : isDark
        ? "text-gray-400 hover:text-gray-200"
        : "text-gray-500 hover:text-gray-700"
    }`;

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren", // Orchestrate: parent animates before children
        staggerChildren: 0.1,  // Stagger child animations
        delayChildren: 0.2,    // Delay child animations
      },
    },
    active: {
      backgroundColor: "#f00", // Example from your input
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
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"
          : "bg-gradient-to-br from-blue-50 via-white to-green-50"
      }`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="active" // Apply the 'active' variant on hover
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
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Submit restoration project data for carbon credit assessment
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
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
            <span
              className={`text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {Math.round(formProgress)}% Complete
            </span>
            <div className="w-32 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-green-600"
                initial={{ width: 0 }}
                animate={{ width: `${formProgress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          variants={childVariants}
          className="flex space-x-2 mb-8 border-b border-gray-200 dark:border-gray-700"
        >
          {["project", "field", "evidence"].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section as "project" | "field" | "evidence")}
              className={navButtonClasses(section)}
            >
              {section === "project" && <FileText className="w-5 h-5" />}
              {section === "field" && <ClipboardList className="w-5 h-5" />}
              {section === "evidence" && <Camera className="w-5 h-5" />}
              <span className="capitalize">{section}</span>
              {activeSection === section && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-green-600"
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <AnimatePresence mode="wait">
            {/* Project Information Section */}
            {activeSection === "project" && (
              <motion.div
                key="project"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Card
                  className={`shadow-lg transition-all duration-300 ${
                    isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                  } hover:shadow-xl`}
                >
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <motion.div variants={childVariants} className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                          Project Information
                        </CardTitle>
                        <p
                          className={`mt-1 text-sm ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Basic details about your restoration project
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-full transition-colors duration-300 ${
                          isDark ? "bg-gray-700" : "bg-blue-50"
                        }`}
                      >
                        <FileText
                          className={`w-6 h-6 ${
                            isDark ? "text-blue-400" : "text-blue-600"
                          }`}
                        />
                      </div>
                    </motion.div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <motion.div variants={childVariants} className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center space-x-2">
                        <Waves className="w-6 h-6 text-blue-500" />
                        <span>Project Details</span>
                      </h3>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <motion.div variants={childVariants}>
                          <Label htmlFor="projectName" className={labelClasses}>
                            Project / Site Name
                          </Label>
                          <Input
                            id="projectName"
                            value={projectName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setProjectName(e.target.value)
                            }
                            placeholder="e.g., Sundarbans Mangrove Restoration"
                            required
                            className={`mt-1 transition-all duration-300 ${
                              isDark
                                ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-400"
                                : "bg-white border-gray-200 focus:ring-blue-500"
                            }`}
                          />
                        </motion.div>
                        <motion.div variants={childVariants}>
                          <Label htmlFor="location" className={labelClasses}>
                            Location / GPS
                          </Label>
                          <Input
                            id="location"
                            value={location}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setLocation(e.target.value)
                            }
                            placeholder="e.g., 21.90° N, 88.92° E"
                            required
                            className={`mt-1 transition-all duration-300 ${
                              isDark
                                ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-400"
                                : "bg-white border-gray-200 focus:ring-blue-500"
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
            {activeSection === "field" && (
              <motion.div
                key="field"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Card
                  className={`shadow-lg transition-all duration-300 ${
                    isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                  } hover:shadow-xl`}
                >
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <motion.div variants={childVariants} className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                          Field Reports
                        </CardTitle>
                        <p
                          className={`mt-1 text-sm ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Details from on-site observations
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-full transition-colors duration-300 ${
                          isDark ? "bg-gray-700" : "bg-green-50"
                        }`}
                      >
                        <ClipboardList
                          className={`w-6 h-6 ${
                            isDark ? "text-green-400" : "text-green-600"
                          }`}
                        />
                      </div>
                    </motion.div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <motion.div variants={childVariants} className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center space-x-2">
                        <Sprout className="w-6 h-6 text-green-500" />
                        <span>Field Data</span>
                      </h3>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <motion.div variants={childVariants}>
                          <Label htmlFor="plantCount" className={labelClasses}>
                            Area
                          </Label>
                          <Input
                            type="number"
                            id="plantCount"
                            value={plantCount}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setPlantCount(e.target.value)
                            }
                            placeholder="e.g., 5000"
                            className={`mt-1 transition-all duration-300 ${
                              isDark
                                ? "bg-gray-700 text-white border-gray-600 focus:ring-green-400"
                                : "bg-white border-gray-200 focus:ring-green-500"
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setSpecies(e.target.value)
                            }
                            placeholder="e.g., Rhizophora apiculata"
                            className={`mt-1 transition-all duration-300 ${
                              isDark
                                ? "bg-gray-700 text-white border-gray-600 focus:ring-green-400"
                                : "bg-white border-gray-200 focus:ring-green-500"
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
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setNotes(e.target.value)
                          }
                          placeholder="Enter observations from the field visit..."
                          rows={5}
                          className={`mt-1 transition-all duration-300 ${
                            isDark
                              ? "bg-gray-700 text-white border-gray-600 focus:ring-green-400"
                              : "bg-white border-gray-200 focus:ring-green-500"
                            }`}
                        />
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Evidence & Verification Section */}
            {activeSection === "evidence" && (
              <motion.div
                key="evidence"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Card
                  className={`shadow-lg transition-all duration-300 ${
                    isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                  } hover:shadow-xl`}
                >
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <motion.div variants={childVariants} className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                          Evidence & Verification
                        </CardTitle>
                        <p
                          className={`mt-1 text-sm ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Upload supporting evidence for verification
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-full transition-colors duration-300 ${
                          isDark ? "bg-gray-700" : "bg-purple-50"
                        }`}
                      >
                        <Upload
                          className={`w-6 h-6 ${
                            isDark ? "text-purple-400" : "text-purple-600"
                          }`}
                        />
                      </div>
                    </motion.div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <motion.div variants={childVariants} className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center space-x-2">
                        <Upload className="w-6 h-6 text-purple-500" />
                        <span>Upload Evidence</span>
                      </h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <motion.label variants={childVariants} htmlFor="photos" className={fileInputClasses}>
                          <Camera className={iconClasses} />
                          <div className="flex-1">
                            <div className={labelClasses}>Upload Photos</div>
                            <div
                              className={`text-sm ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              (Timestamped & GPS-tagged photos)
                            </div>
                          </div>
                          <Input
                            id="photos"
                            type="file"
                            multiple
                            className="sr-only"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setPhotoFiles(e.target.files)
                            }
                          />
                        </motion.label>
                        <motion.label variants={childVariants} htmlFor="drone" className={fileInputClasses}>
                          <Satellite className={iconClasses} />
                          <div className="flex-1">
                            <div className={labelClasses}>
                              Drone / Satellite Imagery
                            </div>
                            <div
                              className={`text-sm ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              (High-resolution aerial data)
                            </div>
                          </div>
                          <Input
                            id="drone"
                            type="file"
                            multiple
                            className="sr-only"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setDroneFiles(e.target.files)
                            }
                          />
                        </motion.label>
                        <motion.label variants={childVariants} htmlFor="sensor" className={fileInputClasses}>
                          <Cloud className={iconClasses} />
                          <div className="flex-1">
                            <div className={labelClasses}>IoT / Sensor Logs</div>
                            <div
                              className={`text-sm ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              (Water quality, soil data, etc.)
                            </div>
                          </div>
                          <Input
                            id="sensor"
                            type="file"
                            multiple
                            className="sr-only"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setSensorFiles(e.target.files)
                            }
                          />
                        </motion.label>
                        <motion.label variants={childVariants} htmlFor="otherDocs" className={fileInputClasses}>
                          <FileText className={iconClasses} />
                          <div className="flex-1">
                            <div className={labelClasses}>Other Documents</div>
                            <div
                              className={`text-sm ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              (Permits, consent forms, etc.)
                            </div>
                          </div>
                          <Input
                            id="otherDocs"
                            type="file"
                            multiple
                            className="sr-only"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setOtherDocs(e.target.files)
                            }
                          />
                        </motion.label>
                      </div>
                    </motion.div>
                    <motion.div variants={childVariants} className="space-y-3">
                      <h3
                        className={`text-sm font-medium ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Verification Requirements
                      </h3>
                      <div className="space-y-2">
                        {[
                          { text: "Satellite imagery of project area", status: "required" },
                          { text: "Ground-level photographs", status: "required" },
                          { text: "Species inventory documentation", status: "optional" },
                          { text: "Carbon measurement methodology", status: "required" },
                        ].map((item, i) => (
                          <motion.div
                            key={i}
                            variants={childVariants}
                            className="flex items-center space-x-3"
                          >
                            <div
                              className={`w-4 h-4 rounded-full ${
                                item.status === "required" ? "bg-red-500" : "bg-yellow-500"
                              }`}
                            />
                            <span
                              className={`text-sm ${
                                isDark ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              {item.text}
                            </span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded ${
                                item.status === "required"
                                  ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                              }`}
                            >
                              {item.status}
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
              {activeSection !== "project" && (
                <Button
                  type="button"
                  variant="outline"
                  className={`flex items-center space-x-2 transition-all duration-300 ${
                    isDark
                      ? "bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-300"
                      : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                  onClick={() => {
                    if (activeSection === "field") setActiveSection("project");
                    if (activeSection === "evidence") setActiveSection("field");
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
                    ? "bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-300"
                    : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                Save Draft
              </Button>
              {activeSection !== "evidence" ? (
                <Button
                  type="button"
                  onClick={(e) => {
                  e.preventDefault(); 
                  if (activeSection === "project") setActiveSection("field");
                  if (activeSection === "field") setActiveSection("evidence");
                  }}
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white transition-all duration-300"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white transition-all duration-300 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <span>{isSubmitting ? "Submitting..." : "Submit Project Data"}</span>
                  <Send className="w-5 h-5 ml-2" />
                </Button>
              )}
            </div>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default ProjectDataUpload;