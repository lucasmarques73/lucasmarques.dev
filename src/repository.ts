import matter from "gray-matter";
import { join } from "path";
import fs from "fs";

import { format } from "date-fns";
import { pt } from "date-fns/locale";
import markdownToHtml from "./mdToHtml";

const postsDirectory = join(process.cwd(), "src/markdown/posts");
const pagesDirectory = join(process.cwd(), "src/markdown/pages");
const projectsDirectory = join(process.cwd(), "src/markdown/projects");

const folderMap = {
  posts: postsDirectory,
  pages: pagesDirectory,
  projects: projectsDirectory,
};

export async function getContentBySlug(folder: string, slug: string) {
  if (!slug) return null;

  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(
    folderMap[folder as keyof typeof folderMap],
    `${realSlug}.md`
  );
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const date = format(new Date(data.date), "dd 'de' MMMM 'de' yyyy", {
    locale: pt,
  });

  return {
    slug: realSlug,
    date: data.date.toString(),
    frontmatter: { ...data, date },
    content: await markdownToHtml(content),
  };
}

export async function getAllPosts() {
  const slugs = fs.readdirSync(postsDirectory);
  const posts = await Promise.all(
    slugs.map(async (slug) => await getContentBySlug("posts", slug))
  );

  return posts.sort((post1, post2) =>
    new Date(post1?.date) > new Date(post2?.date) ? -1 : 1
  );
}
