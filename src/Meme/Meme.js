import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { useHistory } from "react-router-dom";

function Meme() {
  const [memes, setMemes] = useState([]);
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 100));
  const [captions, setCaptions] = useState([]);
  // console.log(captions);
  console.log(randomNum);
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get("https://api.imgflip.com/get_memes");
      // console.log(result.data.data.memes);
      setMemes(result.data.data.memes);
    };
    getData();
  }, []);

  useEffect(() => {
    if (memes.length) {
      setCaptions(Array(memes[randomNum].box_count).fill(""));
    }
  }, [memes, randomNum]);

  const getRandom = () => {
    const random = Math.floor(Math.random() * 100);
    if (random !== randomNum) {
      setRandomNum(random);
    } else {
      setRandomNum(randomNum + 1);
    }
  };

  // NEW SHIT FOR ME. CALLING A FUNCTION FOR ONCHANGE THEN UPDATES STATE DEPENDING ON THE INDEX OF THE EVENT TARGET AND MAPS THROUGH CAPTIONS ARRAY STATE AND UPDATES IS DEPENDING ON THE INPUT VALUE
  const updateCaption = (value, index) => {
    let mapped = captions.map((item, i) => {
      if (index === i) {
        return value;
      } else {
        return item;
      }
    });
    setCaptions(mapped);
  };

  const generateMeme = () => {
    const currentMeme = memes[randomNum];

    const formData = new FormData();

    formData.append("username", "RagnarokMobile");
    formData.append("password", "Lokalsoul!1987");
    formData.append("template_id", currentMeme.id);
    captions.forEach((item, index) =>
      formData.append(`boxes[${index}][text]`, item)
    );

    axios("https://api.imgflip.com/caption_image", {
      method: "POST",
      data: formData,
    }).then((res) => {
      history.push(`/generated?myurl=${res.data.data.url}`);
    });
  };

  return memes.length ? (
    <div className={styles.container}>
      <button className={styles.generate} onClick={generateMeme}>
        Generate
      </button>
      <button className={styles.skip} onClick={getRandom}>
        Skip
      </button>
      {captions.map((item, index) => (
        <input
          key={index}
          onChange={(e) => updateCaption(e.target.value, index)}
        />
      ))}
      <img src={memes[randomNum].url} alt="" className={styles.meme_image} />
    </div>
  ) : (
    <></>
  );
}

export default Meme;
