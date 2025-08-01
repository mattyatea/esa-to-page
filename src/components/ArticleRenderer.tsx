import { EsaPost } from '@/types/esa';
import Image from 'next/image';
import Header from './Header';
import Footer from './Footer';

interface ArticleRendererProps {
  article: EsaPost;
}

export default function ArticleRenderer({ article }: ArticleRendererProps) {
  return (
    <>
      <Header />
      <div className="flex-1 bg-background">
      <article className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <header className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            {article.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            {article.user && (
              <div className="flex items-center gap-2">
                {article.user.icon && (
                  <Image
                    src={article.user.icon}
                    alt={article.user.name || 'User'}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-border"
                  />
                )}
                <span className="font-medium">{article.user.name || 'Unknown'}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time dateTime={article.created_at}>
                {new Date(article.created_at).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            {article.updated_at !== article.created_at && (
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <time dateTime={article.updated_at}>
                  {new Date(article.updated_at).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            )}
          </div>
          {article.category && (
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {article.category}
              </span>
            </div>
          )}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-3 py-1.5 text-xs font-medium text-secondary-foreground bg-secondary rounded-full border border-border hover:bg-accent transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="bg-card rounded-xl p-6 md:p-10 shadow-sm border border-border mb-8">
          <div 
            className="prose prose-lg max-w-none dark:prose-invert
              prose-headings:text-foreground prose-headings:font-bold
              prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary hover:prose-a:text-primary/80 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-code:text-primary prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
              prose-pre:bg-secondary prose-pre:border prose-pre:border-border prose-pre:shadow-inner
              prose-img:rounded-lg prose-img:shadow-lg prose-img:border prose-img:border-border
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
              prose-ul:list-disc prose-ol:list-decimal
              prose-li:text-muted-foreground
              prose-table:border-collapse prose-th:border prose-th:border-border prose-th:p-2 prose-th:bg-secondary
              prose-td:border prose-td:border-border prose-td:p-2"
            dangerouslySetInnerHTML={{ __html: article.body_html }}
          />
        </div>

        <footer className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">Powered by esa to page</p>
        </footer>
      </article>
      </div>
      <Footer showAdminLink={false} />
    </>
  );
}