import { remark } from "remark";
import html from "remark-html";
import headings from "rehype-autolink-headings";
import slug from "rehype-slug";

export default async function markdownToHtml(markdown: any) {
  const result = await remark()
    .use(html)
    .use(slug)
    .use(headings, { behavior: "wrap" })
    .process(markdown);

  return result.toString();
}
