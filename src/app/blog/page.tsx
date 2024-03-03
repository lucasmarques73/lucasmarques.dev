import PostPreview from "@/components/PostPreview";
import { getAllPosts } from "@/repository";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Blog | Lucas Marques',
  description: 'Desenvolvedor de Software com conhecimento em diversas linguagens de programação, atualmente com foco no ecossistema Javascript utilizando React e NodeJS.'
}

export default async function Blog() {

  const posts = await getAllPosts()
  return (
    <>
      {
        posts.map((post, i) => (
          <PostPreview
            key={i}
            {...post}
          />
        ))
      }
    </>
  );
}
