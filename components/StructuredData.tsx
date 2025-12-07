export default function StructuredData() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Attorney",
        "name": "Marta Pinedo Sánchez",
        "image": "https://www.martapinedoabogada.es/_next/image?url=%2Fmarta.png&w=828&q=75",
        "@id": "https://www.martapinedoabogada.es",
        "url": "https://www.martapinedoabogada.es",
        "telephone": "+34-676-841-354",
        "email": "martapinedo@icam.es",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Calle Cebreros, 103",
            "addressLocality": "Madrid",
            "postalCode": "28011",
            "addressCountry": "ES"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 40.402056,
            "longitude": -3.754028
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "09:00",
            "closes": "18:00"
        },
        "priceRange": "€€",
        "areaServed": "Madrid",
        "knowsAbout": [
            "Derecho Civil",
            "Derecho Mercantil",
            "Derecho Administrativo"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}