import Page from "@/components/Page";
import { Page as PageType, getContentBySlug } from "@/repository";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {

  const data = await getContentBySlug<PageType>('pages', 'home')

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      url: `https://lucasmarques.dev/`,
      title: `${data.title} | Lucas Marques`,
      description: data.description,
      images: [
        {
          url: `https://lucasmarques-dev.vercel.app/api/og?title=${encodeURIComponent(
            data.title
          )}`,
          alt: `${data.title}`
        }
      ]
    }
  }
}

export default async function Home() {
  const data = await getContentBySlug<PageType>('pages', 'home')

  return (
    <Page  {...data} />
  );
}

