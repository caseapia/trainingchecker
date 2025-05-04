"use client"
import React from "react";
import styles from "./PageWrapper.module.scss";
import Props from "./types";
import { AnimatePresence, motion } from "framer-motion";
import animateVariants from "@/components/pageWrapper/animation";

const PageWrapper = ({ title, children, classname, style }: Props) => {
  return (
    <AnimatePresence>
      <motion.main
        className={`${classname || ""} ${styles.PageWrapper}`}
        style={style}
        variants={animateVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {title && <h1>{title}</h1>}
        {children}
      </motion.main>
    </AnimatePresence>
  )
}

export default PageWrapper;