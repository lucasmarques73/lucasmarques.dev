import Page from "@/components/Page";
import PostHeader from "@/components/PostHeader";
import { getContentBySlug } from "@/repository";
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

export default async function Post({ params: { slug } }: BlogProps) {
    const data = await getContentBySlug("posts", slug)
    return (
        <>
            <PostHeader {...data} />
            <Page  {...data} />
        </>
    );
}

