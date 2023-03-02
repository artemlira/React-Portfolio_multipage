import React from 'react';
import Hero from '../components/Page_Home/Hero/Hero';
import Projects from '../components/Page_Home/Projects/Projects';

function Home() {
  return (
    <article className="Home">
      <Hero />
      <Projects />
    </article>
  );
}

export default Home;
