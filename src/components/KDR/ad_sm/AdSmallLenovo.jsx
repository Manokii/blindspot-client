import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { makeStyles } from "@material-ui/core";

import AdSmLenovo1 from "../../../assets/ad_sm_lenovo_1.png";
import AdSmLenovo2 from "../../../assets/ad_sm_lenovo_2.png";
import AdSmLenovo3 from "../../../assets/ad_sm_lenovo_3.png";

const images = [AdSmLenovo1, AdSmLenovo2, AdSmLenovo3];

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

const AdSmallLenovo = () => {
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

export default AdSmallLenovo;
