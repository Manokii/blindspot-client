import React from "react";
import { Route, Switch } from "react-router-dom";
import { makeStyles, Box } from "@material-ui/core";

import SideNav from "./components/Navigation";
import TournamentPage from "./components/TournamentPage";
import ControlList from "./components/Control/ControlList";
import Live from "./components/KDR/KDRPage";
import LiveInfoBox from "./components/KDR/KDRInfoBox";
import LiveMatchWidgets from "./components/KDR/KDRMatchWidgets";
import LiveIngame from "./components/KDR/KDRIngame";
import LiveMatchUp from "./components/KDR/KDRMatchUp";
import LiveVeto from "./components/KDR/KDRVeto";
import LiveLowerThirds from "./components/KDR/KDRLowerThirds";
import LiveScore from "./components/KDR/KDRScore";
import LiveIngamePlayers from "./components/KDR/KDRIngamePlayers";
import LiveSponsorSlot from "./components/KDR/KDRSponsorSlot";
import LivePreviousMatches from "./components/KDR/KDRPreviousMatches";
import LiveMVP from "./components/KDR/KDRMVP";
import Downstage from "./components/KDR/Downstage";
import Downstage2 from "./components/KDR/Downstage2";
import GiveawayPage from "./components/GiveawayPage";
import KDRTalents from "./components/KDR/KDRTalents";
import KDRRoundWinner from "./components/KDR/KDRRoundWinner";

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
                    <Route path="/kdr" exact component={Live} />
                    <Route path="/kdr/infobox" exact component={LiveInfoBox} />
                    <Route path="/kdr/matchwidgets" exact component={LiveMatchWidgets} />
                    <Route path="/kdr/ingame" exact component={LiveIngame} />
                    <Route path="/kdr/matchup" exact component={LiveMatchUp} />
                    <Route path="/kdr/veto" exact component={LiveVeto} />
                    <Route path="/kdr/lowerthirds" exact component={LiveLowerThirds} />
                    <Route path="/kdr/scores" exact component={LiveScore} />
                    <Route path="/kdr/players" exact component={LiveIngamePlayers} />
                    <Route path="/kdr/sponsors" exact component={LiveSponsorSlot} />
                    <Route path="/kdr/previousmatches" exact component={LivePreviousMatches} />
                    <Route path="/kdr/mvp" exact component={LiveMVP} />
                    <Route path="/downstage" exact component={Downstage} />
                    <Route path="/downstage2" exact component={Downstage2} />
                    <Route path="/giveaways" exact component={GiveawayPage} />
                    <Route path="/kdr/talents" exact component={KDRTalents} />
                    <Route path="/kdr/roundwinner" exact component={KDRRoundWinner} />
                </Switch>
            </Box>
        </div>
    );
};

export default App;
