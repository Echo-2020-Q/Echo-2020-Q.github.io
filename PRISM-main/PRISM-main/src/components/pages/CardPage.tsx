'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CardPageConfig } from '@/types/page';

const markdownComponents = {
    p: ({ children }: React.ComponentProps<'p'>) => <p className="mb-3 last:mb-0">{children}</p>,
    ul: ({ children }: React.ComponentProps<'ul'>) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
    ol: ({ children }: React.ComponentProps<'ol'>) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
    li: ({ children }: React.ComponentProps<'li'>) => <li className="mb-1">{children}</li>,
    a: ({ ...props }) => (
        <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
        />
    ),
    blockquote: ({ children }: React.ComponentProps<'blockquote'>) => (
        <blockquote className="border-l-4 border-accent/50 pl-4 italic my-4 text-neutral-600 dark:text-neutral-500">
            {children}
        </blockquote>
    ),
    strong: ({ children }: React.ComponentProps<'strong'>) => <strong className="font-semibold text-primary">{children}</strong>,
    em: ({ children }: React.ComponentProps<'em'>) => <em className="italic">{children}</em>,
    code: ({ children }: React.ComponentProps<'code'>) => (
        <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[0.95em]">{children}</code>
    ),
};

interface MarkdownImage {
    alt: string;
    src: string;
}

function extractMarkdownImages(content: string): { images: MarkdownImage[]; rest: string } {
    const imagePattern = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
    const images: MarkdownImage[] = [];

    const rest = content.replace(imagePattern, (_match, alt: string, src: string) => {
        images.push({ alt, src });
        return '';
    }).trim();

    return { images, rest };
}

function ImageCarousel({ images }: { images: MarkdownImage[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentImage = images[currentIndex];
    const hasMultipleImages = images.length > 1;

    const showPrevious = () => {
        setCurrentIndex((index) => (index === 0 ? images.length - 1 : index - 1));
    };

    const showNext = () => {
        setCurrentIndex((index) => (index === images.length - 1 ? 0 : index + 1));
    };

    return (
        <div className="relative mb-3 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
            <div className="relative w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="h-auto w-full object-contain"
                    loading="lazy"
                />
            </div>

            {hasMultipleImages && (
                <>
                    <button
                        type="button"
                        onClick={showPrevious}
                        className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-sm transition hover:bg-white dark:bg-neutral-950/80 dark:hover:bg-neutral-950"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        onClick={showNext}
                        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-sm transition hover:bg-white dark:bg-neutral-950/80 dark:hover:bg-neutral-950"
                        aria-label="Next image"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
                        {images.map((image, index) => (
                            <button
                                key={`${image.src}-${index}`}
                                type="button"
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 w-2 rounded-full transition ${index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'}`}
                                aria-label={`Show image ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

function CardContent({ content, embedded }: { content: string; embedded: boolean }) {
    const { images, rest } = extractMarkdownImages(content);
    const hasCarousel = images.length > 1;

    return (
        <div className={`${embedded ? "text-sm" : "text-base"} text-neutral-600 dark:text-neutral-500 leading-relaxed`}>
            {hasCarousel && <ImageCarousel images={images} />}
            <ReactMarkdown components={markdownComponents}>
                {hasCarousel ? rest : content}
            </ReactMarkdown>
        </div>
    );
}

export default function CardPage({ config, embedded = false }: { config: CardPageConfig; embedded?: boolean }) {
    const sortedItems = config.items
        .map((item, index) => ({ item, index }))
        .sort((a, b) => {
            if (a.item.pinned === b.item.pinned) return a.index - b.index;
            return a.item.pinned ? -1 : 1;
        });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className={embedded ? "mb-4" : "mb-8"}>
                <h1 className={`${embedded ? "text-2xl" : "text-4xl"} font-serif font-bold text-primary mb-4`}>{config.title}</h1>
                {config.description && (
                    <div className={`${embedded ? "text-base" : "text-lg"} text-neutral-600 dark:text-neutral-500 max-w-2xl leading-relaxed`}>
                        <ReactMarkdown components={markdownComponents}>
                            {config.description}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            <div className={`grid ${embedded ? "gap-4" : "gap-6"}`}>
                {sortedItems.map(({ item }, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className={`bg-white dark:bg-neutral-900 ${embedded ? "p-4" : "p-6"} rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all duration-200 hover:scale-[1.01]`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className={`${embedded ? "text-lg" : "text-xl"} font-semibold text-primary`}>{item.title}</h3>
                            {item.date && (
                                <span className="text-sm text-neutral-500 font-medium bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                                    {item.date}
                                </span>
                            )}
                        </div>
                        {item.subtitle && (
                            <p className={`${embedded ? "text-sm" : "text-base"} text-accent font-medium mb-3`}>{item.subtitle}</p>
                        )}
                        {item.content && (
                            <CardContent content={item.content} embedded={embedded} />
                        )}
                        {item.tags && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {item.tags.map(tag => (
                                    <span key={tag} className="text-xs text-neutral-500 bg-neutral-50 dark:bg-neutral-800/50 px-2 py-1 rounded border border-neutral-100 dark:border-neutral-800">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
