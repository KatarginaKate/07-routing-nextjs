import { fetchNoteById } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";

interface NoteModalPageProps {
  params: {
    id: string;
  };
}

export default async function NoteModalPage({
  params,
}: NoteModalPageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary
      state={dehydrate(queryClient)}
    >
      <Modal>
        <NotePreview id={id} />
      </Modal>
    </HydrationBoundary>
  );
}