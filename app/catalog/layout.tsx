import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalog | Travel Trucks",
  description:
    "Browse our wide range of camper trucks for your next adventure.",
  openGraph: {
    title: "Travel Trucks Catalog",
    description: "Find the perfect camper for your trip.",
    images: ["/hero.png"],
  },
};

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
