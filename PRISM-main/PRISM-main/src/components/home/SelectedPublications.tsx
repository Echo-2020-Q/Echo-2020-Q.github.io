'use client';

import Link from 'next/link';
import { Publication } from '@/types/publication';
import { useMessages } from '@/lib/i18n/useMessages';
import PublicationsList from '@/components/publications/PublicationsList';
import type { PublicationPageConfig } from '@/types/page';

interface SelectedPublicationsProps {
    publications: Publication[];
    title?: string;
    enableOnePageMode?: boolean;
}

export default function SelectedPublications({ publications, title, enableOnePageMode = false }: SelectedPublicationsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.selectedPublications;
    const config: PublicationPageConfig = {
        type: 'publication',
        title: resolvedTitle,
        source: ''
    };

    return (
        <PublicationsList
            config={config}
            publications={publications}
            compactHeader
            showControls={false}
            defaultExpandPresentations
            headerAction={
                <Link
                    href={enableOnePageMode ? "/#publications" : "/publications"}
                    prefetch={true}
                    className="shrink-0 rounded text-sm font-medium text-accent transition-all duration-200 hover:bg-accent/10 hover:text-accent-dark hover:shadow-sm"
                >
                    {messages.home.viewAll} →
                </Link>
            }
        />
    );
}
