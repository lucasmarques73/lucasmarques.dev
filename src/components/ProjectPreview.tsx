import { Post, Project } from "@/repository"
import Image from "next/image"
import Link from "next/link"

export default function ProjectPreview(project: Project) {
    return (
        <Link href={`/projects/${project.slug}`}>
            <div
                className="border border-black-300 hover:border-2 rounded-md shadow-sm p-4 m-2 flex justify-around gap-5 flex-col sm:flex-row items-center"
            >
                <Image className="rounded-full w-28 h-28" src={project.image} alt={project.description} width={120} height={120} />
                <div className="flex flex-col items-center sm:items-start">
                    <h2 className="mb-4 text-2xl">{project.title}</h2>
                    <p className="text-slate-700">{project.description}</p>
                </div>
            </div >
        </Link>
    )
}