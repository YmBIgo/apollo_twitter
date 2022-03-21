import React from 'react';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"

import UserSignIn from "./components/UserAuth/UserSignIn"
import UserSignUp from "./components/UserAuth/UserSignUp"
import TweetIndex from "./components/Tweets/Index"

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <Routes>
          <Route path="/users/sign_in" element={<UserSignIn/>} />
          <Route path="/users/sign_up" element={<UserSignUp/>} />
          <Route path="/" element={<TweetIndex/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
