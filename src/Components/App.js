import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import TransactionsContext from "./TransactionsContext";
import GlobalStyle from "./GlobalStyle";
import SignInPage from "./SingInPage";
import SignUpPage from "./SignUpPage";
import TransactionsPage from "./TransactionsPage";
import Inflow from "./Inflow";
import Outflow from "./Outflow";
import PositiveUpdate from "./PositiveUpdate";
import NegativeUpdate from "./NegativeUpdate";
export default function App() {
  const [reloadTransactions, setReloadTransactions] = useState(false);
  const [putId, setPutId] = useState("")
  return (
    <TransactionsContext.Provider
      value={{ reloadTransactions, setReloadTransactions, putId, setPutId }}
    >
      <BrowserRouter>
        <GlobalStyle />

        <Routes>
          <Route path={"/"} element={<SignInPage />} />
          <Route path={"/sign-up"} element={<SignUpPage />} />
          <Route path={"/transactions"} element={<TransactionsPage />} />
          <Route path={"/inflow"} element={<Inflow />} />
          <Route path={"/outflow"} element={<Outflow />} />
          <Route path={"/positive-update"} element={<PositiveUpdate />} />
          <Route path={"/negative-update"} element={<NegativeUpdate />} />

        </Routes>
      </BrowserRouter>
    </TransactionsContext.Provider>
  );
}
