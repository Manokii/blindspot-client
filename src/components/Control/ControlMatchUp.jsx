import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { wsContext } from "../WebsocketProvider";
import { withRouter } from "react-router-dom";

import {
    makeStyles,
    Typography,
    Switch,
    FormControlLabel,
    TextField,
    FormControl,
    Select,
    MenuItem,
    Button,
    InputLabel,
    Paper,
} from "@material-ui/core";

const us = makeStyles((theme) => ({
    matchup: {
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(2),
        "& .details": {
            display: "flex",
            flexDirection: "column",
            padding: theme.spacing(2, 0),

            "& .section": {
                margin: theme.spacing(2, 0),
                backgroundColor: "#DD6031",
            },
            "& .select": {
                margin: theme.spacing(1, 0),
            },

            "& .scores": {
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                padding: theme.spacing(2, 0),
            },
        },
    },

    save: {
        width: "100%",
    },
}));

const ControlInfobox = ({ history }) => {
    const c = us();
    const [state, set] = useState({
        aShortname: "TeamA",
        bShortname: "TeamB",
    });
    const ws = useContext(wsContext);
    const {
        match_current,
        is_current_match_polling = true,
        current_match_state = "Up Next",
        maps = {
            bestOf: "bo3",
            veto: [],
        },
    } = useSelector((state) => state.live);

    // veto: [{type: 'ban' || pick, team: 'TEAM_NAME', map: 'MAP', winner: 'TEAM_NAME'}]

    const {
        EntityParticipantA: a,
        EntityParticipantB: b,
        // TeamAIsReady: a_ready,
        // TeamBIsReady: b_ready,
        // AllTeamAPlayersReady: a_all_ready,
        // AllTeamBPlayersReady: b_all_ready,
        // TeamAPlayers: a_players,
        // TeamBPlayers: b_players,
        // TournamentMatchExtendedStateId: state,
        aShortname,
        bShortname,
    } = match_current;

    useEffect(() => {
        if (!aShortname && !bShortname) return;
        set({ aShortname, bShortname });
    }, [aShortname, bShortname]);

    // const changeContentType = ({ target: { value } }) =>
    //     ws.set_live_settings({ infoBoxContentType: value });
    const selectBestOf = ({ target: { value } }) =>
        ws.set_live_settings({ maps: { ...maps, bestOf: value } });
    const changeMatchState = ({ target: { value } }) =>
        ws.set_live_settings({ current_match_state: value });
    const switchPolling = () =>
        ws.set_live_settings({
            is_current_match_polling: !is_current_match_polling,
        });

    // const changeTeamShortname = (teamSide) => ({
    //     currentTarget: { value },
    // }) => {
    //     if (teamSide === "a")
    //         return ws.set_live_settings({
    //             match_current: { ...match_current, aShortname: value },
    //         });
    //     if (teamSide === "b")
    //         return ws.set_live_settings({
    //             match_current: { ...match_current, bShortname: value },
    //         });
    // };

    const handleChange = ({ currentTarget: { name, value } }) =>
        set({ ...state, [name]: value });

    const save = () => {
        ws.set_live_settings({ match_current: { ...match_current, ...state } });
    };

    return (
        <div className={c.matchup}>
            <div className="details">
                <Typography variant="button">Curret Match</Typography>

                <Paper elavation={2} className="section">
                    <FormControl
                        variant="outlined"
                        size="small"
                        className="select">
                        <InputLabel
                            style={{ color: "rgba(255,255,255,.5)" }}
                            id="state-select-outlined-label">
                            Match State
                        </InputLabel>
                        {/* prettier-ignore */}
                        <Select
                        labelId="state-select-outlined-label"
                        label="Match state"
                        value={current_match_state}
                        onChange={changeMatchState}>
                        
                        <MenuItem value={current_match_state}>Custom</MenuItem>
                        <MenuItem value={"Up Next"}>Up Next</MenuItem>
                        <MenuItem value={"Current Match"}>Current Match</MenuItem>
                        <MenuItem value={"Match Finished"}>Match Finished</MenuItem>
                        <MenuItem value={"Round 1"}>Round 1</MenuItem>
                        <MenuItem value={"Round 2"}>Round 2</MenuItem>
                        <MenuItem value={"Round 3"}>Round 3</MenuItem>
                        <MenuItem value={"Round 4"}>Round 4</MenuItem>
                        <MenuItem value={"Round 5"}>Round 5</MenuItem>
                        <MenuItem value={"Finals"}>Finals</MenuItem>
                        <MenuItem value={"Quarter-Finals"}>Quarter-Finals</MenuItem>
                        <MenuItem value={"Semi-Finals"}>Semi-Finals</MenuItem>
                        <MenuItem value={"Grand Finals"}>Grand Finals</MenuItem>
                    </Select>
                    </FormControl>

                    <TextField
                        value={current_match_state}
                        onChange={changeMatchState}
                        label={
                            <span style={{ color: "rgba(255,255,255,.5)" }}>
                                Custom Match State
                            </span>
                        }
                        variant="filled"></TextField>
                </Paper>

                <FormControl size="small" variant="outlined" className="select">
                    <InputLabel
                        style={{ color: "rgba(255,255,255,.5)" }}
                        id="bestof-select-outlined-label">
                        Best Of
                    </InputLabel>
                    <Select
                        labelId="bestof-select-outlined-label"
                        label="Best Of"
                        value={maps.bestOf}
                        onChange={selectBestOf}>
                        <MenuItem value={"bo1"}>Best of 1</MenuItem>
                        <MenuItem value={"bo3"}>Best of 3</MenuItem>
                        <MenuItem value={"bo5"}>Best of 5</MenuItem>
                    </Select>
                </FormControl>

                <FormControlLabel
                    control={
                        <Switch
                            checked={is_current_match_polling}
                            onChange={switchPolling}
                            color="primary"
                        />
                    }
                    label="Current Match Polling?"
                />
                {a && b ? (
                    <div>
                        {/* prettier-ignore */}
                        <div className="scores">
                            <TextField
                                size="small"
                                color="secondary"
                                variant="outlined"
                                
                                label={<span style={{color: 'rgba(255,255,255,.5)'}}>{a.Profile.DisplayName} score</span>}
                                disabled={is_current_match_polling}
                                value={a.Score}
                                type="number"
                                onChange={(e) => ws.set_live_settings({match_current: {...match_current, EntityParticipantA: {...a, Score: e.currentTarget.value < 0 ? 0 : e.currentTarget.value}}})}/>
                            <TextField size="small" variant="outlined"  onChange={handleChange}
                                label={<span style={{color: 'rgba(255,255,255,.5)'}}>Short Name</span>} name="aShortname" value={state.aShortname} />
                            <TextField
                                size="small"
                                color="secondary"
                                variant="outlined"
                                label={<span style={{color: 'rgba(255,255,255,.5)'}}>{b.Profile.DisplayName} score</span>}
                                disabled={is_current_match_polling}
                                value={b.Score}
                                type="number"
                                onChange={(e) => ws.set_live_settings({match_current: {...match_current, EntityParticipantB: {...b, Score: e.currentTarget.value < 0 ? 0 : e.currentTarget.value}}})}/>
                        <TextField size="small" variant="outlined"  onChange={handleChange}
                                label={<span style={{color: 'rgba(255,255,255,.5)'}}>Short Name</span>} name="bShortname" value={state.bShortname} />
                        </div>
                        <Button
                            className={c.save}
                            variant="contained"
                            color="primary"
                            disabled={
                                state.aShortname === aShortname &&
                                state.bShortname === bShortname
                            }
                            onClick={save}>
                            Save
                        </Button>
                    </div>
                ) : (
                    <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={() =>
                            history.push("/tournament?noSidebar=1&simple=1")
                        }>
                        No Match is selected, select a match here
                    </Button>
                )}
            </div>
        </div>
    );
};

export default withRouter(ControlInfobox);
