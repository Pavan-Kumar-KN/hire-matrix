import React, { useState, useEffect } from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact, FaArrowRight } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mount
    setIsVisible(true);
  }, []);

  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices className="text-3xl" />,
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled className="text-3xl" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook className="text-3xl" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Positions",
      icon: <FaReact className="text-3xl" />,
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance className="text-3xl" />,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence className="text-3xl" />,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation className="text-3xl" />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController className="text-3xl" />,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">POPULAR CATEGORIES</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">Explore job opportunities across various industries and specializations</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-full ${category.color} transition-transform duration-300 group-hover:scale-110`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors duration-300">{category.title}</h3>
                  <p className="text-sm text-gray-500">{category.subTitle}</p>
                </div>
              </div>
              <div className="px-6 pb-4">
                <button className="text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                  View Jobs
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-white border border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg inline-flex items-center gap-2">
            View All Categories
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
