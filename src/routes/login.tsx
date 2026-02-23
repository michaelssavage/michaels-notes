import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/molecules/Button";
import { Page, Panel } from "@/styles/routes/blog.styled";
import styled from "@emotion/styled";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
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
  component: LoginPage,
});

function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginFn({ data: { password } });
      navigate({ to: "/admin" });
    } catch (error) {
      console.error(error);
      setError("Invalid password");
      setPassword("");
    }
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
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Button type="submit" text="Login" disabled={!password} />
          {error && <p data-id="error">{error}</p>}
        </FormStyled>
      </Panel>
    </Page>
  );
}
