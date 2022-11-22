import { Header, Logo, TopMenu, Dropdown, Icon, Button } from "@ahaui/react";
import { useAppSelector, useThunkDispatch } from "hooks";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "store/actions";
import { selectToken } from "store/reducers/authReducer";

const Navbar: React.FC = () => {
  const [current, setCurrent] = useState("/");
  const navigate = useNavigate();
  const token = useAppSelector(selectToken);
  const location = useLocation();
  const dispatch = useThunkDispatch();

  useEffect(() => {
    if (location.pathname !== current) {
      setCurrent(location.pathname);
    }
  }, [location]);

  return (
    <Header fullWidth className="u-shadowMedium">
      <Header.Brand>
        <Link to="/">
          <Logo
            onClick={() => setCurrent("/")}
            src="https://vn.got-it.ai/assets/images/logo-1fa722c62e.svg"
            height={40}
          />
        </Link>
      </Header.Brand>

      <Header.Main>
        <Header.AbsoluteCenter>
          <TopMenu
            current={current}
            onSelect={(e) => {
              setCurrent(e);
              navigate(e);
            }}
          >
            <TopMenu.Item eventKey="/">Home</TopMenu.Item>
            <TopMenu.Item eventKey="/management">Management</TopMenu.Item>
          </TopMenu>
        </Header.AbsoluteCenter>

        <Header.Right className="u-marginRightSmall">
          {token ? (
            <Dropdown alignRight className="u-marginLeftExtraSmall">
              <Dropdown.Toggle className="u-textLight u-lineHeightNone">
                <Icon name="contact" size="large" />
              </Dropdown.Toggle>
              <Dropdown.Container className="u-paddingVerticalExtraSmall">
                <Dropdown.Item>
                  <Icon name="setting" size="small" />
                  <Link
                    to="/profile"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <span className="u-marginLeftExtraSmall u-cursorPointer">
                      My Profile
                    </span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Icon name="power" size="small" />
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={() => dispatch(signOut())}
                  >
                    <span className="u-marginLeftExtraSmall u-cursorPointer">
                      Logout
                    </span>
                  </Link>
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
