import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./Components/Inlogg";
import Registration from "./Components/Registration";
import Homepage from "./Components/Homepage";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {

  return (

    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}></Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>
                    Sign in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="outer">
          <div className="inner">
            <Routes>
              <Route exact path="/" element={<Login />}></Route>
              <Route path="/sign-in" element={<Login />}></Route>
              <Route path="/sign-up" element={<Registration />}></Route>
              <Route path="/homepage" element={<ProtectedRoute component={Homepage} />}/>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
