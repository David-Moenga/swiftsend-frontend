import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import { AuthProvider } from "../auth/AuthContext";

const fetchMock = vi.fn();

vi.stubGlobal("fetch", fetchMock);

const renderLogin = (initialEntry) =>
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<div>home page</div>} />
          <Route path="/wallet" element={<div>wallet page</div>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );

const submitLoginForm = () => {
  const form = screen.getByLabelText(/email address/i).closest("form");
  fireEvent.submit(form);
};

describe("Login page", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    sessionStorage.clear();
  });

  it("renders the email and password sign-in form", () => {
    renderLogin({ pathname: "/login" });

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("signs the user in and returns them to the page they originally requested", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        access: "access-token",
        refresh: "refresh-token",
        user: { email: "ada@example.com", name: "Ada Lovelace" },
        roles: ["individual"],
      }),
    });

    renderLogin({
      pathname: "/login",
      state: { from: { pathname: "/wallet", search: "?tab=send", hash: "#summary" } },
    });

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "ada@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "Strong!pass123" },
    });
    submitLoginForm();

    await waitFor(() => expect(screen.getByText("wallet page")).toBeInTheDocument());

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/api/auth/login/"),
      expect.objectContaining({ method: "POST" }),
    );
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/api/auth/login/"),
      expect.objectContaining({
        body: JSON.stringify({ email: "ada@example.com", password: "Strong!pass123" }),
      }),
    );

    const storedSession = JSON.parse(sessionStorage.getItem("swiftsend.session") || "null");
    expect(storedSession?.authenticated).toBe(true);
    expect(storedSession?.accessToken).toBe("access-token");
    expect(storedSession?.refreshToken).toBe("refresh-token");
    expect(storedSession?.user?.email).toBe("ada@example.com");
  });

  it("shows an error and stays on the login page when credentials are rejected", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ detail: "Invalid email or password." }),
    });

    renderLogin({ pathname: "/login" });

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "ada@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "Wrong!pass123" },
    });
    submitLoginForm();

    await waitFor(() =>
      expect(screen.getByText("Invalid email or password.")).toBeInTheDocument(),
    );

    expect(screen.queryByText("home page")).not.toBeInTheDocument();
    expect(sessionStorage.getItem("swiftsend.session")).toBeNull();
  });
});
