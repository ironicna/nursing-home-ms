import React from "react";
import { Menu, Container, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

function Navbar() {
  const router = useRouter()
  // returns true if page is active
  const isActive = route => router.pathname === route;

  return (
    <Menu fluid borderless>
      <Container text>
        <Link href="/login">
          <Menu.Item header active = {isActive("/login")}>
            <Icon size = "large" name = "sign in" />
            Login
          </Menu.Item>
        </Link>

        <Link href="/registration">
          <Menu.Item header active = {isActive("/registration")}>
          <Icon size = "large" name = "signup" />
            Register
          </Menu.Item>
        </Link>
      </Container>
    </Menu>
  );
}

export default Navbar;
