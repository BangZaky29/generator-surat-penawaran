import React from 'react';

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');

    :root {
      --blue-50: #EFF6FF;
      --blue-100: #DBEAFE;
      --blue-200: #BFDBFE;
      --blue-300: #93C5FD;
      --blue-400: #60A5FA;
      --blue-500: #3B82F6;
      --blue-600: #2563EB;
      --blue-700: #1D4ED8;
      --blue-800: #1E40AF;
      --purple-50: #F5F3FF;
      --purple-100: #E9D5FF;  
      --purple-200: #D8B4FE;
      --purple-300: #C084FC;
      --purple-400: #A78BFA;
      --blue1: #A7D8FF;
      --blue2: #4DA6FF;
      --gradient-primary: linear-gradient(135deg, var(--purple-100) 0%, var(--blue2) 100%);
      --gradient-secondary: linear-gradient(135deg, var(--blue-100) 0%, var(--purple-200) 100%);
      --gray-50: #F9FAFB;
      --gray-100: #F3F4F6;
      --gray-200: #E5E7EB;
      --gray-300: #D1D5DB;
      --gray-400: #9CA3AF;
      --gray-500: #6B7280;
      --gray-600: #4B5563;
      --gray-700: #374151;
      --gray-800: #1F2937;
      --gray-900: #111827;
      --text-dark: #111827;
      --text-muted: #6B7280;
      --radius-md: 12px;
      --radius-lg: 16px;
      --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
    }
  `}</style>
);

export default GlobalStyles;