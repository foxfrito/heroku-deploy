import React, { useState, useEffect, useRef } from 'react';

import { Navbar, Card, Form, Button } from 'react-bootstrap'
import SeriesGrid from './SeriesGrid'

import { addSeries, fetchSeries, deleteSeries } from './services/services'

//import './App.css';

function App() {
  const [seriesList, setSeriesList] = useState([]);
  const titleRef = useRef(null);

  const cardStyle = {
    width: '600px',
    height: '200px',
    margin: 'auto',
    marginTop: '50px'
  }

  const updateSeriesList = () => (async () => setSeriesList(await fetchSeries()))();

  const removeSeries = async (seriesId) => {
    await deleteSeries(seriesId);
    await updateSeriesList();
  }

  useEffect(() => {
    updateSeriesList();
    }, []);

  const add = async () => {
    let title = titleRef.current.value;

    if(title) {
      title = title.trim();
      await addSeries(title);
      await updateSeriesList();
      titleRef.current.value = '';
    }
  }

  return (
    <div className="App">
      <>
        <Navbar variant="dark">
          <Navbar.Brand href="#home">Easy Series</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a href="#login">Diogo Paraíso</a>
              <span><i className="far fa-user"></i></span>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>

        <Card style={cardStyle}>
          <Card.Body>
            <Form.Group controlId="title">
              <Form.Label>Add a new Series</Form.Label>
              <Form.Control ref={titleRef} type="text" placeholder="Game of Thrones" />
            </Form.Group>
            <Button id="add-series-btn" variant="outline-secondary" onClick={add}>OK</Button>
          </Card.Body>
        </Card>

        <SeriesGrid seriesList={seriesList} removeSeries={removeSeries}/>
      </>
    </div>
  );
}

export default App;
