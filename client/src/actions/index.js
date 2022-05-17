const loadSocket = socket => ({ type: 'SET_SOCKET_CONN', payload: socket });

export const setSocket = socket => {
    return async dispatch => {
        dispatch(loadSocket(socket));
    };
};