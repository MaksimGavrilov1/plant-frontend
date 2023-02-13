import SensorData from './component/SensorData'
import AuthenticatedRoute from './component/AuthenticatedRoute';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoginComponent from './component/LoginComponent';
import RegisterComponent from './component/RegisterComponent';
import ContainersComponent from './component/ContainersComponent';
import CreateContainer from './component/CreateContainer';
import OneContainer from './modules/ViewContainer';
import PlantsComponent from './component/PlantsComponent';
import CreatePlant from './modules/create/CreatePlant';
import ViewPlantComponent from './component/ViewPlant';
import CreateTechnologicalMapComponent from './component/CreateTechnologicalMapComponent';

function App() {
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
          {/* This route is for home component
    with exact path "/", in component props
    we passes the imported component*/}
         <Route exact path="/" element={<LoginComponent />} />
          {/* This route is for home component
    with exact path "/", in component props
    we passes the imported component*/}
          <Route exact path="/login" element={<LoginComponent />} />
          {/* This route is for home component
    with exact path "/", in component props
    we passes the imported component*/}
          <Route exact path='/data' element={<AuthenticatedRoute/>}>
            <Route exact path='/data' element={<SensorData/>}/>
          </Route>
          <Route exact path='/containers' element={<AuthenticatedRoute/>}>
            <Route exact path='/containers' element={<ContainersComponent/>}/>
          </Route>
          <Route exact path='/containers/create' element={<AuthenticatedRoute/>}>
            <Route exact path='/containers/create' element={<CreateContainer/>}/>
          </Route>
          <Route exact path='/containers/view/:containerId' element={<AuthenticatedRoute/>}>
            <Route exact path='/containers/view/:containerId' element={<OneContainer/>}/>
          </Route>
          <Route exact path='/plants' element={<AuthenticatedRoute/>}>
            <Route exact path='/plants' element={<PlantsComponent/>}/>
          </Route>
          <Route exact path='/plants/create' element={<AuthenticatedRoute/>}>
            <Route exact path='/plants/create' element={<CreatePlant/>}/>
          </Route>
          <Route exact path='/plants/view/:plantId' element={<AuthenticatedRoute/>}>
            <Route exact path='/plants/view/:plantId' element={<ViewPlantComponent/>}/>
          </Route>
          <Route exact path='/maps/create/:plantId' element={<AuthenticatedRoute/>}>
            <Route exact path='/maps/create/:plantId' element={<CreateTechnologicalMapComponent/>}/>
          </Route>
          <Route path='/register' element={<RegisterComponent />}></Route>
          {/* If any route mismatches the upper
    route endpoints then, redirect triggers
    and redirects app to home component with to="/" */}
          <Route to="/" />
        </Routes>
      </Router>
    {/* <div className="App">
        <Appbar />
        <Book />
      </div> */}
      </>
  );
}

export default App;
