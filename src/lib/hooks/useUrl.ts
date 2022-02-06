import useSWR from "swr";

import { fetcherWithAuth } from "lib/helper/fetcher";

function useUrl(id: string) {
  const { data, error } = useSWR(
    id ? `/api/url/get/${id}` : null,
    fetcherWithAuth
  );

  return {
    data: data?.data || [],
    isLoading: !error && !data,
    isError: Boolean(error),
  };
}

export default useUrl;
