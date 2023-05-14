import React, { useContext, useEffect, useState } from "react";
import styles from "./loginForm.module.css";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { PowerUserConext } from "@/providers/UserProvider";

const LoginForm = () => {
  const { loggedIn, setLoggedIn } = useContext(PowerUserConext);
  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const router = useRouter();

  const onSubmit = (e: any) => {
    e.preventDefault();
    router.push("/home");
    localStorage.setItem("powerUser", JSON.stringify(loggedIn));
  };

  const setFalse = () => {
    localStorage.setItem("powerUser", JSON.stringify(loggedIn));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Sandefjord's hotdog shops</h2>
        <h3>Login</h3>
      </div>
      <form onSubmit={onSubmit} action="/home" className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          className={styles.btn}
          type="submit"
          variant="outlined"
          onClick={() => setLoggedIn(true)}
        >
          Login
        </Button>
        <a
          className={styles.link}
          href="/home"
          onClick={() => {
            setLoggedIn(false);
            setFalse();
          }}
        >
          Continue without logging in
        </a>
      </form>
    </div>
  );
};

export default LoginForm;
