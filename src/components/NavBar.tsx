import React, { useState, useEffect } from 'react';
import { Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

type NavBarProps = {
  isLoggedIn: boolean,
  signOut: Function,
  width: number
}

const NavBar = ({ isLoggedIn, signOut, width }: NavBarProps) => {
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
      <Menu
        onClick={(e:any) => handleClick(e)}
        style={{ width: width }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <Menu.Item key="annotate">
          <Link to={{pathname: `/annotate`}}><Icon type="edit" />Annotate</Link>
        </Menu.Item>
        <Menu.Item key="autoTest">
          <Link to={{pathname: `/autoTest`}}><Icon type="test" />Auto Test</Link>
        </Menu.Item>
        {/* <Menu.Item key="tests" >
          <Link to={{pathname: `/tests`}} style={{}}><Icon type="experiment" />Tests</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to={{pathname: `/runs`}}><Icon type="right-square" />Past Runs</Link>
        </Menu.Item> */}
        <Menu.Item key="settings">
          <Link to={{pathname: `/settings`}}><Icon type="setting" />Settings</Link>
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
        {/* <Button to='/login' as={Link}>Sign in</Button> */}
      </div>
    )
  }

  return (
    <div>
      <div style={{float: "left", backgroundColor: 'white', height: '100%', position: "fixed"}}>
        <div style={{textAlign: 'center', paddingBottom: '30px'}}>
          <img style={{width: '80px'}} src="zeplin.png" />
        </div>
        {isLoggedIn ? renderSignedIn() : renderSignedOut()}
      </div>
    </div>
  )
}

export default NavBar;
