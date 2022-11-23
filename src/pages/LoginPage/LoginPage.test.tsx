import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from ".";
import { renderWithProviders } from "__test__/utils/test-utils";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { store } from "store";
import * as actions from "../../store/actions/authActions";
import { faker } from "@faker-js/faker";

const buildLoginData = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

describe("login validation", () => {
  test("empty input", async () => {
    renderWithProviders(<LoginPage />, { auth: { token: null } });

    await userEvent.click(screen.getByRole("button", { name: /LOGIN/i }));
    console.log(screen.getByRole("button", { name: /login/i }));
    console.log(screen.getByRole("button", { name: /LOGIN/i }));
    console.log(screen.debug());

    expect(screen.getByText(/no email provided./i)).toBeInTheDocument();
    expect(screen.getByText(/no password provided./i)).toBeInTheDocument();
  });

  //   test("login with wrong format email and password", async () => {
  //     renderWithProviders(<LoginPage />, { user: { isLoggedIn: false } });

  //     const data = {
  //       email: "wrongEmailFormat",
  //       password: "123",
  //     };

  //     await userEvent.type(screen.getByPlaceholderText(/email/i), data.email);
  //     await userEvent.type(
  //       screen.getByPlaceholderText(/password/i),
  //       data.password
  //     );

  //     await userEvent.click(screen.getByRole("button", { name: /login/i }));

  //     expect(screen.getByText(/email is invalid/i)).toBeInTheDocument();
  //     expect(
  //       screen.getByText(/password should be at least 6 characters/i)
  //     ).toBeInTheDocument();
  //   });

  //   test("login with email longer than 30 characters", async () => {
  //     renderWithProviders(<Login />, { user: { isLoggedIn: false } });

  //     const data = {
  //       email: Array(30).fill("a") + "@gmail.com",
  //       password: "123456",
  //     };

  //     await userEvent.type(screen.getByPlaceholderText(/email/i), data.email);
  //     await userEvent.type(
  //       screen.getByPlaceholderText(/password/i),
  //       data.password
  //     );

  //     await userEvent.click(screen.getByRole("button", { name: /login/i }));

  //     expect(
  //       screen.getByText(/maximum length of email is 30 characters/i)
  //     ).toBeInTheDocument();
  //   });
});

describe("login with API call to mock server", () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const server = setupServer(
    rest.post<{ email: string; password: string }>(
      `${process.env.REACT_APP_BASE_URL}/auth`,
      (req, res, ctx) => {
        const { password, email } = req.body;

        if (!email)
          return res(
            ctx.status(401),
            ctx.json({ message: "No email provided" })
          );

        if (!password)
          return res(
            ctx.status(401),
            ctx.json({ message: "No password provided" })
          );
        return res(
          ctx.status(200),
          ctx.json({
            access_token: "123456789",
          })
        );
      }
    )
  );

  test.only("login successfully", async () => {
    renderWithProviders(<LoginPage />, undefined, store);
    const signInSpy = jest.spyOn(actions, "signIn");

    const { email, password } = buildLoginData();
    await userEvent.type(screen.getByPlaceholderText(/email/i), email);
    await userEvent.type(screen.getByPlaceholderText(/password/i), password);

    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /login/i })
      ).toBeInTheDocument();
    });

    expect(signInSpy).toBeCalledTimes(1);
    expect(signInSpy).toBeCalledWith({ email, password });

    // expect(fetchUserDataSpy).toBeCalledTimes(1);

    const pathName = window.location.pathname;
    expect(pathName).toBe("/");

    signInSpy.mockRestore();
  });
});
