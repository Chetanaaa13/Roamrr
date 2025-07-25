import React from "react";

const styles = `
body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(to bottom, #cceeff, #f0f8ff);
  color: #333;
}

header {
  background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e');
  background-size: cover;
  background-position: center;
  padding: 6rem 2rem;
  color: white;
  text-align: center;
  position: relative;
}

header::after {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0, 0, 50, 0.5);
  z-index: 0;
}

header > * {
  position: relative;
  z-index: 1;
}

header h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 6px rgba(0,0,0,0.3);
}

header p {
  font-size: 1.4rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin: auto;
}

.cta-button {
  background: #ffffff;
  color: #007bff;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.75rem 2rem;
  border-radius: 30px;
  border: 2px solid #007bff;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.cta-button:hover {
  background: #007bff;
  color: white;
}

.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 4rem 1rem;
  background: linear-gradient(to top, #ffffff, #e0f5ff);
}

.feature-card {
  background: white;
  width: 300px;
  border-radius: 20px;
  padding: 2rem 1rem;
  box-shadow: 0 8px 18px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-6px);
}

.feature-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 1rem;
}

.feature-card h2 {
  color: #0072ff;
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-size: 0.95rem;
  color: #444;
}

footer {
  background: #e0f0ff;
  text-align: center;
  padding: 1.5rem;
  font-size: 0.9rem;
  color: #555;
  border-top: 1px solid #cce0ff;
}
`;

function Home() {
  const handleClick = (e) => {
    e.preventDefault();
    alert('Trip planner page coming soon!');
  };

  return (
    <>
      <style>{styles}</style>
      <header>
        <h1>Welcome to Roamr 🌍</h1>
        <p>Your smart travel planner – discover, plan, and save trips effortlessly.</p><br></br>
        <a href="#trip-planner" className="cta-button" onClick={handleClick}>
          ✈ Start Planning
        </a>
      </header>

      <section className="features">
        <div className="feature-card">
          <img
            src="https://i.pinimg.com/1200x/d0/97/15/d097153dd9e47e05dbe3330290097af0.jpg"
            alt="Trip Planner"
          />
          <h2>🧳 Trip Planner</h2>
          <p>Create perfect itineraries with AI travel suggestions and real-time weather updates.</p>
        </div>

        <div className="feature-card">
          <img
            src="https://i.pinimg.com/1200x/a5/a2/b8/a5a2b8a84aa6ca827e2ce70a34d6168e.jpg"
            alt="Saved Trips"
          />
          <h2>📍 Saved Trips</h2>
          <p>Store past adventures and upcoming trips in one organized place for easy access.</p>
        </div>

        <div className="feature-card">
          <img
            src="https://i.pinimg.com/1200x/d4/be/d2/d4bed22d6ef3246c62278fac9343ba6e.jpg"
            alt="Travel Tools"
          />
          <h2>🛠 Travel Tools</h2>
          <p>Use helpful tools like currency converters, checklists, maps, and budget estimators.</p>
        </div>
      </section>

      <footer>
        <p>© 2025 Roamr — Built with 💙 for wanderers like you.</p>
      </footer>
    </>
  );
}

export default Home;