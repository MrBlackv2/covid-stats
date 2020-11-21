import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

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
            <Link href="/" passHref>
              <Nav.Link>U.S.</Nav.Link>
            </Link>
            <Link href="/states" passHref>
              <Nav.Link>States</Nav.Link>
            </Link>
            <Link href="/world" passHref>
              <Nav.Link>World</Nav.Link>
            </Link>
            <Link href="/countries" passHref>
              <Nav.Link>Countries</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <main className="container">
        {children}
      </main>
    </>
  );
}
