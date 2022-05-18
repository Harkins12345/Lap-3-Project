const axios = require("axios");

const URL = "https://opentdb.com/";

const fetchQuestions = async (categoryId) => {
  try {
    const token = fetchToken()
    const res = await axios.get(
      `${URL}api.php?amount=1&category=${categoryId}&type=multiple${token !==
        null && `&token=${token}`}&encode=url3986`
    );
    return res.data.results;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const fetchToken = async () => {
  try {
    const res = await axios.get(`${URL}api_token.php?command=request`);
    console.log(res.data.token);
    return res.data.token;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const shuffleAnswers = arr => {
    console.log(arr);
    let currIdx = arr.length,
      tempVal,
      randomIdx;
  
    while (currIdx !== 0) {
      randomIdx = Math.floor(Math.random() * currIdx);
      currIdx -= 1;
      tempVal = arr[currIdx];
      arr[currIdx] = arr[randomIdx];
      arr[randomIdx] = tempVal;
    }
    console.log(arr);
    return arr;
  };

module.exports = { fetchQuestions, shuffleAnswers };