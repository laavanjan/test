"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CommentsCarouselProps {
  comments: string[][];
}

export function CommentsCarousel({ comments }: CommentsCarouselProps) {
  const perPage = 3;
  const total = comments.length;

  const cloned = [
    ...comments.slice(-perPage),
    ...comments,
    ...comments.slice(0, perPage),
  ];
  const clonedCount = cloned.length;

  const [index, setIndex] = useState(perPage);
  const [animated, setAnimated] = useState(true);

  const goTo = useCallback((i: number, withAnimation = true) => {
    setAnimated(withAnimation);
    setIndex(i);
  }, []);

  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  function handleTransitionEnd() {
    if (index >= total + perPage) {
      goTo(perPage, false);
    } else if (index < perPage) {
      goTo(total + perPage - 1, false);
    }
  }

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const translateX = `-${(index * 100) / perPage}%`;

  return (
    <section className="comments shell">
      <h2 className="comments-title">Kullanıcı Yorumları</h2>
      <div className="comments-carousel">
        <button className="comments-arrow left" onClick={prev} aria-label="Önceki">
          <ChevronLeft size={24} />
        </button>

        <div className="comments-track">
          <div
            className="comments-slider"
            style={{
              transform: `translateX(${translateX})`,
              transition: animated ? "transform 0.8s ease" : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {cloned.map(([name, product, quote], i) => (
              <div className="comment-card-slide" key={i}>
                <article className="comment-card">
                  <div className="comment-stars">★★★★★</div>
                  <p>{quote}</p>
                  <div className="comment-author">
                    <h3>{name}</h3>
                    <span>{product}</span>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <button className="comments-arrow right" onClick={next} aria-label="Sonraki">
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
