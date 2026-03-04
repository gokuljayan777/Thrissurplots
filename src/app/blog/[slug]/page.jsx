import BlogArticleClient from "./BlogArticleClient";

// Generate dynamic metadata based on the slug
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const rawTitle = resolvedParams.slug.replace(/-/g, " ");
  const title = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);

  return {
    title: `${title} | Thrissur Plots Blog`,
    description: `Read our latest insights on ${title}, focusing on the real estate market in Thrissur, Kerala.`,
  };
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;

  const title = resolvedParams.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const imageUrl =
    "https://images.unsplash.com/photo-1579589882956-2e8c1ab16cff?q=80&w=2000&auto=format&fit=crop";

  return (
    <BlogArticleClient
      title={title}
      slug={resolvedParams.slug}
      imageUrl={imageUrl}
    />
  );
}
