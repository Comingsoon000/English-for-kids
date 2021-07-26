export interface IUpdatedFileState {
  word: string;
  translation: string;
  image: FileList | string;
  audioSrc: FileList | string;
  categoryName: string;
}

export interface IUpdatedFileAction {
  type: "updateWordInput" | "updateTranslationInput" | "updateSoundInput" | "updateImageInput" | "categoryNameInput";
  word?: string;
  translation?: string;
  image?: FileList | string;
  audioSrc?: FileList | string;
  categoryName: string;
}

const initialState: IUpdatedFileState = {
  word: "",
  translation: "",
  image: "",
  audioSrc: "",
  categoryName: "",
};

export const UpdatedFileReducer = (
  state: IUpdatedFileState = initialState,
  action: IUpdatedFileAction
): IUpdatedFileState => {
  switch (action.type) {
    case "updateWordInput":
      return { ...state, word: action.word };
    case "updateTranslationInput":
      return { ...state, translation: action.translation };
    case "updateSoundInput":
      return { ...state, audioSrc: action.audioSrc };
    case "updateImageInput":
      return { ...state, image: action.image };
    case "categoryNameInput":
      return { ...state, categoryName: action.categoryName };
    default:
      return state;
  }
};
