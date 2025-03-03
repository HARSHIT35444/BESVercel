import React from 'react';
import { Mail, Phone } from 'lucide-react';

const ContactBar = () => {
  const contactInfo = [
    {
      title: "Electric Motors",
      email: "besahmedabad@gmail.com"
    },
    {
      title: "Variable Frequency Drives",
      email: "besyndicate@gmail.com"
    },
    {
      title: "Call us",
      phone: "+919825014977"
    },
    {
      title: "Call us",
      phone: "+919820042210"
    }
  ];

  return (
    <div className="bg-[#e6f3ff] h-10 text-blue-800 flex items-center justify-center w-full overflow-x-auto">
      <div className="flex items-center space-x-8 m-4 px-4 text-sm">
        {contactInfo.map((info, index) => (
          <div key={index} className="flex items-center  whitespace-nowrap">
            {info.email ? (
              <a 
                href={`mailto:${info.email}`} 
                className="flex items-center hover:text-blue-600 transition-colors"
              >
                <Mail className="w-4 h-4 mr-1" />
                {info.email}
              </a>
            ) : info.phone ? (
              <a 
                href={`tel:${info.phone}`} 
                className="flex items-center hover:text-blue-600 transition-colors"
              >
                <Phone className="w-4 h-4 mr-1" />
                {info.phone}
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactBar;