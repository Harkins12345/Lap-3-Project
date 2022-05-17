import axios from "axios";

const URL = "https://opentdb.com";

async function getCategories() {
  try {
    const res = await axios.get(`${URL}/api_category.php`);
    return res.data.trivia_categories;
  } catch (err) {
    console.log(err);
  }
}

async function getQuestions(levelId, catId) {
  console.log(levelId, catId);
  try {
    const res = await axios.get(
      `${URL}/api.php?amount=10&category=${catId}&difficulty=${levelId}&type=multiple`
    );
    console.log(res);
    return res.data.results;
  } catch (err) {
    console.log(err);
  }
}

export { getCategories, getQuestions };
