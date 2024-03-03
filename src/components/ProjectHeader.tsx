import { Project } from "@/repository";
import Image from "next/image";

export default function ProjectHeader(project: Project) {

    return (
        <div className="mb-14">
            <h1 className="text-4xl font-bold">{project.title}</h1>
            <p className="text-2xl mt-2">{project.description}</p>
        </div>
    )
}