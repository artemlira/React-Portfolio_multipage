import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { skillsReducer } from "./slices/skills";
import { projectsReducer } from "./slices/projects";
import { mediasReducer } from "./slices/medias";
import { contactsReducer } from "./slices/contacts";
import { factsReducer } from "./slices/facts";
import { smallProjectsReducer } from "./slices/smallProjects";

const store = configureStore({
  reducer: {
    auth: authReducer,
    skills: skillsReducer,
    projects: projectsReducer,
    medias: mediasReducer,
    contacts: contactsReducer,
    facts: factsReducer,
    smallProjects: smallProjectsReducer,
  },
});

export default store;
