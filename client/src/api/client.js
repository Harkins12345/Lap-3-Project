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

async function getQuestions(numOfQs, catId) {
  console.log(numOfQs, catId);
  try {
    const res = await axios.get(
      `${URL}/api.php?amount=${numOfQs}&category=${catId}&type=multiple`
    );
    console.log(res);
    return res.data.results;
  } catch (err) {
    console.log(err);
  }
}

export { getCategories, getQuestions };
