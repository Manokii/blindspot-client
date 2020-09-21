import React, { useState, useEffect, useContext } from "react";
import { wsContext } from "./WebsocketProvider";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import qs from "qs";
import { useLocation } from "react-router-dom";

import {
    makeStyles,
    List,
    ListItem,
    Tabs,
    Tab,
    Paper,
    Box,
    Typography,
    Divider,
    // Typography,
} from "@material-ui/core";

// =============== STYLES ===============
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        "& .bracket": {
            display: "flex",
        },
    },
    bracket: {
        display: "grid",
        gridGap: "20px",
        "& .rounds": {
            "& .round": {},
        },
    },
    matchItem: {
        display: "flex",
        alignItems: "center",
        margin: theme.spacing(1, 0),
        border: "1px solid rgba(0,0,0,.1)",
        "& .match-number": { width: 38 },
        "& .status": { width: 105, textAlign: "center" },
        "& .divider": { margin: theme.spacing(0, 1) },
        "& .match": {
            display: "flex",
            alignItems: "center",
            flex: 1,
            "& .a": {
                flex: 1,
                textAlign: "right",
                padding: theme.spacing(0, 1),
            },
            "& .b": {
                flex: 1,
                textAlign: "left",
                padding: theme.spacing(0, 1),
            },
            "& .vs": { padding: theme.spacing(0, 1) },
        },
        "& .scores": {
            flexShrink: 0,
            width: 65,
            textAlign: "center",
        },
    },
}));

// =============== TabPanel ===============
function TabPanel({ children, value, index, ...other }) {
    const classes = useStyles();
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && (
                <Box className={classes.bracket} p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

// =============== TabNav ===============
function TabNav(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

// =============== MatchItem ===============
const MatchItem = ({ match, ...rest }) => {
    const params = qs.parse(useLocation().search, { ignoreQueryPrefix: true });
    const classes = useStyles();
    const live = useSelector((state) => state.live);
    const { EntityParticipantB: b } = match;
    const { EntityParticipantA: a } = match;
    const liveContext = useContext(wsContext);

    const teamA = () => {
        if (a.IsBye) return "BYE";
        if (!a.Profile) return "TBA";
        return a.Profile.DisplayName;
    };
    const teamB = () => {
        if (b.IsBye) return "BYE";
        if (!b.Profile) return "TBA";
        return b.Profile.DisplayName;
    };

    const score = () => {
        if (a.IsBye || b.IsBye) return "BYE";
        if (a.Forfeit || b.Forfeit) return "FORFEIT";
        if (a.NoShow || b.NOSHOW) return "NO SHOW";
        return `${a.Score} - ${b.Score}`;
    };

    const StatusTypes = {
        1: "UPCOMING",
        2: "STARTING SOON",
        3: "VETO PHASE",
        4: "MATCH ONGOING",
        5: "SCORE CHECKING",
        6: "FINISHED",
    };

    const addMatchWidget = () => {
        liveContext.add_match_widget(match);
    };
    const NOTclickable = () => {
        if (a.IsBye || b.IsBye) return true;
        // prettier-ignore
        return live.match_widgets.find((m) => m.TournamentMatchId === match.TournamentMatchId)
            ? true
            : false;
    };

    return (
        <ListItem
            button
            disabled={NOTclickable()}
            className={classes.matchItem}
            onClick={() => addMatchWidget()}
            {...rest}>
            <Typography className="match-number" variant="caption">
                M{match.MatchNumber}
            </Typography>

            <Divider orientation="vertical" className="divider" flexItem />
            {/* prettier-ignore */}
            <div className="match">
                <Typography className="a" variant="caption">{teamA()}</Typography>
                <Typography className="vs" variant="button">VS</Typography>
                <Typography className="b" variant="caption">{teamB()}</Typography>
            </div>

            {!params.simple && (
                <>
                    <Divider
                        orientation="vertical"
                        className="divider"
                        flexItem
                    />
                    <Typography className="status" variant="caption">
                        {StatusTypes[match.TournamentMatchExtendedStateId]}
                    </Typography>
                    <Divider
                        orientation="vertical"
                        className="divider"
                        flexItem
                    />
                    <Typography variant="body2" className="scores">
                        {score()}
                    </Typography>
                </>
            )}
        </ListItem>
    );
};

const TournamentPageBrackets = ({ ...rest }) => {
    const tournament = useSelector((state) => state.tournament);
    const classes = useStyles();
    const [activeTab, setActiveTab] = useState(0);
    const [brackets, setBrackets] = useState([]);

    useEffect(() => {
        const newMatches = tournament.Matches;
        // prettier-ignore
        const newBrackets = [
            ...[
                ...new Set(newMatches.map((match) => match.RoundLevelTypeId)),
            ].map((bracket) => [...new Set(
                newMatches.filter((match) => match.RoundLevelTypeId ===     bracket)
                .map((match) => match.RoundNumber))
            ].map((round) => newMatches.filter(match => match.RoundNumber ===   round && match.RoundLevelTypeId ===   bracket)
            )),
        ]

        setBrackets(newBrackets);
    }, [tournament]);

    const switchTab = (e, tab) => {
        setActiveTab(tab);
    };
    return (
        // prettier-ignore
        <Paper {...rest} square elevation={1} className={classes.root}>
            <Tabs value={activeTab}  onChange={switchTab}>
               {brackets.map((bracket, index) => (
                   <Tab key={index} label={['Upper Bracket', 'Lower Bracket', 'Finals' ][index]} {...TabNav(index)} />
               ))}
            </Tabs>

            {brackets.map((bracket, i) => (
                <TabPanel  key={i} value={activeTab} index={i} >
                    {bracket.map((round, j) => (
                        <div className="rounds" key={j}>
                            <Typography variant="button">Round #{j+1}</Typography>
                            <List className="round" >
                                {round.map((match, k) => (
                                    <MatchItem match={match} key={k} />
                                ))}
                            </List>
                        </div>
                    ))}
                </TabPanel>
            ))}


        </Paper>
    );
};

export default TournamentPageBrackets;
