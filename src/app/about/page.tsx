import Page from "@/components/Page";
import { getContentBySlug } from "@/repository";


export default async function About() {
  const data = await getContentBySlug('pages', 'about')

  return (
    <Page content={data?.content} />
  );
}

