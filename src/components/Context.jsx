import React, { useState, createContext } from 'react';
// import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export const MyContext = createContext();

function Context(props) {
  const [openMenu, setOpenMenu] = useState(false); // burger menu opening status
  const value = {
    openMenu,
    setOpenMenu,
  };

  return (
    <MyContext.Provider value={value}>{props.children}</MyContext.Provider>
  );
}

export default Context;

Context.propTypes = {
  children: PropTypes.array.isRequired,
};
