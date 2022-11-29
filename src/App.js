import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import dotize from 'dotize';
import { useState } from 'react';

function App() {
  const [converted, setConverted] = useState(null);

  const textChanged = (event) => {
    const inputContent = event.target.value;
    const parsedContent = JSON.parse(inputContent);
    let x = dotize.convert(parsedContent);
    console.log(x);
    if (x) {
      setConverted(JSON.stringify(x, null, " "));
    }
  }

  return (
    <>
      <div className="App">
        Test dotize
      </div>
      <Container>
        <Row>
          <Col>
            <textarea style={{"width": '100%', "height": "200px"}} onChange={textChanged}></textarea>
          </Col>
          <Col>
            <pre style={{"width": '100%', "height": "200px", "border": "1px solid", "padding": "2px 6px"}}>{converted}</pre>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
