import './App.css';
import { Container, Row, Col, Navbar, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import dotize from 'dotize';
import { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [converted, setConverted] = useState('');
  const [error, setError] = useState('');

  const textChanged = (event) => {
    const inputContent = event.target.value;
    setInputText(inputContent);
    if (inputContent.trim() === '') {
      setError('');
      setConverted('');
      return;
    }
    try {
      const parsedContent = JSON.parse(inputContent);
      const x = dotize.convert(parsedContent);
      if (x) {
        setConverted(JSON.stringify(x, null, "  "));
        setError('');
      }
    } catch (e) {
      setError('Invalid JSON input.');
      setConverted('');
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(converted);
  }

  const clearInput = () => {
    setInputText('');
    setConverted('');
    setError('');
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Dotize Online</Navbar.Brand>
        </Container>
      </Navbar>
      <Container style={{ marginTop: '20px' }}>
        <Row>
          <Col>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>JSON Input</Form.Label>
              <Form.Control as="textarea" rows={10} value={inputText} onChange={textChanged} />
            </Form.Group>
            <Button variant="secondary" onClick={clearInput} style={{ marginTop: '10px' }}>Clear</Button>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Dotted Output</Form.Label>
              <pre className='output-ta'>{converted}</pre>
            </Form.Group>
            <Button variant="primary" onClick={copyToClipboard} style={{ marginTop: '10px' }} disabled={!converted}>Copy to Clipboard</Button>
          </Col>
        </Row>
        {error && <Alert variant="danger" style={{ marginTop: '20px' }}>{error}</Alert>}
      </Container>
    </>
  );
}

export default App;
