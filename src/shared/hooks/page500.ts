import { useRouter } from "next/navigation";
import { toast } from "@/utils/toast";

export const usePage500 = () => {
  const router = useRouter();

  const triggerPage500 = () => {
    toast.error('Ответ от сервера не получен, работаем над перезагрузкой страницы', {
      title: 'Непредвиденная ошибка',
      lifeTime: 10000,
    });
    router.push(window.location.href);
  };

  return triggerPage500;
};
