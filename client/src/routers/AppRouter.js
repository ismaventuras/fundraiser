import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from '../components/Header'
import Main from '../components/Main'
import Home from '../pages/Home'

//import { useWeb3React } from '@web3-react/core';

export default function AppRouter(){
    //const {active, account} = useWeb3React();
    return(
        <Router>
        <Header/>
            <Switch>
                {/* <Route exact path='/about' component={About} /> */}
                <Route exact path='/' component={Home} />
                <Route exact path='/main' render={()=> <Main applicationName='Subasta'/>}  />
                {/* <Route exact path='*' component={NotFound} /> */}
            </Switch>
        </Router>
    )
}