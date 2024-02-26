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

export type Post = {
  slug: string;
  dateFormated: string;
  date: string;
  timeToRead: string;
  category: string;
  title: string;
  description: string;
  content: string;
};

function timeToRead(text: string) {
  const words = text.split(" ");
  const minutes = Math.ceil(words.length / 200);
  return `${minutes} min de leitura`;
}

export async function getContentBySlug(
  folder: string,
  slug: string
): Promise<Post> {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(
    folderMap[folder as keyof typeof folderMap],
    `${realSlug}.md`
  );
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const dateFormated = format(new Date(data.date), "dd 'de' MMMM 'de' yyyy", {
    locale: pt,
  });

  return {
    slug: realSlug,
    dateFormated,
    date: data.date.toString(),
    timeToRead: timeToRead(content),
    category: data.category,
    title: data.title,
    description: data.description,
    content: await markdownToHtml(content),
  };
}

export async function getAllPosts(): Promise<Post[] | []> {
  const slugs = fs.readdirSync(postsDirectory);
  const posts = await Promise.all(
    slugs.map(async (slug) => await getContentBySlug("posts", slug))
  );

  return posts.sort((post1, post2) =>
    new Date(post1?.date || "") > new Date(post2?.date || "") ? -1 : 1
  );
}
