import { Categories } from "./get";

const url = "https://comingsoon000-efk.herokuapp.com/";

export const deleteToken = async (): Promise<void> => {
  const token = JSON.parse(localStorage.getItem("token"));
  await fetch(`${url}authorisation?token=${token.token}`, {
    method: "DELETE",
  });
};

export const deleteCategoryFromServer = async (categories: Categories, categoryIndex: number): Promise<void> => {
  const categoryId = categories[categoryIndex].id;
  await fetch(`${url}admin/categories/${categoryId}`, {
    method: "DELETE",
  });
};

export const deleteCardFromServer = async (categoryId: number, cardIndex: number): Promise<void> => {
  await fetch(`${url}admin/categories/${categoryId}/cards/${cardIndex}`, {
    method: "DELETE",
  });
};
