const initState = {
    type: null,
    title: null,
    message: null,
    life: null,
    _stamp: null
};
export const toast = {
    state: {
        ...initState
    }, // initial state
    reducers: {
        // handle state changes with pure functions
        update(state, newState) {
            return { ...state, ...newState };
        },
        alert(state, data) {
            return { ...state, ...data, _stamp: new Date().getTime() };
        }
    },
    effects: (dispatch) => ({})
};
