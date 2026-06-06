import { MetadataRoute } from 'next';
import { getSitemapPosts } from './blog/_data/posts';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        const posts = await getSitemapPosts('es');

        const blogPosts = posts.map((post) => ({
            url: `https://martapinedoabogada.es/blog/${post.id}`,
            lastModified: post.lastModificationDate
                ? new Date(post.lastModificationDate)
                : new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

        return [
            {
                url: 'https://www.martapinedoabogada.es',
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 1,
            },
            {
                url: 'https://www.martapinedoabogada.es/blog',
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 0.9,
            },
            ...blogPosts,
        ];
    } catch (err) {
        console.error('Error generating sitemap:', err);
        return [
            {
                url: 'https://www.martapinedoabogada.es',
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 1,
            },
            {
                url: 'https://www.martapinedoabogada.es/blog',
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 0.9,
            },
        ];
    }
}
