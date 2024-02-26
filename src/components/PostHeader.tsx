import { Post } from "@/repository";

export default function PostHeader(post: Post) {

    return (
        <div className="mb-14">
            <p className="text-sm text-slate-400">{post.dateFormated} • {post.timeToRead}</p>
            <h1 className="text-4xl font-bold">{post.title}</h1>
            <p className="text-2xl mt-2">{post.description}</p>
        </div>
    )
}