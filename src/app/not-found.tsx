import Page from "@/components/Page";
import { getContentBySlug } from "@/repository";


export default async function NotFound() {
    const data = await getContentBySlug('pages', '404')

    return (
        <Page content={data.content} />
    );
}

