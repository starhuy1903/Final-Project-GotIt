import { Header, Logo, TopMenu, Dropdown, Icon, Button } from "@ahaui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [current, setCurrent] = useState("home");
  const isLoggedIn = false;
  return (
    <Header fullWidth>
      <Header.Brand>
        <Link to="/">
          <Logo
            onClick={() => setCurrent("home")}
            src="https://vn.got-it.ai/assets/images/logo-1fa722c62e.svg"
            variant="original"
            height={40}
          />
        </Link>
      </Header.Brand>

      <Header.Main>
        <Header.AbsoluteCenter>
          <TopMenu current={current} onSelect={setCurrent}>
            <TopMenu.Item eventKey="home">
              <Link to="/" style={{ textDecoration: "none" }}>
                Home
              </Link>
            </TopMenu.Item>
            <TopMenu.Item eventKey="management">
              <Link to="/category" style={{ textDecoration: "none" }}>
                Management
              </Link>
            </TopMenu.Item>
          </TopMenu>
        </Header.AbsoluteCenter>

        <Header.Right className="u-marginRightSmall">
          {isLoggedIn ? (
            <Dropdown alignRight className="u-marginLeftExtraSmall">
              <Dropdown.Toggle className="u-textLight u-lineHeightNone">
                <Icon name="contact" size="large" />
              </Dropdown.Toggle>
              <Dropdown.Container className="u-paddingVerticalExtraSmall">
                <Dropdown.Item>
                  <Icon name="setting" size="small" />
                  <Link to="/profile">
                    <span className="u-marginLeftExtraSmall u-cursorPointer">
                      My Profile
                    </span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Icon name="power" size="small" />
                  <span className="u-marginLeftExtraSmall u-cursorPointer">
                    Logout
                  </span>
                </Dropdown.Item>
              </Dropdown.Container>
            </Dropdown>
          ) : (
            <>
              <Button variant="primary_outline" className="u-marginRightSmall">
                <Button.Label>
                  <Link
                    onClick={() => setCurrent("")}
                    to="/register"
                    style={{ textDecoration: "none" }}
                  >
                    Sign up
                  </Link>
                </Button.Label>
              </Button>
              <Button variant="primary">
                <Button.Label>
                  <Link
                    onClick={() => setCurrent("")}
                    to="/login"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Login
                  </Link>
                </Button.Label>
              </Button>
            </>
          )}
        </Header.Right>
      </Header.Main>
    </Header>
  );
};

export default Navbar;
