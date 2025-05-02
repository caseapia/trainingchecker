const Difference = (date: string | number) => {
  const today = new Date();
  const thisDate = new Date(date);

  const diffInTime = today.getTime() - thisDate.getTime();
  return Math.floor(diffInTime / (1000 * 3600 * 24));
}

export default Difference;