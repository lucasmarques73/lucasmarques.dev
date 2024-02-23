import Link from "next/link"

export type PostMetadata = {
    slug: string;
    date: string;
    timeToRead: string;
    category: string;
    title: string;
    description: string;
}

export default function PostPreview(postMetadata: PostMetadata) {
    return (
        <div
            className="border border-slate-300 p-4 rounded-md shadow-sm
    bg-white"
        >
            <p className="text-sm text-slate-400">{postMetadata.date}</p>

            <Link href={`/${postMetadata.slug}`}>
                <h2 className=" text-violet-600 hover:underline mb-4">{postMetadata.title}</h2>
            </Link>
            <p className="text-slate-700">{postMetadata.description}</p>
        </div>
    )
}