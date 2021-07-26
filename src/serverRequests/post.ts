import { store } from "../store/store";
import { Card, Categories } from "./get";

const url = "https://comingsoon000-efk.herokuapp.com/";

export const authorisation = async (
  login: string,
  pass: string,
  token: string
): Promise<{ _id: string; token: string } | { access: string }> => {
  const body = { name: login, pass, token };
  const response = await fetch(`${url}authorisation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result: { _id: string; token: string } | { access: string } = await response.json();
  return result;
};

const uploadFile = async (files: FileList, format: string) => {
  const formData = new FormData();
  formData.append("file", files[0]);
  formData.append("upload_preset", "English-for-kids");

  const res = await fetch(`https://api.cloudinary.com/v1_1/comingsoon/${format}/upload`, {
    method: "POST",
    body: formData,
  });
  const jsonRes = await res.json();
  return jsonRes.secure_url;
};

export const createNewCategory = async (categoryId: number, name: string): Promise<Categories> => {
  const cards: Card[] = [];
  const body = { category: name, cards };
  const response = await fetch(`${url}admin/categories/${categoryId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const newCategory = await response.json();
  return newCategory;
};

export const createNewCard = async (id: number, categoryId: number): Promise<Categories> => {
  const { word, translation, audioSrc, image } = store.getState().createdFile;
  const newWord = word !== "" ? word : "New word";
  const newTranslation = translation !== "" ? translation : "Новое слово";
  const newSoundSrc =
    audioSrc !== ""
      ? await uploadFile(<FileList>audioSrc, "video")
      : "https://res.cloudinary.com/comingsoon/video/upload/v1626609923/caifnto5apkoc3g0eojg.mp3";
  const newImgSrc =
    image !== ""
      ? await uploadFile(<FileList>image, "image")
      : "https://res.cloudinary.com/comingsoon/image/upload/v1626609065/ghrpfcrwgfqqyrgb6rkj.svg";
  const body = { id, word: newWord, translation: newTranslation, image: newImgSrc, audioSrc: newSoundSrc };
  const response = await fetch(`${url}admin/categories/${categoryId}/cards/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const newCategory = await response.json();
  return newCategory;
};
