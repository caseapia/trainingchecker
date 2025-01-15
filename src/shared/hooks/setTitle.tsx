import {useEffect} from "react";
import {usePathname} from "next/navigation";
import { useSearchParams } from 'next/navigation';

export const setTitle = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    let title: string;
    const pathParts = pathname.split("/");
    const page = pathParts[1];
    const nickname = searchParams.get('nickname');

    switch (page) {
      case "not-found":
        title = 'Страница не найдена';
        break;
      case 'player':
        title = `Player ${nickname}`;
        break;
      case 'players':
        title = 'Players'
        break;
      case 'badges':
        title = 'Badges';
        break;
      case 'worldlist':
        title = 'Worlds';
        break;
      case 'copchase':
        title = 'Copchase monitoring';
        break;
      default:
        title = ''
    }

    if (page === '' ) {
      document.title = 'TRAINING CHECKER';
    } else {
      document.title = `${title} - TRAINING CHECKER`;
    }
  }, [pathname]);
}

export default setTitle;