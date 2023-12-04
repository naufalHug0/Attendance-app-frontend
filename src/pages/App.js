import { Route, Routes } from 'react-router';
import { FlashMessage, ModalMessage } from '../components';
import { Home, Login } from '../pages'
import NotFound from './NotFound/notFound';

const App = () => (
    <>
    <FlashMessage/>
    <ModalMessage/>
    <Routes>
      <Route path='/*' element={<Home/>}></Route>
      <Route path='/auth/*' element={<Login/>}></Route>
      <Route path='*' element={<NotFound/>}></Route>
    </Routes>
    </>
)

export default App;
