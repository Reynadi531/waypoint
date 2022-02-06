import useSWR from "swr";

import { fetcherWithAuth } from "lib/helper/fetcher";
import type { IUser } from "lib/types/IUser";

function useUser() {
  const { data, error } = useSWR("/api/auth/is-authenticated", fetcherWithAuth);

  const injectedData: IUser = data;
  const isLoading = !error && !data;
  const isLogin = !isLoading && data && data.isLogin;
  const isErrorData = !isLoading && data && data.error && data.error.message;

  return {
    data: isLogin ? injectedData : null,
    isLoading,
    isError: Boolean(error || isErrorData),
  };
}

export default useUser;
