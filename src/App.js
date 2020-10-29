import React from "react";
import { Route, Switch } from "react-router-dom";
import { makeStyles, Box } from "@material-ui/core";

import SideNav from "./components/Navigation";
import TournamentPage from "./components/TournamentPage";
import ControlList from "./components/Control/ControlList";
import Live from "./components/Live/OverlayPage";
import LiveMatchWidgets from "./components/Live/OverlayMatchWidgets";
import LiveIngame from "./components/Live/OverlayIngame";
import LiveMatchUp from "./components/Live/OverlayMatchUp";
import LiveVeto from "./components/Live/OverlayVeto";
import LiveLowerThirds from "./components/Live/OverlayLowerThirds";
import LiveScore from "./components/Live/OverlayScore";
import LiveIngamePlayers from "./components/Live/OverlayIngamePlayers";
import LiveSponsorSlot from "./components/Live/OverlaySponsorSlot";
import LivePreviousMatches from "./components/Live/OverlayPreviousMatches";
import LiveMVP from "./components/Live/OverlayMVP";
import Downstage from "./components/Live/Downstage";
import Downstage2 from "./components/Live/Downstage2";
import GiveawayPage from "./components/GiveawayPage";
import OverlayTalents from "./components/Live/OverlayTalents";
import OverlayRoundWinner from "./components/Live/OverlayRoundWinner";

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
                    <Route path="/control" component={ControlList} />
                    <Route path="/live" exact component={Live} />
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
                    <Route path="/downstage2" exact component={Downstage2} />
                    <Route path="/giveaways" exact component={GiveawayPage} />
                    <Route path="/live/talents" exact component={OverlayTalents} />
                    <Route path="/live/roundwinner" exact component={OverlayRoundWinner} />
                </Switch>
            </Box>
        </div>
    );
};

export default App;
