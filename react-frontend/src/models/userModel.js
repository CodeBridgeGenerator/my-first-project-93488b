import client from '../services/restClient';

export const user = {
    state: {
        selectedUser: {}
    }, // initial state
    reducers: {
        update(state, newState) {
            return { ...state, ...newState };
        },
        selectUser(state, user) {
            let toReturn = { ...state, selectedUser: user };
            return toReturn;
        }
    },
    effects: (dispatch) => ({
        ///////////////////////////
        //// GET ONE User ////
        ///////////////////////////
        async getOneUser(_id, reduxState) {
            return new Promise((resolve, reject) => {
                if (reduxState.user.selectedUser?._id === _id) {
                    resolve(reduxState.user.selectedUser);
                    return;
                }
                client
                    .service('users')
                    .get(_id)
                    .then((res) => {
                        this.selectUser(res);
                        resolve(res);
                    })
                    .catch((error) => {
                        console.log('Failed to get user', error);
                        dispatch.toast.alert({ type: 'error', title: 'User', message: 'Failed to get user' });
                        reject(error);
                    });
            });
        },
        setOneUser(_id, reduxState) {
            if (reduxState.user.selectedUser?._id === _id) {
                return;
            }
            client
                .service('users')
                .get(_id)
                .then((res) => {
                    this.selectUser(res);
                })
                .catch((error) => {
                    console.log('Failed to set User', error);
                    dispatch.toast.alert({
                        type: 'error',
                        title: 'User',
                        message: 'Failed to set user'
                    });
                });
        }
    })
};
