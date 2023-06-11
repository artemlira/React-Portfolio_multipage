import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from '../../utils/axios';
import styles from './AddSkill.module.scss';

function AddSkill() {
  const { id } = useParams();
  const [skills, setSkills] = useState(null);
  const [categoryEN, setCategoryEN] = useState(null);
  const [categoryUA, setCategoryUA] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`/skills/${id}`).then((res) => {
        setSkills(res.data.value.join(','));
        setCategoryEN(res.data.categoryEN);
        setCategoryUA(res.data.categoryUA);
      });
    }
  }, [id]);

  const onSubmit = async () => {
    try {
      const fields = {
        categoryEN,
        categoryUA,
        value: skills.replace(/\s/g, '').split(','),
      };
      if (id) {
        await axios.patch(`/skills/${id}`, fields);
      } else {
        await axios.post('/skills', fields);
      }
      navigate('/about');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  };

  return (
    <section className={styles.addSkill}>
      <div className="container">
        <div className={styles.container}>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
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
            <button type="submit" className={styles.btn} onClick={onSubmit}>
              {!id ? 'Добавить' : 'Сохранить'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddSkill;
