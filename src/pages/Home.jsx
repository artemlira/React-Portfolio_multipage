import React from 'react';
import Hero from '../components/Page_Home/Hero/Hero';
import Projects from '../components/Page_Home/Projects/Projects';
import Skills from '../components/Page_Home/Skills/Skills';

function Home() {
  return (
    <article className="Home">
      <Hero />
      <Projects />
      <Skills />
    </article>
  );
}

export default Home;
