import './App.css';
import SpeckleLoader from "./SpeckleLoader";
function App() {
  return (
      <div className="App">
        <header className="App-header">
          <h1>Speckle Data React App Demo</h1>
          <SpeckleLoader /> {/* Render the SpeckleLoader component */}
        </header>
      </div>
  );
}

export default App;
