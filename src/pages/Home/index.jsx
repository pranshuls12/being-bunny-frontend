import { MainLayout } from "../../Layouts";
import styles from "./Home.module.scss";
import { Logo, Button } from "../../components";
import { icons, images, memberImages } from "../../assets";
import { useContext, useEffect, Suspense, useRef, useState } from "react";
import { GlobalContext } from "../../utils/context";
import clsx from "clsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const { heroBackground, creatives, roadmap, thunder, team } = images;
const { mouse, redirect, instagram } = icons;

// const memberss = Array.from({ length: 15 }, (_, index) => {
//   return {
//     image: getImageByIndex(index % 3),
//     name: "Lorem Ipsum",
//     designation: "Designation",
//   };
// });

const memberNames = [
  {
    name: "69thDC",
    designation: "Co-founder",
  },
  {
    name: "dJaiblo",
    designation: "Co-founder",
  },
  {
    name: "1HCI",
    designation: "Operations",
  },
  {
    name: "Mufasa",
    designation: "Dev (Lead)",
  },
  {
    name: "Sax-x",
    designation: "Dev",
  },
  {
    name: "Scar",
    designation: "Product Manager",
  },
  {
    name: "Mr Wolverine",
    designation: "Design Manager",
  },
  {
    name: "Storybypen",
    designation: "Artist",
  },
  {
    name: "Tom",
    designation: "Artist",
  },
  {
    name: "KVS",
    designation: "UI Developer",
  },
  {
    name: "Jake2482",
    designation: "Community Manager",
  },
  {
    name: "Salvucci",
    designation: "Community Manager",
  },
  {
    name: "Herren",
    designation: "Collabs Manager",
  },
  {
    name: "Sir Bertoli",
    designation: "Collabs Manager",
  },
  {
    name: "Gimbowski",
    designation: "Collabs Manager",
  },
];

const members = memberImages.map((image, index) => ({
  image,
  name: memberNames[index].name,
  designation: memberNames[index].designation,
}));

// console.log(members);

