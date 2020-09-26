import React, { useContext, useEffect } from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import { wsContext } from "../WebsocketProvider";
import { useSelector } from "react-redux";
import infoboxBlitz2 from "../../assets/infobox_blitz2.png";
import axios from "axios";
import { useTransition, animated } from "react-spring";
import { Transition } from "react-spring/renderprops";

const us = makeStyles((theme) => ({
    root: {
        width: 1920,
        height: 1080,
        overflow: "hidden",
        position: "relative",
        display: "flex",
    },
    box: {
        position: "absolute",
        width: 859,
        height: 859,
        top: 112,
        left: 978,
        // backgroundColor: "#0C142A",
        boxSizing: "border-box",
        // border: "4px solid #EF4958 ",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${infoboxBlitz2})`,
        fontFamily: "Tungsten",
    },
    box2: {
        position: "absolute",
        width: 910,
        height: 910,
        top: 49,
        left: 803,
        boxSizing: "border-box",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        fontFamily: "Tungsten",
    },
    box_veto: {
        position: "absolute",
        width: 859,
        height: 859,
        top: 112,
        left: 978,
        boxSizing: "border-box",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${infoboxBlitz2})`,
        fontFamily: "Tungsten",
        padding: "40px 0",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        "& .headline": {
            color: "white",
            position: "absolute",
            bottom: -3,
            fontFamily: "Tungsten",
            fontSize: "3rem",
            textTransform: "uppercase",
            // padding: theme.spacing(0.3)
        },
        "& .wrap": {
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",

            "& .veto": {
                marginTop: 60,
                display: "grid",
                gridTemplateColumns: "1fr",
                gridGap: 50,
                flexDirection: "column",

                "& .picking": {
                    fontFamily: "Gotham Pro",
                    animation: `$heartbeat 2000ms ease-out infinite`,
                    animationDelay: "2000ms",
                    textAlign: "center",
                },

                "& .vote": {
                    width: 650,
                    height: 130,
                    border: "4px solid #EF4958",
                    display: "flex",
                    position: "relative",
                    backgroundColor: "#0C142A",
                    "& .team": {
                        position: "absolute",
                        bottom: "100%",
                        right: 0,
                        padding: theme.spacing(0.5, 0),
                        textTransform: "uppercase",
                    },

                    "& .upcoming": {
                        position: "absolute",
                        top: 5,
                        left: 0,
                        padding: "3px 5px",
                        backgroundColor: "#EF4958",
                        color: "#fff",
                        textTransform: "uppercase",
                        // width: 50,
                        fontWeight: "normal",
                        fontFamily: "Gotham Pro",
                    },

                    "& .winner": {
                        width: 125,
                        position: "relative",
                        backgroundSize: "auto 80%",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#0C142A",
                        color: theme.palette.secondary.main,
                        fontSize: "3rem",
                        "& .upcoming": {
                            transform: "rotateZ(-45deg)",
                            opacity: 0.2,
                            textTransform: "uppercase",
                            color: "#fff",
                        },
                        "& .winnertxt": {
                            position: "absolute",
                            top: 5,
                            left: 0,
                            padding: "3px 5px",
                            backgroundColor: "#EF4958",
                            color: "#fff",
                            textTransform: "uppercase",
                            // width: 50,
                            fontWeight: "normal",
                            fontFamily: "Gotham Pro",
                        },
                    },

                    "& .map": {
                        flex: 1,
                        height: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",

                        "& .map-name": {
                            padding: theme.spacing(1, 2),
                            backgroundColor: "#EF4958",
                            color: "#fff",
                            fontFamily: "Gotham Pro",
                            textTransform: "uppercase",
                        },
                    },
                },
            },

            "& .match": {
                display: "flex",
                justifyContent: "center",
                "& .mid": {
                    width: 150,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    "& .vs": {
                        fontFamily: "Tungsten",
                        color: "#d43946",
                        marginBlockEnd: 0,
                    },
                    "& .bo": {
                        marginTop: -10,
                        textTransform: "uppercase",
                        backgroundColor: "#d43946",
                        padding: "5px 15px",
                        fontFamily: "Gotham Pro",
                        color: "white",
                    },
                },
                "& .team": {
                    display: "flex",
                    alignItems: "center",
                    "& .logo": {
                        height: 165,
                        width: 165,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        fontSize: "6rem",
                        display: "flex",
                        justifyContent: "center",
                        // borderRadius: "6%",
                        alignItems: "center",
                        border: `3px solid ${theme.palette.secondary.main}`,
                    },
                    "& .score": {
                        fontFamily: "Tungsten",
                        color: "#d43946",
                        fontSize: "5rem",
                        textAlign: "center",
                        width: 125,
                    },
                },
            },
        },
    },
    current_match: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .headline": {
            position: "absolute",
            bottom: 0,
            padding: theme.spacing(1.3),
            letterSpacing: 2,
            textAlign: "center",
            fontFamily: "Tungsten",
            textTransform: "uppercase",
            width: 600,
            lineHeight: 0.8,
            // color: theme.palette.primary.main,
            color: "white",
            // backgroundColor: 'rgba(0,0,0,.5)'
        },
        "& .banner": {
            width: "100%",
            height: "93%",
            // border: '1px solid black',
            backgroundSize: "contain",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            // backgroundImage: `url(${bannerBG})`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "& .team, .vs": {
                height: "100%",
                // border: "1px solid black",
            },
            "& .team": {
                // width: 265,
                // flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",

                "& .players": {
                    marginTop: 20,
                    height: 185,
                    "& .player": {
                        textAlign: "center",
                        fontFamily: "Tungsten",
                        textTransform: "uppercase",
                        fontSize: "2em",
                        letterSpacing: 1,
                        color: theme.palette.secondary.main,
                    },
                },
                "& .logo": {
                    height: 310,
                    width: 310,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    // borderRadius: "15px",
                    border: `4px solid ${theme.palette.secondary.main}`,
                    fontyFamily: "Tungsten",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "7rem",
                    backgroundColor: theme.palette.primary.main,
                },

                "& .name-container": {
                    marginTop: 15,
                    width: 310,
                    height: 55,
                    backgroundColor: theme.palette.secondary.main,
                    display: "flex",
                    alignItems: "flex-start",

                    "& .name": {
                        // mixBlendMode: 'screen',
                        fontFamily: "Tungsten",
                        fontSize: "2rem",
                        height: 55,
                        textTransform: "uppercase",
                        textAlign: "center",
                        color: "white",
                        letterSpacing: 1,
                        flexGrow: 1,
                        flexShrink: 0,
                        padding: theme.spacing(0.5, 0.5),
                        overflow: "hidden",
                    },
                    "& .score": {
                        fontFamily: "Tungsten",
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.secondary.main,
                        fontSize: "3rem",
                        textAlign: "center",
                        height: 55,
                        width: 55,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: `2px solid ${theme.palette.secondary.main}`,
                        flexShrink: 0,
                        // margin: theme.spacing(5, 0),
                    },
                },
            },

            // "& .a" :{alignItems: 'flex-end'},
            // "& .b" :{alignItems: 'flex-start'},
            "& .vs": {
                fontFamily: "Tungsten",
                // width: 182,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#EF4958",
                fontSize: "3rem",
                marginBottom: 250,
                textTransform: "uppercase",
                transformOrigin: "center",
                transform: "rotate(-90deg)",
            },
        },

        "& .etc": {
            flex: "1",
            display: "flex",
            "& .team-name": {
                flex: 1,
                fontFamily: "Tungsten",
                color: "#EF4958",

                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
                width: "100%",
                textTransform: "uppercase",
            },

            "& .a": {
                justifyContent: "flex-end",
                padding: theme.spacing(3, 7, 3, 3),
                textAlign: "right",
                letterSpacing: 0.3,
                lineHeight: 0.9,
            },
            "& .b": {
                textAlign: "left",
                letterSpacing: 0.3,
                padding: theme.spacing(3, 3, 3, 7),
            },
        },
    },
    match_schedule: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        alignItems: "center",
        justifyItems: "center",

        "& .headline": {
            fontFamily: "Tungsten",
            textTransform: "uppercase",
            letterSpacing: 0.3,
            padding: theme.spacing(12, 0, 5, 0),
        },

        "& .matches": {
            display: "grid",
            gridTemplateColumn: "1fr",
            gridGap: 50,
            "& .match": {
                display: "flex",
                alignItems: "center",
                padding: theme.spacing(3),
                width: 700,
                backgroundColor: "#EF4958",
                borderTopLeftRadius: "40px",
                borderBottomRightRadius: "40px",

                "&:nth-child(even)": {
                    borderTopLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: "40px",
                    borderTopRightRadius: "40px",
                },
                "& .team, .vs": {
                    fontFamily: "Gotham Pro",
                    color: "white",

                    "& .team-name": {
                        fontFamily: "'Gotham Pro', sans-serif",
                        textTransform: "uppercase",
                    },
                },
                "& .vs": { padding: theme.spacing(0, 3) },
                "& .team": { flex: 1, letterSpacing: 2.5 },
                "& .a": { textAlign: "right" },
            },
        },
    },

    "@keyframes heartbeat": {
        "0%": { color: "rgba(239,73,88,1)" },
        "50%": { color: "rgba(239,73,88,.5)" },
        "100%": { color: "rgba(239,73,88,1)" },
    },
}));

let poll;

const AnimatedBox = animated(Box);
const AnimatedTypography = animated(Typography);
const LiveInfoBox = () => {
    const classes = us();
    const ws = useContext(wsContext);
    const live = useSelector((state) => state.live);
    const {
        match_current,
        match_widgets,
        infoBoxContentType = "current_match",
        is_current_match_polling = false,
        current_match_state = "Up Next",
        maps = {
            bestOf: "bo3",
            veto: [],
        },
    } = live;

    const {
        EntityParticipantA: a,
        EntityParticipantB: b,
        TeamAPlayers: aplayers,
        TeamBPlayers: bplayers,
    } = match_current;

    useEffect(() => {
        if (!is_current_match_polling) return clearInterval(poll);

        poll = setInterval(() => {
            const cors = "http://localhost:8080/";
            const headers = {
                "arena-api-key": "C434EDE3-2E7E-4B9D-A070-58B2CF94846D",
                "arena-login-token": "fd1e9e0d-3c25-4ccd-b6b5-9b70be315e18",
            };
            // prettier-ignore
            axios.get(`${cors}polling.mogul.gg/api/tournament/match/${match_current.TournamentMatchId}/?LastUpdatedDateTime=`, {headers})
                .then(({ data:{Response: match_current} }) => {
                    ws.set_live_settings({match_current})
                    console.log(match_current)
                });
        }, 3000);
    }, [is_current_match_polling, match_current.TournamentMatchId, ws]);

    const transitions = useTransition(infoBoxContentType, null, {
        from: { transform: "translate3d(40px,0,0)", opacity: 0 },
        enter: { transform: "translate3d(0,0px,0)", opacity: 1 },
        leave: { transform: "translate3d(40px,0,0)", opacity: 0 },
    });

    // prettier-ignore
    const match_schedule = useTransition(match_widgets, (match) => match.TournamentMatchId,{
        from: { transform: "translate3d(0,-40px,0)", opacity: 0 },
        enter: { transform: "translate3d(0,0px,0)", opacity: 1 },
        leave: { transform: "translate3d(0,-40px,0)", opacity: 0 },
        trail: 100,
    });

    const vetoTransitions = useTransition(maps.veto, (map) => map.map, {
        from: { transform: "translate3d(0,-40px,0)", opacity: 0 },
        enter: { transform: "translate3d(0,0px,0)", opacity: 1 },
        leave: { transform: "translate3d(0,-40px,0)", opacity: 0 },
        trail: 100,
    });

    const getAcronym = (word) => {
        const word2 = word.match(/\b(\w)/g).join("");
        return word2.toUpperCase();
    };

    const addLogo = (url) => {
        if (url) return { backgroundImage: `url(${url})` };
        return {
            color: "#ff4656",
            backgroundColor: "#0d0a20",
        };
    };

    const checkIfLogoExists = (teamProfile, side) => {
        try {
            let src = require(`../../assets/${teamProfile?.Nickname.toLowerCase()}.png`);
            console.log(src);
            return src.replace(" ", "_");
        } catch (err) {
            return teamProfile?.LogoUrl;
        }
    };

    const getTeamByDisplayName = (name) => {
        console.log(name === a?.Profile.DisplayName ? a?.Profile : b?.Profile);
        return name === a?.Profile.DisplayName ? a?.Profile : b?.Profile;
    };

    return (
        <div className={classes.root}>
            {transitions.map(({ item, props, key }) => {
                // prettier-ignore
                return item === "current_match" ? (
                    //  =================== MATCH ================
                    <AnimatedBox key={key} style={props} boxShadow={24} className={classes.box}>
                        <div className={classes.current_match}>
                            <Typography variant="h3" color="primary" className="headline">{current_match_state}</Typography>
                            <div className="banner">
                                <div className="team a" style={{ opacity: parseInt(a?.Score) >= parseInt(b?.Score) && current_match_state === 'Match Finished'  ? 1 :  current_match_state !== 'Match Finished' ? 1: .8}}>
                                    <div className="logo" style={addLogo(checkIfLogoExists(a?.Profile))}>{!a?.Profile?.LogoUrl && a?.Profile?.DisplayName && getAcronym(a?.Profile?.DisplayName) }</div>
                                    <div className="name-container">
                                        <div className="name">{a?.Profile.DisplayName}</div>
                                        <div className="score">{a?.Score}</div>
                                    </div>
                                    <div className="players">
                                        {aplayers?.map(player => (<Typography variant="h5" className="player">{player.Profile.DisplayName}</Typography>))}
                                    </div>
                                </div>
                                
                                <Typography variant="h5" className="vs">Versus &nbsp;{maps?.bestOf}</Typography>
                                
                                <div className="team b"  style={{ opacity: parseInt(b?.Score) >= parseInt(a?.Score)  && current_match_state === 'Match Finished' ? 1 : current_match_state !== 'Match Finished' ? 1: .8}}>
                                    <div className="logo" style={addLogo(checkIfLogoExists(b?.Profile))}>{!b?.Profile?.LogoUrl && b?.Profile?.DisplayName && getAcronym(b?.Profile?.DisplayName) }</div>
                                    <div className="name-container">
                                        <div className="score">{b?.Score}</div>
                                        <div className="name">{b?.Profile.DisplayName}</div>
                                    </div>
                                    <div className="players">
                                        {bplayers?.map(player => (<Typography variant="h5" className="player">{player.Profile.DisplayName}</Typography>))}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="etc">
                                <Typography
                                    variant="h2"
                                    className="team-name a">
                                    {a?.Profile.DisplayName}
                                </Typography>
                                <Typography
                                    variant="h2"
                                    className="team-name b">
                                    {b?.Profile.DisplayName}
                                </Typography>
                            </div> */}
                        </div>
                    </AnimatedBox>
                
                ) : item === "matches" ?  (

                    //  =================== MATCHES ================
                    <AnimatedBox style={props} boxShadow={24} className={classes.box2}>
                        <div className={classes.match_schedule}>
                            <Typography variant="h1" className="headline" color="primary">Match Schedule</Typography>
                            <div className="matches">
                                {match_schedule.map(({item: {EntityParticipantA: a, EntityParticipantB: b}, props, key}) => (
                                    <animated.div style={props} className="match">
                                        <div className="team a">
                                            <Typography variant="h5" className="team-name">{a.Profile.Nickname}</Typography>
                                        </div>
                                        <Typography variant="h5" className="vs">VS</Typography>
                                        <div className="team b">
                                            <Typography variant="h5" className="team-name">{b.Profile.Nickname}</Typography>
                                        </div>
                                    </animated.div>
                                ))}
                            </div>
                        </div>
                    </AnimatedBox>
                
                ): item === 'current_match_veto' ? (

                    //  =================== VETO ================
                    <AnimatedBox style={props} boxShadow={24} className={classes.box_veto}> 
                    
                        <div className="wrap">
                            <div className="match">
                                <div className="team a">
                                    <Typography className="score">{a?.Score}</Typography>
                                    <div className="logo" style={addLogo(checkIfLogoExists(a?.Profile))}>{!a?.Profile?.LogoUrl && a?.Profile?.DisplayName && getAcronym(a?.Profile?.DisplayName) }</div>
                                </div>
                                <div className="mid">
                                    <Typography variant="h1" className="vs">vs</Typography>
                                    <div className="bo">{maps.bestOf}</div>
                                </div>
                                <div className="team b">
                                    <div className="logo"  style={addLogo(checkIfLogoExists(b?.Profile))}>{!b?.Profile?.LogoUrl && b?.Profile?.DisplayName && getAcronym(b?.Profile?.DisplayName) }</div>
                                    <Typography className="score">{b?.Score}</Typography>
                                </div>
                            </div>
                            <div className="veto">

                                {vetoTransitions.map(({item : {map, team, type, winner}, props, key}, i) => (
                                    <animated.div className="vote" key={key} style={props}>
                                        <Transition 
                                        items={type === 'pick' && winner}
                                        from={{width: 0}}
                                        enter={{width: 125}}
                                        leave={{width: 0}}>
                                            {item => item && (props =>
                                                <div className="winner" style={{...props,backgroundImage: winner ? `url(${checkIfLogoExists(getTeamByDisplayName(winner))})` : ''}}>
                                                    {!getTeamByDisplayName(winner).LogoUrl && getTeamByDisplayName(winner).DisplayName && getAcronym(getTeamByDisplayName(winner).DisplayName) }
                                                    <Typography variant="caption" className="winnertxt">winner</Typography>
                                                </div>
                                            )}
                                        </Transition>
                                        {!winner && <Typography className="upcoming" variant="caption">Map {i+1}</Typography>}
                                        <div className="map" style={{backgroundImage: `url(${require(`../../assets/${map}.png`)})`, filter: type === 'ban' ? 'grayscale(100%)' :''}}><Typography variant="h5" className="map-name">{map}</Typography></div>
                                        <Typography variant="h6" className="team" style={{color: '#ff4656'}}>{team !== 'mogulsystem'? `${team} ${type}s` : 'Final Pick'}</Typography>
                                    </animated.div>
                                ))}

                                <Transition
                                items={!maps.veto.length ? true: false}
                                from={{transform: 'translateY(-40px)', opacity: 0}}
                                enter={{transform: 'translateY(0px)', opacity: 1}}
                                leave={{transform: 'translateY(-40px)', opacity: 0}}
                                // trail={200}
                                config={{delay: 1000}}>
                                    {item => item && (props => 
                                        <AnimatedTypography className="picking" style={props} variant="h3" color="primary">Teams are picking maps</AnimatedTypography>    
                                    )}
                                </Transition>
                            </div>
                        </div>
                        <Typography variant="h5" className="headline">Map Veto</Typography>
                    
                    </AnimatedBox>
                ): ''
            })}
        </div>
    );
};

export default LiveInfoBox;
