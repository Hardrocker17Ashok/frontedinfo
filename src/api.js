const API = "http://localhost:8080/api";

export const getProfile = async () => {
  const res = await fetch(`${API}/profile`);
  return res.json();
};

export const getProjectsBySkill = async (skill) => {
  const res = await fetch(`${API}/projects?skill=${skill}`);
  return res.json();
};

export const searchData = async (q) => {
  const res = await fetch(`${API}/search?q=${q}`);
  return res.json();
};
