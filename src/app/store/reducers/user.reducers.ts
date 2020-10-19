import * as userActions from "../actions/user.actions"
import { ActionWithPayload } from "../ActionWithPayload";

const initialState = {
    isLoggedIn: false,
    data: {}
};

export const userReducer = (state = initialState, action: ActionWithPayload) => {
    switch (action.type) {
        case userActions.LOG_IN:
            return {
                isLoggedIn: true,
                data: action.payload
            };
        case userActions.LOG_OUT:
            return initialState

        default:
            return state;
    }
}
