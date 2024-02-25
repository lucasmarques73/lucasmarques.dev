import Page from "@/components/Page";
import PostHeader from "@/components/PostHeader";
import { getContentBySlug } from "@/repository";

type BlogProps = {
    params: {
        slug: string
    }
}

export default async function Post({ params: { slug } }: BlogProps) {
    const data = await getContentBySlug("posts", slug)
    return (
        <>
            <PostHeader {...data} />
            <Page content={data.content} />
        </>
    );
}

