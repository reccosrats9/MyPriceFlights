import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Landing from './Components/Landing/Landing'
import Home from './Components/Home/Home'
import Register from './Components/Register/Register'
import Change from './Components/Change/Change'
import Delete from './Components/Delete/Delete'
import Add from './Components/Add/Add'
import Found from './Components/Found/Found'

export default (
    <Switch>
        <Route path= '/' exact component= {Landing} />
        <Route path= '/home' component= {Home} />
        <Route path='/register' component={Register}/>
        <Route path= '/change' component= {Change} />
        <Route path= '/delete' component= {Delete} />
        <Route path= '/add' component= {Add} />
        <Route path= '/found' component= {Found} />
    </Switch>
)