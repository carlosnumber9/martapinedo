import { MetadataRoute } from 'next';
import { GET_POSTS as query } from './blog/queries';
import { apolloClient } from 'utils';
import { Post } from './types';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        const { data } = await apolloClient.query({
            query,
            variables: { locale: 'es' }
        });

        const blogPosts = data.posts.map((post: Post) => ({
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