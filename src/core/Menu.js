import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Library from '@material-ui/icons/LocalLibrary'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import {Link, withRouter} from 'react-router-dom'
import './menu.css';

const isActive = (history, path) => {
  if (history.location.pathname === path)
    return {color: '#000', fontWeight: '600', marginRight: '1em'}
  else
    return {color: '#fffde7', marginRight: '1em'}
}
const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path))
    return {color: '#fffde7', backgroundColor: '#f57c00', marginRight:'1em'}
  else
    return {color: '#616161', backgroundColor: '#fffde7', border:'1px solid #f57c00', marginRight:'1em'}
}
const Menu = withRouter(({history}) => (
  <nav className="nav-menu">
    <ul>
      <div className="nav-item-group-1">
      <Link to="/" className="nav-item nav-header" style={isActive(history, "/")}><li>Digital Classroom</li></Link>
      </div>
      <div className="nav-item-group-2">
      {!auth.isAuthenticated() && 
      <><Link to="/signin" className="nav-item" style={isActive(history, "/signin")}><li>Sign in</li></Link>
      <Link to="/signup" className="nav-item" style={isActive(history, "/signup")}><li>Sign up</li></Link></>
      }
      {
        auth.isAuthenticated() && (<>
          {auth.isAuthenticated().user.educator && (<Link to="/teach/courses"><Button style={isPartActive(history, "/teach/")}><Library/> Teach</Button></Link>)}
          <Link className="nav-item" to={"/user/" + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
          </Link>
          <Button style={{color: '#fff'}} className="nav-item" onClick={() => {
              auth.clearJWT(() => history.push('/'))
            }}>Sign out</Button>
        </>)
      }
      {/* {
        auth.isAuthenticated() && (<>
          <Link to="/expenses/new" className="nav-item" style={isButtonActive(history, "/expenses/new")}><Button><AddIcon style={{marginRight: 4}}/> Add Expense</Button></Link>  
          <Link to={"/user/" + auth.isAuthenticated().user._id} className="nav-item">
            <li style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</li>
          </Link>
          <li className="nav-item" onClick={() => {
              auth.clearJWT(() => history.push('/'))
            }}>Sign out</li>
        </>)
      } */}
      </div>
    </ul>
  </nav>
  // <AppBar position="fixed" style={{zIndex:12343455}}>
  //   <Toolbar>
  //     <Typography variant="h6" color="inherit">
  //       Online Classroom
  //     </Typography>
  //     <div>
  //       <Link to="/">
  //         <IconButton aria-label="Home" style={isActive(history, "/")}>
  //           <HomeIcon/>
  //         </IconButton>
  //       </Link>
  //     </div>
  //     <div style={{'position':'absolute', 'right': '10px'}}><span style={{'float': 'right'}}>
  //     {
  //       !auth.isAuthenticated() && (<span>
  //         <Link to="/signup">
  //           <Button style={isActive(history, "/signup")}>Sign up
  //           </Button>
  //         </Link>
  //         <Link to="/signin">
  //           <Button style={isActive(history, "/signin")}>Sign In
  //           </Button>
  //         </Link>
  //       </span>)
  //     }
  //     {
  //       auth.isAuthenticated() && (<span>
  //         {auth.isAuthenticated().user.educator && (<Link to="/teach/courses"><Button style={isPartActive(history, "/teach/")}><Library/> Teach</Button></Link>)}
  //         <Link to={"/user/" + auth.isAuthenticated().user._id}>
  //           <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
  //         </Link>
  //         <Button color="inherit" onClick={() => {
  //             auth.clearJWT(() => history.push('/'))
  //           }}>Sign out</Button>
  //       </span>)
  //     }
  //     </span></div>
  //   </Toolbar>
  // </AppBar>
))

export default Menu
