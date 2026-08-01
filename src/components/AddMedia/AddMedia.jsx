import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { decode, encode } from 'js-base64';
import axios from '../../utils/axios';
import { getApiErrorMessage, getTextField } from '../../utils/api';
import styles from './AddMedia.module.scss';

function AddMedia() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [icon, setIcon] = useState('');
  const [saveStatus, setSaveStatus] = useState('idle');
  const [saveMessage, setSaveMessage] = useState('');
  const navigate = useNavigate();

  const isSaving = saveStatus === 'saving';
  const defaultButtonText = id ? 'Зберегти' : 'Додати';
  const submitButtonText = isSaving ? 'Зберігаємо...' : defaultButtonText;

  useEffect(() => {
    if (id) {
      axios.get(`/medias/${id}`).then((res) => {
        setName(res.data.name ?? '');
        setLink(res.data.link ?? '');
        setIcon(res.data.icon ? decode(res.data.icon) : '');
      });
    }
  }, [id]);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    setSaveStatus('saving');
    setSaveMessage('Зберігаємо зміни...');

    try {
      const fields = {
        name: getTextField(name),
        link: getTextField(link),
        icon: encode(icon),
      };
      if (id) {
        await axios.patch(`/medias/${id}`, fields);
      } else {
        await axios.post('/medias', fields);
      }

      setSaveStatus('success');
      setSaveMessage('Зміни збережено. Переходимо до контактів...');

      setTimeout(() => {
        navigate('/contacts');
      }, 900);
    } catch (error) {
      setSaveStatus('error');
      setSaveMessage(getApiErrorMessage(error));
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  };

  return (
    <section className={styles.addMedia}>
      <div className="container">
        <div className={styles.container}>
          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.wrapperIcons}>
              {icon && (
                // eslint-disable-next-line react/no-danger
                <div dangerouslySetInnerHTML={{ __html: icon }} />
              )}
            </div>
            <div className={styles.wrapperIcon}>
              <label htmlFor="icon" className={styles.name}>
                icon SVG
                <input
                  type="text"
                  id="icon"
                  placeholder="icon"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                />
              </label>
            </div>
            <div className={styles.wrapperName}>
              <label htmlFor="name" className={styles.name}>
                name
                <input
                  type="text"
                  id="name"
                  placeholder="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>
            <div className={styles.wrapperLink}>
              <label htmlFor="link" className={styles.link}>
                link
                <input
                  type="text"
                  placeholder="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  id="link"
                />
              </label>
            </div>
            <button type="submit" className={styles.btn} disabled={isSaving}>
              {submitButtonText}
            </button>
            {saveMessage && (
              <p
                className={`${styles.status} ${
                  saveStatus === 'error' ? styles.error : styles.success
                }`}
                role={saveStatus === 'error' ? 'alert' : 'status'}
                aria-live="polite"
              >
                {saveMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddMedia;
