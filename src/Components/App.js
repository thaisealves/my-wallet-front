import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./UserContext";
import GlobalStyle from "./GlobalStyle";
import SignInPage from "./SingInPage";
import SignUpPage from "./SignUpPage";
import Transactions from "./Transactions";
export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <UserContext.Provider value={{ email, setEmail, password, setPassword }}>
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
