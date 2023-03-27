import React, {
  useState, createContext, useMemo,
} from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios'; // Connecting data via a server
import portfolio from '../DB';

export const MyContext = createContext();

export default function Context({ children }) {
  const [openMenu, setOpenMenu] = useState(false); // burger menu opening status
  const [dataDB] = useState(portfolio); // to connect from a local file, not through a server

  // fetch data via fetch
  // const [dataDB, setDataDB] = useState(null); // Connecting data via a server
  // useEffect(() => {
  //   fetch('../../db.json')
  //     .then((res) => res.json())
  //     .then((data) => setDataDB(data))
  //     .catch((err) => console.error(err));
  // }, []);

  const {
    skills, media, contacts, projects, facts,
  } = dataDB;

  // Receiving data via axios
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
    projects,
    facts,
  }), [openMenu, setOpenMenu, dataDB, skills, media, contacts, projects, facts]);

  return (
    <MyContext.Provider value={value}>{children}</MyContext.Provider>
  );
}

Context.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
