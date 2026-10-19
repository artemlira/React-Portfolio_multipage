const normalizeSkill = (skill) => skill.toLowerCase().replace(/[^a-z0-9]/g, "");

const skillGroups = [
  {
    key: "core",
    label: "skill_group_core",
    skills: [
      "JavaScript",
      "TypeScript",
      "PHP",
      "HTML",
      "CSS",
      "SASS/SCSS",
      "Fetch",
      "Axios",
      "FTP",
      "SFTP",
    ],
    featured: ["JavaScript", "TypeScript", "PHP", "HTML"],
  },
  {
    key: "frontend",
    label: "skill_group_frontend",
    skills: [
      "React.js",
      "Next.js",
      "Express.js",
      "Framer-Motion",
      "Slick-Slider",
      "Swiper-Slider",
      "Animate-animated",
      "Bootstrap",
      "TailwindCSS",
      "MaterialUI",
      "Styled-components",
      "Font-Awesome",
    ],
    featured: ["React.js", "Next.js", "TailwindCSS", "Framer-Motion"],
  },
  {
    key: "cms",
    label: "skill_group_cms",
    skills: ["WordPress", "Shopify"],
    featured: ["WordPress", "Shopify"],
  },
  {
    key: "wordpress",
    label: "skill_group_wordpress",
    skills: [
      "ACF-PRO",
      "ACF Blocks",
      "SCF",
      "Woocommerce",
      "Contact-Form7",
      "Polylang",
      "Yoast-SEO",
      "Gutenberg",
      "Elementor",
    ],
    featured: ["ACF-PRO", "Woocommerce", "Elementor"],
  },
  {
    key: "workflow",
    label: "skill_group_workflow",
    skills: [
      "PhpStorm",
      "VSCode",
      "Figma",
      "Git",
      "Docker",
      "CI/CD",
      "Github Actions",
      "Vite",
      "Webpack",
      "Gulp",
    ],
    featured: ["Git", "Figma", "VSCode", "Docker"],
  },
  {
    key: "data",
    label: "skill_group_data",
    skills: ["MySQL", "MongoDB", "Firebase", "PhpMyAdmin", "Netlify"],
    featured: ["MySQL", "MongoDB", "Firebase", "Netlify"],
  },
];

const getSkillGroups = (categories = []) => {
  const availableSkills = new Map(
    categories
      .flatMap((category) => category.value || [])
      .map((skill) => [normalizeSkill(skill), skill])
  );

  return skillGroups
    .map((group) => ({
      ...group,
      skills: group.skills
        .map((skill) => availableSkills.get(normalizeSkill(skill)))
        .filter(Boolean),
      featured: group.featured
        .map((skill) => availableSkills.get(normalizeSkill(skill)))
        .filter(Boolean),
    }))
    .filter((group) => group.skills.length > 0);
};

export default getSkillGroups;
