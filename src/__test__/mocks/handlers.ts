// src/mocks/handlers.js
import { rest } from "msw";

const delay = process.env.NODE_ENV === "test" ? 0 : 1500;

export const handlers = [
  rest.post("http://localhost:5000/auth", (req, res, ctx) => {
    // Persist user's authentication in the session
    // sessionStorage.setItem("is-authenticated", "true");
    // localStorage.setItem("token", "123456789")

    return res(
      ctx.delay(delay),
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({ access_token: "123456789" })
    );
  }),

  //   rest.get("/user", (req, res, ctx) => {
  //     // Check if the user is authenticated in this session
  //     const isAuthenticated = sessionStorage.getItem("is-authenticated");

  //     if (!isAuthenticated) {
  //       // If not authenticated, respond with a 403 error
  //       return res(
  //         ctx.status(403),
  //         ctx.json({
  //           errorMessage: "Not authorized",
  //         })
  //       );
  //     }

  //     // If authenticated, return a mocked user details
  //     return res(
  //       ctx.status(200),
  //       ctx.json({
  //         username: "admin",
  //       })
  //     );
  //   }),
];
