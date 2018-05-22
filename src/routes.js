import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Landing from './Components/Landing/Landing'
import Home from './Components/Home/Home'
import Price from './Components/Price/Price'
import Delete from './Components/Delete/Delete'
import Add from './Components/Add/Add'
import Pro from './Components/Pro/Pro'
import Found from './Components/Found/Found'

export default (
    <Switch>
        <Route path= '/' exact component= {Home} />
        <Route path= '/land' component= {Landing} />
        <Route path= '/price' component= {Price} />
        <Route path= '/delete' component= {Delete} />
        <Route path= '/add' component= {Add} />
        <Route path= '/pro' component= {Pro} />
        <Route path= '/found' component= {Found} />
    </Switch>
)