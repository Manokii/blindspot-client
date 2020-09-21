import { types } from "./Actions";

const live = {
    match_current: {},
    match_widgets: [],
    popup: {
        imgUrl: "",
        title: "",
        icon: "",
        details: "",
        live: false,
    },
};

const LiveReducers = (state = live, action) => {
    // prettier-ignore
    switch (action.type) {
        case types.LIVE_SET_SETTINGS:
            return { ...state, ...action.payload };
        case types.LIVE_ADD_MATCH_WIDGET:
            if(state.match_widgets.find(match => match.TournamentMatchId === action.payload.TournamentMatchId)) return state
            return {...state, match_widgets: [...state.match_widgets, action.payload]}
        case types.LIVE_REMOVE_MATCH_WIDGET:
            // let {match_widgets} = state
            // match_widgets.splice(match_widgets.findIndex(match => match.TournamentMatchId === action.payload), 1)
            // return {...state, match_widgets}
           return {...state, match_widgets: [...state.match_widgets.filter(match => match.TournamentMatchId !== action.payload)]}
        default:
            return state;
    }
};

export default LiveReducers;
