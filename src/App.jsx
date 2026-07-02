import RoutesPages from './routes.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContextProvider from './Context/User/userContextProvider.jsx';

function App() {
  return (
    <UserContextProvider>
      <RoutesPages />
    </UserContextProvider>
  );
}

export default App;
