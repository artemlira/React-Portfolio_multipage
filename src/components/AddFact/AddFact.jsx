import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from '../../utils/axios';
import styles from '../AddSkill/AddSkill.module.scss';

function AddSkill() {
  const { id } = useParams();
  const [valueEN, setValueEN] = useState(null);
  const [valueUA, setValueUA] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`/facts/${id}`).then((res) => {
        setValueEN(res.data.valueEN);
        setValueUA(res.data.valueUA);
      });
    }
  }, [id]);

  const onSubmit = async () => {
    try {
      const fields = {
        valueEN,
        valueUA,
      };
      if (id) {
        await axios.patch(`/facts/${id}`, fields);
      } else {
        await axios.post('/facts', fields);
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
