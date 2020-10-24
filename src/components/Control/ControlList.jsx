import React, { useEffect, useState } from "react";
import { makeStyles, Typography, Button, Paper } from "@material-ui/core";
import MatchesWidget from "../MatchesWidget";
import { useDispatch, useSelector } from "react-redux";
import { setUISettings } from "../../redux/Actions";

import MatchUp from "./ControlMatchUp";
import Veto from "./ControlVeto";
import PlayerAgents from "./ControlPlayerAgents";
import Mogul from "../Mogul";
import LowerThirds from "./ControlLowerThirds";
import Popups from "./ControlPopUps";
import Series from "./ControlPreviousMatches";
import Talents from "./ControlTalents";
import { withRouter } from "react-router-dom";
import MVP from "./ControlMVP";
import Downstage from "./ControlDownstageMonitor";
import Downstage2 from "./ControlDownstageMonitor2";
import Giveaways from "./ControlGiveaways";
import ManualInput from "./ControlManualInput";
import FABs from "./FABs";

const us = makeStyles((theme) => ({
    root: {
        position: "relative",
        boxSizing: "border-box",
        width: "100%",
        display: "grid",

        gridAutoFlow: "dense",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gridGap: theme.spacing(2),
        overflow: "auto",
        // backgroundColor: theme.palette.background.default,
        backgroundColor: "#202022",
        padding: theme.spacing(2),

        [theme.breakpoints.up("sm")]: {
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",

            "& .players": { gridColumnStart: "span 2" },
            "& .downstage": { gridColumnStart: "span 2" },
            "& .popups": { gridColumnStart: "span 2" },
            "& .veto": { gridColumnStart: "span 2" },
        },

        // [theme.breakpoints.down("sm")]: { padding: 0 },

        "&::-webkit-scrollbar": {
            width: 15,
            "&-track": {
                backgroundColor: "#202022",
            },
            "&-thumb": {
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: 7,
                border: "3px solid #202022",
            },
        },
        "& .section": {
            padding: theme.spacing(2),
            display: "flex",
            flexDirection: "column",
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: 10,
        },

        "& .players": {
            // gridRowStart: "span 2",
            backgroundColor: "#141b41",
        },
        "& .popups": { backgroundColor: "#1e96fc" },
        "& .veto": { backgroundColor: "#6987C9" },
        "& .matchup": { backgroundColor: "#DD6031" },
        "& .lowerthirds": { backgroundColor: "#922d50" },
        "& .matchlist": { backgroundColor: "#14cc60" },
        "& .series": { backgroundColor: "#2f3e46" },
        "& .talents": { backgroundColor: "#4C3A3D" },
        "& .giveaways": { backgroundColor: "#241623" },
        "& .downstage": {
            backgroundColor: "#282a36",
        },
    },
}));

const ControlList = ({ history, location: { search } }) => {
    const c = us();
    const { match_current, match_widgets = [] } = useSelector(
        (state) => state.live
    );
    const dispatch = useDispatch();

    const {
        control_view = {
            matches: true,
            manualInput: false,
            match: true,
            lowerThirds: true,
            talents: true,
            veto: true,
            playerAgents: true,
            popups: true,
            previousMatches: true,
            mvp: true,
            downstage: true,
            downstage2: true,
            giveaways: true,
            mogul: true,
        },
    } = useSelector((state) => state.ui);

    const [state, set] = useState(control_view);

    useEffect(() => {
        if (!state) return;
        dispatch(setUISettings({ control_view: state }));
    }, [state, dispatch]);

    return (
        <div className={c.root}>
            {state.matches && match_widgets.length ? (
                <Paper elevation={5} className="section matchlist">
                    <Typography variant="button">Match Widgets</Typography>
                    <MatchesWidget options={{ allowControl: true }} />
                    <Button
                        variant="contained"
                        style={{ margin: 16 }}
                        onClick={() =>
                            history.push("/tournament?noSidebar=1&simple=1")
                        }>
                        go to match list
                    </Button>
                </Paper>
            ) : null}

            {state.manualInput && (
                <Paper elevation={5} className="section matchup">
                    <Typography variant="button">Manual Input</Typography>
                    <ManualInput />
                </Paper>
            )}

            {state.match && (
                <Paper elevation={5} className="section matchup">
                    <Typography variant="button">Match Up</Typography>
                    <MatchUp />
                </Paper>
            )}

            {state.lowerThirds && (
                <Paper elevation={5} className="section lowerthirds">
                    <Typography variant="button">Lower Thirds</Typography>
                    <LowerThirds />
                </Paper>
            )}

            {state.veto && Object.keys(match_current).length ? (
                <Paper elevation={5} className="section veto">
                    <Typography variant="button">Veto</Typography>
                    <Veto />
                </Paper>
            ) : null}

            {state.talents && (
                <Paper elevation={5} className="section talents">
                    <Typography variant="button">Talents</Typography>
                    <Talents />
                </Paper>
            )}

            {state.playerAgents && Object.keys(match_current).length ? (
                <Paper elevation={5} className="section players">
                    <Typography variant="button">Players</Typography>
                    <PlayerAgents />
                </Paper>
            ) : null}

            {state.popups && (
                <Paper elevation={5} className="section popups">
                    <Typography variant="button">In-Game Popups</Typography>
                    <Popups />
                </Paper>
            )}

            {state.previousMatches && (
                <Paper elevation={5} className="section series">
                    <Typography variant="button">Previous Matches</Typography>
                    <Series />
                </Paper>
            )}
            {state.mvp && (
                <Paper elevation={5} className="section series">
                    <Typography variant="button">MVP</Typography>
                    <MVP />
                </Paper>
            )}

            {state.downstage && (
                <Paper elevation={5} className="section downstage">
                    <Typography variant="button">Downstage Monitor</Typography>
                    <Downstage />
                </Paper>
            )}
            {state.downstage2 && (
                <Paper elevation={5} className="section downstage">
                    <Typography variant="button">
                        Downstage Monitor 2
                    </Typography>
                    <Downstage2 />
                </Paper>
            )}

            {state.giveaways && (
                <Paper elevation={5} className="section giveaways">
                    <Typography variant="button">Giveaways</Typography>
                    <Giveaways />
                </Paper>
            )}

            {state.mogul && (
                <Paper elevation={5} className="section">
                    <Mogul></Mogul>
                </Paper>
            )}

            <FABs set={set} state={state} />
        </div>
    );
};

export default withRouter(ControlList);
