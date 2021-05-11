export const loadState = (): any => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return {};
    }
    const parsed = JSON.parse(serializedState);

    return parsed;
  } catch (err) {
    return {};
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const saveState = (state: any): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    // TODO: Logging
  }
};
