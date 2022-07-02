import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./UserContext";
import SignUpPage from "./SignUpPage";
export default function App() {
  const [email, setEmail] = useState("");

  return (
    <UserContext.Provider value={{ email, setEmail }}>
    </UserContext.Provider>
  );
}
