import { Metadata } from "next";
import SocialMediaManager from "@/components/admin/seo/SocialMediaManager";

export const metadata: Metadata = { title: "Social Media Manager" };

export default function SocialPage() {
  return <SocialMediaManager />;
}
