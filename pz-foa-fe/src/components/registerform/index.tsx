// RegisterForm.js
/*
import React from "react";

const RegisterForm = ({ onBackToLoginClick }) => {
  return (
    <div className="login-form">
      <h2>Rejestracja</h2>
      <form>
        <label>Login:</label>
        <input type="text" />
        <br />
        <label>Hasło:</label>
        <input type="password" />
        <br />
        <label>Email:</label>
        <input type="email" />
        <br />
        <button>Zarejestruj się</button>
      </form>
      <p>
        Masz już konto?{" "}
        <button onClick={onBackToLoginClick}>Powrót do logowania</button>
      </p>
    </div>
  );
};

export default RegisterForm;
*/
// RegisterForm.js
import React, { useState } from "react";
import axios from "axios";

const RegisterForm = ({ onBackToLoginClick }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        login: username,
        passwordHSW: password,
        email,
      });

      if (response.status === 200) {
        console.log(response.data.message);
        // Obsługa sukcesu, np. wyświetlenie komunikatu o sukcesie
        onBackToLoginClick(); // Przełączenie na ekran logowania po rejestracji
      } else {
        console.error(response.data.message);
        // Obsługa błędu, np. wyświetlenie komunikatu o błędzie rejestracji
      }
    } catch (error) {
      console.error("Wystąpił błąd podczas rejestracji", error);
    }
  };

  return (
    <div>
      <h2>Zarejestruj się</h2>
      <form>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button type="button" onClick={handleRegister}>
          Zarejestruj
        </button>
      </form>
      <p>
        Masz już konto? <span onClick={onBackToLoginClick}>Zaloguj się</span>
      </p>
    </div>
  );
};

export default RegisterForm;
