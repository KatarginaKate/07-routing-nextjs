import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface NotesPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function NotesPage({
  params,
}: NotesPageProps) {
  const queryClient = new QueryClient();

  // await params
  const { slug } = await params;

  // category з URL
  const raw = slug?.[0] ?? "";
  const category = raw === "all" ? undefined : raw;

  // SSR defaults
  const page = 1;
  const search = "";

  // prefetch
  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search, category],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search,
        tag: category,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={category} />
    </HydrationBoundary>
  );
}