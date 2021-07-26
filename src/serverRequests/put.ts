import { store } from "../store/store";
import { Categories } from "./get";

const url = "https://comingsoon000-efk.herokuapp.com/";

export const updateCategoryFromServer = async (categories: Categories, categoryIndex: number): Promise<Categories> => {
  const { categoryName } = store.getState().updatedFile;
  const categoryId = categories[categoryIndex].id;
  const body = { category: categoryName };
  const response = await fetch(`${url}admin/categories/${categoryId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const newCategory = await response.json();
  return newCategory;
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

export const updateCardFromServer = async (categoryId: number, cardIndex: number): Promise<Categories> => {
  const { word, translation, audioSrc, image } = store.getState().updatedFile;

  const newImgSrc =
    image !== ""
      ? await uploadFile(<FileList>image, "image")
      : "https://res.cloudinary.com/comingsoon/image/upload/v1626609065/ghrpfcrwgfqqyrgb6rkj.svg";

  const newSoundSrc =
    audioSrc !== ""
      ? await uploadFile(<FileList>audioSrc, "video")
      : "https://res.cloudinary.com/comingsoon/video/upload/v1626609923/caifnto5apkoc3g0eojg.mp3";

  const body = { word, translation, image: newImgSrc, audioSrc: newSoundSrc };
  const response = await fetch(`${url}admin/categories/${categoryId}/cards/${cardIndex}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const newCategory = await response.json();
  return newCategory;
};
