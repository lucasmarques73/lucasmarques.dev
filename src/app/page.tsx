import Page from "@/components/Page";
import { getContentBySlug } from "@/repository";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {

  const data = await getContentBySlug('pages', 'home')

  return {
    title: data.title,
    description: data.description,
  }
}

export default async function Home() {
  const data = await getContentBySlug('pages', 'home')

  return (
    <Page  {...data} />
  );
}

