import { Container, Navbar } from 'react-bootstrap';

export default function Header() {

  return (  
  <Navbar bg="dark" data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="#home">Watermarker</Navbar.Brand>
    </Container>
  </Navbar>
  )
}
