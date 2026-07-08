import PostPreview from "@/components/PostPreview";
import { getAllPosts } from "@/repository";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Lucas Marques",
  description:
    "Software Engineer with experience in several programming languages, currently focused on the JavaScript ecosystem using React and Node.js.",
  openGraph: {
    url: `https://lucasmarques.dev/`,
    title: "Blog | Lucas Marques",
    description:
      "Software Engineer with experience in several programming languages, currently focused on the JavaScript ecosystem using React and Node.js.",
    images: [
      {
        url: `https://lucasmarques-dev.vercel.app/api/og?title=${encodeURIComponent(
          "Blog | Lucas Marques",
        )}`,
        alt: "Software Engineer with experience in several programming languages, currently focused on the JavaScript ecosystem using React and Node.js.",
      },
    ],
  },
};

export default async function Blog() {
  const posts = await getAllPosts();
  return (
    <>
      <div className="border border-amber-200 bg-amber-50 text-amber-900 rounded-md p-4 m-2">
        Blog posts are currently published in Brazilian Portuguese (PT-BR).
      </div>
      {posts.map((post, i) => (
        <PostPreview key={i} {...post} />
      ))}
    </>
  );
}
