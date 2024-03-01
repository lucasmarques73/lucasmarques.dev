import Page from "@/components/Page";
import PostHeader from "@/components/PostHeader";
import { getAllPosts, getContentBySlug } from "@/repository";
import { Metadata } from "next";

type BlogProps = {
    params: {
        slug: string
    }
}

export async function generateMetadata(
    { params: { slug } }: BlogProps
): Promise<Metadata> {

    const data = await getContentBySlug("posts", slug)

    return {
        title: data.title,
        description: data.description,
    }
}

export async function generateStaticParams() {
    const posts = await getAllPosts()

    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export default async function Post({ params: { slug } }: BlogProps) {
    const data = await getContentBySlug("posts", slug)
    return (
        <>
            <PostHeader {...data} />
            <Page  {...data} />
        </>
    );
}

