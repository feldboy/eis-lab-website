'use client';

import React from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = "EIS Lab - Ice Cream Innovation",
  description = "Join the EIS Lab family and become part of an innovative ice cream franchise. Discover our unique flavors and franchise opportunities.",
  keywords = "ice cream, franchise, EIS Lab, innovation, desserts, business opportunity",
  image = "/images/og-image.jpg",
  url = "https://eislab.com",
  type = "website"
}) => {
  const siteTitle = "EIS Lab";
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  React.useEffect(() => {
    // Update document title
    document.title = fullTitle;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic Meta Tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'EIS Lab');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'English');
    updateMetaTag('theme-color', '#1E1A4A');
    
    // Open Graph Meta Tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', siteTitle, true);
    
    // Twitter Card Meta Tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Add structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "EIS Lab",
      "description": description,
      "url": url,
      "logo": `${url}/images/logo.png`,
      "sameAs": [
        "https://facebook.com/eislab",
        "https://instagram.com/eislab",
        "https://twitter.com/eislab"
      ]
    });
    document.head.appendChild(script);
  }, [fullTitle, description, keywords, image, url, type]);

  return null;
};

interface SEOProviderProps {
  children: React.ReactNode;
}

export const SEOProvider: React.FC<SEOProviderProps> = ({ children }) => {
  return <>{children}</>;
};
