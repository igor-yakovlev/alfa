import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import reactLogo from './assets/react.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container>
      <Row>
        <Col>
          <h1>Rick and Morty social network</h1>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </Container>
  )
}

export default App
