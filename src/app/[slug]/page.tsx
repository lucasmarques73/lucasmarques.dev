import Page from "@/components/Page";
import PostHeader from "@/components/PostHeader";
import { Post as PostType, getAllPosts, getContentBySlug } from "@/repository";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type BlogProps = {
    params: {
        slug: string
    }
}

export async function generateMetadata(
    { params: { slug } }: BlogProps
): Promise<Metadata> {

    const data = await getContentBySlug<PostType>("posts", slug)


    if (!data.slug) {
        notFound()
    }

    return {
        title: data.title,
        description: data.description,
        openGraph: {
            url: `https://lucasmarques.dev/${slug}`,
            title: `${data.title} | Lucas Marques`,
            description: data.description,
            images: [
                {
                    url: `https://lucasmarques-dev.vercel.app/api/og?title=${encodeURIComponent(
                        data.title
                    )}`,
                    alt: `${data.title}`
                }
            ]

        }
    }
}

export async function generateStaticParams() {
    const posts = await getAllPosts()

    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export default async function Post({ params: { slug } }: BlogProps) {
    const data = await getContentBySlug<PostType>("posts", slug)
    return (
        <>
            <PostHeader {...data} />
            <Page  {...data} />
        </>
    );
}

