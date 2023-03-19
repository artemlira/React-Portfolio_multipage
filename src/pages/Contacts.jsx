import React from 'react';
import { useTranslation } from 'react-i18next';
import PageTitle from '../components/PageTitle/PageTitle';

function Contacts() {
  const { t } = useTranslation();
  return (
    <article className="Contacts">
      <PageTitle title={t('contacts_title')} text={t('page_contacts_text')} />
    </article>
  );
}

export default Contacts;
