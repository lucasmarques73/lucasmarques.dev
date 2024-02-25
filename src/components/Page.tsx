export default async function Page({ content }: { content: string | undefined }) {

    return (
        <article className="prose">
            <div dangerouslySetInnerHTML={{ __html: content || '' }} />
        </article>
    );
}

