import axios from "axios";
import { useEffect, useState } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import "./App.css";

function App() {
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://ec2-13-58-153-32.us-east-2.compute.amazonaws.com:8080/sentiment"
      )
      .then((res) => setTweets(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getId = (link) => {
    const arr = link.split("/");
    return arr[arr.length - 1];
  };

  return (
    <div className="App">
      {tweets.map((tweet, i) => (
        <TwitterTweetEmbed
          key={"tweet_" + i}
          tweetId={getId(tweet.link)}
        />
      ))}
    </div>
  );
}

export default App;