const Home = () => {
  const {
    isFirstTime,
    setIsFirstTime,
    setLoading,
    setSlideNo,
    slideNo,
    setTranslationWiseSlideNo,
    currentTranslation,
    setCurrentTranslation,
    horizontalSliderRef,
  } = useContext(GlobalContext);
  const containerRef = useRef(null);
  const [sliderEndPoint, setSliderEndPoint] = useState(0);

  const [isPaused, setIsPaused] = useState(false);
  const [isFirstTImeScrolled, setIsFirstTImeScrolled] = useState(true);
  const [isLastTimeScrolled, setIsLastTimeScrolled] = useState(false);
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

    const translationWiseSlideNo = Array.from(
      { length: sliderCount },
      (_, index) => {
        return endPoint - 100 * index;
      }
    );
    setTranslationWiseSlideNo(translationWiseSlideNo);
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
    rectangle.classList.remove(styles.rectangleAnimationRevert);
    rectangle.classList.add(styles.rectangleAnimation);
  }
  function revertRectangleAnimation() {
    const rectangle = document.querySelector(".rectangle");
    rectangle.classList.remove(styles.rectangleAnimation);
    rectangle.classList.add(styles.rectangleAnimationRevert);
  }

  useEffect(() => {
    console.log({ isFirstTImeScrolled, isLastTimeScrolled });
  });

  function scrollHorizontallyWhenVerticalScroll(e, navigationThroughLink) {
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
        console.log("HOLA FIRST TIME");
        setTimeout(() => {
          setIsPaused(false);
        }, 1500);
        setIsFirstTImeScrolled(false);
        setIsLastTimeScrolled(true);
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
      if (newTranslation > sliderEndPoint && isLastTimeScrolled) {
        revertRectangleAnimation();
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
        }, 1500);
        setIsLastTimeScrolled(false);
        setIsFirstTImeScrolled(true);
        return;
      }
      if (newTranslation > sliderEndPoint) {
        return;
      }
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
      horizontalSliderRef.current.addEventListener("wheel", handleParentScroll);
    } else {
      horizontalSliderRef.current.attachEvent(
        "onmousewheel",
        handleParentScroll
      );
      horizontalSliderRef.current.attachEvent("wheel", handleParentScroll);
    }
    return () => {
      if (horizontalSliderRef) {
        horizontalSliderRef.current.removeEventListener(
          "mousewheel",
          handleParentScroll
        );
        horizontalSliderRef.current.removeEventListener(
          "wheel",
          handleParentScroll
        );
      } else {
        horizontalSliderRef.current.detachEvent(
          "onmousewheel",
          handleParentScroll
        );
        horizontalSliderRef.current.detachEvent("wheel", handleParentScroll);
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

  function handleScrollButton(direction) {
    if (direction === "right") {
      const newTranslation = currentTranslation - 100;
      setCurrentTranslation(newTranslation);
      setSlideNo(slideNo + 1);
      horizontalSliderRef.current.style.transform = `translate(${newTranslation}vw,0)`;
    } else {
      const newTranslation = currentTranslation + 100;
      setCurrentTranslation(newTranslation);
      setSlideNo(slideNo - 1);
      horizontalSliderRef.current.style.transform = `translate(${newTranslation}vw,0)`;
    }
  }

  return (
    <MainLayout navbar={{ isFirstTime }}>
      {isFirstTime || (
        <button
          onClick={() => handleScrollButton("left")}
          className={
            currentTranslation === sliderEndPoint
              ? clsx(styles.scrollButton, styles.left, styles.invisible)
              : clsx(styles.scrollButton, styles.left)
          }
        >
          {"<"}
        </button>
      )}
      {isFirstTime || slideNo === 1 || (
        <button
          onClick={() => handleScrollButton("right")}
          className={
            currentTranslation === -sliderEndPoint
              ? clsx(styles.scrollButton, styles.right, styles.invisible)
              : clsx(styles.scrollButton, styles.right)
          }
        >
          {">"}
        </button>
      )}
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
                  <img
                    style={{ marginRight: "1rem" }}
                    src={thunder}
                    alt="Thunder"
                  />
                  <h1 onClick={() => setIsFirstTime(false)}>
                    ENTER THE{" "}
                    <span sy className={styles.yellowText}>
                      {" "}
                      BOROUGH
                    </span>
                  </h1>
                  <img src={thunder} alt="Thunder" />
                </div>
              ) : (
                <>
                  <div className={clsx(styles.rectangle, "rectangle")}>
                    <p>
                      In the mystical and extraordinary lands of{" "}
                      <span style={{ color: "#de105d" }}>Astoria</span>, survive
                      and thrive a group of{" "}
                      <span style={{ color: "#b302ff" }}>bunnies</span> hungry
                      for the Elixir of Immortality. No carrots come close to
                      the delish Elixir. The Elixir sends them into a state of
                      absolute and utter{" "}
                      <span style={{ color: "#0bff03" }}>Euphoria</span>, a high
                      so sweet, they crave it day in and out.
                      <br /> The bunnies fuel the five Isupods in the{" "}
                      <span style={{ color: "#0d00ff" }}>engine room</span> of
                      the Borough. The very same Isupod that{" "}
                      <span style={{ color: "#ff0303" }}>extracts</span>
                      the Elixir from the dark and dingy pits of Astoria. The
                      bunnies are hungry,{" "}
                      <span style={{ color: "#03fffb" }}>five</span> Isupod just
                      won’t cut it. Fret not! There is a heaploads of Isupods{" "}
                      <span style={{ color: "#ff03bc" }}>yet to be</span>{" "}
                      excavated, each one{" "}
                      <span style={{ color: "#0d00ff" }}>amplifying</span> the
                      production of Elixir for the bunnies. There are rumours
                      that a sixth Isupod has already been excavated however{" "}
                      <span style={{ color: "#0bff03" }}>
                        not much is known
                      </span>{" "}
                      about it yet.
                    </p>
                  </div>
                </>
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
              <div className={styles.contentWrapper}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <h1>
                    OUR <span className={styles.yellowText}>TEAM</span>
                  </h1>
                  <h1 className={styles.yellowText}>{">>>"}</h1>
                </div>

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
            </div>
            <div className={styles.backgroundImage}>
              <img className="img-load" src={team} alt="og3" />
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
