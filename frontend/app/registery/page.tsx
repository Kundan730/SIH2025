"use client"

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Waves, MapPin, Sprout, Text, Camera, Satellite, Cloud, FileText, Database, HelpCircle, X, ChevronLeft, ChevronRight, Send, File, Image, ClipboardList } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTheme } from 'next-themes';

export default function ProjectDataUpload() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [plantCount, setPlantCount] = useState<number | ''>('');
  const [species, setSpecies] = useState('');
  const [notes, setNotes] = useState('');
  const [photoFiles, setPhotoFiles] = useState<FileList | null>(null);
  const [droneFiles, setDroneFiles] = useState<FileList | null>(null);
  const [sensorFiles, setSensorFiles] = useState<FileList | null>(null);
  const [otherDocs, setOtherDocs] = useState<FileList | null>(null);

  // Form validation and state
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form progress tracking
  const [formProgress, setFormProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("project");
  
  // Calculate form completion percentage
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct FormData for file uploads
    const formData = new FormData();
    formData.append('projectName', projectName);
    formData.append('location', location);
    formData.append('plantCount', String(plantCount));
    formData.append('species', species);
    formData.append('notes', notes);

    if (photoFiles) Array.from(photoFiles).forEach(f => formData.append('photos', f));
    if (droneFiles) Array.from(droneFiles).forEach(f => formData.append('drone', f));
    if (sensorFiles) Array.from(sensorFiles).forEach(f => formData.append('sensorLogs', f));
    if (otherDocs) Array.from(otherDocs).forEach(f => formData.append('otherDocs', f));

    // TODO: Send to API
    console.log('Form submitted', formData);
    alert('Project data submitted successfully!');
  };

  const fileInputClasses = `flex items-center space-x-2 p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${
    isDark
      ? 'border-gray-600 hover:border-blue-400 bg-gray-700 hover:bg-gray-600'
      : 'border-blue-200 hover:border-blue-500 bg-blue-50 hover:bg-blue-100'
  }`;
  
  const iconClasses = `w-5 h-5 transition-colors duration-300 ${isDark ? 'text-blue-400' : 'text-blue-600'}`;
  const labelClasses = `font-medium transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDark
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white'
        : 'bg-gradient-to-br from-blue-50 via-background to-green-50 text-foreground'
    }`}>
      {/* Registry Header */}
      <div className={`w-full py-6 px-8 ${isDark ? 'bg-gray-800/50' : 'bg-white/50 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Database className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Registry Portal
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`relative p-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <HelpCircle className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center text-white font-bold">
                R
              </div>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Registry User</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Data Validator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Project Data Upload</h1>
            <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Submit new project data for verification and carbon credit assessment</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{Math.round(formProgress)}% Complete</span>
            <div className={`w-32 h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-green-600" 
                style={{ width: `${formProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Form Navigation */}
        <div className={`flex mb-8 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={() => setActiveSection("project")}
            className={`px-4 py-3 font-medium relative ${activeSection === "project" ?
              `${isDark ? 'text-green-400' : 'text-green-600'}` :
              `${isDark ? 'text-gray-400' : 'text-gray-500'} hover:${isDark ? 'text-gray-300' : 'text-gray-700'}`
            }`}
          >
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Project Information</span>
            </div>
            {activeSection === "project" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-green-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveSection("field")}
            className={`px-4 py-3 font-medium relative ${activeSection === "field" ? 
              `${isDark ? 'text-green-400' : 'text-green-600'}` : 
              `${isDark ? 'text-gray-400' : 'text-gray-500'} hover:${isDark ? 'text-gray-300' : 'text-gray-700'}`
            }`}
          >
            <div className="flex items-center space-x-2">
              <ClipboardList className="w-4 h-4" />
              <span>Field Reports</span>
            </div>
            {activeSection === "field" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-green-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveSection("evidence")}
            className={`px-4 py-3 font-medium relative ${activeSection === "evidence" ? 
              `${isDark ? 'text-green-400' : 'text-green-600'}` : 
              `${isDark ? 'text-gray-400' : 'text-gray-500'} hover:${isDark ? 'text-gray-300' : 'text-gray-700'}`
            }`}
          >
            <div className="flex items-center space-x-2">
              <Image className="w-4 h-4" />
              <span>Evidence & Verification</span>
            </div>
            {activeSection === "evidence" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-green-600"></div>
            )}
          </button>
        </div>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <Card className={`transition-all duration-300 ${activeSection !== "project" ? "hidden" : ""} ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-card border-border'
          }`}>
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent`}>
                  Project Information
                </CardTitle>
                <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Basic details about your restoration project
                </p>
              </div>
              <div className={`p-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <FileText className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
              {/* Project Info */}
              <div className="space-y-4">
                <h3 className={`text-xl font-semibold flex items-center space-x-2 ${isDark ? 'text-white' : 'text-foreground'}`}>
                  <Waves className="w-6 h-6 text-blue-500" />
                  <span>Project Information</span>
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="projectName">Project / Site Name</Label>
                    <Input
                      id="projectName"
                      value={projectName}
                      onChange={e => setProjectName(e.target.value)}
                      placeholder="e.g., Sundarbans Mangrove Restoration"
                      required
                      className={isDark ? 'bg-gray-700 text-white border-gray-600' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location / GPS</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      placeholder="e.g., 21.90° N, 88.92° E"
                      required
                      className={isDark ? 'bg-gray-700 text-white border-gray-600' : ''}
                    />
                  </div>
                </div>
              </div>

              <Separator className={isDark ? 'bg-gray-700' : ''} />

              {/* Field Reports */}
              <div className="space-y-4">
                <h3 className={`text-xl font-semibold flex items-center space-x-2 ${isDark ? 'text-white' : 'text-foreground'}`}>
                  <Sprout className="w-6 h-6 text-green-500" />
                  <span>Field Reports</span>
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="plantCount">Plant Count</Label>
                    <Input
                      type="number"
                      id="plantCount"
                      value={plantCount}
                      onChange={e => setPlantCount(Number(e.target.value))}
                      placeholder="e.g., 5000"
                      className={isDark ? 'bg-gray-700 text-white border-gray-600' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="species">Species</Label>
                    <Input
                      id="species"
                      value={species}
                      onChange={e => setSpecies(e.target.value)}
                      placeholder="e.g., Rhizophora apiculata"
                      className={isDark ? 'bg-gray-700 text-white border-gray-600' : ''}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Notes / Observations</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Enter any observations from the field visit..."
                    rows={4}
                    className={isDark ? 'bg-gray-700 text-white border-gray-600' : ''}
                  />
                </div>
              </div>

              <Separator className={isDark ? 'bg-gray-700' : ''} />

              {/* File Uploads */}
              <div className="space-y-6">
                <h3 className={`text-xl font-semibold flex items-center space-x-2 ${isDark ? 'text-white' : 'text-foreground'}`}>
                  <Upload className="w-6 h-6 text-purple-500" />
                  <span>Evidence & Verification</span>
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <label htmlFor="photos" className={fileInputClasses}>
                    <Camera className={iconClasses} />
                    <div className="flex-1">
                      <div className={labelClasses}>Upload Photos</div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-muted-foreground'}`}>
                        (Timestamped & GPS-tagged photos from the site)
                      </div>
                    </div>
                    <Input id="photos" type="file" multiple className="sr-only" onChange={e => setPhotoFiles(e.target.files)} />
                  </label>

                  <label htmlFor="drone" className={fileInputClasses}>
                    <Satellite className={iconClasses} />
                    <div className="flex-1">
                      <div className={labelClasses}>Upload Drone / Satellite Imagery</div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-muted-foreground'}`}>
                        (High-resolution aerial data)
                      </div>
                    </div>
                    <Input id="drone" type="file" multiple className="sr-only" onChange={e => setDroneFiles(e.target.files)} />
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <label htmlFor="sensor" className={fileInputClasses}>
                    <Cloud className={iconClasses} />
                    <div className="flex-1">
                      <div className={labelClasses}>Upload IoT / Sensor Logs</div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-muted-foreground'}`}>
                        (Water quality, soil data, etc.)
                      </div>
                    </div>
                    <Input id="sensor" type="file" multiple className="sr-only" onChange={e => setSensorFiles(e.target.files)} />
                  </label>

                  <label htmlFor="otherDocs" className={fileInputClasses}>
                    <FileText className={iconClasses} />
                    <div className="flex-1">
                      <div className={labelClasses}>Upload Other Documents</div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-muted-foreground'}`}>
                        (Permits, community consent forms, etc.)
                      </div>
                    </div>
                    <Input id="otherDocs" type="file" multiple className="sr-only" onChange={e => setOtherDocs(e.target.files)} />
                  </label>
                </div>
              </div>

          </CardContent>
          </Card>
          
          <Card className={`transition-all duration-300 ${activeSection !== "field" ? "hidden" : ""} ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-card border-border'
          }`}>
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent`}>
                    Field Reports
                  </CardTitle>
                  <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Details from on-site observations
                  </p>
                </div>
                <div className={`p-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <ClipboardList className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="plantCount">Plant Count</Label>
                    <Input
                      type="number"
                      id="plantCount"
                      value={plantCount}
                      onChange={e => setPlantCount(Number(e.target.value))}
                      placeholder="e.g., 5000"
                      className={isDark ? 'bg-gray-700 text-white border-gray-600' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="species">Species</Label>
                    <Input
                      id="species"
                      value={species}
                      onChange={e => setSpecies(e.target.value)}
                      placeholder="e.g., Rhizophora apiculata"
                      className={isDark ? 'bg-gray-700 text-white border-gray-600' : ''}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Notes / Observations</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Enter any observations from the field visit..."
                    rows={4}
                    className={isDark ? 'bg-gray-700 text-white border-gray-600' : ''}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className={`transition-all duration-300 ${activeSection !== "evidence" ? "hidden" : ""} ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-card border-border'
          }`}>
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent`}>
                    Evidence & Verification
                  </CardTitle>
                  <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Upload supporting evidence for verification
                  </p>
                </div>
                <div className={`p-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <Upload className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <label htmlFor="photos" className={fileInputClasses}>
                  <Camera className={iconClasses} />
                  <div className="flex-1">
                    <div className={labelClasses}>Upload Photos</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-muted-foreground'}`}>
                      (Timestamped & GPS-tagged photos from the site)
                    </div>
                  </div>
                  <Input id="photos" type="file" multiple className="sr-only" onChange={e => setPhotoFiles(e.target.files)} />
                </label>

                <label htmlFor="drone" className={fileInputClasses}>
                  <Satellite className={iconClasses} />
                  <div className="flex-1">
                    <div className={labelClasses}>Upload Drone / Satellite Imagery</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-muted-foreground'}`}>
                      (High-resolution aerial data)
                    </div>
                  </div>
                  <Input id="drone" type="file" multiple className="sr-only" onChange={e => setDroneFiles(e.target.files)} />
                </label>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <label htmlFor="sensor" className={fileInputClasses}>
                  <Cloud className={iconClasses} />
                  <div className="flex-1">
                    <div className={labelClasses}>Upload IoT / Sensor Logs</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-muted-foreground'}`}>
                      (Water quality, soil data, etc.)
                    </div>
                  </div>
                  <Input id="sensor" type="file" multiple className="sr-only" onChange={e => setSensorFiles(e.target.files)} />
                </label>

                <label htmlFor="otherDocs" className={fileInputClasses}>
                  <FileText className={iconClasses} />
                  <div className="flex-1">
                    <div className={labelClasses}>Upload Other Documents</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-muted-foreground'}`}>
                      (Permits, community consent forms, etc.)
                    </div>
                  </div>
                  <Input id="otherDocs" type="file" multiple className="sr-only" onChange={e => setOtherDocs(e.target.files)} />
                </label>
              </div>
              
              <div className="space-y-3 mt-4">
                <h3 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Verification Requirements:</h3>
                <div className="space-y-2">
                  {[
                    { text: "Satellite imagery of project area", status: "required" },
                    { text: "Ground-level photographs", status: "required" },
                    { text: "Species inventory documentation", status: "optional" },
                    { text: "Carbon measurement methodology", status: "required" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full ${item.status === 'required' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.text}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${item.status === 'required' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {activeSection !== "project" && (
                <Button
                  type="button"
                  variant="outline"
                  className={`flex items-center space-x-2 ${isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                  onClick={() => {
                    if (activeSection === "field") setActiveSection("project");
                    if (activeSection === "evidence") setActiveSection("field");
                  }}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                className={`${isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'}`}
              >
                Save Draft
              </Button>
              
              {activeSection !== "evidence" ? (
                <Button
                  type="button"
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                  onClick={() => {
                    if (activeSection === "project") setActiveSection("field");
                    if (activeSection === "field") setActiveSection("evidence");
                  }}
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                  type="submit"
                >
                  <span>Submit Project Data</span>
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
