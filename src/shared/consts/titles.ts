interface TitlesInterface {
  page: string;
  title: string;
}

export const titles: TitlesInterface[] = [
  {
    page: "/",
    title: "TRAINING CHECKER",
  },
  {
    page: "/players",
    title: "Игроки в сети",
  },
  {
    page: "/admins",
    title: "Список администраторов",
  },
  {
    page: "/badges",
    title: "Список значков",
  },
  {
    page: "/copchase",
    title: "Мониторинг копчейза",
  },
  {
    page: "/worldlist",
    title: "Список миров",
  },
]

export default titles;