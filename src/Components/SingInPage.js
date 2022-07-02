import styled from "styled-components";
import logo from "../images/MyWallet.png";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import axios from "axios";
export default function SignInPage() {
  const { email, setEmail, password, setPassword } = useContext(UserContext);
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [buttonCtt, setButtonCtt] = useState("Entrar");
  async function signInHandler(event) {
    event.preventDefault();
    // setButtonCtt(<data.Component {...data.props} />);
    setDisable(true);
    let body = {
      email,
      password,
    };
    alert("to aqui acima da promisse");
    try {
      await axios.post("https://apimywallet.herokuapp.com/sign-in", body);
      alert("estamos bem");
      navigate("/transactions");
      setDisable(false);
    } catch (error) {
      console.log(error);
      alert(`Error ${error.response.data}`);
      setDisable(false);
      setButtonCtt("Entrar");
    }
  }
  return (
    <Container>
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

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #8c11be;
`;

const Forms = styled.form``;
const Linked = styled(Link)`
  color: #ffffff;
  font-size: 14px;
`;
