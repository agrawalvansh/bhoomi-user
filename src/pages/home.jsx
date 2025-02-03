import React from 'react';
import { motion } from 'framer-motion';
import {FiShoppingBag, FiTool, FiUsers, FiMail, FiUser, FiSearch, FiHome } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const HomePage = () => {
  const colors = {
    primary: '#2D3B2D',
    secondary: '#D4B982',
    tertiary: '#4A6741',
    background: '#F9F6F0',
    accent: '#A8C69F',
    deep: '#1B4D3E',
    highlight: '#F3E5AB'
  };

  const navItems = [
    { icon: <FiHome />, label: "Home", to: "/home" },
    { icon: <FiUser />, label: "Profile", to: "/home/profile" },
    { icon: <FiShoppingBag />, label: "Shop", to: "/home/shop" },
    { icon: <FiTool />, label: "Services", to: "/home/services" },
    { icon: <FiUsers />, label: "Community", to: "/home/community" },
    { icon: <FiMail />, label: "Contact", to: "/contact" }
  ];

  const location = useLocation();

  // NavItem component renders each individual link with an active style.
  const NavItem = ({ to, icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <motion.li
        whileHover={{ x: 5 }}
        className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
          isActive ? 'bg-white shadow' : 'hover:bg-white/50'
        }`}
      >
        <Link to={to} className="flex items-center w-full">
          <span className="mr-3" style={{ color: isActive ? colors.tertiary : colors.primary }}>
            {icon}
          </span>
          <span className={`font-medium ${isActive ? 'text-gray-800' : 'text-gray-600'}`}>
            {label}
          </span>
        </Link>
      </motion.li>
    );
  };
  

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Side Navigation */}
      <motion.nav 
        className="w-64 p-6 border-r-2 overflow-y-auto h-screen sticky top-0"
        style={{ backgroundColor: colors.background, borderColor: colors.accent }}
        initial={{ x: -20 }}
        animate={{ x: 0 }}
      >
        <div className="mb-8">
        </div>
        <ul className="space-y-3">
          {navItems.map((item, index) => (
            <NavItem key={index} to={item.to} icon={item.icon} label={item.label} />
          ))}

        </ul>
      </motion.nav>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: colors.deep }}>Welcome Back, Vansh!</h2>
            <p className="text-gray-600" style={{ color: colors.primary }}>Your urban oasis awaits</p>
          </div>
          <div className="flex items-center bg-white p-2 rounded-lg" style={{ border: `2px solid ${colors.accent}` }}>
            <FiSearch className="mr-2" style={{ color: colors.tertiary }} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="outline-none bg-transparent"
              style={{ color: colors.primary }}
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Garden Status Card */}
          <motion.div 
            className="p-6 rounded-xl"
            style={{ backgroundColor: colors.highlight }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: colors.deep }}>Your Garden</h3>
            <div className="space-y-2">
              <p style={{ color: colors.primary }}>🌿 12 Healthy Plants</p>
              <p style={{ color: colors.primary }}>📅 Next Maintenance: Tomorrow</p>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            className="p-6 rounded-xl"
            style={{ backgroundColor: colors.accent }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: colors.deep }}>Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-2 rounded-lg" style={{ backgroundColor: colors.background }}>
                Schedule Care
              </button>
              <button className="p-2 rounded-lg" style={{ backgroundColor: colors.background }}>
                Buy Plants
              </button>
            </div>
          </motion.div>

          {/* Services Overview */}
          <motion.div 
            className="p-6 rounded-xl col-span-1 md:col-span-2"
            style={{ 
              backgroundColor: colors.tertiary,
              color: colors.background
            }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-bold mb-4">Active Services</h3>
            <div className="grid grid-cols-3 gap-4">
              {['Weekly Maintenance', 'Plant Care', 'Design Service'].map((service, index) => (
                <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: colors.accent }}>
                  <p style={{ color: colors.deep }}>{service}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Community Feed Preview */}
          <motion.div 
            className="p-6 rounded-xl"
            style={{ backgroundColor: colors.background, border: `2px solid ${colors.accent}` }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: colors.deep }}>Community Updates</h3>
            <div className="space-y-4">
              {['New Blog Post', 'Forum Discussion', 'Event Alert'].map((item, index) => (
                <div key={index} className="p-3 rounded-lg" style={{ backgroundColor: colors.accent }}>
                  <p style={{ color: colors.primary }}>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div className="mt-8 p-6 rounded-xl" style={{ backgroundColor: colors.highlight }}>
          <h3 className="text-xl font-bold mb-4" style={{ color: colors.deep }}>Recent Activity</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['New Plant Added', 'Service Completed', 'Community Post'].map((activity, index) => (
              <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: colors.background }}>
                <p style={{ color: colors.primary }}>{activity}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default HomePage;