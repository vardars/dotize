import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { convert } from 'dotize';
import { useState } from 'react';

function App() {
  const [converted, setConverted] = useState(null);

  const textChanged = (event) => {
    const inputContent = event.target.value;
    const parsedContent = JSON.parse(inputContent);
    let x = convert(parsedContent);
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
            <textarea className='input-ta' onChange={textChanged}></textarea>
          </Col>
          <Col>
            <pre className='output-ta'>{converted}</pre>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
