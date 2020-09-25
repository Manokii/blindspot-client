import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    makeStyles,
    TextField,
    Button,
    // Switch,
    Typography,
    // Divider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setTournament, setUISettings } from "../redux/Actions";

import isDev from "../isDev";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .id": {
            margin: theme.spacing(2, 0, 1, 0),
        },
    },
    tournament: {
        margin: theme.spacing(2, 0, 1, 0),
        padding: theme.spacing(2, 1),
        border: "1px solid rgba(0,0,0,.1)",
        borderRadius: "5px",
        "& .prop": {
            marginTop: theme.spacing(1),
            display: "flex",
            justifyContent: "space-between",
        },
    },
}));

const Mogul = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const ui = useSelector((state) => state.ui);
    const [tournamentId, setTournamentId] = useState(ui.tournamentId || "");
    const tournament = useSelector((state) => state.tournament);

    // Loads tournament
    useEffect(() => {
        if (!tournamentId) return;
        const cors = `${window.location.hostname}:8080/`;
        const headers = {
            "arena-api-key": "C434EDE3-2E7E-4B9D-A070-58B2CF94846D",
            "arena-login-token": "fd1e9e0d-3c25-4ccd-b6b5-9b70be315e18",
        };

        // prettier-ignore
        axios.get(`http://${isDev() ? cors : ''}polling.mogul.gg:443/API/Tournament/${tournamentId}?lastUpdatedDateTime`,{ headers })
            .then(({data: {Response :t}}) => {
                dispatch(setTournament(t))
                // console.log(t)
            });
        dispatch(setUISettings({ tournamentId: tournamentId }));
    }, [dispatch, tournamentId]);

    const loadTournament = () => {
        const host = window.location.hostname;
        const cors = `http://${host}:8080/`;
        const headers = {
            "arena-api-key": "C434EDE3-2E7E-4B9D-A070-58B2CF94846D",
            "arena-login-token": "fd1e9e0d-3c25-4ccd-b6b5-9b70be315e18",
        };

        // prettier-ignore
        axios.get(`${cors}polling.mogul.gg:443/API/Tournament/${tournamentId}?lastUpdatedDateTime`,{ headers })
            .then(({data: {Response :t}}) => {
                dispatch(setTournament(t))
                console.log(t)
            });
        dispatch(setUISettings({ tournamentId: tournamentId }));
    };

    const tournamentIdField = (event) => setTournamentId(event.target.value);

    return (
        <div className={classes.root}>
            <Typography variant="button">Mogul Tournament</Typography>
            {/* prettier-ignore */}
            <TextField
                className="id"
                variant="outlined"
                label={ <div style={{color: 'rgba(255,255,255,.5)'}}>Tournament ID <b>(5 digits)</b></div>}
                color="secondary"
                size="small"
                value={tournamentId}
                onChange={tournamentIdField}
            />
            <Button
                size="small"
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => loadTournament()}>
                Load Tournament
            </Button>
            {tournament && (
                <div className={classes.tournament}>
                    <Typography variant="subtitle1" align="center">
                        {tournament.TournamentTitle}
                    </Typography>
                    <div className="prop">
                        <Typography variant="body2">
                            <b>Participants:</b>
                        </Typography>
                        <Typography variant="body2">
                            {tournament.Participants?.length}
                            {tournament.IsTeamTournament && "Teams"}
                        </Typography>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mogul;
