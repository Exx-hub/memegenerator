import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./styles.module.css";
import { useClipboard } from "use-clipboard-copy";

function MemeGenerated() {
  const [copied, setCopied] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const url = new URLSearchParams(location.search).get("myurl");
  const clipboard = useClipboard();

  // console.log("history:", history);
  // console.log("location:", location);
  // console.log("url", url);
  // console.log("clipboard", clipboard);

  const copyLink = () => {
    clipboard.copy(url);
    setCopied(true);
  };

  return (
    <div className={styles.container}>
      <button onClick={() => history.push("/")} className={styles.home}>
        Make more memes!
      </button>
      {url && <img src={url} alt="" />}
      <button onClick={copyLink} className={styles.copy}>
        {copied ? "Link Copied!" : "Copy meme!"}
      </button>
    </div>
  );
}

export default MemeGenerated;
