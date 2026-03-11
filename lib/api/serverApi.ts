// lib/api/serverApi.ts — для функцій, які викликаються 
// у серверних компонентах 
// (до params потрібно додавати cookeis у headers):

// fetchNotes +
// fetchNoteById +
// getMe = getServeMe +
// checkSession
import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";
import  type { Note, NoteTag }  from "../../types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
// axios.defaults.baseURL = 'http://localhost:3000/api'


export const fetchNotes = async (
  page: number = 1,
  search?: string,
  perPage: number = 12,
  tag?: string | NoteTag
): Promise<FetchNotesResponse> => {
    const cookieStore = await cookies();
  const params: {
    page: number;
    perPage: number;
    search?: string;
    tag?: string | NoteTag;
  } = { page, perPage, ...(search?.trim() && { search: search.trim() }) };
  
  if (tag && tag !== 'all') {
    params.tag = tag;
  }
  const response = await nextServer.get<FetchNotesResponse>(
      "/notes", {
          params,
          headers: { Cookie: cookieStore.toString() } // ← cookies вручну
      }
  );
  console.log(response.data)
  return response.data;
  };


// ==функція для отримання деталей однієї нотатки за її id.=======
export const fetchNoteById = async (id: Note['id']) => {
  const {data} = await nextServer.get<Note>(
    `/notes/${id}`);
    return data;
}

export const getServerMe = async (): Promise<User> => {
    const cookieStore = await cookies();
    const {data} = await nextServer.get("/users/me", {
        headers: {
            Cookie: cookieStore.toString()
        },
    });
    return data;
}
export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};