import React, { useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

export const MyContext = createContext();

export default function Context({ children }) {
  const [openMenu, setOpenMenu] = useState(false); // burger menu opening status
  const value = useMemo(() => ({
    openMenu,
    setOpenMenu
  }), [openMenu, setOpenMenu]);

  return (
    <MyContext.Provider value={value}>{children}</MyContext.Provider>
  );
}

Context.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape()).isRequired
};
