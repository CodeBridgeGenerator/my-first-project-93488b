export const loading = {
    state: false, // initial state
    reducers: {
        // handle state changes with pure functions
        show(state, newState) {
            return true;
        },
        hide(state, newState) {
            return false;
        }
    },
    effects: (dispatch) => ({})
};
