import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { decode, encode } from 'js-base64';
import axios from '../../utils/axios';
import styles from './AddMedia.module.scss';

function AddMedia() {
  const { id } = useParams();
  const [name, setName] = useState(null);
  const [link, setLink] = useState(null);
  const [icon, setIcon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`/medias/${id}`).then((res) => {
        setName(res.data.name);
        setLink(res.data.link);
        setIcon(decode(res.data.icon));
      });
    }
  }, [id]);

  const onSubmit = async () => {
    try {
      const fields = {
        name,
        link,
        icon: encode(icon),
      };
      if (id) {
        await axios.patch(`/medias/${id}`, fields);
      } else {
        await axios.post('/medias', fields);
      }
      navigate('/contacts');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  };

  return (
    <section className={styles.addMedia}>
      <div className="container">
        <div className={styles.container}>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
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
            <button type="submit" className={styles.btn} onClick={onSubmit}>
              {!id ? 'Добавить' : 'Сохранить'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddMedia;
