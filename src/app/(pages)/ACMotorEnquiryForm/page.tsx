'use client'
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const ACMotorForm = () => {
  const [dutyType, setDutyType] = useState<string>("");
  const [mounting, setMounting] = useState<string>("");
  const [motor, setMotor] = useState<string>("");
  const [voltage, setVoltage] = useState<string>("");
  const [shaft, setShaft] = useState<string>("");
  const [delivery, setDelivery] = useState<string>("");
  const [replacement, setReplacement] = useState<string>("no");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">AC MOTOR FORM</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input id="company" placeholder="Enter company name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company Address</Label>
              <Input id="company" placeholder="Enter company name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter email" 
                required
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                title="Enter a valid email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input 
                id="mobile" 
                type="tel" 
                placeholder="Enter mobile number" 
                required
                pattern="^[0-9]{10}$"
                maxLength={10}
                minLength={10}
                inputMode="numeric"
                title="Please enter exactly 10 digits"
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  const input = e.currentTarget;
                  input.value = input.value.replace(/[^0-9]/g, '').slice(0, 10);
                }}
              />
            </div>
          </div>

          {/* Motor Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="make">Make of Motor</Label>
              <Input id="make" placeholder="Enter make" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kw">KW</Label>
              <Input id="kw" placeholder="Enter KW" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hp">HP</Label>
              <Input id="hp" placeholder="Enter HP" />
            </div>
          </div>

          {/* Dropdown Selections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Duty</Label>
              <Select onValueChange={(value) => setDutyType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="s1">S1</SelectItem>
                  <SelectItem value="s2">S2</SelectItem>
                  <SelectItem value="s3">S3</SelectItem>
                  <SelectItem value="s4">S4</SelectItem>
                  <SelectItem value="other">Others</SelectItem>
                </SelectContent>
              </Select>
              {(["s1", "s2", "s3", "s4"].includes(dutyType)) && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cdf">CDF</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25%">25%</SelectItem>
                        <SelectItem value="40%">40%</SelectItem>
                        <SelectItem value="60%">60%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startsPerHour">No of Starts per Hour</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="150">150</SelectItem>
                        <SelectItem value="300">300</SelectItem>

                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              {dutyType === "other" && (
                <div className="mt-4">
                  <Label htmlFor="dutyDescription">Please specify duty details</Label>
                  <Textarea 
                    id="dutyDescription"
                    placeholder="Please describe the duty requirements in detail..."
                    className="mt-2 w-full min-h-[160px] resize-y rounded-md border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 p-3 text-sm shadow-sm hover:border-gray-300"
                    rows={10}
                    maxLength={1000}
                  />
                  <p className="text-sm text-gray-500 mt-1">Maximum 1000 characters</p>
                </div>
              )}
             
            </div>
            <div className="space-y-2">
              <Label>RPM Mounting</Label>
              <Select onValueChange={(value) => setMounting(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select mounting" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="B3 - FOOT">B3 - FOOT</SelectItem>
                  <SelectItem value="B5 - FLANGE">B5 - FLANGE</SelectItem>
                  <SelectItem value="B35 - FOOT CUM FLANGE">B35 - FOOT CUM FLANGE</SelectItem>
                  <SelectItem value="V1 - VERTICAL FLANGE">V1 - VERTICAL FLANGE</SelectItem>
                  <SelectItem value="B14 - FACE MOUNTED">B14 - FACE MOUNTED</SelectItem>
                  <SelectItem value="other">Others</SelectItem>
                </SelectContent>
              </Select>
              {mounting === "other" && (
                <div className="mt-4">
                  <Label htmlFor="dutyDescription">Please specify duty details</Label>
                  <Textarea 
                    id="dutyDescription"
                    placeholder="Please describe the duty requirements in detail..."
                    className="mt-2 w-full min-h-[160px] resize-y rounded-md border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 p-3 text-sm shadow-sm hover:border-gray-300"
                    rows={10}
                    maxLength={1000}
                  />
                  <p className="text-sm text-gray-500 mt-1">Maximum 1000 characters</p>
                </div>
              )}
            </div>
          </div>

          {/* <div className="space-y-2">
            <Label>RPM</Label>
            <Input placeholder="Enter RPM" />
          </div> */}

          {/* More Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type of Motor</Label>
              <Select onValueChange={(value) => setMotor(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select motor type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TEFC - SAFE AREA STANDARD">TEFC - SAFE AREA STANDARD</SelectItem>
                  <SelectItem value="FLAME PROOF - GAS GROUP IIA/IIB">FLAME PROOF - GAS GROUP IIA/IIB</SelectItem>
                  <SelectItem value="FLAME PROOF - GAS GROUP IIC">FLAME PROOF - GAS GROUP IIC</SelectItem>
                  <SelectItem value="INCREASED SAFETY - Ex'e'">INCREASED SAFETY - Ex&quot;e&quot;</SelectItem>
                  <SelectItem value="NON SPARKING - Ex'n'">NON SPARKING - Ex&quot;n&quot;</SelectItem>
                  <SelectItem value="other">Others</SelectItem>
                </SelectContent>
              </Select>
                {motor === "other" && (
                  <div className="mt-4">
                    <Label htmlFor="dutyDescription">Please specify duty details</Label>
                    <Textarea 
                      id="dutyDescription"
                      placeholder="Please describe the duty requirements in detail..."
                      className="mt-2 w-full min-h-[160px] resize-y rounded-md border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 p-3 text-sm shadow-sm hover:border-gray-300"
                      rows={10}
                      maxLength={1000}
                    />
                    <p className="text-sm text-gray-500 mt-1">Maximum 1000 characters</p>
                  </div>
                )}
            </div>
            <div className="space-y-2">
              <Label>Rotor Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select rotor type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SQUIRREL-CAGE">SQUIRREL CAGE</SelectItem>
                  <SelectItem value="SLIP-RING">SLIP RING</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Electrical Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Voltage</Label>
              <Select onValueChange={(value) => setVoltage(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select voltage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="415">415V</SelectItem>
                  <SelectItem value="380">380V</SelectItem>
                  <SelectItem value="440">440V</SelectItem>
                  <SelectItem value="460">460V</SelectItem>
                  <SelectItem value="480">480V</SelectItem>
                  <SelectItem value="other">Others</SelectItem>
                </SelectContent>
              </Select>
              {voltage === "other" && (
                <div className="mt-4">
                  <Label htmlFor="dutyDescription">Please specify duty details</Label>
                  <Textarea 
                    id="dutyDescription"
                    placeholder="Please describe the duty requirements in detail..."
                    className="mt-2 w-full min-h-[160px] resize-y rounded-md border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 p-3 text-sm shadow-sm hover:border-gray-300"
                    rows={10}
                    maxLength={1000}
                  />
                  <p className="text-sm text-gray-500 mt-1">Maximum 1000 characters</p>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Frequency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">50 Hz</SelectItem>
                  <SelectItem value="60">60 Hz</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Shaft Extension</Label>
              <Select onValueChange={(value) => setShaft(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select shaft extension" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="double">Double</SelectItem>
                  <SelectItem value="other">Others</SelectItem>
                </SelectContent>
              </Select>
              {shaft === "other" && (
                <div className="mt-4">
                  <Label htmlFor="dutyDescription">Please specify duty details</Label>
                  <Textarea 
                    id="dutyDescription"
                    placeholder="Please describe the duty requirements in detail..."
                    className="mt-2 w-full min-h-[160px] resize-y rounded-md border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 p-3 text-sm shadow-sm hover:border-gray-300"
                    rows={10}
                    maxLength={1000}
                  />
                  <p className="text-sm text-gray-500 mt-1">Maximum 1000 characters</p>
                </div>
              )}
            </div>
          </div>

          {/* Delivery and Requirements */}
          <div className="space-y-2">
            <Label>Expected Delivery Time</Label>
            <Select onValueChange={(value) => setDelivery(value)}>
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
            {delivery === "other" && (
                <div className="mt-4">
                  <Label htmlFor="dutyDescription">Please specify duty details</Label>
                  <Textarea 
                    id="dutyDescription"
                    placeholder="Please describe the duty requirements in detail..."
                    className="mt-2 w-full min-h-[160px] resize-y rounded-md border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 p-3 text-sm shadow-sm hover:border-gray-300"
                    rows={10}
                    maxLength={1000}
                  />
                  <p className="text-sm text-gray-500 mt-1">Maximum 1000 characters</p>
                </div>
              )}
          </div>

          <div className="space-y-2">
            <Label>Offer Requirement is:</Label>
            <RadioGroup defaultValue="estimated" className="flex space-x-4">
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

          <div className="space-y-2">
            <Label>Requirement is for Replacement</Label>
            <RadioGroup defaultValue="no" onValueChange={(value) => setReplacement(value)} className="flex space-x-4">
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
          {replacement === "yes" && (
            <div className="border p-4 rounded-lg space-y-4">
              <h3 className="font-semibold">Provide Existing Motor details:</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Make of Motor</Label>
                  <Input placeholder="Enter make" />
                </div>
                <div className="space-y-2">
                  <Label>KW</Label>
                  <Input placeholder="Enter KW" />
                </div>
                <div className="space-y-2">
                  <Label>HP</Label>
                  <Input placeholder="Enter HP" />
                </div>
                <div className="space-y-2">
                  <Label>RPM</Label>
                  <Input placeholder="Enter RPM" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Mounting</Label>
                  <Input placeholder="Enter mounting" />
                </div>
                <div className="space-y-2">
                  <Label>Pole</Label>
                  <Select>
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
                  <Input placeholder="Enter application" />
                </div>
              </div>
            </div>
          )}

          {/* File Upload Button */}
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

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Enter any additional details or requirements"
                className="h-32"
              />
          </div>

          {/* Any Other Specification */}
          <div className="space-y-2">
            <Label htmlFor="specification">Any Other Specification</Label>
            <textarea 
              id="specification"
              className="w-full min-h-[100px] p-2 border rounded-md"
              placeholder="Enter any additional specifications"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Submit Form
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ACMotorForm;