import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { SignOut } from 'aws-amplify-react';

// TODO: Be deliberate about not displaying on mobile screens.

type NavBarProps = {
  signOut: () => void,
  width: number
}

type NavBarItem = 'Dashboard' | 'Team' | 'Releases' | 'Calendar' | 'Reports'
const navBarDir: Record<NavBarItem, string> = {
  'Dashboard': '/',
  'Calendar': '/',
  'Reports': '/',
  'Team': '/team',
  'Releases': '/annotation'
}

type ScreenSize = 'large' | 'small' 

const NavBar = ({ signOut, width} : NavBarProps) =>{
  const [blockOpen, setBlockOpen] = useState(false)
  const [open, setOpen] = useState(false)

  const renderPageHeader = () => {
    return (<></>
      // <header className="bg-white shadow-sm">
      //   <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      //     <h1 className="text-lg font-semibold leading-6 text-gray-900">
      //       Projects
      //     </h1>
      //   </div>
      // </header>
    )
  }

  const renderMainContent = () => {
    return (
      <main>
        {/* <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-4 sm:px-0">
            <div className="border-4 border-gray-200 border-dashed rounded-lg h-96"></div>
          </div>
        </div> */}
      </main>
    )
  }

  const renderNotificationAndProfileButton = (screenSize: ScreenSize) => {
    if (screenSize === 'large') {
      return (
        <div className="hidden sm:ml-6 sm:flex sm:items-center">
          <NotificationButton />
          <div className="relative ml-3">
            <ProfileDropDown signOut={signOut} />
          </div>
        </div>
      )
    } else {
      return (
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <img className="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-white">Tom Cook</div>
              <div className="mt-1 text-sm font-medium leading-none text-indigo-300">tom@example.com</div>
            </div>
          </div>
          <div className="px-2 mt-3" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
          {/* <div className="px-2 mt-3" role="menu" aria-orientation="vertical" aria-labelledby="user-menu" role="menuitem"> */}
            <a href="#" className="block px-3 py-2 text-base font-medium text-indigo-300 rounded-md hover:text-white hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600" role="menuitem">Your Profile</a>
            <a href="#" className="block px-3 py-2 mt-1 text-base font-medium text-indigo-300 rounded-md hover:text-white hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600" role="menuitem">Settings</a>
            <a href="#" className="block px-3 py-2 mt-1 text-base font-medium text-indigo-300 rounded-md hover:text-white hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600" role="menuitem">Sign out</a>
          </div>
        </div>
      )
    }
  }

  const renderMenuButtonForMobile = () => {
    // When the screen is narrow, need a menu button to toggle the menu
    return (
      <div className="flex items-center -mr-2 sm:hidden">
        <button onClick={() => setBlockOpen(!blockOpen)} className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500" aria-label={`${blockOpen ? 'Close main menu' : 'Main menu'}`} aria-expanded={blockOpen ? true : false}>
          <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path className={`${blockOpen ? 'hidden' : 'inline-flex'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            <path className={`${blockOpen ? 'inline-flex' : 'hidden'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <>
      {/* <NavBarItems navBarDir={navBarDir} screenSize={'large'} /> */}
      <div className="relative flex flex-row w-full h-full">
        <div className="left-0 h-full p-2 ml-2 w-96">
          <div className="flex h-full p-1 bg-white rounded-lg shadow">	
            <div className="w-10 h-10 my-auto bg-green-300 rounded-lg">
              <img src={process.env.PUBLIC_URL + "appIcon.png"} />
            </div>
            <div className="content-end w-16 h-8 m-1 my-auto">
              <h5 className='text-sm font-bold truncate'>App.ly</h5>
              <div className='-mt-3 text-xs font-semibold tracking-tighter text-gray-600 uppercase '>
                V 0.12.3
              </div>
            </div>
            {/* <div className="relative z-0 flex justify-end flex-auto my-auto overflow-hidden">

              <img className="relative z-30 inline-block w-8 h-8 text-white rounded-full shadow-solid" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              <img className="relative z-20 inline-block w-8 h-8 -ml-2 text-white rounded-full shadow-solid" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              <img className="relative z-10 inline-block w-8 h-8 -ml-2 text-white rounded-full shadow-solid" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
              <img className="relative z-0 inline-block w-8 h-8 mr-0 -ml-2 text-white rounded-full shadow-solid" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              <div className="flex items-center justify-center w-10 h-8 -ml-1 font-bold text-gray-300 bg-blue-500 rounded-full" style={{fontSize: "13px"}}> 
                +15
              </div>
            </div> */}
            <div className="z-0 justify-end h-10 m-3 my-auto overflow-hidden bg-gray-400" style={{width: "2px"}}></div>
            <div className="flex items-center text-sm font-bold text-green-700">
              <div className="flex items-center justify-center h-10 px-3 border-2 border-green-500 border-solid rounded-lg ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-2 icon-launch"><path className="secondary" d="M6.64 6.46h7.07a1 1 0 0 1 .7 1.71l-4.24 4.24a1 1 0 0 1-.7.3H2.38A1 1 0 0 1 1.7 11l4.24-4.24a1 1 0 0 1 .7-.3zm10.9 10.9a1 1 0 0 1-.3.71L13 22.31a1 1 0 0 1-1.7-.7v-7.07a1 1 0 0 1 .29-.71l4.24-4.24a1 1 0 0 1 1.7.7v7.07z"/><path className="primary" d="M5.78 13.19a15.94 15.94 0 0 1 14.39-10.4 1 1 0 0 1 1.04 1.04 15.94 15.94 0 0 1-10.4 14.39 1 1 0 0 1-1.17-.37 14.1 14.1 0 0 0-3.5-3.5 1 1 0 0 1-.36-1.16zm.59 2.57a16.2 16.2 0 0 1 1.87 1.87 1 1 0 0 1-.47 1.6c-.79.25-1.6.42-2.4.54a1 1 0 0 1-1.14-1.13c.12-.82.3-1.62.53-2.41a1 1 0 0 1 1.6-.47z"/><path className="secondary" d="M7.23 10.26a19.04 19.04 0 0 1 6.5 6.51c-.92.58-1.9 1.07-2.92 1.45a1 1 0 0 1-1.17-.37 14.1 14.1 0 0 0-3.5-3.5 1 1 0 0 1-.36-1.16c.38-1.03.87-2 1.45-2.93zM17.62 3.1c.84-.17 1.7-.27 2.55-.3a1 1 0 0 1 1.04 1.04c-.03.86-.13 1.71-.3 2.55a19.2 19.2 0 0 0-3.29-3.29zm-3.91 7.2a2 2 0 1 1 2.83-2.83 2 2 0 0 1-2.83 2.83z"/></svg>
                Approve
              </div>
              
            </div>					
          </div>
        </div>	
        <div className="absolute right-0 flex flex-row w-auto h-8 my-3 mr-3">
          <NotificationButton />
          <div className="object-contain h-8">    
            <ProfileDropDown signOut={signOut} />
          </div>
        </div>
      </div>
      
      
      {/* { renderNotificationAndProfileButton('large') } */}
      {/* { renderMenuButtonForMobile() }  */}


      {/* <div className={`${blockOpen ? 'block' : 'hidden'}`}>
        <NavBarItemsMobile navBarDir={navBarDir} />
      </div> */}
    </>
  )
}

type NavBarItemsMobileProps = {
  navBarDir: Record<NavBarItem, string>
}

const NavBarItemsMobile = ({navBarDir}: NavBarItemsMobileProps) => {
  const firstItem: NavBarItem = 'Releases'
  const [selectedNavBarItem, setSelectedNavBarItem] = useState<NavBarItem>('Releases')

  const renderNavBarItem = (item: NavBarItem) => {
    return (
      <Link to={{pathname: navBarDir[item]}} onClick={() => setSelectedNavBarItem(item)} 
        className="block py-2 pl-3 pr-4 mt-1 text-base font-medium text-gray-600 transition duration-150 ease-in-out border-l-4 border-transparent hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300">{item}</Link>
    )
  }

  return (
    <>
      <div className="pt-2 pb-3">
        <a href="#" className="block py-2 pl-3 pr-4 text-base font-medium text-indigo-700 transition duration-150 ease-in-out border-l-4 border-indigo-500 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700">Dashboard</a>
        { renderNavBarItem('Releases') }
        { renderNavBarItem('Team')}
      </div>
      <div className="pt-4 pb-3 border-t border-gray-200">
        <div className="flex items-center px-4">
          <div className="flex-shrink-0">
            <img className="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium leading-6 text-gray-800">Tom Cook</div>
            <div className="text-sm font-medium leading-5 text-gray-500">tom@example.com</div>
          </div>
        </div>
        <div className="mt-3">
          <a href="#" className="block px-4 py-2 text-base font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100">Your Profile</a>
          <a href="#" className="block px-4 py-2 mt-1 text-base font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100">Settings</a>
          <a href="#" className="block px-4 py-2 mt-1 text-base font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100">Sign out</a>
        </div>
      </div>
    </>
  )
}

type NavBarItemsProps = {
  screenSize: ScreenSize
  navBarDir: Record<NavBarItem, string>
}

const NavBarItems = ({ screenSize, navBarDir }: NavBarItemsProps) => {
  const firstItem: NavBarItem = 'Releases'
  const [selectedNavBarItem, setSelectedNavBarItem] = useState<NavBarItem>('Releases')

  const renderProjects = () => {
    return (
      <svg className="w-6 h-6 mr-3 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-500 group-focus:text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
      </svg>
    )
  }

  useEffect(() => {}, [screenSize])

  const renderNavBarItem = (item: NavBarItem) => {
    if (screenSize === 'large') {
      return (
        <Link to={{pathname: navBarDir[item]}} onClick={() => setSelectedNavBarItem(item)} 
              className={`${selectedNavBarItem === item ? 'border-indigo-500 text-gray-900 focus:outline-none focus:border-indigo-700 hover:text-gray-900 ': 'border-transparent focus:border-gray-300 hover:text-gray-700 hover:border-gray-300'} ${item !== firstItem ? 'ml-8' : ''} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 text-gray-500 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-100 ease-in-out`}>
          {item}
        </Link>
      )
    } else {
      return (
        <Link to={{pathname: navBarDir[item]}} onClick={() => setSelectedNavBarItem(item)} 
          className={`${selectedNavBarItem === item ? 'bg-indigo-800 text-white': 'focus:bg-indigo-600 hover:text-white hover:bg-indigo-600 '} ${item !== firstItem ? 'mt-1' : ''} block px-3 py-2 rounded-md text-base font-medium text-indigo-200 focus:outline-none focus:text-white focus:bg-indigo-600 active:bg-indigo-800`}>{item}</Link>
      )
    }
  }

  if (screenSize === 'large') {
    return (
      <div className="flex">
        <div className="flex items-center flex-shrink-0">
          <img className="w-auto h-8" src="workflow-logo-on-white.svg" alt="logo" />
        </div>
        <div className="hidden sm:ml-6 sm:flex">
            {renderNavBarItem('Releases')}
            {renderNavBarItem('Team')}
        </div>
      </div>
    )
  } else {
    return (
      <>
        {renderNavBarItem('Releases')}
        {renderNavBarItem('Team')}
      </>
    )
  }
}

const NotificationButton = () => {
  return (
    <button className="w-8 h-8 my-auto mr-2 text-gray-400 transition duration-150 ease-in-out border-2 border-transparent rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100">
      <svg className="w-6 h-6 mx-auto" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    </button>
  )
}

type ProfileDropDownProps = {
  signOut: () => void
}
const ProfileDropDown = ({signOut}: ProfileDropDownProps) => {
  const [showProfileDropDown, setShowProfileDropDown] = useState(false)

  const profileDropDownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    document.addEventListener("click", handleClickOutsideProfile, false);
    return () => {
      document.removeEventListener("click", handleClickOutsideProfile, false);
    };
  })

  const handleClickOutsideProfile = (e: MouseEvent) => {
    const _profileDropDownRef = profileDropDownRef.current
    if (showProfileDropDown && _profileDropDownRef  && _profileDropDownRef !== null && !_profileDropDownRef.contains(e.target as Element)) {
      setShowProfileDropDown(false)
    }
  }

  const renderAvatarButton = () => {
    return (
      <>
        <button onClick={() => setShowProfileDropDown(!showProfileDropDown)} className="flex items-center max-w-xs text-sm text-white rounded-full focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true">
        {/* <button @click="open = !open" className="flex items-center max-w-xs text-sm text-white rounded-full focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true" x-bind:aria-expanded="open"> */}
          <img className="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        </button>
      </>
    )
  }

  if (showProfileDropDown) {
    return (
      <>
        { renderAvatarButton() }
        <div ref={profileDropDownRef} x-show="open" className="absolute right-0 z-50 w-48 mt-2 origin-top-right rounded-md shadow-lg">
          {/* <div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" className="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg"> */}
          <div className="py-1 bg-white rounded-md shadow-xs">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
            <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to={{pathname: `/settings`}}>Settings</Link>
            <a href="#" onClick={() => {signOut()}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
          </div>
        </div>
      </>
    )
  } else {
    return ( <>{renderAvatarButton()}</> )
  }
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
