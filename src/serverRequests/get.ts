export type Categories = {
  id?: number;
  _id?: number;
  category?: string;
  cards?: {
    id?: number;
    _id?: number;
    word?: string;
    translation?: string;
    image?: string;
    audioSrc?: string;
  }[];
}[];

export type Category = {
  id?: number;
  _id?: number;
  category?: string;
  cards?: {
    id?: number;
    _id?: number;
    word?: string;
    translation?: string;
    image?: string;
    audioSrc?: string;
  }[];
};

export type Card = {
  id?: number;
  _id?: number;
  word?: string;
  translation?: string;
  image?: string;
  audioSrc?: string;
};

export type Access = {
  access: string;
};

const url = "https://comingsoon000-efk.herokuapp.com/";

export const getGameCategories = async (): Promise<Categories> => {
  const response = await fetch(`${url}`);
  const result = response.json();
  return result;
};

export const getCategories = async (): Promise<[Categories | Access, number]> => {
  const token = JSON.parse(localStorage.getItem("token"));
  const response = await fetch(`${url}admin/categories?token=${token.token}`);
  const categories = await response.json();
  const count = Number(response.headers.get("X-Total-Count"));
  return [categories, count];
};

export const getCategoriesByPage = async (page: number, limit: number): Promise<[Categories | Access, number]> => {
  const token = JSON.parse(localStorage.getItem("token"));
  const response = await fetch(`${url}admin/categories?page=${page}&limit=${limit}&token=${token.token}`);
  const categories = await response.json();
  const count = Number(response.headers.get("X-Total-Count"));
  return [categories, count];
};

export const getCards = async (categoryNumber: number): Promise<[Card[] | Access, number]> => {
  const token = JSON.parse(localStorage.getItem("token"));
  const response = await fetch(`${url}admin/categories/${categoryNumber}/cards?token=${token.token}`);
  const cards = await response.json();
  const count = Number(response.headers.get("X-Total-Count"));
  return [cards, count];
};

export const getCardByPage = async (
  categoryNumber: number,
  page: number,
  limit: number
): Promise<[Card[] | Access, number]> => {
  const token = JSON.parse(localStorage.getItem("token"));
  const response = await fetch(
    `${url}admin/categories/${categoryNumber}/cards?page=${page}&limit=${limit}&token=${token.token}`
  );
  const cards = await response.json();
  const count = Number(response.headers.get("X-Total-Count"));
  return [cards, count];
};
