import React from "react";
import Form from "./Form";
import LoginForm from "./LoginForm";

export default function FormContainer() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return <div className="container">{isLoggedIn ? <Form setIsLoggedIn={setIsLoggedIn} /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />}</div>;
}
