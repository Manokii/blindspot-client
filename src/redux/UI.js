import { types } from "./Actions";

const uiSettings = JSON.parse(localStorage.getItem("ui"));

const tournamentReducer = (
    state = uiSettings ? uiSettings : { tournamentId: null },
    action
) => {
    switch (action.type) {
        case types.UI_SET:
            const updatedUiSettings = { ...state, ...action.payload };
            localStorage.setItem("ui", JSON.stringify(updatedUiSettings));
            return updatedUiSettings;
        default:
            return state;
    }
};

export default tournamentReducer;
