import React from "react";
import { MainLayout } from "../../Layouts";
import styles from "./OG.module.scss";
import { images, icons } from "../../assets";
import clsx from "clsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const { og1, og2, og3, og4 } = images;
const { mouse } = icons;

const index = () => {
  function noOfSlidesToShow() {
    // if (innerWidth >= 1110) return 2;
    // if (innerWidth >= 900) return 2;
    // else return 1;
    return 3;
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: noOfSlidesToShow(),

    slidesToScroll: noOfSlidesToShow(),
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.centralHeading}>
          <h1 className={styles.ourOGS}>
            OUR <span className={styles.yellowText}>OG's</span>{" "}
          </h1>
          <img src={mouse} alt="Scroll" />
          <span>Scroll</span>
        </div>
        <div className={styles.slider}>
          <Slider {...settings}>
            {[og1, og2, og3, og4].map((img, index) => (
              <div data-index={index} key={index} className={styles.slide}>
                <img src={img} alt="OG" />
              </div>
            ))}
          </Slider>
        </div>
        <section
          style={{ background: "url(" + og1 + ") no-repeat center" }}
          className={styles.og}
        ></section>
        <section
          style={{ background: "url(" + og2 + ") no-repeat center" }}
          className={styles.og}
        ></section>
        <section
          style={{ background: "url(" + og3 + ") no-repeat center" }}
          className={styles.og}
        ></section>
        <section
          style={{ background: "url(" + og4 + ") no-repeat center" }}
          className={styles.og}
        ></section>
      </div>
    </MainLayout>
  );
};

export default index;
