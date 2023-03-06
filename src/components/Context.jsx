import React, { useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
// import axios from 'axios';
import DB from '../../db.json';

export const MyContext = createContext();

export default function Context({ children }) {
  const [openMenu, setOpenMenu] = useState(false); // burger menu opening status
  const [dataDB] = useState(DB.portfolio);
  // const url = 'https://www.googleapis.com/drive.google.com/file/d/13oFNm66uVZxF6XgQNAWFAadQYig9yV4P/view?usp=sharing';
  // const url = 'https://jsonplaceholder.typicode.com/users';

  // axios({
  //   method: 'get',
  //   url,
  //   responseType: 'string',
  // }).then((response) => console.log(response))
  //   .catch((error) => {
  //     console.error(error);
  //   });

  // const data = JSON.parse(DB);
  const value = useMemo(() => ({
    openMenu,
    setOpenMenu,
    dataDB,
  }), [openMenu, setOpenMenu, dataDB]);

  return (
    <MyContext.Provider value={value}>{children}</MyContext.Provider>
  );
}

Context.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
