import styled from "styled-components";
import logo from "../images/MyWallet.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import axios from "axios";
export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [buttonCtt, setButtonCtt] = useState("Entrar");
  async function signInHandler(event) {
    event.preventDefault();
    setButtonCtt(<data.Component {...data.props} />);
    setDisable(true);
    let body = {
      email,
      password,
    };
    try {
      await axios.post("https://apimywallet.herokuapp.com/sign-in", body);
      alert("estamos bem");
      navigate("/transactions");
      setDisable(false);
      localStorage.setItem("token", resp.data.token);
    } catch (error) {
      console.log(error);
      alert(`${error.response.data}`);
      setDisable(false);
      setButtonCtt("Entrar");
    }
  }
  return (
    <Container>
      <div>
        <img src={logo} alt="MyWallet Logo" />
        <Forms onSubmit={signInHandler}>
          <Disabled disabled={disable}>
            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={disable}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={disable}
            />
            <button type="submit">{buttonCtt}</button>
          </Disabled>
        </Forms>
        <Linked to={"/sign-up"}>Primeira vez? Cadastre-se!</Linked>
      </div>
    </Container>
  );
}
// putting the input and the button on disable until it waits for the response
function Disabled({ disabled, children }) {
  if (disabled) {
    return (
      <div style={{ opacity: 0.5 }} disabled>
        {children}
      </div>
    );
  }

  return <>{children}</>;
}

// the loading symbol
const data = {
  Component: Bars,
  props: {
    color: "#330558",
    height: 40,
    width: 110,
  },
};
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #8c11be;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    height: 60%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
`;

const Forms = styled.form`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    box-sizing: border-box;
    border-radius: 5px;
    width: 100%;
    border: none;
    height: 58px;
    background-color: #ffffff;
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: 400;
    &::placeholder {
      color: #000000;
      font-family: "Raleway", sans-serif;
      padding-left: 10px;
    }
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: none;
    width: 100%;
    height: 46px;
    background-color: #a328d6;
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
  }
`;

const Linked = styled(Link)`
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
`;
