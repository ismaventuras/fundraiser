import {Container} from 'react-bootstrap'

import AppRouter from './routers/AppRouter';

function App() {
  return (
    <Container className='py-4'>
      <AppRouter/>
    </Container>
  );
}

export default App;
