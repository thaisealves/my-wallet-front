import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TransactionsContext from "./TransactionsContext";


export default function PositiveUpdate() {
  const { setReloadTransactions, reloadTransactions, putId } =
    useContext(TransactionsContext);
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [disable, setDisable] = useState(false);
  const [buttonCtt, setButtonCtt] = useState("Atualizar entrada");

  let token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  async function inflowHandler(event) {
    event.preventDefault();
    setButtonCtt(<data.Component {...data.props} />);
    setDisable(true);

    let body = {
      description,
      value,
      status: "inflow",
    };
    try {
      await axios.put(
        `https://apimywallet.herokuapp.com/transactions/${putId}`,
        body,
        config
      );
      setReloadTransactions(!reloadTransactions);
      navigate("/transactions");
      setDisable(false);
    } catch (error) {
      console.log(error);
      setDisable(false);
      setButtonCtt("Salvar entrada");
    }
  }

  return (
    <Container>
      <div>
        <Header>
          <h1>Editar entrada</h1>
        </Header>

        <Forms onSubmit={inflowHandler}>
          <Disabled disabled={disable}>
            <input
              type="text"
              placeholder="Valor"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              disabled={disable}
            />
            <input
              type="text"
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={disable}
            />
            <button type="submit">{buttonCtt}</button>
          </Disabled>
        </Forms>
      </div>
    </Container>
  );
}

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
  flex-direction: column;
  align-items: flex-start;

  > div {
    height: 40%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
`;
const Header = styled.div`
  display: flex;
  margin: 24px 0;
  width: 85%;
  justify-content: space-between;
  h1 {
    color: #ffffff;
    font-weight: 700;
    font-size: 26px;
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
