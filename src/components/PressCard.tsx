import Image from "next/image";
import Link from "next/link";
import type { PressArticle } from "@/data/press-articles";

interface PressCardProps {
  article: PressArticle;
}

export function PressCard({ article }: PressCardProps) {
  return (
    <article className="press-card">
      <div className="press-card-image">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="press-image"
        />
      </div>
      <div className="press-card-body">
        <span className="press-category">{article.category}</span>
        <h3 className="press-title">{article.title}</h3>
        <time className="press-date">{article.date}</time>
        <p className="press-excerpt">{article.excerpt}</p>
        <Link href={article.link} className="press-read-more">
          Devamını Oku
        </Link>
      </div>
    </article>
  );
}
