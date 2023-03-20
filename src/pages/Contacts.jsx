import React from 'react';
import { useTranslation } from 'react-i18next';
import PageTitle from '../components/PageTitle/PageTitle';
import Contact from '../components/Page_Contacts/Contact/Contact';
import Media from '../components/Page_Contacts/Media/Media';

function Contacts() {
  const { t } = useTranslation();
  return (
    <article className="Contacts">
      <PageTitle title={t('contacts_title')} text={t('page_contacts_text')} />
      <Contact />
      <Media />
    </article>
  );
}

export default Contacts;
