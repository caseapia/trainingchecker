"use client"
import React, { useEffect } from "react";
import styles from "./PageWrapper.module.scss";
import Props from "./types";
import { AnimatePresence, motion } from "framer-motion";
import animateVariants from "@/shared/layouts/pageWrapper/animation";
import { setHash } from "@/utils/hashMounting";

const PageWrapper = ({ title, children, classname, style }: Props) => {
  useEffect(() => {
    setHash();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.main
        className={`${classname || ""} ${styles.PageWrapper}`}
        style={style}
        variants={animateVariants}
        initial="initial"
        animate="animate"
      >
        {title && <h1>{title}</h1>}
        {children}
      </motion.main>
    </AnimatePresence>
  )
}

export default PageWrapper;