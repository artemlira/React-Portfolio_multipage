import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from '../../utils/axios';
import { getApiErrorMessage, getTextField } from '../../utils/api';
import styles from '../AddSkill/AddSkill.module.scss';

function AddFact() {
  const { id } = useParams();
  const [valueEN, setValueEN] = useState('');
  const [valueUA, setValueUA] = useState('');
  const [saveStatus, setSaveStatus] = useState('idle');
  const [saveMessage, setSaveMessage] = useState('');
  const navigate = useNavigate();

  const isSaving = saveStatus === 'saving';
  const defaultButtonText = id ? 'Зберегти' : 'Додати';
  const submitButtonText = isSaving ? 'Зберігаємо...' : defaultButtonText;

  useEffect(() => {
    if (id) {
      axios.get(`/facts/${id}`).then((res) => {
        setValueEN(res.data.valueEN ?? '');
        setValueUA(res.data.valueUA ?? '');
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
        valueEN: getTextField(valueEN),
        valueUA: getTextField(valueUA),
      };
      if (id) {
        await axios.patch(`/facts/${id}`, fields);
      } else {
        await axios.post('/facts', fields);
      }

      setSaveStatus('success');
      setSaveMessage('Зміни збережено. Переходимо до сторінки About...');

      setTimeout(() => {
        navigate('/about');
      }, 900);
    } catch (error) {
      setSaveStatus('error');
      setSaveMessage(getApiErrorMessage(error));
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  };

  return (
    <section className={styles.addSkill}>
      <div className="container">
        <div className={styles.container}>
          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.wrapperCategoryEN}>
              <label htmlFor="valueEN" className={styles.categoryEN}>
                valueEN
                <input
                  type="text"
                  placeholder="valueEN"
                  value={valueEN}
                  onChange={(e) => setValueEN(e.target.value)}
                  id="valueEN"
                />
              </label>
            </div>
            <div className={styles.wrapperCategoryUA}>
              <label htmlFor="valueUA" className={styles.categoryUA}>
                valueUA
                <input
                  type="text"
                  id="valueUA"
                  placeholder="valueUA"
                  value={valueUA}
                  onChange={(e) => setValueUA(e.target.value)}
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

export default AddFact;
