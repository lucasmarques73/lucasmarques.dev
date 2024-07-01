import { getAllPosts, getAllProjects } from '@/repository'
import { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const projects = await getAllProjects()
    const posts = await getAllPosts()

    const hostName = 'https://lucasmarques.dev'

    const projectsSitemap = projects.map(project => ({
      url: `${hostName}/projects/${project.slug}`
    }))

    const postsSitemap = posts.map(post => ({
      url: `${hostName}/${post.slug}`
    }))

    const pagesSitemap = ['blog', 'projects', 'about'].map(page => ({
      url: `${hostName}/${page}`
    }))

    return [...pagesSitemap,...postsSitemap,...projectsSitemap].map(({url}) => ({
      changeFrequency: 'daily',
      priority: 0.7,
      url
    }))
}