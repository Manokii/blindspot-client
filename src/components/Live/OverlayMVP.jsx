import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import mvpbg from "../../assets/mvp.png";
import mvptexture from "../../assets/mvp_texture.png";

const q = makeStyles((theme) => ({
    root: {
        display: "flex",
        height: 1080,
        width: 1920,
        justifyContent: "center",
        position: "relative",

        "& .container": {
            position: "absolute",
            width: 1388,
            height: 926,
            top: 77,
            left: 97,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${mvpbg})`,
            transform: "rotate(-2.87deg)",
            backfaceVisibility: "hidden",
            // padding: theme.spacing(5),

            "& .texture": {
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url(${mvptexture})`,
                mixBlendMode: "multiply",
            },

            "& .headline": {
                fontFamily: "Whatka",
                fontWeight: "bolder",
                letterSpacing: "2pt",
                // fontSize: "101pt",
                textAlign: "center",
                margin: theme.spacing(10, 0, 0, 3),
                textTransform: "uppercase",
            },

            "& .stats": {
                display: "flex",
                flexDirection: "column",
                padding: theme.spacing(5, 20),
                "& .stat": {
                    display: "flex",
                    justifyContent: "space-around",
                    margin: theme.spacing(2),
                    "& .box": {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 320,
                        height: 100,
                        fontSize: "50pt",
                        letterSpacing: "1pt",
                        backgroundColor: theme.palette.primary.main,
                    },
                },
            },
        },
        "& .agent": {
            position: "absolute",
            top: 0,
            right: "-55%",
            height: 1080,
            width: 1920,
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto 150%",
            transition: "all .6s ease-in-out",
        },
    },
}));

const LiveMVP = () => {
    const {
        mvp = {
            name: "Lamoku",
            agent: "sage",
            team: "",
            kills: 0,
            assists: 0,
            deaths: 0,
            rating: 0,
        },
    } = useSelector((state) => state.live);
    const c = q();

    const gitImageStyleBitchiz = {
        viper: { backgroundSize: "auto 150%", backgroundPositionY: "30px" },
        sage: {
            backgroundSize: "auto 150%",
            transform: "scaleX(-1)",
            backgroundPosition: "right 2%",
        },
        reyna: { backgroundPosition: "-30% 33%", backgroundSize: "auto 170%" },
        raze: { backgroundPosition: "0 15%", backgroundSize: "auto 150%" },
        phoenix: { backgroundPosition: "0% -5%", backgroundSize: "auto 150%" },
        brimstone: {
            // backgroundPosition: "50% 3%",
            backgroundSize: "auto 150%",
        },
        sova: {
            backgroundPosition: "95% -5%",
            backgroundSize: "auto 150%",
            transform: "scaleX(-1)",
        },
        breach: { backgroundPosition: "0% -5%", backgroundSize: "auto 150%" },
        jett: {
            backgroundPosition: "100% 7%",
            backgroundSize: "auto 150%",
            transform: "scaleX(-1) translateX(0%)",
        },
        omen: {
            backgroundPosition: "0% 0%",
            backgroundSize: "auto 150%",
            transform: "translateX(-1%)",
        },
        killjoy: { backgroundPosition: "0% -5%", backgroundSize: "auto 150%" },
        // cypher: { transform: "translateX(-3%)" },
    };

    const getAgentImage = (name) => {
        try {
            return require(`../../assets/${name}.png`);
        } catch (err) {
            return null;
        }
    };

    return (
        <div className={c.root}>
            <div className="container">
                <Typography variant="h1" color="primary" className="headline">
                    {mvp.name}
                </Typography>

                <div className="stats">
                    <div className="stat">
                        <Typography variant="h2" className="box">
                            Kills
                        </Typography>
                        <Typography variant="h2" className="box">
                            {mvp.kills}
                        </Typography>
                    </div>
                    <div className="stat">
                        <Typography variant="h2" className="box">
                            Assists
                        </Typography>
                        <Typography variant="h2" className="box">
                            {mvp.assists}
                        </Typography>
                    </div>
                    <div className="stat">
                        <Typography variant="h2" className="box">
                            Deaths
                        </Typography>
                        <Typography variant="h2" className="box">
                            {mvp.deaths}
                        </Typography>
                    </div>
                    <div className="stat">
                        <Typography variant="h2" className="box">
                            Econ Rating
                        </Typography>
                        <Typography variant="h2" className="box">
                            {mvp.rating}
                        </Typography>
                    </div>
                </div>

                <div className="texture"></div>
            </div>
            <div
                className="agent"
                style={{
                    backgroundImage: `url(${getAgentImage(mvp.agent)})`,
                    ...gitImageStyleBitchiz[mvp.agent],
                }}></div>
        </div>
    );
};

export default LiveMVP;
