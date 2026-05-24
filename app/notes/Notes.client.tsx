"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search,
      }),
    placeholderData: (prev) => prev,
  });

  return (
    <div>
      <SearchBox onSearch={setSearch} />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}

      {data && <NoteList notes={data.notes} />}

      {data && data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
