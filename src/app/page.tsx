import { getContentBySlug } from "@/repository";


export default async function Home() {
  const data = await getContentBySlug('pages', 'home')

  return (
    <>
      <h1>Novo Blog</h1>
      <div dangerouslySetInnerHTML={{ __html: data?.content || '' }} />
    </>
  );
}

