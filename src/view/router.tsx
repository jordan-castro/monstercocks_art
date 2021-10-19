import {
    Switch,
    Route,
} from "react-router-dom";
import { CockPage } from "./cock_page";
import Home from "./home_page";


export default function AppRouter() {
    return (
        <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/cock/:id' component={CockPage}></Route>
        </Switch>
    );
}