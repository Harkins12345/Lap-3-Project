const axios = require("axios");

const URL = "https://opentdb.com/";

const fetchQuestions = async (categoryId, difficulty) => {
  try {
    const res = await axios.get(
      `${URL}api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`
    );
    return res.data.results;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const shuffleAnswers = array => {
  console.log(array);
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  console.log(array);

  return array;
}

module.exports = { fetchQuestions, shuffleAnswers };