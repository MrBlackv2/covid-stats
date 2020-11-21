import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default function Layout({ children }) {
  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" sticky="top">
        <Link href="/" passHref>
          <Navbar.Brand>COVID STATS</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <NavDropdown title="U.S.">
              <Link href="/us/trends" passHref>
                <NavDropdown.Item>Trends</NavDropdown.Item>
              </Link>
              <Link href="/us/current" passHref>
                <NavDropdown.Item>Current Data</NavDropdown.Item>
              </Link>
            </NavDropdown>
            <NavDropdown title="States">
              <Link href="/states/trends" passHref>
                <NavDropdown.Item>Trends</NavDropdown.Item>
              </Link>
              <Link href="/states/current" passHref>
                <NavDropdown.Item>Current Data</NavDropdown.Item>
              </Link>
            </NavDropdown>
            <Link href="/world" passHref>
              <Nav.Link>World</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form> */}
      </Navbar>

      <main>
        {children}
      </main>
    </>
  );
}
