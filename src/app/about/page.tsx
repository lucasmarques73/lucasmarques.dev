import Page from "@/components/Page";
import { Page as PageType, getContentBySlug } from "@/repository";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {

  const data = await getContentBySlug<PageType>('pages', 'about')

  return {
    title: data.title,
    description: data.description,
  }
}

export default async function About() {
  const data = await getContentBySlug<PageType>('pages', 'about')

  return (
    <Page  {...data} />
  );
}

