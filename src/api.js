const API = "https://myinfo-iqq5.onrender.com";

export const getProfile = async () => {
  const res = await fetch(`${API}/api/profile`);
  return res.json();
};

export const getProjectsBySkill = async (skill) => {
  const res = await fetch(`${API}/api/projects?skill=${skill}`);
  return res.json();
};

export const searchData = async (q) => {
  const res = await fetch(`${API}/api/search?q=${q}`);
  return res.json();
};
