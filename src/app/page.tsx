import Page from "@/components/Page";
import { getContentBySlug } from "@/repository";


export default async function Home() {
  const data = await getContentBySlug('pages', 'home')

  return (
    <Page content={data?.content} />
  );
}

