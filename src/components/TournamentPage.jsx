import React from "react";
import { useSelector } from "react-redux";
import { makeStyles, Paper, Typography, Button } from "@material-ui/core";
import TournamentPageBrackets from "./TournamentPageBrackets";
import MatchesWidget from "./MatchesWidget";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",

        "& .content": {
            flexGrow: 1,
            overflow: "auto",
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
        },
    },

    widgets: {
        flexShrink: 0,
        maxHeight: "30%",
        // height: 200,
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        padding: theme.spacing(2),
        borderTop: "1px solid rgba(255,255,255,.1)",
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
    },
}));

const TournamentPage = ({ history }) => {
    const classes = useStyles();
    const Tournament = useSelector((state) => state.tournament);
    return (
        <div className={classes.root}>
            <div className="content">
                {Tournament && <TournamentPageBrackets />}
            </div>
            <Paper square className={classes.widgets}>
                <Typography align="center">Matches Selected</Typography>
                <MatchesWidget
                    options={{ allowDelete: true, allowControl: true }}
                />
                <Button
                    variant="outlined"
                    style={{ margin: 16 }}
                    onClick={() => history.push("/control?noSidebar=1")}>
                    go to control panel
                </Button>
            </Paper>
        </div>
    );
};

export default withRouter(TournamentPage);
