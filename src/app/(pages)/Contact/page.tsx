import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Smartphone } from 'lucide-react';

const ContactPage = () => {
  const offices = [
    {
      title: "Ahmedabad (Gujarat) Office",
      address: "F-10, Satyam Complex, Near Prerna Tirth Derasar, Jodhpurgam, Satellite, Ahmedabad - 380015",
      phones: [
        "079-26929806 | 079-26929807 | 079-26923834 | 079-40095667",
        "079-26929806 | 079-26929807"
      ],
      email: "besahmedabad@gmail.com",
      mobile: "+919825014977"
    },
    {
      title: "Mumbai (Maharashtra) Office",
      address: "Bombay Engineering Syndicate, 17, Dr.V.B.Gandhi Marg (Forbes Street), Fort, Mumbai - 400023",
      phones: ["022-22842982 | 022-22844691 | 022-22046474"],
      email: "besyndicate@gmail.com",
      mobile: "+919820042210"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">Get in touch with our offices across India</p>
        </div>

        {/* Office Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offices.map((office, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">{office.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-600">{office.address}</p>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    {office.phones.map((phone, idx) => (
                      <p key={idx} className="text-gray-600">{phone}</p>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <p className="text-gray-600">{office.email}</p>
                </div>

                {/* Mobile */}
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <p className="text-gray-600">{office.mobile}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Contact Information */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            For general inquiries, please email us or call our office during business hours:
            <br />
            Monday - Friday: 9:00 AM - 6:00 PM IST
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;