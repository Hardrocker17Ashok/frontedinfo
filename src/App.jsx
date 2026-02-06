import { useEffect, useState } from "react";
import { getProfile, getProjectsBySkill, searchData } from "./api";


import "./App.css";

function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showProfile, setShowProfile] = useState(false);


  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  if (!profile) {
    return <div className="loading">Loading profile…</div>;
  }

  return (
    <div className="app">
      {/* TOP BAR */}
      <header className="topbar">
        <div>
          <h1>{profile.name}</h1>
          <p>{profile.education}</p>
        </div>
      </header>

      <main className="layout">

        {/* LEFT PANEL */}
        <aside className="sidebar">
          <h3>Skills</h3>
          <div className="skill-list">
            {profile.skills?.map(skill => (
              <button
                key={skill}
                onClick={() =>
                  getProjectsBySkill(skill).then(setProjects)
                }
              >
                {skill}
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <section className="content">






          {/* PROFILE VIEW */}
          <div className="card">
            <div className="profile-header">
              <h2>Profile</h2>
              <button
                className="toggle-btn"
                onClick={() => setShowProfile(!showProfile)}
              >
                {showProfile ? "Hide Profile" : "View Profile"}
              </button>
            </div>

            {showProfile && (
              <div className="profile-grid">
                <div>
                  <label>Name</label>
                  <p>{profile.name}</p>
                </div>

                <div>
                  <label>Email</label>
                  <p>{profile.email}</p>
                </div>

                <div>
                  <label>Education</label>
                  <p>{profile.education}</p>
                </div>

                <div className="profile-skills">
                  <label>Skills</label>
                  <div className="skill-tags">
                    {profile.skills?.map(s => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                </div>

                {profile.links && (
                  <div className="profile-links">
                    <label>Links</label>
                    <div>
                      {profile.links.github && (
                        <a href={profile.links.github} target="https://github.com/Hardrocker17Ashok">GitHub</a>
                      )}
                      {profile.links.linkedin && (
                        <a href={profile.links.linkedin} target="https://www.linkedin.com/in/artifical-ashok-sharma/">LinkedIn</a>
                      )}

                    </div>
                  </div>
                )}
              </div>
            )}
          </div>



          {/* SEARCH CARD */}
          <div className="card">
            <h2>Search</h2>
            <div className="search-box">
              <input
                placeholder="Search skill, project, name…"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <button onClick={() => searchData(query).then(setResults)}>
                Search
              </button>
            </div>

            <ul className="search-results">
              {results.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          {/* PROJECTS */}
          <div className="card">
            <h2>Projects</h2>

            {projects.length === 0 ? (
              <p className="muted">
                Click on a skill to view projects.
              </p>
            ) : (
              <div className="project-grid">
                {projects.map((p, i) => (
                  <div className="project-card" key={i}>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>



                    {p.links && p.links.length > 0 && (
                      <div className="project-links">
                        {p.links.map((link, idx) => (
                          <a
                            key={idx}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Project →
                          </a>
                        ))}
                      </div>
                    )}



                  </div>
                ))}
              </div>
            )}
          </div>


        </section>
      </main>

      <footer className="footer">
        Me-API Playground • Spring Boot + React
      </footer>
    </div>
  );

}

export default App;
