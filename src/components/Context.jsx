import React, { useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios'; // Connecting data via a server
// import DB from '../../db.json'; // to connect from a local file, not through a server
import DB from '../DB';

export const MyContext = createContext();

export default function Context({ children }) {
  const [openMenu, setOpenMenu] = useState(false); // burger menu opening status
  const [dataDB] = useState(DB); // to connect from a local file, not through a server
  const { skills, media, contacts } = dataDB;

  // const [dataDB, setDataDB] = useState(null); // Connecting data via a server
  // useEffect(() => {
  //   const url = 'http://localhost:3001/';
  //   axios.get(url)
  //     .then((response) => {
  //       const data = response.data.portfolio;
  //       setDataDB(data);
  //     })
  //     .catch((error) => {
  //       // eslint-disable-next-line no-console
  //       console.error(error);
  //     });
  // }, []);

  const value = useMemo(() => ({
    openMenu,
    setOpenMenu,
    dataDB,
    skills,
    media,
    contacts,
  }), [openMenu, setOpenMenu, dataDB, skills, media, contacts]);

  return (
    <MyContext.Provider value={value}>{children}</MyContext.Provider>
  );
}

Context.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
