import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { wsContext } from "../WebsocketProvider";
import {
    makeStyles,
    Typography,
    Button,
    Switch,
    FormControlLabel,
} from "@material-ui/core";
import axios from "axios";
import isDev from "../../isDev";

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
    const [isFinals, setIsFinals] = useState(false);
    const mapPool = ["Bind", "Haven", "Split", "Ascent"];
    const ws = useContext(wsContext);
    const {
        match_current,
        maps = {
            bestOf: "bo3",
            liveOnLowerThirds: false,
            pool: [],
            veto: [],
        },
        round_winner,
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
        if(teamA) ws.set_live_settings({
            match_current: {
                ...match_current, 
                EntityParticipantA: {...teamA, Score: parseInt(teamA.Score) + 1}
            },
            round_winner: {
                profile: a.Profile,
                side: 'a',
                loser: b.Profile,
                isFinalGame: isFinals,
                map: maps.veto[index].map
            }
        })
        if(teamB) ws.set_live_settings({
            match_current: {
                ...match_current, 
                EntityParticipantB: {...teamB, Score: parseInt(teamB.Score) + 1}
            },
            round_winner: {
                profile: b.Profile,
                side: 'b',
                isFinalGame: isFinals,
                loser: a.Profile,
                map: maps.veto[index].map
            }
        })
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

    const grabVeto = () => {
        const cors = `${window.location.hostname}:8080/`;
        const headers = {
            "arena-api-key": "C434EDE3-2E7E-4B9D-A070-58B2CF94846D",
            "arena-login-token": "fd1e9e0d-3c25-4ccd-b6b5-9b70be315e18",
        };

        // prettier-ignore
        axios.get(`http://${isDev() ? cors: ''}polling.mogul.gg/api/tournament/match/${match_current.TournamentMatchId}/?LastUpdatedDateTime=`,{ headers })
            .then(({data: {Response: res}}) => {
                console.log(res)
                ws.set_live_settings({
                    maps: {
                        ...maps,
                        pool: [...res?.MapVotingResult?.MapPoolList?.map(map => ({mapId: map.GameTitleMapNameId, mapName: map.GameTitleMapProperName}))],
                        veto: [...res?.MapVotingResult?.VotingResults?.map(result => ({
                            team: result.ResultCastByRandomizer ? 'mogulsystem' : result.ResultCastByTeamA ? a?.Profile?.DisplayName : b?.Profile?.DisplayName,
                            map: res?.MapVotingResult?.MapPoolList?.find(map => map.GameTitleMapNameId === result.GameTitleMapId).GameTitleMapProperName,
                            shortname: result.ResultCastByRandomizer ?  'random'  : result.ResultCastByTeamA ? aShortname : bShortname,
                            type: result.ResultTypeIsBan ? 'ban' : 'pick'
                        }))]
                    }
                })
            });
    };

    return (
        <div className={c.root}>
            {/* ============== Grab Veto from mogul ============== */}
            <Button variant="outlined" color="primary" onClick={grabVeto}>
                Grab Veto from Mogul
            </Button>

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
            <FormControlLabel
                control={
                    <Switch
                        size="small"
                        checked={isFinals}
                        onChange={({ currentTarget: { checked } }) =>
                            setIsFinals(checked)
                        }
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Final Match?"
            />

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
