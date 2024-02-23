import PostPreview from "@/components/PostPreview";
import { getAllPosts } from "@/repository";

export default async function Blog() {

  const posts = await getAllPosts()
  return (
    <>
      {
        posts.map((post, i) => (
          <PostPreview
            key={i}
            category={post.frontmatter.category}
            date={post.frontmatter.date}
            description={post.frontmatter.description}
            title={post.frontmatter.title}
            slug={post.slug}
            timeToRead={post.timeToRead}
          />
        ))
      }
    </>
  );
}
