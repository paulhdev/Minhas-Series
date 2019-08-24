import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

function Header() {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to="/">
          Minhas Séries
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={open} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/genres">
                Gêneros
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/series">
                Séries
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
