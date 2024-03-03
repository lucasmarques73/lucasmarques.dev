import ProjectPreview from "@/components/ProjectPreview";
import { getAllProjects } from "@/repository";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Blog | Lucas Marques',
  description: 'Desenvolvedor de Software com conhecimento em diversas linguagens de programação, atualmente com foco no ecossistema Javascript utilizando React e NodeJS.'
}

export default async function Blog() {

  const projects = await getAllProjects()
  return (
    <>
      {
        projects.map((project, i) => (
          <ProjectPreview
            key={i}
            {...project}
          />
        ))
      }
    </>
  );
}
