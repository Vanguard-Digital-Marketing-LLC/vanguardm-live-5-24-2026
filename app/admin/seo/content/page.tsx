import { Metadata } from "next";
import ContentExplorer from "@/components/admin/seo/ContentExplorer";

export const metadata: Metadata = { title: "Content Explorer" };

export default function ContentPage() {
  return <ContentExplorer />;
}
