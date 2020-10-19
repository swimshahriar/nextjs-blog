import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import Link from 'next/link';

import { useAuth } from '../hooks/useAuth';
import styles from './NavBar.module.css';

const NavBar = () => {
  const auth = useAuth();
  return (
    <Navbar collapseOnSelect expand="lg" bg="info" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand>
          <Link href="/">
            <a className={styles.navLink} style={{ fontSize: '1.5rem' }}>
              Nextjs Blog
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Link href="/">
              <a className={styles.navLink}>Home</a>
            </Link>

            {auth.user ? (
              <NavDropdown
                title="Account"
                id="basic-nav-dropdown"
                style={{ margin: '.5rem 1rem' }}
              >
                <NavDropdown.Item>
                  <Link href="/profile">
                    <a className={styles.dropdownLink}>Dashboard</a>
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Item onClick={() => auth.signout()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link href="/auth">
                <a className={styles.navLink}>Auth</a>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
