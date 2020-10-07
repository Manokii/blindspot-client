import React, { useContext, useEffect, useState } from "react";
import {
    makeStyles,
    TextField,
    Button,
    Typography,
    Paper as div,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { wsContext } from "../WebsocketProvider";

import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

const q = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",

        "& .section": {
            overflowY: "auto",
            maxHeight: 400,
            backgroundColor: "transparent",
            margin: theme.spacing(2, 0),
            display: "flex",
            flexDirection: "column",

            "&:hover": {
                "&::-webkit-scrollbar": {
                    "&-thumb": {
                        backgroundColor: "rgba(255,255,255,.5)",
                    },
                },
            },
            "&::-webkit-scrollbar": {
                width: 10,

                "&-thumb": {
                    borderRadius: 5,
                    backgroundColor: "rgba(255,255,255,.1)",
                    border: "2px solid #2f3e46",
                    transition: "all 300ms ease-in-out",
                },
            },

            "& .caster": {
                display: "flex",
                flexDirection: "column",
                margin: theme.spacing(1, 0),
            },
        },

        "& .add": {
            display: "flex",
            "& .btn": { flex: 1 },
        },
    },
}));

const ControlTalents = () => {
    const ws = useContext(wsContext);
    const { talents } = useSelector((state) => state.live);
    const [state, set] = useState({
        casters: [
            {
                name: "Daks",
                social: "@dakscasts",
                live: true,
            },
            {
                name: "Vyminal",
                social: "@vyminal",
                live: true,
            },
        ],
        observers: [
            {
                name: "DodgeThiss",
                social: "@dodgethiss_",
                live: true,
            },
        ],
        liveOnLowerThirds: true,
        live: true,
    });

    useEffect(() => {
        if (!talents) return;
        set(talents);
    }, [talents]);

    const addCaster = () => {
        set((s) => ({
            ...s,
            casters: [
                ...s.casters,
                { name: "New Caster", social: "@", live: false },
            ],
        }));
    };

    const setCasterName = (caster) => ({ target: { value } }) => {
        set({
            ...state,
            casters: [
                ...state.casters.map((c) =>
                    c !== caster ? c : { ...c, name: value }
                ),
            ],
        });
    };
    const setCasterSocial = (caster) => ({ target: { value } }) => {
        set({
            ...state,
            casters: [
                ...state.casters.map((c) =>
                    c !== caster ? c : { ...c, social: value }
                ),
            ],
        });
    };

    const goLiveCaster = (caster) => () => {
        set((s) => ({
            ...s,
            casters: [
                ...s.casters.map((c) =>
                    c !== caster ? c : { ...c, live: !c.live }
                ),
            ],
        }));
    };

    const deleteCaster = (caster) => () => {
        set((s) => ({
            ...s,
            casters: [...s.casters.filter((c) => c !== caster)],
        }));
    };
    const addObserver = () => {
        set((s) => ({
            ...s,
            observers: [
                ...s.observers,
                { name: "New observer", social: "@", live: false },
            ],
        }));
    };

    const setObserverName = (observer) => ({ target: { value } }) => {
        set({
            ...state,
            observers: [
                ...state.observers.map((c) =>
                    c !== observer ? c : { ...c, name: value }
                ),
            ],
        });
    };
    const setObserverSocial = (observer) => ({ target: { value } }) => {
        set({
            ...state,
            observers: [
                ...state.observers.map((c) =>
                    c !== observer ? c : { ...c, social: value }
                ),
            ],
        });
    };

    const goLiveObserver = (observer) => () => {
        set((s) => ({
            ...s,
            observers: [
                ...s.observers.map((c) =>
                    c !== observer ? c : { ...c, live: !c.live }
                ),
            ],
        }));
    };

    const deleteObserver = (observer) => () => {
        set((s) => ({
            ...s,
            observers: [...s.observers.filter((c) => c !== observer)],
        }));
    };

    const apply = (e) => {
        ws.set_live_settings({ talents: state });
    };

    const toggle = ({ currentTarget: { name } }) => {
        set((o) => ({ ...o, [name]: !o[name] }));
    };
    const c = q();
    return (
        <div className={c.root}>
            <div className="section casters">
                <Typography varian="caption">Casters</Typography>
                {state.casters.map((caster, i) => (
                    <div key={i} className="caster">
                        <TextField
                            variant="filled"
                            value={caster.name}
                            onChange={setCasterName(caster)}
                            label={
                                <span style={{ color: "rgba(255,255,255,.5)" }}>
                                    Name
                                </span>
                            }
                        />
                        <TextField
                            variant="filled"
                            value={caster.social}
                            onChange={setCasterSocial(caster)}
                            label={
                                <span style={{ color: "rgba(255,255,255,.5)" }}>
                                    Social Link
                                </span>
                            }
                        />
                        <Button
                            variant="contained"
                            onClick={goLiveCaster(caster)}
                            color={caster.live ? "secondary" : "default"}
                            startIcon={
                                caster.live ? (
                                    <CheckCircleIcon />
                                ) : (
                                    <CancelIcon />
                                )
                            }>
                            {caster.live ? "Now Live" : "Go Live"}
                        </Button>
                        <Button
                            color="secondary"
                            onClick={deleteCaster(caster)}
                            startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </div>
                ))}
            </div>
            <div className="section observers">
                <Typography varian="caption">Observers</Typography>
                {state.observers.map((observer, i) => (
                    <div key={i} className="caster">
                        <TextField
                            variant="filled"
                            value={observer.name}
                            onChange={setObserverName(observer)}
                            label={
                                <span style={{ color: "rgba(255,255,255,.5)" }}>
                                    Name
                                </span>
                            }
                        />
                        <TextField
                            variant="filled"
                            value={observer.social}
                            onChange={setObserverSocial(observer)}
                            label={
                                <span style={{ color: "rgba(255,255,255,.5)" }}>
                                    Social Link
                                </span>
                            }
                        />
                        <Button
                            variant="contained"
                            onClick={goLiveObserver(observer)}
                            color={observer.live ? "secondary" : "default"}
                            startIcon={
                                observer.live ? (
                                    <CheckCircleIcon />
                                ) : (
                                    <CancelIcon />
                                )
                            }>
                            {observer.live ? "Now Live" : "Go Live"}
                        </Button>
                        <Button
                            color="secondary"
                            onClick={deleteObserver(observer)}
                            startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </div>
                ))}
            </div>
            <div className="add">
                <Button className="btn" variant="text" onClick={addCaster}>
                    Add Caster
                </Button>
                <Button className="btn" variant="text" onClick={addObserver}>
                    Add Observer
                </Button>
            </div>

            <Button
                variant="outlined"
                color={state.live ? "secondary" : "default"}
                onClick={toggle}
                style={{ margin: "16px 0px" }}
                name="live">
                {state.live ? "Live" : "Offline"}
            </Button>
            <Button variant="contained" onClick={apply} color="primary">
                Apply
            </Button>
        </div>
    );
};

export default ControlTalents;
