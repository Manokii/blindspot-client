import { types } from "./Actions";

const tournamentReducer = (state = "", action) => {
    switch (action.type) {
        case types.TOURNAMENT_SET:
            return action.payload;
        default:
            return state;
    }
};

export default tournamentReducer;
