import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { makeStyles } from "@material-ui/core";

import AdSmGlobe1 from "../../../assets/ad_sm_globe_1.jpg";
import AdSmGlobe2 from "../../../assets/ad_sm_globe_2.jpg";
import AdSmGlobe3 from "../../../assets/ad_sm_globe_3.jpg";
import AdSmGlobe4 from "../../../assets/ad_sm_globe_4.jpg";

const images = [AdSmGlobe1, AdSmGlobe2, AdSmGlobe3, AdSmGlobe4];

const q = makeStyles((theme) => ({
    root: {
        height: 271,
        width: 470,
        "& .each-slide": {
            "& .img": {
                backgroundSize: "contain",
                backgroundPosition: "bottom left",
                backgroundRepeat: "no-repeat",
                display: "flex",
                height: 271,
            },
        },
    },
}));

const AdSmallGlobe = () => {
    const c = q();
    return (
        <div className={c.root}>
            <Slide easing="cubic" arrows={false} duration={5000}>
                {images.map((img) => (
                    <div className="each-slide">
                        <div
                            className="img"
                            style={{ backgroundImage: `url(${img})` }}></div>
                    </div>
                ))}
            </Slide>
        </div>
    );
};

export default AdSmallGlobe;
