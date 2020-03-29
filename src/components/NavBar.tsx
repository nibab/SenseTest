import React, { useState, useEffect } from 'react';
import { Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

type NavBarProps = {
  isLoggedIn: boolean,
  signOut: Function,
  width: number
}

const NavBar = ({ isLoggedIn, signOut, width} : NavBarProps) =>{
  const [blockOpen, setBlockOpen] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <>
    <div>
      <nav x-data="{ open: false }" className="bg-indigo-700">
      {/* <nav x-data="{ open: false }" @keydown.window.escape="open = false" className="bg-indigo-700"> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-8 w-8" src="/img/logos/workflow-mark-on-brand.svg" alt="Workflow logo" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline">
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-indigo-800 focus:outline-none focus:text-white focus:bg-indigo-600">Dashboard</a>
                  <a href="#" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-indigo-200 hover:text-white hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600">Team</a>
                  <a href="#" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-indigo-200 hover:text-white hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600">Projects</a>
                  <a href="#" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-indigo-200 hover:text-white hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600">Calendar</a>
                  <a href="#" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-indigo-200 hover:text-white hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600">Reports</a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button className="p-1 border-2 border-transparent text-indigo-300 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-indigo-600" aria-label="Notifications">
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <div className="ml-3 relative">
                {/* <div @click.away="open = false" className="ml-3 relative" x-data="{ open: false }"> */}
                  <div>
                    <button className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true">
                    {/* <button @click="open = !open" className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true" x-bind:aria-expanded="open"> */}
                      <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    </button>
                  </div>
                  <div x-show="open" className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                  {/* <div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"> */}
                    <div className="py-1 rounded-md bg-white shadow-xs">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button className="inline-flex items-center justify-center p-2 rounded-md text-indigo-300 hover:text-white hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 focus:text-white">
              {/* <button @click="open = !open" className="inline-flex items-center justify-center p-2 rounded-md text-indigo-300 hover:text-white hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 focus:text-white" x-bind:aria-label="open ? 'Close main menu' : 'Main menu'" x-bind:aria-expanded="open"> */}
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  {/* <path :className="{'hidden': open, 'inline-flex': !open }" className="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  <path :className="{'hidden': !open, 'inline-flex': open }" className="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /> */}
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="hidden md:hidden">
        {/* <div :className="{'block': open, 'hidden': !open}" className="hidden ${} md:hidden"> */}
          <div className="px-2 pt-2 pb-3 sm:px-3">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-800 focus:outline-none focus:text-white focus:bg-gray-700">Dashboard</a>
            <a href="#" className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-white hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600">Team</a>
            <a href="#" className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-white hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600">Projects</a>
            <a href="#" className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-white hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600">Calendar</a>
            <a href="#" className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-white hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600">Reports</a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">Tom Cook</div>
                <div className="mt-1 text-sm font-medium leading-none text-indigo-300">tom@example.com</div>
              </div>
            </div>
            <div className="mt-3 px-2" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
            {/* <div className="mt-3 px-2" role="menu" aria-orientation="vertical" aria-labelledby="user-menu" role="menuitem"> */}
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-300 hover:text-white hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600" role="menuitem">Your Profile</a>
              <a href="#" className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-indigo-300 hover:text-white hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600" role="menuitem">Settings</a>
              <a href="#" className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-indigo-300 hover:text-white hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600" role="menuitem">Sign out</a>
            </div>
          </div>
        </div>
      </nav>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg leading-6 font-semibold text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-4 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
          </div>
        </div>
      </main>
    </div>
    </>
  )
}



// const NavBar = ({ isLoggedIn, signOut, width }: NavBarProps) => {
//   const [current, setCurrent] = useState("");

//   const handleClick = (e: any) => {
//     setCurrent(e.key)
//   }

//   useEffect(() => {
//     if (current === "signout") {
//       setCurrent("")
//     }
//   })

//   const renderMenu = () => {
//     return (
//       <Menu
//         onClick={(e:any) => handleClick(e)}
//         style={{ width: width }}
//         defaultSelectedKeys={['1']}
//         defaultOpenKeys={['sub1']}
//         mode="inline"
//       >
//         <Menu.Item key="annotate">
//           <Link to={{pathname: `/annotate`}}><Icon type="edit" />Annotate</Link>
//         </Menu.Item>
//         <Menu.Item key="autoTest">
//           <Link to={{pathname: `/autoTest`}}><Icon type="test" />Auto Test</Link>
//         </Menu.Item>
//         {/* <Menu.Item key="tests" >
//           <Link to={{pathname: `/tests`}} style={{}}><Icon type="experiment" />Tests</Link>
//         </Menu.Item>
//         <Menu.Item key="app">
//           <Link to={{pathname: `/runs`}}><Icon type="right-square" />Past Runs</Link>
//         </Menu.Item> */}
//         <Menu.Item key="settings">
//           <Link to={{pathname: `/settings`}}><Icon type="setting" />Settings</Link>
//         </Menu.Item>
//       </Menu>
//     )
//   }

//   const renderSignedIn = () => {
//     return (
//       <div>
//         {renderMenu()}
//       </div>
//     )
//   }

//   const renderSignedOut = () => {
//     return (
//       <div>
//         {/* <Button to='/login' as={Link}>Sign in</Button> */}
//       </div>
//     )
//   }

//   return (
//     <div>
//       <div style={{float: "left", backgroundColor: 'white', height: '100%', position: "fixed"}}>
//         <div style={{textAlign: 'center', paddingBottom: '30px'}}>
//           <img style={{width: '80px'}} src="zeplin.png" />
//         </div>
//         {isLoggedIn ? renderSignedIn() : renderSignedOut()}
//       </div>
//     </div>
//   )
// }

export default NavBar;
