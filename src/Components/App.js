import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import TransactionsContext from "./TransactionsContext";
import GlobalStyle from "./GlobalStyle";
import SignInPage from "./SingInPage";
import SignUpPage from "./SignUpPage";
import TransactionsPage from "./TransactionsPage";
import Inflow from "./Inflow";
import Outflow from "./Outflow";
export default function App() {
  const [reloadTransactions, setReloadTransactions] = useState(false);

  return (
    <TransactionsContext.Provider
      value={{ reloadTransactions, setReloadTransactions }}
    >
      <BrowserRouter>
        <GlobalStyle />

        <Routes>
          <Route path={"/"} element={<SignInPage />} />
          <Route path={"/sign-up"} element={<SignUpPage />} />
          <Route path={"/transactions"} element={<TransactionsPage />} />
          <Route path={"/inflow"} element={<Inflow />} />
          <Route path={"/outflow"} element={<Outflow />} />
        </Routes>
      </BrowserRouter>
    </TransactionsContext.Provider>
  );
}
