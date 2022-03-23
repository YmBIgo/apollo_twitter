import React from 'react';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"

import UserSignIn from "./components/UserAuth/UserSignIn"
import UserSignUp from "./components/UserAuth/UserSignUp"
import TweetIndex from "./components/Tweets/Index"
import TweetShow from "./components/Tweets/Show"
import TweetNew from "./components/Tweets/New"
import UserShow from "./components/User/Show"
import UserEdit from "./components/User/Edit"

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <Routes>
          <Route path="/users/sign_in" element={<UserSignIn/>} />
          <Route path="/users/sign_up" element={<UserSignUp/>} />
          <Route path="/" element={<TweetIndex/>} />
          <Route path="/tweets/:tweet_id" element={<TweetShow/>} />
          <Route path="/tweets/new" element={<TweetNew/>}/>
          <Route path="/users/:user_id" element={<UserShow/>} />
          <Route path="/users/edit" element={<UserEdit/>} />
        </Routes>
        <br />
        <Link to="/">Top Page</Link>
      </div>
    </BrowserRouter>
  );
}

export default App;
