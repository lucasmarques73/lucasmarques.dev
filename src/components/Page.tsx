'use client'
import hljs from 'highlight.js';
import '../app/dracula.css';

import { useEffect } from 'react';

export default function Page({ content }: { content: string | undefined }) {
    useEffect(() => {
        hljs.initHighlighting();
    }, [content]);
    return (
        <article className="prose">
            <div dangerouslySetInnerHTML={{ __html: content || '' }} />
        </article>
    );
}

