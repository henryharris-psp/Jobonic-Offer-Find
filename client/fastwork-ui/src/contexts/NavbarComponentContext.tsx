// no use for now
'use client';

import React, { createContext, useState, ReactNode } from 'react';

interface NavbarContextProps {
  signedIn: boolean;
  setSignedIn: (newValue: boolean) => void;
}

export const NavbarComponentContext = createContext<NavbarContextProps>({
  signedIn: false,
  setSignedIn: () => {},
});

export const NavbarComponentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false); // Initial state

  return (
    <NavbarComponentContext.Provider value={{ signedIn, setSignedIn }}>
      {children}
    </NavbarComponentContext.Provider>
  );
};

