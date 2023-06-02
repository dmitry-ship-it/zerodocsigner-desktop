import React from "react";
import HttpClient from "../HttpClient";

export default function LoginForm(ctx: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) {
  const formRef = React.createRef<HTMLFormElement>();

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!formRef.current) return;
    if (!formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }

    const formData = new FormData(formRef.current);
    const isLoggedIn = await HttpClient.login({
      userName: formData.get("userName") as string,
      password: formData.get("password") as string,
    });

    ctx.setIsLoggedIn(isLoggedIn);
  };

  return (
    <form className="login-form" ref={formRef}>
      <label className="input-row">
        Имя пользователя
        <input className="form-input" name="userName" type="text" required />
      </label>
      <label className="input-row">
        Пароль
        <input className="form-input" name="password" type="password" required />
      </label>
      <br />
      <button className="button-main" type="submit" onClick={handleLogin}>
        Войти
      </button>
    </form>
  );
}
