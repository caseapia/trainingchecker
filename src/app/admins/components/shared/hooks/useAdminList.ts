import { useEffect, useState } from 'react';
import AdminList from "@/services/AdminService";
import Admin from "@/shared/models/Admin";

interface AdminListState {
  data: Admin[] | null;
  isLoading: boolean;
}

export const useAdminList = (): AdminListState => {
  const [state, setState] = useState<AdminListState>({
    data: null,
    isLoading: true,
  });

  useEffect(() => {
    const getAdmins = async () => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      try {
        const response = await AdminList();
        setState({ data: response, isLoading: false });
      } catch (err) {
        console.error("Failed to fetch admins:", err);
        setState({ data: null, isLoading: false });
      }
    };

    getAdmins();
  }, []);

  return state;
};