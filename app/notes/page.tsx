// app/notes/page.tsx — SERVER COMPONENT

import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Prefetch першої сторінки нотаток
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: "",
      }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient />
    </HydrationBoundary>
  );
}
