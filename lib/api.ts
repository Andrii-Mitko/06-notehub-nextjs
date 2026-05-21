import axios from "axios";
import type { Note, NoteTag } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

axios.defaults.headers.common.Authorization = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await axios.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search,
    },
  });

  return data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const { data } = await axios.post<Note>("/notes", noteData);
  return data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(`/notes/${noteId}`);
  return data;
};

export const fetchNoteById = async (id: string) => {
  const res = await fetch(`https://next-v1-notes-api.goit.study/notes/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch note");
  }

  return res.json();
};
