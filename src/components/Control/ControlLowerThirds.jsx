import React, { useState, useContext } from "react";
import { makeStyles, TextField, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { wsContext } from "../WebsocketProvider";

// const q = makeStyles((theme) => ({
//     root: {
//         display: "flex",
//         flexDirection: "column-reverse",

//         "& .main-bar": {
//             display: "flex",
//             height: 176,
//             width: 1795,
//             backgroundColor: "white",
//         },
//     },
// }));

const q = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },

    apply: {
        margin: theme.spacing(2, 0),
    },
}));

const ControlLowerThirds = () => {
    const ws = useContext(wsContext);
    const { lower_thirds } = useSelector((state) => state.live);
    const [state, set] = useState({
        headline: "",
        subtext: "",
        live: false,
    });

    useEffect(() => {
        if (!lower_thirds) return;
        set(lower_thirds);
    }, [lower_thirds]);

    const setHeadline = ({ currentTarget: { value } }) => {
        set((state) => ({ ...state, headline: value }));
    };
    const setSubtext = ({ currentTarget: { value } }) => {
        set((state) => ({ ...state, subtext: value }));
    };

    const setLive = ({ currentTarget: { value } }) => {
        set((state) => ({ ...state, live: !state.live }));
    };

    const apply = () => {
        ws.set_live_settings({ lower_thirds: state });
    };

    const c = q();
    return (
        <div className={c.root}>
            <TextField
                variant="filled"
                className="headline"
                label={
                    <span style={{ color: "rgba(255,255,255,.5)" }}>
                        headline
                    </span>
                }
                value={state.headline}
                onChange={setHeadline}
            />
            <TextField
                variant="filled"
                className="headline"
                multiline
                label={
                    <span style={{ color: "rgba(255,255,255,.5)" }}>
                        Sub Text
                    </span>
                }
                value={state.subtext}
                onChange={setSubtext}
            />

            <Button
                onClick={setLive}
                className="live"
                variant="contained"
                color={state.live ? "secondary" : "default"}>
                {state.live ? "Hide" : "Go Live"}
            </Button>

            <Button
                color="primary"
                variant="contained"
                className={c.apply}
                onClick={apply}>
                Apply
            </Button>
        </div>
    );
};

export default ControlLowerThirds;
