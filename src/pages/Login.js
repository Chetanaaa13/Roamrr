import React, { useState } from 'react';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    loginUsername: '',
    loginPassword: '',
    regUsername: '',
    regEmail: '',
    regPassword: ''
  });

  const toggleForms = () => setIsLogin(prev => !prev);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = e => {
    e.preventDefault();
    const { regUsername, regEmail, regPassword } = formData;
    localStorage.setItem(
      'user',
      JSON.stringify({ username: regUsername, email: regEmail, password: regPassword })
    );
    alert('🏖 Registered successfully!');
    toggleForms();
  };

  const handleLogin = e => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (
      storedUser &&
      formData.loginUsername === storedUser.username &&
      formData.loginPassword === storedUser.password
    ) {
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = '/dashboard';
    } else {
      alert('⚠ Invalid username or password.');
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.card}>
        {isLogin ? (
          <form onSubmit={handleLogin} style={styles.form}>
            <h2 style={styles.heading}>🌴 Login</h2>
            <input
              id="loginUsername"
              value={formData.loginUsername}
              onChange={handleChange}
              placeholder="Username"
              required
              style={styles.input}
            />
            <input
              id="loginPassword"
              type="password"
              value={formData.loginPassword}
              onChange={handleChange}
              placeholder="Password"
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Login</button>
            <span onClick={toggleForms} style={styles.toggleLink}>
              Don’t have an account? <b>Register</b>
            </span>
          </form>
        ) : (
          <form onSubmit={handleRegister} style={styles.form}>
            <h2 style={styles.heading}>🏄 Register</h2>
            <input
              id="regUsername"
              value={formData.regUsername}
              onChange={handleChange}
              placeholder="Username"
              required
              style={styles.input}
            />
            <input
              id="regEmail"
              type="email"
              value={formData.regEmail}
              onChange={handleChange}
              placeholder="Email"
              required
              style={styles.input}
            />
            <input
              id="regPassword"
              type="password"
              value={formData.regPassword}
              onChange={handleChange}
              placeholder="Password"
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Register</button>
            <span onClick={toggleForms} style={styles.toggleLink}>
              Already have an account? <b>Login</b>
            </span>
          </form>
        )}
      </div>
    </div>
  );
};

const styles = {
  background: {
    height: '100vh',
    backgroundImage: 'url("https://i.pinimg.com/1200x/41/46/28/414628e811f0bc38ce14d5ce92bad444.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '2.5rem',
    width: '90%',
    maxWidth: '400px',
    color: 'Darkblue',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: 'Darkblue'
  },
  input: {
    padding: '0.8rem',
    margin: '0.5rem 0',
    borderRadius: '8px',
    border: '1px solid rgba(43, 148, 190, 0.4)',
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'White',
    fontSize: '1rem',
    outline: 'none',
  },
  button: {
    marginTop: '1rem',
    padding: '0.8rem',
    background: '#0097a7',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s ease',
  },
  toggleLink: {
    marginTop: '1rem',
    fontSize: '0.9rem',
    color: '#fff',
    textDecoration: 'underline',
    cursor: 'pointer',
  }
};

export default LoginRegister;