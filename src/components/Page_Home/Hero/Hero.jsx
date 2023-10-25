import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { gsap, Back } from "gsap";
import styles from "./Hero.module.scss";

function Hero() {
  const { t } = useTranslation();
  const tl = gsap.timeline({});
  const titleItem = useRef(null);
  const textItem = useRef(null);
  const buttonItem = useRef(null);
  const imgItem = useRef(null);

  useEffect(() => {
    tl.fromTo(
      titleItem.current,
      {
        opacity: 0,
        x: -200,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
      }
    )
      .fromTo(
        textItem.current,
        {
          opacity: 0,
          x: -250,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
        }
      )
      .fromTo(
        buttonItem.current,
        {
          opacity: 0,
          y: 150,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        }
      )
      .fromTo(
        imgItem.current,
        { scale: 0 },
        { scale: 1, duration: 0.8, ease: Back.easeOut }
      );
  }, [tl]);
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.container}>
          <div className={styles.wrapperContent}>
            <div className={styles.content}>
              <h1 className={styles.title} ref={titleItem}>
                {t("hero_title")}
                <span>{t("hero_title_span")}</span>
              </h1>
              <p className={styles.text} ref={textItem}>
                {t("hero_text")}
              </p>
              <div ref={buttonItem}>
                <Link className={styles.link} to="contacts">
                  {t("hero_link")}
                </Link>
              </div>
            </div>
            <div className={styles.wrapperImage}>
              <div className={styles.image} ref={imgItem} />
              <p className={styles.imageText}>
                <span className={styles.decor} />
                {t("hero_imageText")}
                <span className={styles.spanText}>{t("hero_spanText")}</span>
              </p>
            </div>
          </div>
          <div className={styles.quote}>
            <span className={styles.quoteText}>{t("hero_quoteText")}</span>
            <span className={styles.quoteAvtor}>{t("hero_quoteAvtor")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
