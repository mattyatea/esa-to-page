import Link from 'next/link';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { getAllArticles } from '@/lib/db';
import { PublishedArticle } from '@/types/article';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { env } = getCloudflareContext();
  
  // In development, we can't access D1, so return empty array
  if (!env.DB) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
          <header className="mb-12 md:mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              esa Articles
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              esaから公開されている記事の一覧です
            </p>
          </header>
          <main>
            <div className="bg-card rounded-xl shadow-lg border border-border p-8 md:p-12 text-center">
              <div className="max-w-md mx-auto">
                <svg className="w-16 h-16 mx-auto mb-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-muted-foreground text-lg">
                  開発環境ではデータベースに接続できません
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  プレビューモード（<code className="bg-secondary px-2 py-1 rounded text-secondary-foreground font-mono text-xs">pnpm run preview</code>）を使用してください
                </p>
              </div>
            </div>
          </main>
          <footer className="mt-16 md:mt-20 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">Powered by esa to page</p>
          </footer>
        </div>
      </div>
    );
  }
  
  const articles = await getAllArticles(env.DB);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <header className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            esa Articles
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            esaから公開されている記事の一覧です
          </p>
        </header>

        <main>
          {articles.length === 0 ? (
            <div className="bg-card rounded-xl shadow-lg border border-border p-8 md:p-12 text-center">
              <div className="max-w-md mx-auto">
                <svg className="w-16 h-16 mx-auto mb-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="text-muted-foreground text-lg">
                  まだ公開されている記事はありません
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:gap-8">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </main>

        <footer className="mt-16 md:mt-20 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">Powered by esa to page</p>
        </footer>
      </div>
    </div>
  );
}

function ArticleCard({ article }: { article: PublishedArticle }) {
  return (
    <article className="group bg-card rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-border overflow-hidden">
      <Link href={`/${article.slug}`} className="block">
        <div className="p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {article.slug}
          </h2>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
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
          <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
            <span>記事を読む</span>
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      </Link>
    </article>
  );
}