import { MainLayout } from "../../Layouts";
import styles from "./Home.module.scss";
import { Logo, Button, IconButton } from "../../components";
import { icons, images } from "../../assets";
import { useContext, useEffect, Suspense, useRef, useState } from "react";
import { GlobalContext } from "../../utils/context";
import clsx from "clsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const { heroBackground, og1, og2, og3, og4 } = images;
const { mouse, redirect, instagram } = icons;

const Home = () => {
  const { isFirstTime, setIsFirstTime, isLoading } = useContext(GlobalContext);
  const containerRef = useRef(null);
  // useEffect(() => {
  //   console.log({ isFirstTime });
  // });
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

  // useEffect(() => {
  //   function scrollHorizontally(e) {
  //     e = window.event || e;
  //     console.log("hello");
  //     var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
  //     var scrollSpeed = 30; // Janky jank <<<<<<<<<<<<<<
  //     document.documentElement.scrollLeft -= delta * scrollSpeed;
  //     document.body.scrollLeft -= delta * scrollSpeed;
  //     // e.preventDefault();
  //   }
  //   if (window.addEventListener) {
  //     // IE9, Chrome, Safari, Opera
  //     window.addEventListener("mousewheel", scrollHorizontally, false);
  //     // Firefox
  //     window.addEventListener("DOMMouseScroll", scrollHorizontally, false);
  //   } else {
  //     // IE 6/7/8
  //     window.attachEvent("onmousewheel", scrollHorizontally);
  //   }
  //   return () => {
  //     window.removeEventListener("mousewheel", scrollHorizontally, false);
  //     window.removeEventListener("DOMMouseScroll", scrollHorizontally, false);
  //   };
  // }, [containerRef]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let sections = document.querySelectorAll(".horizontalSlide");

    const ctx = gsap.context(() => {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontalSlider",
          pin: true,
          scrub: 1,

          snap: 1 / (sections.length - 1),
          // base vertical scrolling on how wide the container is so it feels more natural.
          end: "2000",
        },
      });
    });

    return () => ctx.revert();
  });

  return (
    <MainLayout navbar={{ isFirstTime }}>
      {/* <footer
        // onScroll={detectVerticalScrollAndScrollHorizontally}
        className={clsx(styles.test, "hello")}
      >
        {["yellow", "green", "red", "brown"].map((item, index) => (
          <aside
            key={index}
            ref={containerRef}
            className={clsx(styles.slide, "pello")}
            style={{ background: item }}
          >
            <h1>Hello</h1>
          </aside>
        ))}
      </footer> */}
      {/* <div
        ref={containerRef}
        // onScroll={detectVerticalScrollAndScrollHorizontally}
        className={styles.test}
      >
        {["yellow", "green", "red", "brown"].map((item) => (
          <div className={styles.slide} style={{ background: item }}></div>
        ))}
      </div> */}
      <div className={clsx("horizontalSlider", styles.horizontalSlider)}>
        <section
          className={
            isFirstTime
              ? clsx(
                  styles.container,
                  styles.firstTime,
                  styles.hero,
                  styles.maxHeightContainer,
                  "horizontalSlide"
                )
              : clsx(
                  styles.container,
                  styles.hero,
                  styles.maxHeightContainer,
                  "horizontalSlide"
                )
          }
        >
          <div className={styles.backgroundImage}>
            <img src={heroBackground} alt="Hero Background" />
          </div>
          <div className={styles.maxWidthContainer}>
            {isFirstTime && !isLoading && (
              <h1
                onClick={() => {
                  setIsFirstTime(false);
                }}
                className={styles.firstTimeHeading}
              >
                ENTER THE{" "}
                <span
                  style={{ fontSize: "unset" }}
                  className={styles.yellowText}
                >
                  BUNNY HOUSE
                </span>{" "}
              </h1>
            )}
          </div>
        </section>
        <section
          className={clsx(
            styles.maxHeightContainer,
            styles.og,
            "horizontalSlide"
          )}
        >
          <div className={styles.og1}>
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
            <div className={styles.backgroundImage}>
              <img src={og1} alt="OG1" />
            </div>
          </div>
          <div className={styles.og1}>
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
            <div className={styles.backgroundImage}>
              <img src={og1} alt="OG1" />
            </div>
          </div>
        </section>
        <section className={clsx(styles.maxHeightContainer, "horizontalSlide")}>
          <h1>Team</h1>
        </section>
        <section className={clsx(styles.maxHeightContainer, "horizontalSlide")}>
          <h1>Minting</h1>
        </section>
      </div>
    </MainLayout>
  );
};

export default Home;
