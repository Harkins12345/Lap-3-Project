const initState = {username: "", totalScore: 0, gameScore: 0, error: false};

const userReducer = (state=initState, action) => {
    switch(action.type){
        case 'SET_CURR_SCORE':
            return { ...state, gameScore: action.payload };
        case 'SET_TOTAL_SCORE':
            return { ...state, totalScore: action.payload, error: false };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    };
};

export default userReducer;