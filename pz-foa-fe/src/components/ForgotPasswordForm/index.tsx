// ForgotPasswordForm.js
import React from "react";
import "./styles.css"; // Importuj plik CSS

const ForgotPasswordForm = ({ onBackToLoginClick }) => {
  return (
    <div className="login-form">
      <h2>Zapomniałem hasła</h2>
      <form>
        <label>Email:</label>
        <input type="email" />
        <br />
        <button>Zresetuj hasło</button>
      </form>
      <p>
        <button onClick={onBackToLoginClick}>Powrót do logowania</button>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
