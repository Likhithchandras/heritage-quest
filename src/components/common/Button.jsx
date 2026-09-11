import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  onClick,
  disabled = false,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-2.5 gap-2',
    lg: 'text-base px-8 py-3.5 gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary: 'bg-[#C5A059] hover:bg-[#B38F46] text-[#1C1917] font-semibold shadow-md hover:shadow-lg hover:shadow-[#C5A059]/20 focus:ring-[#C5A059]',
    secondary: 'bg-[#1C1917] hover:bg-[#2B2724] text-[#FAF7F2] font-semibold shadow-md hover:shadow-lg hover:shadow-[#1C1917]/20 focus:ring-[#1C1917]',
    terracotta: 'bg-[#C86D51] hover:bg-[#B55F44] text-white font-semibold shadow-md hover:shadow-lg hover:shadow-[#C86D51]/20 focus:ring-[#C86D51]',
    outline: 'bg-transparent hover:bg-[#FAF7F2] text-[#1C1917] border border-[#C5A059]/40 hover:border-[#C5A059] focus:ring-[#C5A059]',
    outlineLight: 'bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 hover:border-white/60 focus:ring-white',
    ghost: 'bg-transparent hover:bg-[#EADCC9]/30 text-[#1C1917] focus:ring-[#C5A059]',
    sage: 'bg-[#5E7A68] hover:bg-[#4E6656] text-white font-semibold shadow-md hover:shadow-lg hover:shadow-[#5E7A68]/20 focus:ring-[#5E7A68]',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

  return (
    <motion.button
      type={type}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />}
    </motion.button>
  );
};

export default Button;
