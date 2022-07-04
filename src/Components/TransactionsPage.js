import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import TransactionsContext from "./TransactionsContext";
import {
  IoExitOutline,
  IoAddCircleOutline,
  IoRemoveCircleOutline,
} from "react-icons/io5";
export default function TransactionsPage() {
  const { reloadTransactions } = useContext(TransactionsContext);
  let token = localStorage.getItem("token");
  let name = localStorage.getItem("name");
  const navigate = useNavigate();
  const [allTransactions, setAllTransactions] = useState([]);
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

  function exit() {
    localStorage.clear();
    navigate("/");
  }

  function ListTransactions() {
    return (
      <>
        {allTransactions.map((value, ind) => (
          <TransactionStyle key={ind}>
            <div>
              <span style={{ color: "#C6C6C6" }}>{value.day}</span>
              <span>{value.description}</span>
            </div>
            <Price status={value.status}>{value.value}</Price>
          </TransactionStyle>
        ))}
      </>
    );
  }

  return (
    <Container>
      <Header>
        <h1>Olá, {name}</h1>
        <IoExitOutline color="white" fontSize={"26px"} onClick={exit} />
      </Header>
      <Board>
        <ListTransactions />
        <Balance>SALDO: </Balance>
      </Board>
      <Movements>
        <AddTransaction onClick={() => navigate("/inflow")}>
          <IoAddCircleOutline fontSize={"25px"} />
          Nova <br />
          entrada
        </AddTransaction>
        <AddTransaction onClick={() => navigate("/outflow")}>
          <IoRemoveCircleOutline fontSize={"25px"} />
          Nova
          <br />
          saída
        </AddTransaction>
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
  color: black;
  overflow: auto;
  position: relative;
`;
const Movements = styled.div`
  display: flex;
  width: 85%;
  height: 20%;
  justify-content: space-between;
`;

const AddTransaction = styled.div`
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

const TransactionStyle = styled.div`
  display: flex;
  padding: 23px 12px 0;
  width: 90%;
  justify-content: space-between;
  div {
    span {
      padding-right: 5px;
    }
  }
`;

const Price = styled.span`
  color: ${(props) => (props.status === "inflow" ? "#03AC00" : "#C70000")};
`;

const Balance = styled.div`
  font-weight: 700;
  position: absolute;
  color: #000000;
  bottom: 10px;
  left: 15px;
`;
