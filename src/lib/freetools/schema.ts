// JSON-LD-Helfer für die Free-Tool-Seiten (GründerX hat keine zentralen
// structuredData-Utils – daher hier lokal). Ausgabe = an <Seo jsonLd={...}/>.

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const howToSchema = (
  name: string,
  description: string,
  steps: { name: string; text: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name,
  description,
  totalTime: "PT3M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" },
  step: steps.map((st, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: st.name,
    text: st.text,
  })),
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: it.url,
  })),
});

export const serviceSchema = (name: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  provider: { "@type": "Organization", name: "GründerX" },
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
});
