const getDateTime = (value) => {
  if (!value) {
    return null;
  }

  const time = new Date(value).getTime();
  return Number.isNaN(time) ? null : time;
};

const getObjectIdTime = (value) => {
  if (typeof value !== "string" || !/^[a-f\d]{24}$/i.test(value)) {
    return null;
  }

  return parseInt(value.slice(0, 8), 16) * 1000;
};

const getProjectOrder = (project) => {
  if (!project) {
    return null;
  }

  return (
    getDateTime(project.createdAt) ??
    getDateTime(project.date) ??
    // eslint-disable-next-line no-underscore-dangle
    getObjectIdTime(project._id) ??
    Number(project.id) ??
    null
  );
};

const sortProjectsByNewest = (projects = []) => {
  if (!Array.isArray(projects)) {
    return [];
  }

  return [...projects].sort((firstProject, secondProject) => {
    const firstOrder = getProjectOrder(firstProject);
    const secondOrder = getProjectOrder(secondProject);

    if (firstOrder === null && secondOrder === null) {
      return 0;
    }

    if (firstOrder === null) {
      return 1;
    }

    if (secondOrder === null) {
      return -1;
    }

    return secondOrder - firstOrder;
  });
};

export default sortProjectsByNewest;
