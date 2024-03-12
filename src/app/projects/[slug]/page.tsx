import Page from "@/components/Page";
import ProjectHeader from "@/components/ProjectHeader";
import { Project, getAllProjects, getContentBySlug } from "@/repository";
import { Metadata } from "next";

type BlogProps = {
    params: {
        slug: string
    }
}

export async function generateMetadata(
    { params: { slug } }: BlogProps
): Promise<Metadata> {

    const data = await getContentBySlug<Project>("projects", slug)

    return {
        title: data.title,
        description: data.description,
        openGraph: {
            url: `https://lucasmarques.dev/projects/${slug}`,
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

export async function generateStaticParams() {
    const projects = await getAllProjects()

    return projects.map((post) => ({
        slug: post.slug,
    }))
}

export default async function Post({ params: { slug } }: BlogProps) {
    const data = await getContentBySlug<Project>("projects", slug)
    return (
        <>
            <ProjectHeader {...data} />
            <Page  {...data} />
        </>
    );
}

