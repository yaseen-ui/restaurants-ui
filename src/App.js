import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.scss';
import Restaurants from "./components/restaurants/Restaurants";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Restaurants />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
