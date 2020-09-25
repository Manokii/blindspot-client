import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { wsContext } from "../WebsocketProvider";

import {
    makeStyles,
    Typography,
    Button,
    Switch,
    FormControlLabel,
} from "@material-ui/core";

const us = makeStyles((theme) => ({
    root: {},
    mapButtons: {
        display: "grid",
        gridTemplateColumns: `1fr`,

        "& h6": {
            fontSize: ".8rem",
        },
        "& .mapButtonWrap": {
            // height: 50,
            padding: theme.spacing(1),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid rgba(255,255,255,.3)",
            // width: "100%",
            position: "relative",

            "& .btns": {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                transition: "opacity 300ms ease-out",
                "&:hover .btn": { opacity: 1 },
                "& .btn": {
                    flex: 1,
                    height: "100%",
                    opacity: 0,
                    borderRadius: 0,
                },
            },
        },
    },

    control: {
        [theme.breakpoints.up("sm")]: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: 16,

            "& .system": {
                gridColumnStart: "span 2",
            },
        },

        "& .team": {
            margin: theme.spacing(2, 0),

            "& h6": {
                fontSize: 15,
            },
        },
    },
    veto: {
        "& .veto-item": {
            display: "flex",
            alignItems: "center",
            margin: theme.spacing(1, 0),

            "& .message": {
                fontSize: ".8rem",
            },

            "& .close": {
                padding: theme.spacing(1),
                // color: "white",
                cursor: "pointer",
                backgroundColor: theme.palette.primary,
            },
        },

        "& .winner-btns": {
            "& .btn": {
                fontSize: ".5rem",
            },
        },
    },

    clear: {
        width: "100%",
        margin: theme.spacing(2, 0),
    },
}));

