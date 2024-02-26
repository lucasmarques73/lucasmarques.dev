import { Post } from "@/repository"
import Link from "next/link"

export default function PostPreview(post: Post) {
    return (
        <Link href={`/${post.slug}`}>
            <div
                className="border border-black-300 rounded-md shadow-sm p-4 m-2"
            >
                <p className="text-sm text-slate-400">{post.dateFormated} • {post.timeToRead}</p>
                <h2 className="mb-4 text-2xl hover:underline">{post.title}</h2>
                <p className="text-slate-700">{post.description}</p>
            </div >
        </Link>
    )
}