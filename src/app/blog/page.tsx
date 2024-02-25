import PostPreview from "@/components/PostPreview";
import { getAllPosts } from "@/repository";

export default async function Blog() {

  const posts = await getAllPosts()
  return (
    <div className="">
      {
        posts.map((post, i) => (
          <PostPreview
            key={i}
            category={post.category}
            date={post.date}
            description={post.description}
            title={post.title}
            slug={post.slug}
            timeToRead={post.timeToRead}
            content={post.content}
          />
        ))
      }
    </div>
  );
}
