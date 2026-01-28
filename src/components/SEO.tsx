import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title: string;
    description?: string;
    image?: string;
    type?: 'website' | 'article' | 'product';
    date?: string;
    author?: string;
    keywords?: string;
    url?: string;
    schema?: any;
    children?: React.ReactNode;
}

const DEFAULT_TITLE = 'Daru Hunting - Premium Liquor Delivery in Kathmandu';
const DEFAULT_DESCRIPTION = 'Order premium liquor, wine, and beer online in Kathmandu. Fast delivery within 30 minutes. Best prices for genuine alcohol brands in Nepal.';
const DEFAULT_IMAGE = '/og-image.jpg'; // We should ensure this file exists or provided
const SITE_URL = 'https://daruhunting.com'; // Replace with actual domain
const BRAND_NAME = 'Daru Hunting';

export function SEO({
    title,
    description = DEFAULT_DESCRIPTION,
    image = DEFAULT_IMAGE,
    type = 'website',
    date,
    author,
    keywords,
    url,
    schema
}: SEOProps) {
    const { pathname } = useLocation();
    const cannonicalUrl = url || `${SITE_URL}${pathname}`;

    // Construct full image URL if it's a relative path
    const metaImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

    // Structured Data (JSON-LD)
    const schemaOrgJSONLD = [
        {
            '@context': 'http://schema.org',
            '@type': 'WebSite',
            url: SITE_URL,
            name: BRAND_NAME,
            alternateName: 'Daru Hunting Nepal',
        },
        {
            '@context': 'http://schema.org',
            '@type': 'Organization',
            url: SITE_URL,
            logo: `${SITE_URL}/logo.png`,
            name: BRAND_NAME,
            sameAs: [
                'https://www.facebook.com/daruhunting',
                'https://www.instagram.com/daruhunting'
            ],
            contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+977-9800000000',
                contactType: 'customer service',
                areaServed: 'NP',
                availableLanguage: ['en', 'ne']
            }
        },
        // Local Business Schema for Kathmandu focus
        {
            '@context': 'http://schema.org',
            '@type': 'LiquorStore',
            name: BRAND_NAME,
            image: metaImage,
            '@id': SITE_URL,
            url: SITE_URL,
            telephone: '+977-9800000000',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Thamel', // Example address
                addressLocality: 'Kathmandu',
                addressRegion: 'Bagmati',
                postalCode: '44600',
                addressCountry: 'NP'
            },
            geo: {
                '@type': 'GeoCoordinates',
                latitude: 27.7172,
                longitude: 85.3240
            },
            openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday'
                ],
                opens: '10:00',
                closes: '22:00'
            },
            priceRange: '$$',
            areaServed: 'Kathmandu'
        },
        ...(schema ? [schema] : [])
    ];

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title} | {BRAND_NAME}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={cannonicalUrl} />
            <meta name="robots" content="index, follow" />

            {/* Open Graph Tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:url" content={cannonicalUrl} />
            <meta property="og:site_name" content={BRAND_NAME} />
            <meta property="og:locale" content="en_US" />

            {/* Twitter Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={metaImage} />

            {/* Geo Tags for Local SEO */}
            <meta name="geo.region" content="NP-BA" />
            <meta name="geo.placename" content="Kathmandu" />
            <meta name="geo.position" content="27.7172;85.3240" />
            <meta name="ICBM" content="27.7172, 85.3240" />

            {/* Standard Meta Tags */}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#ffffff" />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(schemaOrgJSONLD)}
            </script>
        </Helmet>
    );
}
