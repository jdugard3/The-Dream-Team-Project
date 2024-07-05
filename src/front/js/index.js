import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { MichaelJordan } from "./pages/MichaelJordan";
import "../styles/index.css";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/michael-jordan" element={<MichaelJordan />} />
    </Routes>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("root"));
