"use client";

import { useEffect } from "react";
import hljs from "highlight.js";
import "../app/dracula.css";

type PageProps = {
  content?: string;
};

export default function Page({ content }: PageProps) {
  useEffect(() => {
    hljs.highlightAll();
  }, [content]);

  return (
    <article className="prose max-w-none [&_img]:my-0">
      <div dangerouslySetInnerHTML={{ __html: content || "" }} />
    </article>
  );
}
