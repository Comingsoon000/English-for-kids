export interface ICreatedFileState {
  word: string;
  translation: string;
  image: FileList | string;
  audioSrc: FileList | string;
}

export interface ICreatedFileAction {
  type: "createWordInput" | "createTranslationInput" | "createSoundInput" | "createImageInput" | "categoryNameInput";
  word?: string;
  translation?: string;
  image?: FileList | string;
  audioSrc?: FileList | string;
}

const initialState: ICreatedFileState = {
  word: "",
  translation: "",
  image: "",
  audioSrc: "",
};

export const CreatedFileReducer = (
  state: ICreatedFileState = initialState,
  action: ICreatedFileAction
): ICreatedFileState => {
  switch (action.type) {
    case "createWordInput":
      return { ...state, word: action.word };
    case "createTranslationInput":
      return { ...state, translation: action.translation };
    case "createSoundInput":
      return { ...state, audioSrc: action.audioSrc };
    case "createImageInput":
      return { ...state, image: action.image };
    default:
      return state;
  }
};
