import React from 'react';
import { useTranslation } from 'react-i18next';
import PageTitle from '../components/PageTitle/PageTitle';
import Skills from '../components/Page_About/Skills/Skills';
import AboutMe from '../components/Page_Home/AboutMe/AboutMe';
import Facts from '../components/Page_About/Facts/Facts';

function About() {
  const { t } = useTranslation();
  return (
    <article className="About">
      <PageTitle title={t('about_title')} text={t('page_about_text')} />
      <AboutMe />
      <Skills />
      <Facts />
    </article>
  );
}

export default About;
