/* eslint-disable @typescript-eslint/no-unused-vars */
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, GitBranch } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Server Component for fetching project data dynamically
export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Actually, we could use dictionaries here, but since this is a server component,
  // we need a mechanism to get the correct language dictionary.
  // We don't have cookies or headers accessible cleanly without more setup, so
  // as a fallback for this demo, we can just load the default 'id' dictionary.
  // A proper Next.js i18n setup uses middleware to rewrite paths (e.g. /en/proyek/...)
  // Since we rely on Context for client-side language, this page needs to be a Client Component!

  return <ProjectDetailClient slug={slug} />;
}

import ProjectDetailClient from "./ProjectDetailClient";
