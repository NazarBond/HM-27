import { Suspense } from "react";
import { Outlet, NavLink } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  padding: 16px 32px;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 20px;
`;

const StyledLink = styled(NavLink)`
  font-size: 20px;
  font-weight: 500;
  color: #212121;
  text-decoration: none;

  &.active {
    color: #e50914;
  }
`;

export const SharedLayout = () => {
  return (
    <>
      <Header>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/movies">Movies</StyledLink>
      </Header>
      <main style={{ padding: "20px 32px" }}>
        <Suspense fallback={<div>Loading page...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};
