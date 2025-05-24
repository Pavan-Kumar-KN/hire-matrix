import React, { useState, useEffect } from "react";
import { FaMicrosoft, FaApple, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mount
    setIsVisible(true);
  }, []);

  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 10,
      icon: <FaMicrosoft className="text-3xl" />,
      bgColor: "bg-blue-50",
      logoColor: "text-blue-600",
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 5,
      icon: <SiTesla className="text-3xl" />,
      bgColor: "bg-red-50",
      logoColor: "text-red-600",
    },
    {
      id: 3,
      title: "Apple",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 20,
      icon: <FaApple className="text-3xl" />,
      bgColor: "bg-gray-50",
      logoColor: "text-gray-600",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">TOP COMPANIES</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">Join leading companies that are at the forefront of innovation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {companies.map((company, index) => (
            <div
              key={company.id}
              className={`group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Company header with logo */}
              <div className={`${company.bgColor} p-8 flex justify-center`}>
                <div className={`w-20 h-20 ${company.logoColor} flex items-center justify-center rounded-full bg-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {company.icon}
                </div>
              </div>

              {/* Company details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors duration-300">{company.title}</h3>
                <div className="flex items-center text-gray-500 mb-4">
                  <FaMapMarkerAlt className="mr-2 text-gray-400" />
                  <span className="text-sm">{company.location}</span>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
                    {company.openPositions} Open Positions
                  </span>
                  <button className="text-primary hover:text-primary-dark flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                    <span>View</span>
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-white border border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg inline-flex items-center gap-2">
            View All Companies
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularCompanies;
