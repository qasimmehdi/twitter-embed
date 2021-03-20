/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import "./App.css";

function App() {
  const [tweets, setTweets] = useState([]);
  const [noTweets, setNoTweets] = useState(false);
  const search = window.location.pathname.split("/")[1];

  useEffect(() => {
    axios
      .get(
        `http://ec2-13-58-153-32.us-east-2.compute.amazonaws.com:8080/sentiment?search=${search}`
      )
      .then((res) => {
        setTweets(res.data);
        !res.data.length > 0 ? setNoTweets(true) : setNoTweets(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const getId = (link) => {
    const arr = link.split("/");
    return arr[arr.length - 1];
  };

  return (
    <div className="App">
      {tweets.map((tweet, i) => (
        <TwitterTweetEmbed key={"tweet_" + i} tweetId={getId(tweet.link)} />
      ))}
      {noTweets && (
        <div style={{ color: "white", fontWeight: "600", textAlign: "center" }}>
          No tweets found!
        </div>
      )}
    </div>
  );
}

export default App;
