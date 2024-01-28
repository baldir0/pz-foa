// LoginForm.js
import React from "react";
import "./styles.css"; // Importuj plik CSS

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
