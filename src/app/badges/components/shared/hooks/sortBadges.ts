import { allBadges } from "@/shared/constants/badges";

export const sortedBadges = allBadges.sort((a, b) => {
  if (a.category < b.category) return 1;
  if (a.category > b.category) return -1;

  return a.id - b.id;
});