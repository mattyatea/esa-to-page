import Link from 'next/link';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { getAllArticles } from '@/lib/db';
import { PublishedArticle } from '@/types/article';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { env } = getCloudflareContext();
  
  // In development, we can't access D1, so return empty array
  if (!env.DB) {
    return (
      <>
        <Header />
        <div className="flex-1 bg-background">
          <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
            <header className="mb-12 md:mb-16 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight animate-fade-in">
                esa Articles
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.1s'}}>
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
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  const articles = await getAllArticles(env.DB);

  return (
    <>
      <Header />
      <div className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
          <header className="mb-12 md:mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight animate-fade-in">
              esa Articles
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.1s'}}>
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
              {articles.map((article, index) => (
                <div 
                  key={article.id} 
                  className="animate-fade-in"
                  style={{animationDelay: `${0.1 + index * 0.05}s`}}
                >
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          )}
        </main>

        </div>
      </div>
      <Footer />
    </>
  );
}

function ArticleCard({ article }: { article: PublishedArticle }) {
  // Extract title from slug (capitalize and replace hyphens)
  const title = article.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <article className="group relative">
      <div className="relative">
        {/* Hover glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-500" />
        
        <Link href={`/${article.slug}`} className="block relative">
          <div className="card-hover bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Card content */}
            <div className="relative p-8 md:p-10">
              {/* Top decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-bold text-card-foreground mb-4 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {title}
                </h2>
                
                <p className="text-muted-foreground mb-6 line-clamp-2">
                  {article.slug}
                </p>
                
                <div className="flex flex-wrap gap-6 text-sm mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <time dateTime={article.created_at} className="group-hover:text-card-foreground transition-colors duration-300">
                      {new Date(article.created_at).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  
                  {article.updated_at !== article.created_at && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="p-1.5 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors duration-300">
                        <svg className="w-4 h-4 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                      <time dateTime={article.updated_at} className="group-hover:text-card-foreground transition-colors duration-300">
                        更新: {new Date(article.updated_at).toLocaleDateString('ja-JP', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-primary font-semibold">
                    <span className="text-lg group-hover:text-primary transition-colors duration-300">記事を読む</span>
                    <div className="relative">
                      <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <svg className="w-5 h-5 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transform translate-x-2 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:rotate-12 transform">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom gradient border */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>
        </Link>
      </div>
    </article>
  );
}