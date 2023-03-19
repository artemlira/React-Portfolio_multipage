import React from 'react';
import { useTranslation } from 'react-i18next';
import PageTitle from '../components/PageTitle/PageTitle';
import Complete from '../components/Page_Projects/Complete/Complete';
import Small from '../components/Page_Projects/Small/Small';

function Projects() {
  const { t } = useTranslation();
  return (
    <article className="Projects">
      <PageTitle title={t('projects_title')} text={t('page_projects_text')} />
      <Complete />
      <Small />
    </article>
  );
}

export default Projects;
