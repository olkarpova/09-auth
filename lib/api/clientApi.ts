// lib/api/clientApi.ts — для функцій, які викликаються у 
// клієнтських компонентах:

// fetchNotes +
// fetchNoteById +
// createNote +
// deleteNote +
// register +
// login +
// logout +
// checkSession +
// getMe +
// updateMe
import {nextServer} from "./api"
import type { Note, NoteTag } from "../../types/note";
import type { User } from "../../types/user"

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number = 1,
  search?: string,
  perPage: number = 12,
  tag?: string | NoteTag
): Promise<FetchNotesResponse> => {
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
    "/notes", { params });
  console.log(response.data)
  return response.data;
  };

// =====Функція для створення нотатки====

export type NewNoteData = {
  title: string;
  content: string;
  tag: string;
};

export const createNote = async (
  noteData: NewNoteData): Promise<Note> => {
  const response = await nextServer.post<Note>(
    "/notes", noteData);
  return response.data;
};
// ============// Функція для видалення нотатки

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(
      // `https://notehub-public.goit.study/api/notes/${id}`
      `/notes/${id}`);
  return response.data;
};
// ==функція для отримання деталей однієї нотатки за її id.=======
export const fetchNoteById = async (id: Note['id']) => {
  const {data} = await nextServer.get<Note>(
    `/notes/${id}`);
    return data;
}
//==================register POST-запит ===================

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export type UpdateUserRequest = {
  username?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  console.log('🍪 Cookies:', document.cookie)
    const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};
