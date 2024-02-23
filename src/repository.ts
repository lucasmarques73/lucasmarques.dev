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
  date: string;
  content: string;
  timeToRead: string;
  frontmatter: {
    date: string;
    title: string;
    description: string;
    category: string;
  };
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

  const date = format(new Date(data.date), "dd 'de' MMMM 'de' yyyy", {
    locale: pt,
  });

  return {
    slug: realSlug,
    date: data.date.toString(),
    timeToRead: timeToRead(content),
    frontmatter: {
      date,
      category: data.category,
      description: data.description,
      title: data.title,
    },
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
