import React from 'react';
import { useTranslation } from 'react-i18next';
import PageTitle from '../components/PageTitle/PageTitle';

function About() {
  const { t } = useTranslation();
  return (
    <article className="About">
      <PageTitle title={t('about_title')} text={t('page_about_text')} />
    </article>
  );
}

export default About;
