import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contacts from "./pages/Contacts";
import About from "./pages/About";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import { fetchAuthMe } from "./redux/slices/auth";
import AddProject from "./components/AddProject/AddProject";
import AddSmallProject from "./components/AddSmallProject/AddSmallProject";
import AddContact from "./components/AddContact/AddContact";
import AddMedia from "./components/AddMedia/AddMedia";
import AddSkill from "./components/AddSkill/AddSkill";
import AddFact from "./components/AddFact/AddFact";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id/edit" element={<AddProject />} />
        <Route path="smalls/:id/edit" element={<AddSmallProject />} />
        <Route path="about" element={<About />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="auth/login" element={<LoginPage />} />
        <Route path="auth/register" element={<RegisterPage />} />
        <Route path="add-project" element={<AddProject />} />
        <Route path="add-small" element={<AddSmallProject />} />
        <Route path="add-contact" element={<AddContact />} />
        <Route path="contacts/:id/edit" element={<AddContact />} />
        <Route path="add-media" element={<AddMedia />} />
        <Route path="medias/:id/edit" element={<AddMedia />} />
        <Route path="add-skill" element={<AddSkill />} />
        <Route path="skills/:id/edit" element={<AddSkill />} />
        <Route path="add-fact" element={<AddFact />} />
        <Route path="facts/:id/edit" element={<AddFact />} />
      </Route>
    </Routes>
  );
}

export default App;
