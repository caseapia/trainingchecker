"use client"
import React, { useEffect } from "react";
import styles from "./PageWrapper.module.scss";
import Props from "./types";
import { AnimatePresence, motion } from "framer-motion";
import animateVariants from "@/components/pageWrapper/animation";
import { setHash } from "@/utils/hashMounting";
import { metric } from "@/utils/metric";

const PageWrapper = ({ title, children, classname, style }: Props) => {
  useEffect(() => {
    setHash();
  }, []);

  useEffect(() => {
    metric.send(`Page is loaded as ${window.location.href}`, "Success")
  }, []);

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