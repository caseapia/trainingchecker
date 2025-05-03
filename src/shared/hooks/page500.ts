import { useRouter } from "next/navigation";
import { toast } from "@/utils/toast";

export const usePage500 = () => {
  const router = useRouter();

  return () => {
    toast.error("Ответ от сервера не получен, работаем над перезагрузкой страницы", {
      lifeTime: 10000,
    });
    router.push(window.location.href);
  };
};
