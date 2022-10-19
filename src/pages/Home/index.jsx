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

const { heroBackground, og1, og2, og3, og4 } = images;
const { mouse, redirect, instagram } = icons;

const Home = () => {
  const { isFirstTime, setIsFirstTime, setLoading, setSlideNo, slideNo } =
    useContext(GlobalContext);
  const containerRef = useRef(null);
  const horizontalSliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedImage, setSelectedImage] = useState(og1);
  const [currentTranslation, setCurrentTranslation] = useState(150);
  const verticalSliderRef = useRef(null);
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

  function scrollHorizontallyWhenVerticalScroll(e) {
    e = window.event || e;
    let delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    const speed = 20;
    console.log(e.deltaY > 0 ? "towards right" : "towards left");
    if (e.deltaY > 0 && !isPaused) {
      const newTranslation = currentTranslation - 100;
      console.log(newTranslation);
      if (newTranslation < -150) return;
      setCurrentTranslation(newTranslation);
      setSlideNo(slideNo + 1);
      horizontalSliderRef.current.style.transform = `translate(${newTranslation}vw,0)`;
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
      }, 1000);
    } else if (!isPaused) {
      const newTranslation = currentTranslation + 100;
      console.log(newTranslation);
      if (newTranslation > 150) return;
      setCurrentTranslation(newTranslation);
      setSlideNo(slideNo - 1);

      horizontalSliderRef.current.style.transform = `translate(${newTranslation}vw,0)`;
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
      }, 1000);
    }
  }

  function handleParentScroll(e) {
    if (isFirstTime) return;
    scrollHorizontallyWhenVerticalScroll(e);
  }

  useEffect(() => {
    if (horizontalSliderRef) {
      horizontalSliderRef.current.addEventListener(
        "mousewheel",
        handleParentScroll
      );
    } else {
      horizontalSliderRef.current.attachEvent(
        "onmousewheel",
        handleParentScroll
      );
    }
    return () => {
      if (horizontalSliderRef) {
        horizontalSliderRef.current.removeEventListener(
          "mousewheel",
          handleParentScroll
        );
      } else {
        horizontalSliderRef.current.detachEvent(
          "onmousewheel",
          handleParentScroll
        );
      }
    };
  });

  useEffect(() => {
    const images = document.querySelectorAll(".img-load");
    let loadedImages = 0;
    function countUpLoadedImages() {
      loadedImages++;
      console.log({ loadedImages, length: images.length });
      setLoading((prev) => ({
        ...prev,
        width: (loadedImages / images.length) * 100,
      }));
      if (loadedImages === images.length) {
        setLoading((prev) => ({ ...prev, isLoading: false }));
      }
    }

    function setLoadingToFalseAfterImagesLoaded() {
      images.forEach((image) => {
        image.addEventListener("load", countUpLoadedImages);
      });
    }
    setLoadingToFalseAfterImagesLoaded();
    return () => {
      images.forEach((image) => {
        image.removeEventListener("load", countUpLoadedImages);
      });
    };
  }, []);

  useEffect(() => {
    console.log("This should run after everything is loaded");
  }, []);

  return (
    <MainLayout navbar={{ isFirstTime }}>
      <section className={styles.container}>
        <div ref={horizontalSliderRef} className={styles.horizontalSlider}>
          <section className={clsx(styles.hero, styles.horizontalSlide)}>
            <div
              className={
                isFirstTime
                  ? clsx(styles.content, styles.firstTime)
                  : styles.content
              }
            >
              {isFirstTime ? (
                <div className={styles.firstTime}>
                  <h1 onClick={() => setIsFirstTime(false)}>
                    ENTER THE{" "}
                    <span className={styles.yellowText}> BUNNY HOUSE</span>
                  </h1>
                </div>
              ) : (
                <div className={styles.rectangle}></div>
              )}
            </div>

            <div className={styles.backgroundImage}>
              <img
                className="img-load"
                src={heroBackground}
                alt="heroBackground"
              />
            </div>
          </section>
          <section className={clsx(styles.og, styles.horizontalSlide)}>
            <div ref={verticalSliderRef} className={styles.wrapper}>
              <div className={clsx(styles.multiple, styles.vertical)}>
                <Slider {...settings}>
                  {[og1, og2, og3, og4].map((img, index) => (
                    <div
                      onClick={() => setSelectedImage(img)}
                      data-index={index}
                      key={index}
                      className={styles.slide}
                    >
                      <img
                        className="img-load"
                        width={"100%"}
                        src={img}
                        alt="OG"
                      />
                    </div>
                  ))}
                </Slider>
                <div className={styles.backgroundImage}>
                  <img className="img-load" src={selectedImage} alt="OG" />
                </div>
              </div>
            </div>
          </section>
          <section className={clsx(styles.team, styles.horizontalSlide)}>
            <div className={styles.backgroundImage}>
              <img className="img-load" src={og2} alt="og2" />
            </div>
          </section>
          <section className={clsx(styles.minting, styles.horizontalSlide)}>
            <div className={styles.backgroundImage}>
              <img className="img-load" src={og3} alt="og3" />
            </div>
          </section>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
