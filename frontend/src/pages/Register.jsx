import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userList, setUserList] = useState([]);
  const [actualDate, setActualDate] = useState("");

  const handleLogin = () => {
    navigate("/");
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeFirstPassword = (e) => {
    setFirstPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const getUserList = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`
      );
      setUserList(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  const emailExist = userList.some((user) => user.email === email);
  const usernameExist = userList.some((user) => user.username === username);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !username || !firstPassword || !confirmPassword) {
      // eslint-disable-next-line no-alert
      alert("you must provide a username, email, passowrd");
    } else if (firstPassword !== confirmPassword) {
      // eslint-disable-next-line no-alert
      alert("You must provide same password");
    } else if (emailExist) {
      // eslint-disable-next-line no-alert
      alert("The email is already taken");
    } else if (usernameExist) {
      // eslint-disable-next-line no-alert
      alert("The username is already taken");
    } else {
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        username,
        email,
        password: confirmPassword,
        createdAccount: actualDate,
      });
      // eslint-disable-next-line no-alert
      alert("Account created !");
      navigate("/");
    }
  };

  const getActualDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const formattedDate = `${year}/${month}/${day}`;
    setActualDate(formattedDate);
  };

  useEffect(() => {
    getActualDate();
  }, []);

  return (
    <div>
      <div className="container_register">
        <div className="register_title">
          <h1>Register</h1>
        </div>
        <form className="register" onSubmit={handleSubmit}>
          <label htmlFor="username">
            <input
              type="text"
              id="username"
              required
              placeholder="username"
              value={username}
              onChange={handleChangeUsername}
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              required
              placeholder="example@mail.com"
              value={email}
              onChange={handleChangeEmail}
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              id="password"
              required
              placeholder="Your password"
              value={firstPassword}
              onChange={handleChangeFirstPassword}
            />
          </label>
          <label htmlFor="confirm_password">
            <input
              type="password"
              id="confirm_password"
              required
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
            />
          </label>
          <button type="submit">Create Account</button>
        </form>
        <div className="div_create_account_register">
          <p>
            You dont have account ? Click{" "}
            <button type="button" onClick={handleLogin}>
              Here
            </button>{" "}
            !
          </p>
        </div>
      </div>
    </div>
  );
}
