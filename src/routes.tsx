import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Confirmation from "./pages/Confirmation";
import Details from "./pages/Details";
import Home from "./pages/Home";

const Routes = () => {
  return (
    <Router forceRefresh={false}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/detalhes" component={Details} />
        <Route path="/confirmacao" component={Confirmation} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default Routes;
