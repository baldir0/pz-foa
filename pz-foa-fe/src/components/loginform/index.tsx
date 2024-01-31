// LoginForm.js
import React, { useState } from 'react';
import './styles.css'; // Importuj plik CSS
import axios from 'axios';

/*
const LoginForm = ({ onRegisterClick, onForgotPasswordClick }) => {
  return (
    <div className="login-form">
      <h2>Logowanie</h2>
      <form>
        <label>Login:</label>
        <input type="text" />
        <br />
        <label>Hasło:</label>
        <input type="password" />
        <br />
        <button>Zaloguj</button>
      </form>
      <p>
        Nie masz konta?{" "}
        <button onClick={onRegisterClick}>Zarejestruj się</button>
      </p>
      <p>
        <button onClick={onForgotPasswordClick}>Zapomniałem hasła</button>
      </p>
    </div>
  );
};

export default LoginForm;
*/

const LoginForm = ({ onRegisterClick, onForgotPasswordClick, login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: SubmitEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/login',
        {
          login: username,
          passwordHSW: password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Obsługa sukcesu, np. przekierowanie do innej strony
        console.log(response);
        console.log('Zalogowano pomyślnie');
        login(true);
      } else {
        // Obsługa błędu, np. wyświetlenie komunikatu
        console.error('Błąd logowania');
        login(false);
      }
    } catch (error) {
      console.error('Wystąpił błąd podczas komunikacji z serwerem', error);
    }
  };

  return (
    <div>
      <h2>Zaloguj się</h2>
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type='submit'>Zaloguj</button>
      </form>
      <p>
        Nie masz konta? <span onClick={onRegisterClick}>Zarejestruj się</span>
      </p>
      <p>
        <span onClick={onForgotPasswordClick}>Zapomniałeś hasła?</span>
      </p>
    </div>
  );
};

export default LoginForm;
