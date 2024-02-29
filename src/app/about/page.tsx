import Page from "@/components/Page";
import { getContentBySlug } from "@/repository";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {

  const data = await getContentBySlug('pages', 'about')

  return {
    title: data.title,
    description: data.description,
  }
}

export default async function About() {
  const data = await getContentBySlug('pages', 'about')

  return (
    <Page  {...data} />
  );
}

