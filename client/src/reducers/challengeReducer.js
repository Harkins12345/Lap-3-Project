const initState = {category: "", difficulty: "", error: false};

const userReducer = (state=initState, action) => {
    switch(action.type){
        case 'SET_CATEGORY':
            return { ...state, category: action.payload };
        case 'SET_DIFFICULTY':
            return { ...state, difficulty: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    };
};

export default userReducer;