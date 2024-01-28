// RegisterForm.js
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
