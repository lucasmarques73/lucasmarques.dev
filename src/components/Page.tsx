'use client'
import hljs from 'highlight.js';
import '../app/dracula.css';

import { useEffect } from 'react';

export default function Page({ content }: { content: string | undefined }) {
    useEffect(() => {
        hljs.highlightAll();
    }, [content]);
    return (
        <article className="prose">
            <div dangerouslySetInnerHTML={{ __html: content || '' }} />
        </article>
    );
}

