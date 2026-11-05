import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/molecules/Button";
import { Page, Panel } from "@/styles/routes/blog.styled";
import styled from "@emotion/styled";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { SubmitEvent, useState } from "react";
import { loginFn } from "../api/auth/login.api";

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 400px;
  gap: 0.5rem;

  button {
    width: fit-content;
  }

  p[data-id="error"] {
    color: var(--color-red);
  }
`;

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context }) => {
    if (context.isAdmin) {
      throw redirect({ to: "/" });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = useMutation({
    mutationFn: (password: string) => loginFn({ data: { password } }),
    onSuccess: () => navigate({ to: "/" }),
    onError: (error) => {
      console.error(error);
      setPassword("");
    },
  });

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!password || login.isPending) return;
    login.mutate(password);
  };

  const handlePasswordChange = (value: string) => {
    // Typing again means the last attempt's error no longer applies.
    if (login.isError) login.reset();
    setPassword(value);
  };

  return (
    <Page>
      <Panel>
        <FormStyled onSubmit={handleSubmit}>
          <label htmlFor="password" className="visually-hidden">
            Password
          </label>
          <TextInput
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            placeholder="Password"
            autoComplete="new-password"
          />
          <Button
            type="submit"
            text={login.isPending ? "Logging in…" : "Login"}
            disabled={!password || login.isPending}
            ariaBusy={login.isPending}
          />
          {login.isError && <p data-id="error">Invalid password</p>}
        </FormStyled>
      </Panel>
    </Page>
  );
}
