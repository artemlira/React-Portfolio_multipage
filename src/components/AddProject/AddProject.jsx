import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "../../utils/axios";
import {
  getApiErrorMessage,
  getCommaSeparatedValues,
  getTextField,
} from "../../utils/api";
import styles from "./AddProject.module.scss";

const isFilledString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const isDataImage = (value) =>
  typeof value === "string" && value.startsWith("data:image/");

function AddProject() {
  const { id } = useParams();
  const inputFileRef = useRef(null);
  const inputFileWebpRef = useRef(null);
  const [img, setImg] = useState("");
  const [imgWebp, setImgWebp] = useState("");
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [shortDescriptionUA, setShortDescriptionUA] = useState("");
  const [shortDescriptionEN, setShortDescriptionEN] = useState("");
  const [fullDescriptionUA, setFullDescriptionUA] = useState("");
  const [fullDescriptionEN, setFullDescriptionEN] = useState("");
  const [git, setGit] = useState("");
  const [deploy, setDeploy] = useState("");
  const [saveStatus, setSaveStatus] = useState("idle");
  const [saveMessage, setSaveMessage] = useState("");
  const navigate = useNavigate();

  const isSaving = saveStatus === "saving";
  const defaultButtonText = id ? "Зберегти" : "Додати";
  const submitButtonText = isSaving ? "Зберігаємо..." : defaultButtonText;

  useEffect(() => {
    if (id) {
      axios.get(`/projects/${id}`).then((res) => {
        setTitle(res.data.title ?? "");
        setSkills(
          Array.isArray(res.data.skills) ? res.data.skills.join(", ") : ""
        );
        setShortDescriptionUA(res.data.shortDescriptionUA ?? "");
        setShortDescriptionEN(res.data.shortDescriptionEN ?? "");
        setFullDescriptionUA(res.data.fullDescriptionUA ?? "");
        setFullDescriptionEN(res.data.fullDescriptionEN ?? "");
        setGit(res.data.git ?? "");
        setDeploy(res.data.deploy ?? "");
        setImg(res.data.img ?? "");
        setImgWebp(res.data.imgWebp ?? "");
      });
    }
  }, [id]);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    setSaveStatus("saving");
    setSaveMessage("Зберігаємо зміни...");

    try {
      const fields = {
        title: getTextField(title),
        skills: getCommaSeparatedValues(skills),
        shortDescriptionUA: getTextField(shortDescriptionUA),
        shortDescriptionEN: getTextField(shortDescriptionEN),
        fullDescriptionUA: getTextField(fullDescriptionUA),
        fullDescriptionEN: getTextField(fullDescriptionEN),
        git: getTextField(git),
        deploy: getTextField(deploy),
      };

      if (isDataImage(img)) {
        fields.base64 = img;
      } else if (isFilledString(img)) {
        fields.img = getTextField(img);
      }

      if (isDataImage(imgWebp)) {
        fields.base64Webp = imgWebp;
      } else if (isFilledString(imgWebp)) {
        fields.imgWebp = getTextField(imgWebp);
      }

      if (id) {
        await axios.patch(`/projects/${id}`, fields);
      } else {
        await axios.post("/projects", fields);
      }

      setSaveStatus("success");
      setSaveMessage("Зміни збережено. Переходимо до списку проєктів...");

      setTimeout(() => {
        navigate("/projects");
      }, 900);
    } catch (error) {
      setSaveStatus("error");
      setSaveMessage(getApiErrorMessage(error));
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  };

  const handleChangeFile = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImg(reader.result);
    };
    reader.onerror = (error) => {
      // eslint-disable-next-line no-console
      console.log("Error: ", error);
    };
  };

  const handleChangeFileWebp = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgWebp(reader.result);
    };
    reader.onerror = (error) => {
      // eslint-disable-next-line no-console
      console.log("Error: ", error);
    };
  };

  return (
    <section className={styles.addProject}>
      <div className="container">
        <form
          className={styles.form}
          onSubmit={onSubmit}
          encType="multipart/form-data"
        >
          <div className={styles.images}>
            <button
              className={styles.addImg}
              onClick={() => inputFileRef.current.click()}
              type="button"
            >
              Загрузить картинку img
            </button>
            <input
              ref={inputFileRef}
              type="file"
              onChange={handleChangeFile}
              hidden
            />

            <button
              className={styles.addImg}
              onClick={() => inputFileWebpRef.current.click()}
              type="button"
            >
              Загрузить картинку webp
            </button>
            <input
              ref={inputFileWebpRef}
              type="file"
              onChange={handleChangeFileWebp}
              hidden
            />
          </div>
          <div className={styles.wrapperImages}>
            {img && <img className={styles.mini} src={img} alt={img} />}
            {imgWebp && (
              <img className={styles.mini} src={imgWebp} alt={imgWebp} />
            )}
          </div>
          <div className={styles.wrapperTitle}>
            <label htmlFor="title" className={styles.title}>
              title
              <input
                type="text"
                id="title"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
          <div className={styles.wrapperShortDescriptionUA}>
            <label
              htmlFor="shortDescriptionUA"
              className={styles.shortDescriptionUA}
            >
              shortDescriptionUA
              <input
                type="text"
                id="shortDescriptionUA"
                placeholder="shortDescriptionUA"
                value={shortDescriptionUA}
                onChange={(e) => setShortDescriptionUA(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.wrapperShortDescriptionEN}>
            <label
              htmlFor="shortDescriptionEN"
              className={styles.shortDescriptionEN}
            >
              shortDescriptionEN
              <input
                type="text"
                placeholder="shortDescriptionEN"
                value={shortDescriptionEN}
                onChange={(e) => setShortDescriptionEN(e.target.value)}
                id="shortDescriptionEN"
              />
            </label>
          </div>
          <div className={styles.wrapperFullDescriptionUA}>
            <label
              htmlFor="fullDescriptionUA"
              className={styles.fullDescriptionUA}
            >
              fullDescriptionUA
              <input
                type="text"
                id="fullDescriptionUA"
                placeholder="fullDescriptionUA"
                value={fullDescriptionUA}
                onChange={(e) => setFullDescriptionUA(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.wrapperFullDescriptionEN}>
            <label
              htmlFor="fullDescriptionEN"
              className={styles.fullDescriptionEN}
            >
              fullDescriptionEN
              <input
                type="text"
                id="fullDescriptionEN"
                placeholder="fullDescriptionEN"
                value={fullDescriptionEN}
                onChange={(e) => setFullDescriptionEN(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.wrapperGit}>
            <label htmlFor="git" className={styles.git}>
              git
              <input
                type="text"
                id="git"
                placeholder="git"
                value={git}
                onChange={(e) => setGit(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.wrapperDeploy}>
            <label htmlFor="deploy" className={styles.deploy}>
              deploy
              <input
                type="text"
                id="deploy"
                placeholder="deploy"
                value={deploy}
                onChange={(e) => setDeploy(e.target.value)}
              />
            </label>
          </div>
          <button type="submit" className={styles.btn} disabled={isSaving}>
            {submitButtonText}
          </button>
          {saveMessage && (
            <p
              className={`${styles.status} ${
                saveStatus === "error" ? styles.error : styles.success
              }`}
              role={saveStatus === "error" ? "alert" : "status"}
              aria-live="polite"
            >
              {saveMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default AddProject;
