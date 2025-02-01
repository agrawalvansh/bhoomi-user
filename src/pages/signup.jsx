import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff, FiCheckCircle, FiLock, FiUser, FiMail } from 'react-icons/fi';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Brand color palette
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!acceptedTerms) {
      setError('You must accept the terms and conditions');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      console.log('Signup successful', formData);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({ label, type, name, icon, isPassword, showPasswordToggle, onTogglePassword, ...props }) => (
    <div className="space-y-2">
      <label 
        htmlFor={name}
        className="flex items-center text-sm font-medium" 
        style={{ color: colors.primary }}
      >
        {icon}
        <span className="ml-2">{label}</span>
      </label>
      <div className="relative flex items-center">
        <input
          id={name}
          type={type}
          name={name}
          {...props}
          className="w-full px-4 py-3 rounded-lg transition-all focus:ring-2"
          style={{
            border: `2px solid ${colors.accent}`,
            backgroundColor: colors.background,
            color: colors.primary,
            outline: 'none',
            boxShadow: 'none',
            caretColor: colors.tertiary,
            paddingRight: isPassword ? '40px' : '16px'
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 p-1 z-10"
            aria-label={showPasswordToggle ? 'Hide password' : 'Show password'}
            style={{ color: colors.primary }}
            tabIndex={-1}
          >
            {showPasswordToggle ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        backgroundColor: colors.background, 
        fontFamily: "'Nunito Sans', sans-serif" 
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl"
        style={{ 
          border: `2px solid ${colors.accent}30`,
          boxShadow: `0 10px 30px ${colors.accent}20`
        }}
      >
        <div className="text-center space-y-2">
          <h1 
            className="text-4xl font-bold"
            style={{ 
              fontFamily: "'Gilda Display', serif",
              color: colors.deep 
            }}
          >
            Bhoomi
          </h1>
          <p 
            className="text-lg font-medium"
            style={{ color: colors.primary }}
          >
            {success ? 'Welcome to the Bhoomi community!' : 'Start your urban gardening journey'}
          </p>
        </div>

        {success ? (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-center p-6 rounded-lg"
            style={{ backgroundColor: `${colors.accent}20` }}
          >
            <FiCheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: colors.tertiary }} />
            <p className="text-lg" style={{ color: colors.primary }}>
              Check your email to verify your account
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSignup} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 text-sm rounded-lg flex items-center"
                style={{ 
                  backgroundColor: `${colors.warm}20`,
                  border: `1px solid ${colors.warm}`,
                  color: colors.primary
                }}
                role="alert"
              >
                ⚠️ {error}
              </motion.div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="First Name"
                type="text"
                name="firstName"
                icon={<FiUser style={{ color: colors.tertiary }} />}
                value={formData.firstName}
                onChange={handleInputChange}
                required
                autoComplete="given-name"
              />
              <InputField
                label="Last Name"
                type="text"
                name="lastName"
                icon={<FiUser style={{ color: colors.tertiary }} />}
                value={formData.lastName}
                onChange={handleInputChange}
                required
                autoComplete="family-name"
              />
            </div>

            <InputField
              label="Email Address"
              type="email"
              name="email"
              icon={<FiMail style={{ color: colors.tertiary }} />}
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="name@example.com"
              autoComplete="email"
            />

            <InputField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              icon={<FiLock style={{ color: colors.tertiary }} />}
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="••••••••"
              autoComplete="new-password"
              isPassword
              showPasswordToggle={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            <InputField
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              icon={<FiLock style={{ color: colors.tertiary }} />}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              placeholder="••••••••"
              autoComplete="new-password"
              isPassword
              showPasswordToggle={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-4 h-4 rounded"
                style={{
                  backgroundColor: acceptedTerms ? colors.tertiary : colors.background,
                  border: `2px solid ${colors.accent}`
                }}
              />
              <label htmlFor="terms" className="ml-2 text-sm" style={{ color: colors.primary }}>
                I agree to the{' '}
                <a 
                  href="/terms" 
                  className="font-semibold hover:underline" 
                  style={{ color: colors.deep }}
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a 
                  href="/privacy" 
                  className="font-semibold hover:underline" 
                  style={{ color: colors.deep }}
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading || !acceptedTerms}
              className="w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
              style={{ 
                backgroundColor: isLoading || !acceptedTerms ? `${colors.tertiary}70` : colors.tertiary,
                color: colors.background,
                cursor: isLoading || !acceptedTerms ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin">
                    <FiCheckCircle className="w-5 h-5" />
                  </div>
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default SignupPage;