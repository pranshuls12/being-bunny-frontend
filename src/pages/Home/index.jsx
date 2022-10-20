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

const {
  heroBackground,
  og1,
  og2,
  og3,
  og4,
  creatives,
  roadmap,
  bunny1,
  bunny2,
  bunny3,
  thunder,
} = images;
const { mouse, redirect, instagram } = icons;

function getImageByIndex(index) {
  switch (index) {
    case 0:
      return bunny1;
    case 1:
      return bunny2;
    case 2:
      return bunny3;
    default:
      return bunny1;
  }
}

const members = Array.from({ length: 15 }, (_, index) => {
  return {
    image: getImageByIndex(index % 3),
    name: "Lorem Ipsum",
    designation: "Designation",
  };
});

// console.log(members);

const Home = () => {
  const { isFirstTime, setIsFirstTime, setLoading, setSlideNo, slideNo } =
    useContext(GlobalContext);
  const containerRef = useRef(null);
  const [sliderEndPoint, setSliderEndPoint] = useState(0);

  const horizontalSliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isFirstTImeScrolled, setIsFirstTImeScrolled] = useState(true);
  const [selectedImage, setSelectedImage] = useState(og1);
  const [currentTranslation, setCurrentTranslation] = useState(0);
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

  useEffect(() => {
    const root = document.querySelector(":root");
    const sliderCount = document.querySelectorAll(".horizontalSlide").length;
    root.style.setProperty(
      "--horizontal-slider-width",
      `${sliderCount * 100}vw`
    );
    const endPoint = (100 * (sliderCount - 1)) / 2;
    if (horizontalSliderRef) {
      // console.log("THIS RAN HEHEH");
      // console.log({ endPoint });
      horizontalSliderRef.current.style.transform = `translateX(${endPoint}vw)`;
    }
    setCurrentTranslation(endPoint);
    setSliderEndPoint(endPoint);
  }, []);

  function rectangleAnimation() {
    const rectangle = document.querySelector(".rectangle");
    // console.log("OLA TAM KAALE KAALE u");
    rectangle.classList.add(styles.rectangleAnimation);
  }

  function scrollHorizontallyWhenVerticalScroll(e) {
    e = window.event || e;
    let delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    const speed = 20;
    // console.log(e.deltaY > 0 ? "towards right" : "towards left");
    if (e.deltaY > 0 && !isPaused) {
      const newTranslation = currentTranslation - 100;
      // console.log(newTranslation);
      if (newTranslation < -sliderEndPoint) return;

      //This Section is not a part of scroll animation
      if (isFirstTImeScrolled) {
        rectangleAnimation();
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
        }, 1500);
        setIsFirstTImeScrolled(false);
        return;
      }

      //This Section is not a part of scroll animation

      setCurrentTranslation(newTranslation);
      setSlideNo(slideNo + 1);
      horizontalSliderRef.current.style.transform = `translate(${newTranslation}vw,0)`;
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
      }, 1500);
    } else if (!isPaused) {
      const newTranslation = currentTranslation + 100;
      // console.log(newTranslation);
      if (newTranslation > sliderEndPoint) return;
      setCurrentTranslation(newTranslation);
      setSlideNo(slideNo - 1);

      horizontalSliderRef.current.style.transform = `translate(${newTranslation}vw,0)`;
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
      }, 1300);
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
      // console.log({ loadedImages, length: images.length });
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

  return (
    <MainLayout navbar={{ isFirstTime }}>
      <section className={styles.container}>
        <div ref={horizontalSliderRef} className={styles.horizontalSlider}>
          {/* <section
            className={clsx(
              styles.hero,
              styles.horizontalSlide,
              "horizontalSlide"
            )}
          >
            <div
              className={
                isFirstTime
                  ? clsx(styles.content, styles.firstTime)
                  : styles.content
              }
            >
              {isFirstTime && (
                <div className={styles.firstTime}>
                  <h1 onClick={() => setIsFirstTime(false)}>
                    ENTER THE{" "}
                    <span className={styles.yellowText}> BUNNY HOUSE</span>
                  </h1>
                </div>
              )}
            </div>

            <div className={styles.backgroundImage}>
              <img
                className="img-load"
                src={heroBackground}
                alt="heroBackground"
              />
            </div>
          </section> */}
          <section
            className={clsx(
              styles.hero,
              styles.horizontalSlide,
              "horizontalSlide"
            )}
          >
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
                  <img src={thunder} alt="Thunder" />
                </div>
              ) : (
                <div className={clsx(styles.rectangle, "rectangle")}></div>
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
          {/* <section className={clsx(styles.og, styles.horizontalSlide)}>
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
          </section> */}
          <section
            className={clsx(
              styles.team,
              styles.horizontalSlide,
              "horizontalSlide"
            )}
          >
            <div className={styles.backgroundImage}>
              <img className="img-load" src={roadmap} alt="og2" />
            </div>
          </section>
          <section
            className={clsx(
              styles.minting,
              styles.horizontalSlide,
              "horizontalSlide"
            )}
          >
            <div className={styles.backgroundImage}>
              <img className="img-load" src={creatives} alt="og3" />
            </div>
          </section>
          <section
            className={clsx(
              styles.teamList,
              styles.horizontalSlide,
              "horizontalSlide"
            )}
          >
            <div className={styles.content}>
              <h1>
                OUR <span className={styles.yellowText}>TEAM</span>
              </h1>
              <div className={styles.membersList}>
                {members.map((member, index) => (
                  <MemberCard
                    image={member.image}
                    name={member.name}
                    designation={member.designation}
                  />
                ))}
              </div>
            </div>
            <div className={styles.backgroundImage}>
              <img className="img-load" src={roadmap} alt="og3" />
            </div>
          </section>
        </div>
      </section>
    </MainLayout>
  );
};

const MemberCard = ({ image, name, designation }) => {
  return (
    <div className={styles.memberCard}>
      <div className={styles.image}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.info}>
        <p>{name}</p>
        <p>{designation}</p>
      </div>
    </div>
  );
};

export default Home;
