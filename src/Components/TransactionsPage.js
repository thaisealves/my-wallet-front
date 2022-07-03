import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  IoExitOutline,
  IoAddCircleOutline,
  IoRemoveCircleOutline,
} from "react-icons/io5";
export default function TransactionsPage() {
  let token = localStorage.getItem("token");
  let name = localStorage.getItem("name");

  const navigate = useNavigate();
  const [allTransactions, setAllTransactions] = useState("");
  const [reloadTransactions, setReloadTransactions] = useState(false);
  if (!token) {
    navigate("/");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    async function shownTransactions() {
      try {
        const resp = await axios.get(
          "https://apimywallet.herokuapp.com/transactions",
          config
        );
        console.log(resp);
        setAllTransactions(resp.data);
        console.log(allTransactions);
      } catch (error) {
        console.log(error);
      }
    }
    shownTransactions();
  }, [reloadTransactions]);
  return (
    <Container>
      <Header>
        <h1>Olá, {name}</h1>
        <IoExitOutline color="white" fontSize={"26px"} fontWeight="bold" />
      </Header>
      <Board>{allTransactions}</Board>
      <Movements>
        <Enter>
          <IoAddCircleOutline fontSize={"25px"} />
          Nova <br />
          entrada
        </Enter>
        <Exit>
          <IoRemoveCircleOutline fontSize={"25px"} />
          Nova
          <br />
          saída
        </Exit>
      </Movements>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #8c11be;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
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
const Board = styled.div`
  background-color: #ffffff;
  width: 85%;
  height: 70%;
  border-radius: 5px;
`;
const Movements = styled.div`
  display: flex;
  width: 85%;
  height: 20%;
  justify-content: space-between;
`;

const Enter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #a328d6;
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  font-weight: 700;
  width: 40%;
  height: 60%;
  margin-top: 5%;
  font-size: 18px;
`;
const Exit = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #a328d6;
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  font-weight: 700;
  width: 40%;
  height: 60%;
  margin-top: 5%;
  font-size: 18px;
`;
