export const animationWrapper = {
  initial: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    overflow: "hidden",
    transition: { duration: 0.3 }
  },
  animate: {
    opacity: 1,
    height: "auto",
    marginTop: 6,
    overflow: "hidden",
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    overflow: "hidden",
    transition: { duration: 0.3 }
  }
};
