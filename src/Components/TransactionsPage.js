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
  const { reloadTransactions, setReloadTransactions } =
    useContext(TransactionsContext);
  let token = localStorage.getItem("token");
  let name = localStorage.getItem("name");
  const [balance, setBalance] = useState(0);
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

        setAllTransactions(resp.data);
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
  function EmptyBoard() {
    return (
      <NoRegister>
        Não há registros de <br />
        entrada ou saída
      </NoRegister>
    );
  }

  function ShowBoard() {
    return (
      <Board>
        <ListTransactions
          allTransactions={allTransactions}
          setBalance={setBalance}
          reloadTransactions={reloadTransactions}
          setReloadTransactions={setReloadTransactions}
          config={config}
        />
        <Balance balance={Number(balance)}>
          SALDO <span>{Math.abs(Number(balance)).toFixed(2)}</span>
        </Balance>
      </Board>
    );
  }
  async function deleting(id) {
    if (window.confirm("Tem certeza que deseja apagar esse hábito?")) {
      await axios.delete(
        `https://apimywallet.herokuapp.com/transactions/${id}`
      );
      setReloadTransactions(!reloadTransactions);
    }
  }

  return (
    <Container>
      <Header>
        <h1>Olá, {name}</h1>
        <IoExitOutline color="white" fontSize={"26px"} onClick={exit} />
      </Header>
      {allTransactions.length === 0 ? <EmptyBoard /> : <ShowBoard />}
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

function ListTransactions({
  allTransactions,
  setBalance,
  reloadTransactions,
  setReloadTransactions,
  config,
}) {
  useEffect(() => {
    let newBalance = 0;
    for (let i = 0; i < allTransactions.length; i++) {
      if (allTransactions[i].status === "inflow") {
        newBalance += Number(allTransactions[i].value);
      } else if (allTransactions[i].status === "outflow") {
        newBalance -= Number(allTransactions[i].value);
      }
    }
    setBalance(newBalance);
  }, [allTransactions]);

  return (
    <>
      {allTransactions.map((value, ind) => (
        <TransactionStyle key={ind}>
          <div>
            <span style={{ color: "#C6C6C6" }}>{value.day}</span>
            <span>{value.description}</span>
          </div>
          <div>
            <Price status={value.status}>
              {Number(value.value).toFixed(2)}
            </Price>
            <span
              style={{ color: "#C6C6C6" }}
              onClick={() =>
                deleting(
                  value._id,
                  reloadTransactions,
                  setReloadTransactions,
                  config
                )
              }
            >
              X
            </span>
          </div>
        </TransactionStyle>
      ))}
    </>
  );
}
async function deleting(id, reloadTransactions, setReloadTransactions, config) {
  if (window.confirm("Tem certeza que deseja apagar esse hábito?")) {
    try {
      await axios.delete(
        `https://apimywallet.herokuapp.com/transactions/${id}`,
        config
      );
      setReloadTransactions(!reloadTransactions);
    } catch (error) {
      console.log(error);
    }
  }
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
  margin-top: 20px;
  font-size: 18px;
`;

const TransactionStyle = styled.div`
  display: flex;
  padding: 23px 12px 0;
  width: 90%;
  justify-content: space-between;
  div {
    span {
      padding-right: 8px;
    }
  }
`;

const Price = styled.span`
  margin-right: 8px;
  color: ${(props) => (props.status === "inflow" ? "#03AC00" : "#C70000")};
`;

const Balance = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  position: absolute;
  color: #000000;
  bottom: 10px;
  left: 15px;

  span {
    font-weight: 400;
    color: ${(props) => (props.balance >= 0 ? "#03AC00" : "#C70000")};
  }
`;

const NoRegister = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  width: 85%;
  height: 70%;
  border-radius: 5px;
  text-align: center;
  color: #868686;
`;
