import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import styled from "styled-components";
import axios from "axios";
import logo from "../images/MyWallet.png";
import signUpSchema from "../Schemas/signUpSchema.js";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [disable, setDisable] = useState(false);
  const [buttonCtt, setButtonCtt] = useState("Cadastrar");
  const navigate = useNavigate();

  async function signUpHandler(event) {
    event.preventDefault();
    setButtonCtt(<data.Component {...data.props} />);
    setDisable(true);

    let body = {
      name,
      email,
      password,
      passConfirm,
    };
    const validation = signUpSchema.validate(body);

    if (validation.error) {
      alert("Confirmação de senha não condiz!");
      setDisable(false);
      setButtonCtt("Cadastrar");
      return;
    }
    try {
      await axios.post("https://apimywallet.herokuapp.com/sign-up", body);
      navigate("/");
      setDisable(false);
    } catch (error) {
      console.log(error);
      alert(`${error.response.data}`);
      setDisable(false);
      setButtonCtt("Cadastrar");
    }
  }
  return (
    <Container>
      <div>
        <img src={logo} alt="Logo TrackIt" />

        <Forms onSubmit={signUpHandler}>
          <Disabled disabled={disable}>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={disable}
            />
            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={disable}
            />
            <input
              type="text"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={disable}
            />
            <input
              type="text"
              placeholder="Confirme a senha"
              value={passConfirm}
              onChange={(e) => setPassConfirm(e.target.value)}
              required
              disabled={disable}
            />
            <button type="submit">{buttonCtt}</button>
          </Disabled>
        </Forms>
        <Linked to={"/"}>Já tem uma conta? Entre agora!</Linked>
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
    height: 70%;
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
    border: none;
    width: 100%;
    height: 58px;
    background-color: #ffffff;
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: 400;
    &::placeholder {
      color: #000000;
      font-family: "Raleway", sans-serif;
      padding-left: 15px;
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
