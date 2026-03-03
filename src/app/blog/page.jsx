import { BlogPageContent } from "./BlogClientComponents";

export const metadata = {
  title: "Market Insights & Guides | Thrissur Plots Blog",
  description:
    "Stay updated with the latest real estate trends, investment guides, and property market analysis in Thrissur, Kerala — expert-authored intelligence for discerning investors.",
};

export default function BlogListingPage() {
  return (
    <div className="flex flex-col w-full bg-primary text-text-main font-sans transition-colors duration-300">
      <BlogPageContent />
    </div>
  );
}
