import React, { useState } from "react";
import "./App.scss";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { screens } from "./data";

const transition = { duration: 1.4, ease: [0.77, 0, 0.18, 1] };

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.075,
      // staggerDirection: 1,
      // staggerDirection: -1,
    },
  },
};

const title = {
  initial: {
    y: 400,
    textShadow: "1px 1px 10px #ccc",
  },
  animate: {
    y: 0,
    transition: { duration: 1, ...transition },
  },
};

const firstText = Array.from("Stagger");
const secondText = Array.from("demo");

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState();

  return (
    <>
      <motion.div initial="initial" animate="animate" className="container">
        <div className="row center top-row">
          <div className="top">
            {/* <motion.div
              // initial={{ opacity: 0, y: 20 }}
              initial
              animate={{
                opacity: 1,
                y: height,
                transition: { delay: 2, ...transition },
              }}
              className="title-example"
            > */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 2, ...transition },
              }}
              className="title-example"
            >
              <p>Framer Motion</p>
              <p>Examples</p>
            </motion.div>
            {/* </motion.div> */}

            <motion.div variants={stagger} className="overflow-text">
              {firstText.map((letter, i) => (
                <motion.span
                  key={i}
                  variants={title}
                  className={i == firstText.length - 1 && "last"}
                >
                  {letter}
                </motion.span>
              ))}

              {secondText.map((letter, i) => (
                <motion.span key={i} variants={title}>
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 2.75, ...transition },
          }}
          className="animate"
          onClick={() => setIsVisible(!isVisible)}
        >
          Show Image
        </motion.button>

        <AnimatePresence>
          {isVisible && (
            <div className="row bottom-row">
              <div className="bottom">
                <motion.div className="image-container-single">
                  <motion.div
                    initial={{
                      height: 0,
                    }}
                    drag="x"
                    dragConstraints={{ left: -100, right: 100 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      width: "100%",
                      height: 300,
                      transition: { delay: 0.5, ...transition },
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    className="thumbnail-single"
                  >
                    <motion.div
                      className="image-container"
                      whileHover="hover"
                      transition={transition}
                    >
                      <motion.img
                        src={require("./images/background.jpg")}
                        alt=""
                        initial={{ scale: 2 }}
                        animate={{
                          scale: 1,
                          y: -350,
                          transition: { delay: 2, ...transition },
                        }}
                        exit={{
                          scale: 2,
                          transition: { ...transition },
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3, ...transition }}
        className="shared-layout"
      >
        <AnimateSharedLayout>
          <ol>
            {screens.map(({ title, color }, i) => (
              <motion.li
                animate
                key={i}
                className={`title ${i === selected && "selected"}`}
                style={{ color: i === selected ? color : "#333" }}
                onClick={() => setSelected(i)}
              >
                {i === selected && (
                  <motion.div
                    // When a new component with a layoutId gets added as another gets removed,
                    // the component will perform a layout animation from previous component.
                    layoutId="underline"
                    className="underline"
                    style={{ backgroundColor: color }}
                  />
                )}
                {title}
              </motion.li>
            ))}
          </ol>
        </AnimateSharedLayout>
      </motion.div>
    </>
  );
}

export default App;
