import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import { getNotes } from "@/lib/api";
import NotesFilterClient from "@/app/notes/Notes.client";
import type { ComponentType } from "react";

export default async function NotesByCategory(props: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await props.params;

  const category = slug?.[0] === "all" ? undefined : slug?.[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "filter", category],
    queryFn: () => getNotes(category),
  });

  const Client = NotesFilterClient as ComponentType<{ category?: string }>;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Client category={category} />
    </HydrationBoundary>
  );
}

