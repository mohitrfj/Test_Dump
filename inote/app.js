
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useState, useEffect } from "react";
import Alert from './components/Alert'
import Reload from "./components/Reload";
// import TestReload from "./TestReload";



function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Sample function to handle the logout action
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Perform any additional logout logic here
  };

  const clearStorage = () => {
    localStorage.clear();
  }

  // Function to handle the beforeunload event
  const handleBeforeUnload = (event) => {
    if (isLoggedIn) {
      event.preventDefault();
      event.returnValue = "";
    }
  };

  // Attach event listener when the component mounts
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', clearStorage);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', clearStorage);
    };
  }, [isLoggedIn]);




  return (
    <>
      <NoteState showAlert={showAlert}>
        <Router>
          <Navbar />
          {/* <Reload /> */}
          {/* <TestReload /> */}
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
