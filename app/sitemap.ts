import { MetadataRoute } from 'next';
import { GET_POSTS as query } from './blog/queries';
import { apolloClient } from 'utils';
import { Post } from './types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { data: { posts } } = await apolloClient.query({ query });

    const blogPosts = posts.map((post: Post) => ({
        url: `https://martapinedoabogada.es/blog/${post.id}`,
        lastModified: post.lastModificationDate ? new Date(post.lastModificationDate) : new Date(),
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
}