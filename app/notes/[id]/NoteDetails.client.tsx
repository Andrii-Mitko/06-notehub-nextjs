"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getSingleNote } from "@/lib/api";
import css from "./NoteDetails.module.css";

const NoteDetailsClient = () => {
  const params = useParams();
  const id = params.id as string;

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
  });

  if (isLoading) return <p>Loading...</p>;

  if (error || !note) return <p>Some error...</p>;

  const formattedDate = new Date(
    note.updatedAt || note.createdAt,
  ).toLocaleDateString();

  return (
    <div>
      <h2>{note.title}</h2>

      <p>{note.content}</p>

      <p>{formattedDate}</p>
    </div>
  );
};

export default NoteDetailsClient;
