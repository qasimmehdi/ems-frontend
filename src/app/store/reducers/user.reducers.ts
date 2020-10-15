import { Router, ɵangular_packages_router_router_a } from "@angular/router";
import * as userActions from "../actions/user.actions"
import { ActionWithPayload } from "../ActionWithPayload";

const initialState = {
    isLoggedIn: false,
    data: {

    }
};

export const userReducer = (state = initialState, action: ActionWithPayload) => {
    switch (action.type) {
        case userActions.SET_USER:
            return { ...action.payload };

        case userActions.LOG_IN:
            return {
                isLoggedIn: true,
                data: state.data
            };

        default:
            return state;
    }
}