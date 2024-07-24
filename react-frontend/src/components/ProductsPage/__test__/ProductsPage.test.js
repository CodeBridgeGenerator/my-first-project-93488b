import React from "react";
import { render, screen } from "@testing-library/react";

import ProductsPage from "../ProductsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders products page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProductsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("products-datatable")).toBeInTheDocument();
    expect(screen.getByRole("products-add-button")).toBeInTheDocument();
});
