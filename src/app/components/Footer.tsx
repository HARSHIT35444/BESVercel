import React from 'react';
import { MapPin, Phone, Mail, Smartphone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ahmedabad Office */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Ahmedabad (Gujarat) Office</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-gray-600">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                <p>F-10, Satyam Complex, Near Prerna Tirth Derasar, Jodhpurgam, Satellite, Ahmedabad - 380015</p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <div className="space-y-1">
                  <p>079-26929806 | 079-26929807 | 079-26923834 | 079-40095667</p>
                  <p>079-26929806 | 079-26929807</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <p>besahmedabad@gmail.com</p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Smartphone className="h-5 w-5 flex-shrink-0" />
                <p>+919825014977</p>
              </div>
            </div>
          </div>

          {/* Mumbai Office */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Mumbai (Maharashtra) Office</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-gray-600">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                <p>Bombay Engineering Syndicate, 17, Dr.V.B.Gandhi Marg (Forbes Street), Fort, Mumbai - 400023</p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <p>022-22842982 | 022-22844691 | 022-22046474</p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <p>besyndicate@gmail.com</p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Smartphone className="h-5 w-5 flex-shrink-0" />
                <p>+919820042210</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500">© 2024 Bombay Engineering Syndicate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;