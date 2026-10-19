import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contacts from "./pages/Contacts";
import About from "./pages/About";
import LoginPage from "./components/LoginPage/LoginPage";
import { fetchAuthMe } from "./redux/slices/auth";
import AddProject from "./components/AddProject/AddProject";
import AddSmallProject from "./components/AddSmallProject/AddSmallProject";
import AddContact from "./components/AddContact/AddContact";
import AddMedia from "./components/AddMedia/AddMedia";
import AddSkill from "./components/AddSkill/AddSkill";
import AddFact from "./components/AddFact/AddFact";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageBookings from "./pages/ManageBookings";
import BookingResponse from "./pages/BookingResponse";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const protect = (component) => <ProtectedRoute>{component}</ProtectedRoute>;

function App() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      dispatch(fetchAuthMe());
    }
  }, [dispatch]);

  useEffect(() => {
    const isUkrainian = (i18n.resolvedLanguage || i18n.language).startsWith("ua");
    const metadata = isUkrainian
      ? {
          lang: "uk",
          title: "Артем Ліра — Frontend-розробник | Обрані роботи",
          description:
            "Добірка робіт Артема Ліри: вебінтерфейси на WordPress, Shopify, React і Next.js, технічні рішення та проєкти, що показують його підхід до фронтенд-розробки.",
        }
      : {
          lang: "en",
          title: "Artem Lira — Frontend Developer | Selected Work",
          description:
            "Explore selected frontend work by Artem Lira, including WordPress, Shopify, React and Next.js projects, with a focus on clear interfaces, performance, and thoughtful implementation.",
        };

    document.documentElement.lang = metadata.lang;
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", metadata.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", metadata.description);
    document.querySelector('meta[property="og:site_name"]')?.setAttribute("content", "Artem Lira — Portfolio");
  }, [i18n, i18n.language, i18n.resolvedLanguage]);

  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id/edit" element={protect(<AddProject />)} />
        <Route path="smalls/:id/edit" element={protect(<AddSmallProject />)} />
        <Route path="about" element={<About />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="bookings/manage" element={protect(<ManageBookings />)} />
        <Route path="booking/respond" element={<BookingResponse />} />
        <Route path="auth/login" element={<LoginPage />} />
        <Route path="auth/register" element={<Navigate to="/auth/login" replace />} />
        <Route path="add-project" element={protect(<AddProject />)} />
        <Route path="add-small" element={protect(<AddSmallProject />)} />
        <Route path="add-contact" element={protect(<AddContact />)} />
        <Route path="contacts/:id/edit" element={protect(<AddContact />)} />
        <Route path="add-media" element={protect(<AddMedia />)} />
        <Route path="medias/:id/edit" element={protect(<AddMedia />)} />
        <Route path="add-skill" element={protect(<AddSkill />)} />
        <Route path="skills/:id/edit" element={protect(<AddSkill />)} />
        <Route path="add-fact" element={protect(<AddFact />)} />
        <Route path="facts/:id/edit" element={protect(<AddFact />)} />
      </Route>
    </Routes>
  );
}

export default App;
