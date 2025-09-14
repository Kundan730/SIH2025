"use client"

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Waves, MapPin, Sprout, Text, Camera, Satellite, Cloud, FileText } from 'lucide-react';
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
    <div className={`min-h-screen py-12 transition-all duration-300 ${
      isDark
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white'
        : 'bg-gradient-to-br from-blue-50 via-background to-green-50 text-foreground'
    }`}>
      <div className="max-w-4xl mx-auto px-4">
        <Card className={`transition-all duration-300 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-card border-border'
        }`}>
          <CardHeader>
            <CardTitle className={`text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent`}>
              Project Data Upload 
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-8" onSubmit={handleSubmit}>
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

              <Button 
                type="submit" 
                className="mt-6 w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Submit Project Data
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}