import React from 'react';
import QueryBuilder from './components/QueryBuilder';
import Container from '@mui/material/Container';

function App() {
  return (
    <Container maxWidth="md" style={{ marginTop: 40 }}>
      <h1>Query Builder</h1>
      <QueryBuilder />
    </Container>
  );
}

export default App;
