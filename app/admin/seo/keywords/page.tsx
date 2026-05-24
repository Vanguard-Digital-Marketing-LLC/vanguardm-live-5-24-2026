import { Metadata } from "next";
import KeywordsExplorer from "@/components/admin/seo/KeywordsExplorer";

export const metadata: Metadata = { title: "Keywords Explorer" };

export default function KeywordsPage() {
  return <KeywordsExplorer />;
}
