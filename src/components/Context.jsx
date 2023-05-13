import React, { useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios'; // Connecting data via a server
import portfolio from '../DB';

export const MyContext = createContext();

export default function Context({ children }) {
  const [openMenu, setOpenMenu] = useState(false); // burger menu opening status

  // ===============================================================================================
  const [dataDB] = useState(portfolio); // to connect from a local file, not through a server
  // eslint-disable-next-line object-curly-newline
  const { projects, facts, contacts, media, skills } = dataDB;
  // ===============================================================================================

  // fetch data via fetch
  // const [dataDB, setDataDB] = useState(null); // Connecting data via a server
  // useEffect(() => {
  //   fetch('../../db.json')
  //     .then((res) => res.json())
  //     .then((data) => setDataDB(data))
  //     .catch((err) => console.error(err));
  // }, []);

  // Receiving data via axios
  // ===============================================================================================
  // const [skills, setSkills] = useState(null); // Connecting data via a server
  // const [contacts, setContacts] = useState(null); // Connecting data via a server
  // const [facts, setFacts] = useState(null); // Connecting data via a server
  // const [media, setMedia] = useState(null); // Connecting data via a server
  // const [projects, setProjects] = useState(null); // Connecting data via a server

  // const getData = (url, state) => {
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       const { data } = response;
  //       state(data);
  //     })
  //     .catch((error) => {
  //       // eslint-disable-next-line no-console
  //       console.error(error);
  //     });
  // };

  // axios.get('https://cerulean-ostrich-gear.cyclic.app/skills')
  //   .then((res) => console.log(res.data));

  // useEffect(() => {
  //   getData('http://localhost:4444/skills', setSkills);
  //   getData('http://localhost:4444/contacts', setContacts);
  //   getData('http://localhost:4444/facts', setFacts);
  //   getData('http://localhost:4444/medias', setMedia);
  //   getData('http://localhost:4444/projects', setProjects);
  // }, []);

  // console.log(projects);
  // ===============================================================================================

  const value = useMemo(
    () => ({
      openMenu,
      setOpenMenu,
      dataDB,
      skills,
      media,
      contacts,
      projects,
      facts,
    }),
    [openMenu, dataDB, setOpenMenu, skills, media, contacts, projects, facts],
  );

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}

Context.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
