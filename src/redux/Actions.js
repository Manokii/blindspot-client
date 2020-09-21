export const types = {
    TOURNAMENT_SET: "setTournament",
    UI_SET: "setUISettings",
    LIVE_SET_SETTINGS: "setLiveSettings",
    LIVE_ADD_MATCH_WIDGET: "addLiveMatchWidget",
    LIVE_REMOVE_MATCH_WIDGET: "removeLiveMatchWidget",
};
// prettier-ignore
export const setTournament = (tournament) => ({ type: types.TOURNAMENT_SET, payload: tournament});
// prettier-ignore
export const setUISettings = (uiSettings) => ({ type: types.UI_SET,payload: uiSettings})
// prettier-ignore
export const setLiveSettings = (settings) => ({ type: types.LIVE_SET_SETTINGS, payload: settings});
// prettier-ignore
export const addLiveMatchWidget = (match) => ({ type: types.LIVE_ADD_MATCH_WIDGET, payload: match});
// prettier-ignore
export const removeLiveMatchWidget = (TournamentMatchId) => ({ type: types.LIVE_REMOVE_MATCH_WIDGET, payload: TournamentMatchId})
