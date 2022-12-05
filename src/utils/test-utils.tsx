import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../store";
import { BrowserRouter } from "react-router-dom";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
// interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
//   preloadedState?: PreloadedState<RootState>;
//   store?: AppStore;
// }

export function renderWithProviders(
  ui: React.ReactElement,
  initState = {},
  // Automatically create a store instance if no store was passed in
  store = createStore(rootReducer, initState, applyMiddleware(thunk)),
  ...renderOptions: any
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  function Wrapper({ children }: React.PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
