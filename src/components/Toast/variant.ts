export const ToastAnimationPC = {
  initial: {
    x: "-30rem",
    opacity: 0,
    transition: { duration: 0.3 }
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: {
    x: "-30rem",
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

export const ToastAnimationMobile = {
  initial: {
    y: "-10rem",
    transition: { duration: 0.3 }
  },
  animate: {
    y: 0,
    transition: { duration: 0.3 }
  },
  exit: {
    y: "-10rem",
    transition: { duration: 0.3 }
  }
}