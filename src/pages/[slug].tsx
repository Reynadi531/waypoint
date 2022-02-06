import { Heading } from "@chakra-ui/react";

import { supabase } from "lib/helper/supabase";
import type { IUrl } from "lib/types/IUrl";

function SlugPage() {
  return <Heading>Slug not found</Heading>;
}

export interface IGetServerSideProps {
  params: IUrl;
}

export async function getServerSideProps({ params }: IGetServerSideProps) {
  const { slug } = params;
  const { data } = await supabase
    .from("urls")
    .select("real_url,slug,hit")
    .eq("slug", slug)
    .single();

  if (data && data.real_url) {
    // update hit field for a simple stats
    await supabase
      .from("urls")
      .update({ hit: data.hit + 1 })
      .match({ slug });

    return {
      redirect: {
        destination: data.real_url,
        permanent: false,
      },
    };
  }

  return {
    props: {},
    notFound: true,
  };
}

export default SlugPage;
