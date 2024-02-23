export default async function Page({ content }: { content: string | undefined }) {

    return (
        <article className="prose mt-10">
            <div dangerouslySetInnerHTML={{ __html: content || '' }} />
        </article>
    );
}

