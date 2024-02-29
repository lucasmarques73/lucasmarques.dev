import Page from "@/components/Page";
import { getContentBySlug } from "@/repository";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {

    const data = await getContentBySlug('pages', '404')

    return {
        title: data.title,
        description: data.description,
    }
}

export default async function NotFound() {
    const data = await getContentBySlug('pages', '404')

    return (
        <Page  {...data} />
    );
}

