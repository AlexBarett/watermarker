import { Container, Navbar } from 'react-bootstrap';

export default function Header() {

  return (
    // <nav className="navbar navbar-dark bg-primary">

    // </nav>
    
  <Navbar bg="dark" data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    </Container>
  </Navbar>
  )
}
