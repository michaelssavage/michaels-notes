import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/molecules/Button";
import { Page } from "@/styles/routes/blog.styled";
import styled from "@emotion/styled";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { loginFn } from "../server/auth/login.api";

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
  margin: 0 auto;

  button {
    width: fit-content;
  }

  p[data-id="error"] {
    color: ${({ theme }) => theme.red};
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
      <FormStyled onSubmit={handleSubmit}>
        <label htmlFor="password" className="visually-hidden">
          Password
        </label>
        <TextInput
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button type="submit" text="Login" disabled={!password} />
        {error && <p data-id="error">{error}</p>}
      </FormStyled>
    </Page>
  );
}
