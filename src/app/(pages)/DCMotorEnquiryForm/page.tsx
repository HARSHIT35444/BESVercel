'use client'
import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from 'sonner'; // Import from sonner instead

const MotorEnquiryForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Form state
  const [formData, setFormData] = useState({
    motorType: "",
    application: "",
    dutyDescription: "",
    kw: "",
    hp: "",
    armatureVoltage: "",
    fieldVoltage: "",
    baseRpm: "",
    speedVariation: "",
    overloadClass: "",
    delivery: "",
    deliveryDutyDescription: "",
    offerRequirement: "estimated",
    description: "",
    replacement: "no",
    existingMotor: {
      make: "",
      kw: "",
      hp: "",
      rpm: "",
      mounting: "",
      pole: "",
      application: ""
    },
    otherSpecs: ""
  });

  const [uploadedFile, setUploadedFile] = useState<File|null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.docx'))) {
      setUploadedFile(file);
    } else {
      alert('Only DOCX and PDF files are allowed.');
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleExistingMotorChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      existingMotor: {
        ...prev.existingMotor,
        [field]: value
      }
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create a FormData object to handle the file upload
      const formDataToSend = new FormData();
      
      // Append form data
      formDataToSend.append('formData', JSON.stringify(formData));
      
      // Append the file if it exists
      if (uploadedFile) {
        formDataToSend.append('file', uploadedFile);
      }
      
      // Send the form data to your API endpoint
      const response = await fetch('/api/DCsend-email', {
        method: 'POST',
        body: formDataToSend,
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Show success message using Sonner toast
        toast.success("Enquiry Submitted", {
          description: "Your motor enquiry has been submitted successfully. We'll get back to you soon."
        });
        
        // Reset form (optional)
        resetForm();
      } else {
        throw new Error(result.message || 'Failed to submit enquiry');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Show error message using Sonner toast
      toast.error("Error", {
        description: "Failed to submit your enquiry. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setFormData({
      motorType: "",
      application: "",
      dutyDescription: "",
      kw: "",
      hp: "",
      armatureVoltage: "",
      fieldVoltage: "",
      baseRpm: "",
      speedVariation: "",
      overloadClass: "",
      delivery: "",
      deliveryDutyDescription: "",
      offerRequirement: "estimated",
      description: "",
      replacement: "no",
      existingMotor: {
        make: "",
        kw: "",
        hp: "",
        rpm: "",
        mounting: "",
        pole: "",
        application: ""
      },
      otherSpecs: ""
    });
    setUploadedFile(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">DC MOTOR FORM</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Type of Motor */}
          <div className="space-y-2">
            <Label htmlFor="motorType">Type of Motor</Label>
            <Select onValueChange={(value) => handleInputChange("motorType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select motor type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LAMINATED-YOKE">LAMINATED YOKE</SelectItem>
                <SelectItem value="SOLID-YOKE">SOLID YOKE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Application */}
          <div className="space-y-2">
            <Label htmlFor="application">Application</Label>
            <Select onValueChange={(value) => handleInputChange("application", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select application" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="STEEL-ROLLING-MILLS">STEEL ROLLING MILLS</SelectItem>
                <SelectItem value="PLASTIC-MACHINERY">PLASTIC MACHINERY</SelectItem>
                <SelectItem value="SUGAR-MACHINERY">SUGAR MACHINERY</SelectItem>
                <SelectItem value="other">Others</SelectItem>
              </SelectContent>
            </Select>
            {formData.application === "other" && (
              <div className="mt-4">
                <Label htmlFor="dutyDescription">Please specify duty details</Label>
                <Textarea 
                  id="dutyDescription"
                  placeholder="Please describe the duty requirements in detail..."
                  className="mt-2 w-full min-h-[160px] resize-y rounded-md border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 p-3 text-sm shadow-sm hover:border-gray-300"
                  rows={10}
                  maxLength={1000}
                  value={formData.dutyDescription}
                  onChange={(e) => handleInputChange("dutyDescription", e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">Maximum 1000 characters</p>
              </div>
            )}
          </div>

          {/* Power Ratings */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="kw">KW</Label>
              <Input 
                id="kw" 
                type="number" 
                placeholder="Enter KW" 
                value={formData.kw}
                onChange={(e) => handleInputChange("kw", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hp">HP</Label>
              <Input 
                id="hp" 
                type="number" 
                placeholder="Enter HP" 
                value={formData.hp}
                onChange={(e) => handleInputChange("hp", e.target.value)}
              />
            </div>
          </div>

          {/* Voltage Ratings */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="armatureVoltage">Armature Voltage</Label>
              <Input 
                id="armatureVoltage" 
                type="number" 
                placeholder="Enter voltage" 
                value={formData.armatureVoltage}
                onChange={(e) => handleInputChange("armatureVoltage", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fieldVoltage">Field Voltage</Label>
              <Input 
                id="fieldVoltage" 
                type="number" 
                placeholder="Enter voltage" 
                value={formData.fieldVoltage}
                onChange={(e) => handleInputChange("fieldVoltage", e.target.value)}
              />
            </div>
          </div>

          {/* Speed Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="baseRpm">Base RPM</Label>
              <Input 
                id="baseRpm" 
                type="number" 
                placeholder="Enter base RPM" 
                value={formData.baseRpm}
                onChange={(e) => handleInputChange("baseRpm", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="speedVariation">Speed Variation</Label>
              <Input 
                id="speedVariation" 
                placeholder="Enter speed variation" 
                value={formData.speedVariation}
                onChange={(e) => handleInputChange("speedVariation", e.target.value)}
              />
            </div>
          </div>

          {/* Overload Class */}
          <div className="space-y-2">
            <Label htmlFor="overloadClass">Overload Class</Label>
            <Input 
              id="overloadClass" 
              placeholder="Enter Overload Class" 
              value={formData.overloadClass}
              onChange={(e) => handleInputChange("overloadClass", e.target.value)}
            />
          </div>

          {/* Expected Delivery Time */}
          <div className="space-y-2">
            <Label>Expected Delivery Time</Label>
            <Select onValueChange={(value) => handleInputChange("delivery", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select delivery time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EX.STOCK">EX.STOCK</SelectItem>
                <SelectItem value="1-4">1-4 WEEKS</SelectItem>
                <SelectItem value="4-8">4-8 WEEKS</SelectItem>
                <SelectItem value="8">MORE THAN 8 WEEKS</SelectItem>
                <SelectItem value="other">Others</SelectItem>
              </SelectContent>
            </Select>
            {formData.delivery === "other" && (
              <div className="mt-4">
                <Label htmlFor="deliveryDutyDescription">Please specify duty details</Label>
                <Textarea 
                  id="deliveryDutyDescription"
                  placeholder="Please describe the duty requirements in detail..."
                  className="mt-2 w-full min-h-[160px] resize-y rounded-md border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 p-3 text-sm shadow-sm hover:border-gray-300"
                  rows={10}
                  maxLength={1000}
                  value={formData.deliveryDutyDescription}
                  onChange={(e) => handleInputChange("deliveryDutyDescription", e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">Maximum 1000 characters</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Offer Requirement is:</Label>
            <RadioGroup 
              defaultValue="estimated" 
              className="flex space-x-4"
              onValueChange={(value) => handleInputChange("offerRequirement", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="estimated" id="estimated" />
                <Label htmlFor="estimated">Estimated</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="firm" id="firm" />
                <Label htmlFor="firm">Firm</Label>
              </div>
            </RadioGroup>
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <Button type="button" variant="secondary" className="w-full md:w-auto" onClick={handleUploadClick}>
              Upload File
            </Button>
            <input 
              type="file" 
              accept=".pdf,.docx" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              style={{ display: 'none' }} 
            />
            {uploadedFile && (
              <div className="mt-2 flex items-center">
                <p className="mr-2">Uploaded file: {uploadedFile.name}</p>
                <button type="button" onClick={() => setUploadedFile(null)} className="ml-4 text-red-500">
                  &#x2715;
                </button>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Enter any additional details or requirements"
              className="h-32"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          {/* Replacement Radio */}
          <div className="space-y-2">
            <Label>Requirement is for Replacement</Label>
            <RadioGroup 
              defaultValue="no" 
              onValueChange={(value) => handleInputChange("replacement", value)} 
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="replacement-yes" />
                <Label htmlFor="replacement-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="replacement-no" />
                <Label htmlFor="replacement-no">No</Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Existing Motor Details */}
          {formData.replacement === "yes" && (
            <div className="border p-4 rounded-lg space-y-4">
              <h3 className="font-semibold">Provide Existing Motor details:</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Make of Motor</Label>
                  <Input 
                    placeholder="Enter make" 
                    value={formData.existingMotor.make}
                    onChange={(e) => handleExistingMotorChange("make", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>KW</Label>
                  <Input 
                    placeholder="Enter KW" 
                    value={formData.existingMotor.kw}
                    onChange={(e) => handleExistingMotorChange("kw", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>HP</Label>
                  <Input 
                    placeholder="Enter HP" 
                    value={formData.existingMotor.hp}
                    onChange={(e) => handleExistingMotorChange("hp", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>RPM</Label>
                  <Input 
                    placeholder="Enter RPM" 
                    value={formData.existingMotor.rpm}
                    onChange={(e) => handleExistingMotorChange("rpm", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Mounting</Label>
                  <Input 
                    placeholder="Enter mounting" 
                    value={formData.existingMotor.mounting}
                    onChange={(e) => handleExistingMotorChange("mounting", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Pole</Label>
                  <Select onValueChange={(value) => handleExistingMotorChange("pole", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pole" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 Pole</SelectItem>
                      <SelectItem value="4">4 Pole</SelectItem>
                      <SelectItem value="6">6 Pole</SelectItem>
                      <SelectItem value="8">8 Pole</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Application</Label>
                  <Input 
                    placeholder="Enter application" 
                    value={formData.existingMotor.application}
                    onChange={(e) => handleExistingMotorChange("application", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Other Specifications */}
          <div className="space-y-2">
            <Label htmlFor="otherSpecs">Other Specifications</Label>
            <Textarea 
              id="otherSpecs" 
              placeholder="Enter any other specifications"
              className="h-32"
              value={formData.otherSpecs}
              onChange={(e) => handleInputChange("otherSpecs", e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Enquiry"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MotorEnquiryForm;