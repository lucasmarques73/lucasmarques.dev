import { getContentBySlug } from "@/repository";


export default async function About() {
  const data = await getContentBySlug('pages', 'about')

  return (
    <>
      <h1>Novo Blog</h1>
      <div dangerouslySetInnerHTML={{ __html: data?.content || '' }} />
    </>
  );
}

