import React from "react";
import { Route, Switch } from "react-router-dom";
import { makeStyles, Box } from "@material-ui/core";

import SideNav from "./components/Navigation";
import TournamentPage from "./components/TournamentPage";
import ControlPage from "./components/Control/ControlPage";
import Live from "./components/Live/KDRPage";
import LiveInfoBox from "./components/Live/KDRInfoBox";
import LiveMatchWidgets from "./components/Live/KDRMatchWidgets";
import LiveIngame from "./components/Live/KDRIngame";
import LiveMatchUp from "./components/Live/KDRMatchUp";
import LiveVeto from "./components/Live/KDRVeto";
import LiveLowerThirds from "./components/Live/KDRLowerThirds";
import LiveScore from "./components/Live/KDRScore";
import LiveIngamePlayers from "./components/Live/KDRIngamePlayers";
import LiveSponsorSlot from "./components/Live/KDRSponsorSlot";
import LivePreviousMatches from "./components/Live/KDRPreviousMatches";
import LiveMVP from "./components/Live/KDRMVP";
import Downstage from "./components/Live/Downstage";
import GiveawayPage from "./components/GiveawayPage";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        overflow: "hidden",
    },
    content: {
        flex: 1,
        display: "flex",
        height: "100%",
    },
}));

const App = () => {
    const classes = useStyles();
    return (
        // prettier-ignore
        <div className={classes.root}>
            <SideNav />
            <Box className={classes.content}>
                <Switch>
                    <Route path="/tournament" component={TournamentPage} />
                    <Route path="/control" component={ControlPage} />
                    <Route path="/live" exact component={Live} />
                    <Route path="/live/infobox" exact component={LiveInfoBox} />
                    <Route path="/live/matchwidgets" exact component={LiveMatchWidgets} />
                    <Route path="/live/ingame" exact component={LiveIngame} />
                    <Route path="/live/matchup" exact component={LiveMatchUp} />
                    <Route path="/live/veto" exact component={LiveVeto} />
                    <Route path="/live/lowerthirds" exact component={LiveLowerThirds} />
                    <Route path="/live/scores" exact component={LiveScore} />
                    <Route path="/live/players" exact component={LiveIngamePlayers} />
                    <Route path="/live/sponsors" exact component={LiveSponsorSlot} />
                    <Route path="/live/previousmatches" exact component={LivePreviousMatches} />
                    <Route path="/live/mvp" exact component={LiveMVP} />
                    <Route path="/downstage" exact component={Downstage} />
                    <Route path="/giveaways" exact component={GiveawayPage} />
                </Switch>
            </Box>
        </div>
    );
};

export default App;
