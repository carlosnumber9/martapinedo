import { MetadataRoute } from 'next';
import { GET_POSTS as query } from './blog/queries';
import { apolloClient } from 'utils';
import { Post } from './types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { data: { posts } } = await apolloClient.query({ query });

    const blogPosts = posts.map((post: Post) => ({
        url: `https://tudominio.com/blog/${post.id}`,
        lastModified: post.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: 'https://tudominio.com',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://tudominio.com/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://tudominio.com/blog',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        ...blogPosts,
    ];
}