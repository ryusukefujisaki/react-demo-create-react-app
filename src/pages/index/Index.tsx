import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import '../../App.css';

function Index() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          <Link to={'/tutorial'}>Tutorial: Tic-Tac-Toe</Link>
        </p>
      </header>
    </div>
  );
}

export default Index;