const ControlVeto = () => {
    const c = us();
    const mapPool = ["Bind", "Haven", "Split", "Ascent"];
    const ws = useContext(wsContext);
    const {
        match_current,
        maps = {
            bestOf: "bo3",
            liveOnLowerThirds: false,
            veto: [],
        },
    } = useSelector((state) => state.live);

    const {
        EntityParticipantA: a,
        EntityParticipantB: b,
        aShortname = "TEAMA",
        bShortname = "TEAMB",
    } = match_current;

    const getShortName = (id) => {
        if (a.Id === id) return aShortname;
        if (b.Id === id) return bShortname;
    };

    const addVetoItem = ({ team, short, map, type }) => {
        ws.set_live_settings({
            maps: {
                ...maps,
                veto: [
                    ...maps.veto,
                    {
                        team,
                        shortname: short || getShortName(team.Id),
                        map,
                        type,
                    },
                ],
            },
        });
    };

    const removeVetoItem = (index) => {
        ws.set_live_settings({
            maps: { ...maps, veto: maps.veto.filter((v, i) => i !== index) },
        });
    };

    // prettier-ignore
    const selectMapWinner = ({ index, team }, { teamA, teamB }) => {
        if(teamA) ws.set_live_settings({match_current: {...match_current, EntityParticipantA: {...teamA, Score: parseInt(teamA.Score + 1)}}})
        if(teamB) ws.set_live_settings({match_current: {...match_current, EntityParticipantB: {...teamB, Score: parseInt(teamB.Score + 1)}}})
        ws.set_live_settings({
            maps: {
                ...maps,
                veto: maps.veto.map((v, i) =>
                    i !== index ? v : { ...v, winner: team }
                ),
            },
        });
    };

    const setVetoLive = (e) => {
        ws.set_live_settings({
            maps: { ...maps, liveOnLowerThirds: !maps.liveOnLowerThirds },
        });
    };

    return (
        <div className={c.root}>
            <div className={c.control}>
                {/* ========================== TEAM A ========================== */}
                <div className="team a">
                    <Typography>{a?.Profile?.DisplayName}</Typography>
                    <div className={c.mapButtons}>
                        {mapPool
                            .filter(
                                (m) =>
                                    !maps.veto.map((mm) => mm.map).includes(m)
                            )
                            .map((map) => (
                                <div key={map} className="mapButtonWrap">
                                    <Typography>{map}</Typography>
                                    <div className="btns">
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            className="btn"
                                            onClick={() =>
                                                addVetoItem({
                                                    team:
                                                        a?.Profile?.DisplayName,
                                                    short: aShortname,
                                                    map,
                                                    type: "pick",
                                                })
                                            }>
                                            Pick&nbsp;<strong>{map}</strong>
                                        </Button>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            className="btn"
                                            onClick={() =>
                                                addVetoItem({
                                                    team:
                                                        a?.Profile?.DisplayName,
                                                    short: aShortname,
                                                    map,
                                                    type: "ban",
                                                })
                                            }>
                                            Ban&nbsp;<strong>{map}</strong>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                {/* ========================== TEAM B========================== */}
                <div className="team b">
                    <Typography>{b?.Profile?.DisplayName}</Typography>
                    <div className={c.mapButtons}>
                        {mapPool
                            .filter(
                                (m) =>
                                    !maps.veto.map((mm) => mm.map).includes(m)
                            )
                            .map((map) =>
                                // prettier-ignore
                                <div key={map} className="mapButtonWrap">
                                <Typography >{map}</Typography>
                                <div className="btns">
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        className="btn"
                                        onClick={() => addVetoItem({team: b?.Profile?.DisplayName,short: bShortname, map, type: 'pick'})}>
                                        Pick&nbsp;<strong>{map}</strong>
                                    </Button>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        className="btn"
                                        onClick={() => addVetoItem({team: b?.Profile?.DisplayName,short: bShortname, map, type: 'ban'})}>
                                        Ban&nbsp;<strong>{map}</strong>
                                    </Button>
                                </div>
                            </div>
                            )}
                    </div>
                </div>

                {/* ========================== System ========================== */}
                <div className="team system">
                    <Typography>System</Typography>
                    <div className={c.mapButtons}>
                        {mapPool
                            .filter(
                                (m) =>
                                    !maps.veto.map((mm) => mm.map).includes(m)
                            )
                            .map((map) =>
                                // prettier-ignore
                                <div key={map} className="mapButtonWrap">
                                    <Typography >{map}</Typography>
                                    <div className="btns">
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            className="btn"
                                            onClick={() => addVetoItem({team: 'mogulsystem', short: 'random', map, type: 'pick'})}>
                                            Pick&nbsp;<strong>{map}</strong>
                                        </Button>
                                </div>
                            </div>
                            )}
                    </div>
                </div>
            </div>

            {/* ============== VETO =================== */}
            <div className={c.veto}>
                {maps.veto.map(({ map, team, type, winner }, i) =>
                    // prettier-ignore
                    <div key={map} className="veto-item">
                        <div className="close" onClick={() => removeVetoItem(i)}>X</div>
                        <div className="message">
                            {map} {type}ed by {team} {type === 'ban' ? '' : (<span>
                                won by&nbsp;
                            {winner ? (<span style={{fontWeight:'bold'}}>{winner.Profile?.DisplayName}</span>) : (
                                <div className="winner-btns">
                                    <Button size="small" onClick={() => selectMapWinner({index: i, team: a},{teamA: a})} variant="contained" className="btn">
                                        {a?.Profile?.DisplayName}
                                    </Button>
                                    <Button size="small"  onClick={() => selectMapWinner({index: i, team: b},{teamB: b})}  variant="contained" className="btn">
                                        {b?.Profile?.DisplayName}
                                    </Button>
                                </div>
                            )}
                            </span>)}
                        </div>
                    </div>
                )}
            </div>

            <Button
                className={c.clear}
                color="primary"
                variant="contained"
                size="small"
                onClick={() =>
                    ws.set_live_settings({
                        maps: { ...maps, veto: [] },
                        match_current: {
                            ...match_current,
                            EntityParticipantA: { ...a, Score: 0 },
                            EntityParticipantB: { ...b, Score: 0 },
                        },
                    })
                }>
                Clear Veto
            </Button>

            <FormControlLabel
                control={
                    <Switch
                        size="small"
                        checked={maps.liveOnLowerThirds}
                        onChange={setVetoLive}
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Go live on lower thirds"
            />
        </div>
    );
};

export default ControlVeto;
