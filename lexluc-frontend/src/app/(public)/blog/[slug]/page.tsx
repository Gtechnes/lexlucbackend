'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, Loader, Badge } from '@/components/common/UI';
import { blogAPI } from '@/lib/api';
import { sanitizeHtml } from '@/lib/sanitize';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await blogAPI.getBySlug(slug);
        if (!data) {
          setError('Blog post not found');
          return;
        }
        setPost(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load blog post');
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loader />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg">
            <p className="font-semibold">{error || 'Blog post not found'}</p>
            <Link href="/blog" className="text-red-700 hover:text-red-800 underline mt-4 inline-block">
              ← Back to Blog
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="text-blue-300 hover:text-blue-200 mb-4 inline-block">
            ← Back to Blog
          </Link>
          <h1 className="text-4xl font-bold mt-4">{post.title}</h1>
          <div className="flex items-center gap-4 mt-6 text-gray-300">
            {post.category && (
              <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">{post.category.name}</span>
            )}
            <span>
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'Recently published'}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.image && (
            <div className="mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full rounded-lg object-cover max-h-96"
              />
            </div>
          )}

          {post.excerpt && (
            <p className="text-lg text-gray-600 mb-8 italic">{post.excerpt}</p>
          )}

          {/* Rich HTML Content - Safe Rendering */}
          <div
            className="prose prose-lg max-w-none mb-8
              prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-4
              prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-6 prose-h2:mb-3
              prose-h3:text-xl prose-h3:font-bold prose-h3:mt-4 prose-h3:mb-2
              prose-p:mb-4 prose-p:leading-relaxed
              prose-a:text-blue-600 prose-a:hover:text-blue-700
              prose-img:rounded-lg prose-img:max-w-full
              prose-pre:bg-gray-800 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg
              prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic
              prose-ul:list-disc prose-ul:ml-6
              prose-ol:list-decimal prose-ol:ml-6
              prose-li:mb-2"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(post.content),
            }}
          />

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/blog"
              className="inline-block text-blue-600 hover:text-blue-700 font-semibold"
            >
              ← Back to All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Metadata */}
      {post.metaTitle && (
        <title>{post.metaTitle}</title>
      )}
      {post.metaDescription && (
        <meta name="description" content={post.metaDescription} />
      )}
    </div>
  );
}
