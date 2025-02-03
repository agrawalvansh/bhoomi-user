import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiEdit2, FiCamera, FiMapPin, FiPhone, FiMail, 
  FiCalendar, FiSave, FiX, FiDroplet, FiSun, FiHeart,
  FiPlus, FiHome, FiUser, FiShoppingBag, FiTool, FiUsers, FiMessageSquare
} from 'react-icons/fi';

const UserProfile = () => {
  // Color palette used throughout the component
  const colors = {
    primary: '#2D3B2D',
    secondary: '#D4B982',
    tertiary: '#4A6741',
    background: '#F9F6F0',
    accent: '#A8C69F',
    deep: '#1B4D3E',
    highlight: '#F3E5AB',
    warm: '#E6BAA3'
  };

  // Sidebar navigation items
  const navItems = [
    { icon: <FiHome />, label: "Home", to: "/home" },
    { icon: <FiUser />, label: "Profile", to: "/home/profile" },
    { icon: <FiShoppingBag />, label: "Shop", to: "/home/shop" },
    { icon: <FiTool />, label: "Services", to: "/home/services" },
    { icon: <FiUsers />, label: "Community", to: "/home/community" },
    { icon: <FiMail />, label: "Contact", to: "/contact" }
  ];

  const location = useLocation();

  // NavItem component with active state styling
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

  // Profile editing state and data
  const [isEditing, setIsEditing] = useState(false);
  const [newInterest, setNewInterest] = useState('');
  const [tempProfileData, setTempProfileData] = useState(null);
  const [profileData, setProfileData] = useState({
    name: 'Vansh Agrawal',
    email: 'vansh.agrawal@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Garden Street, Green City, GC 12345',
    joinedDate: 'March 2023',
    bio: 'Urban gardening enthusiast with a passion for sustainable living. Growing my own herbs and vegetables on my balcony garden.',
    interests: ['Urban Gardening', 'Composting', 'Plant Care', 'Sustainable Living'],
    gardenType: 'Balcony Garden',
    experience: 'Intermediate',
    gardenStats: {
      plants: 24,
      squareFeet: 120,
      sunlight: 'Partial Shade'
    }
  });

  // Handler functions for editing profile
  const handleEdit = useCallback(() => {
    setTempProfileData({ ...profileData });
    setIsEditing(true);
  }, [profileData]);

  const handleCancel = useCallback(() => {
    setProfileData(tempProfileData);
    setIsEditing(false);
    setNewInterest('');
  }, [tempProfileData]);

  const handleSave = useCallback(() => {
    setIsEditing(false);
    setTempProfileData(null);
    setNewInterest('');
    console.log('Saving profile data:', profileData);
  }, [profileData]);

  const addInterest = useCallback(() => {
    if (newInterest.trim()) {
      setProfileData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  }, [newInterest]);

  const removeInterest = useCallback((indexToRemove) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.filter((_, index) => index !== indexToRemove)
    }));
  }, []);

  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Uploading file:', file);
    }
  }, []);

  // Reusable InputField component
  const InputField = ({ 
    label, 
    value, 
    onChange, 
    icon, 
    type = 'text', 
    required = true,
    disabled = false,
    as = 'input',
    children
  }) => {
    const Component = as;
    const inputProps = {
      type,
      value,
      onChange,
      required,
      disabled: !isEditing || disabled,
      className: "w-full p-3 rounded-lg transition-all focus:ring-2",
      style: {
        border: `2px solid ${colors.accent}`,
        backgroundColor: colors.background,
        color: colors.primary,
        outline: 'none',
        opacity: (!isEditing || disabled) ? 0.7 : 1
      }
    };

    return (
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium" style={{ color: colors.deep }}>
          {icon}
          <span className="ml-2">{label}</span>
        </label>
        {as === 'select' ? (
          <select {...inputProps}>
            {children}
          </select>
        ) : as === 'textarea' ? (
          <textarea {...inputProps} rows={4} />
        ) : (
          <input {...inputProps} />
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Sidebar Navigation */}
      <motion.nav 
        className="w-64 p-6 border-r-2 overflow-y-auto h-screen sticky top-0"
        style={{ backgroundColor: colors.background, borderColor: colors.accent }}
        initial={{ x: -20 }}
        animate={{ x: 0 }}
      >
        <div className="mb-8">
          {/* You can add a header/logo here */}
        </div>
        <ul className="space-y-3">
          {navItems.map((item, index) => (
            <NavItem key={index} to={item.to} icon={item.icon} label={item.label} />
          ))}
        </ul>
      </motion.nav>

      {/* Main Profile Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <motion.div 
            className="mb-8 p-6 rounded-xl relative overflow-hidden"
            style={{ backgroundColor: colors.highlight }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Profile Picture */}
              <motion.div className="relative group">
                <input
                  type="file"
                  id="profile-picture"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div 
                  className="w-32 h-32 rounded-full overflow-hidden shadow-lg"
                  style={{ border: `4px solid ${colors.accent}` }}
                >
                  <img 
                    src="/api/placeholder/128/128" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <AnimatePresence>
                  {isEditing && (
                    <motion.label
                      htmlFor="profile-picture"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute bottom-0 right-0 p-2 rounded-full shadow-md cursor-pointer"
                      style={{ backgroundColor: colors.accent }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <FiCamera style={{ color: colors.deep }} />
                    </motion.label>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Profile Info */}
              <div className="flex-1 w-full">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="space-y-2 flex-1">
                    {isEditing ? (
                      <InputField
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        icon={<FiEdit2 style={{ color: colors.tertiary }} />}
                        label="Full Name"
                      />
                    ) : (
                      <div>
                        <h1 className="text-3xl font-bold" style={{ color: colors.deep }}>
                          {profileData.name}
                        </h1>
                        <p className="flex items-center text-sm mt-1" style={{ color: colors.tertiary }}>
                          <FiCalendar className="mr-2" />
                          Member since {profileData.joinedDate}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 w-full md:w-auto">
                    <AnimatePresence mode="wait">
                      {isEditing ? (
                        <>
                          <motion.button
                            key="save"
                            onClick={handleSave}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg w-full md:w-auto"
                            style={{ backgroundColor: colors.tertiary, color: colors.background }}
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <FiSave /> Save
                          </motion.button>
                          <motion.button
                            key="cancel"
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg w-full md:w-auto"
                            style={{ backgroundColor: colors.warm, color: colors.background }}
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <FiX /> Cancel
                          </motion.button>
                        </>
                      ) : (
                        <motion.button
                          key="edit"
                          onClick={handleEdit}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg w-full md:w-auto"
                          style={{ backgroundColor: colors.tertiary, color: colors.background }}
                          whileHover={{ scale: 1.05 }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <FiEdit2 /> Edit Profile
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Garden Stats */}
              <motion.div 
                className="p-6 rounded-xl"
                style={{ backgroundColor: colors.secondary }}
                initial={{ x: -20 }}
                animate={{ x: 0 }}
              >
                <h2 className="text-xl font-bold mb-4" style={{ color: colors.deep }}>
                  Garden Statistics
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <FiHeart className="w-6 h-6" style={{ color: colors.deep }} />
                    <div>
                      <p className="text-sm" style={{ color: colors.primary }}>Total Plants</p>
                      {isEditing ? (
                        <input
                          type="number"
                          value={profileData.gardenStats.plants}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            gardenStats: {
                              ...profileData.gardenStats,
                              plants: parseInt(e.target.value) || 0
                            }
                          })}
                          className="w-full p-2 rounded"
                          style={{ backgroundColor: colors.background }}
                        />
                      ) : (
                        <p className="text-2xl font-bold" style={{ color: colors.deep }}>
                          {profileData.gardenStats.plants}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <FiDroplet className="w-6 h-6" style={{ color: colors.deep }} />
                    <div>
                      <p className="text-sm" style={{ color: colors.primary }}>Garden Size</p>
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={profileData.gardenStats.squareFeet}
                            onChange={(e) => setProfileData({
                              ...profileData,
                              gardenStats: {
                                ...profileData.gardenStats,
                                squareFeet: parseInt(e.target.value) || 0
                              }
                            })}
                            className="w-full p-2 rounded"
                            style={{ backgroundColor: colors.background }}
                          />
                          <span style={{ color: colors.deep }}>sq.ft</span>
                        </div>
                      ) : (
                        <p className="text-2xl font-bold" style={{ color: colors.deep }}>
                          {profileData.gardenStats.squareFeet} sq.ft
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <FiSun className="w-6 h-6" style={{ color: colors.deep }} />
                    <div>
                      <p className="text-sm" style={{ color: colors.primary }}>Sunlight</p>
                      {isEditing ? (
                        <select
                          value={profileData.gardenStats.sunlight}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            gardenStats: {
                              ...profileData.gardenStats,
                              sunlight: e.target.value
                            }
                          })}
                          className="w-full p-2 rounded"
                          style={{ backgroundColor: colors.background }}
                        >
                          <option>Full Sun</option>
                          <option>Partial Shade</option>
                          <option>Full Shade</option>
                        </select>
                      ) : (
                        <p className="text-2xl font-bold" style={{ color: colors.deep }}>
                          {profileData.gardenStats.sunlight}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Garden Profile */}
              <motion.div 
                className="p-6 rounded-xl"
                style={{ backgroundColor: colors.accent }}
                initial={{ x: -20 }}
                animate={{ x: 0 }}
              >
                <h2 className="text-xl font-bold mb-4" style={{ color: colors.deep }}>
                  Garden Profile
                </h2>
                <div className="space-y-4">
                  <InputField
                    label="Garden Type"
                    value={profileData.gardenType}
                    onChange={(e) => setProfileData({ ...profileData, gardenType: e.target.value })}
                    icon={<FiHeart style={{ color: colors.tertiary }} />}
                    as="select"
                  >
                    <option>Balcony Garden</option>
                    <option>Indoor Garden</option>
                    <option>Backyard Garden</option>
                    <option>Community Garden</option>
                  </InputField>

                  <InputField
                    label="Experience Level"
                    value={profileData.experience}
                    onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                    icon={<FiSun style={{ color: colors.tertiary }} />}
                    as="select"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                  </InputField>
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <motion.div 
                className="p-6 rounded-xl"
                style={{ backgroundColor: colors.accent }}
                initial={{ x: 20 }}
                animate={{ x: 0 }}
              >
                <h2 className="text-xl font-bold mb-4" style={{ color: colors.deep }}>
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Email Address"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    icon={<FiMail style={{ color: colors.tertiary }} />}
                    type="email"
                  />
                  <InputField
                    label="Phone Number"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    icon={<FiPhone style={{ color: colors.tertiary }} />}
                    type="tel"
                  />
                  <div className="md:col-span-2">
                    <InputField
                      label="Address"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      icon={<FiMapPin style={{ color: colors.tertiary }} />}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Bio */}
              <motion.div 
                className="p-6 rounded-xl"
                style={{ backgroundColor: colors.tertiary }}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
              >
                <h2 className="text-xl font-bold mb-4" style={{ color: colors.background }}>
                  About Me
                </h2>
                {isEditing ? (
                  <div className="space-y-2">
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      className="w-full p-4 rounded-lg transition-all"
                      style={{ 
                        backgroundColor: colors.background,
                        color: colors.primary,
                        minHeight: '120px',
                        border: `2px solid ${colors.accent}`
                      }}
                      maxLength={500}
                    />
                    <div className="text-right text-sm" style={{ color: colors.background }}>
                      {500 - profileData.bio.length} characters remaining
                    </div>
                  </div>
                ) : (
                  <p className="whitespace-pre-line" style={{ color: colors.background }}>
                    {profileData.bio}
                  </p>
                )}
              </motion.div>

              {/* Interests */}
              <motion.div 
                className="p-6 rounded-xl"
                style={{ backgroundColor: colors.background, border: `2px solid ${colors.accent}` }}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
              >
                <h2 className="text-xl font-bold mb-4" style={{ color: colors.deep }}>
                  Interests
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm flex items-center"
                      style={{ backgroundColor: colors.accent, color: colors.deep }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {interest}
                      {isEditing && (
                        <button 
                          onClick={() => removeInterest(index)}
                          className="ml-2 hover:text-red-500 transition-colors"
                        >
                          ×
                        </button>
                      )}
                    </motion.span>
                  ))}
                  {isEditing && (
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        placeholder="Add new interest..."
                        className="px-3 py-1 rounded-full text-sm"
                        style={{ backgroundColor: colors.background, border: `1px solid ${colors.accent}`, color: colors.primary }}
                        onKeyPress={(e) => { if (e.key === 'Enter') { addInterest(); } }}
                      />
                      <motion.button
                        onClick={addInterest}
                        className="p-1 rounded-full"
                        style={{ backgroundColor: colors.tertiary, color: colors.background }}
                        whileHover={{ scale: 1.1 }}
                        disabled={!newInterest.trim()}
                      >
                        <FiPlus />
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
