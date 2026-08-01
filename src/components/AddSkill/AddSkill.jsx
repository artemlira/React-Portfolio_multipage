import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from '../../utils/axios';
import {
  getApiErrorMessage,
  getCommaSeparatedValues,
  getTextField,
} from '../../utils/api';
import styles from './AddSkill.module.scss';

function AddSkill() {
  const { id } = useParams();
  const [skills, setSkills] = useState('');
  const [categoryEN, setCategoryEN] = useState('');
  const [categoryUA, setCategoryUA] = useState('');
  const [saveStatus, setSaveStatus] = useState('idle');
  const [saveMessage, setSaveMessage] = useState('');
  const navigate = useNavigate();

  const isSaving = saveStatus === 'saving';
  const defaultButtonText = id ? 'Зберегти' : 'Додати';
  const submitButtonText = isSaving ? 'Зберігаємо...' : defaultButtonText;

  useEffect(() => {
    if (id) {
      axios.get(`/skills/${id}`).then((res) => {
        setSkills(Array.isArray(res.data.value) ? res.data.value.join(', ') : '');
        setCategoryEN(res.data.categoryEN ?? '');
        setCategoryUA(res.data.categoryUA ?? '');
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
        categoryEN: getTextField(categoryEN),
        categoryUA: getTextField(categoryUA),
        value: getCommaSeparatedValues(skills),
      };
      if (id) {
        await axios.patch(`/skills/${id}`, fields);
      } else {
        await axios.post('/skills', fields);
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
              <label htmlFor="categoryEN" className={styles.categoryEN}>
                categoryEN
                <input
                  type="text"
                  placeholder="categoryEN"
                  value={categoryEN}
                  onChange={(e) => setCategoryEN(e.target.value)}
                  id="categoryEN"
                />
              </label>
            </div>
            <div className={styles.wrapperCategoryUA}>
              <label htmlFor="categoryUA" className={styles.categoryUA}>
                categoryUA
                <input
                  type="text"
                  id="categoryUA"
                  placeholder="categoryUA"
                  value={categoryUA}
                  onChange={(e) => setCategoryUA(e.target.value)}
                />
              </label>
            </div>
            <div className={styles.wrapperSkills}>
              <label htmlFor="skills" className={styles.skills}>
                skills
                <input
                  type="text"
                  placeholder="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  id="skills"
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

export default AddSkill;
