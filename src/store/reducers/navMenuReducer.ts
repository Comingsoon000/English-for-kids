export interface INavMenuState {
  openedNavMenu: boolean;
}

export interface INavMenuAction {
  type: "openedNavMenu" | "closedNavMenu";
}

const initialState: INavMenuState = {
  openedNavMenu: false,
};

export const NavMenuReducer = (state: INavMenuState = initialState, action: INavMenuAction): INavMenuState => {
  switch (action.type) {
    case "openedNavMenu":
      return { openedNavMenu: false };
    case "closedNavMenu":
      return { openedNavMenu: true };
    default:
      return state;
  }
};
