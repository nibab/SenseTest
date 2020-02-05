import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Menu, Icon } from 'antd';
import 'antd/dist/antd.css';

type NavBarProps = {
  isLoggedIn: boolean,
  signOut: Function,
}

const NavBar = ({ isLoggedIn, signOut }: NavBarProps) => {
  const [current, setCurrent] = useState("");

  const handleClick = (e: any) => {
    setCurrent(e.key)
  }

  useEffect(() => {
    if (current === "signout") {
      setCurrent("")
    }
  })

  const renderMenu = () => {
    return (
      <Menu style={{backgroundColor: style.backgroundColor}} theme="dark" onClick={(e) => handleClick(e)} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="annotate" >
        <Link to={{pathname: `/annotate`}} style={{}}><Icon type="edit" />Annotate</Link>
      </Menu.Item>
      <Menu.Item key="tests" >
        <Link to={{pathname: `/tests`}} style={{}}><Icon type="experiment" />Tests</Link>
      </Menu.Item>
      <Menu.Item key="app">
        <Link to={{pathname: `/runs`}}><Icon type="right-square" />Past Runs</Link>
      </Menu.Item>
      <Menu.Item key="settings">
        <Link to={{pathname: `/settings`}}><Icon type="setting" />Settings</Link>
      </Menu.Item>
      <Menu.Item key="signout"> 
        <Link to={{pathname: "/"}} onClick={() => {
          signOut()
        }}><Icon type="logout" />Sign out</Link>
      </Menu.Item>
    </Menu>
    )
  }

  const renderSignedIn = () => {
    return (
      <div>
        {renderMenu()}
      </div>
    )
  }

  const renderSignedOut = () => {
    return (
      <div>
        <Button to='/login' as={Link}>Sign in</Button>
      </div>
    )
  }

  return (
    <div style={{padding: "24px", backgroundColor: style.backgroundColor}}>
      <Navbar.Brand as={Link} onClick={() => setCurrent("")} to='/'>SNAP<b>TEST</b></Navbar.Brand>
      <div style={{float: "right"}}>
        {isLoggedIn ? renderSignedIn() : renderSignedOut()}
      </div>
    </div>
  )
}

const style = {
  backgroundColor: '#001529'
}

export default NavBar;
