import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useState } from "react";
import UserContext from "./UserContext";
import GlobalStyle from "./GlobalStyle";
import SignInPage from "./SingInPage";
import SignUpPage from "./SignUpPage";
import Transactions from "./Transactions";
export default function App() {
  return (
    <UserContext.Provider>
      <BrowserRouter>
        <GlobalStyle />

        <Routes>
          <Route path={"/"} element={<SignInPage />} />
          <Route path={"/sign-up"} element={<SignUpPage />} />
          <Route path={"/transactions"} element={<Transactions />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
