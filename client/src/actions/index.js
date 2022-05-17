import axios from 'axios';

const selectCategory = category => (
    {
        type: 'SET_CATEGORY',
        payload: category
    }
);

const selectDifficulty = difficulty => (
    {
        type: 'SET_DIFFICULTY',
        payload: difficulty
    }
);


// ---------- FETCH QUESTIONS FROM THE API ---------- //
const fetchQuestions = async ([ category, difficulty ]) =>  {
    try {
        const { data } = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple&encode=url3986`);
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
};

// ---------- DISPATCH THESE SELECTED ITEMS TO THE STORE --- //
export const getChallenge = selectedItems => {
    return async (dispatch) => {
        try {
            const questions = await fetchQuestions(selectedItems);
            dispatch(selectCategory(questions))
            dispatch(selectDifficulty(questions))
        } catch (err) {
            console.warn(err.message);
        }   dispatch({ 
            type: 'SET_ERROR',
            payload: err.message
        });
    }
}