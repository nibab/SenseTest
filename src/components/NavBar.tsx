import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'

// TODO: Be deliberate about not displaying on mobile screens.

type NavBarProps = {
  isLoggedIn: boolean,
  signOut: Function,
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

const NavBar = ({ isLoggedIn, signOut, width} : NavBarProps) =>{
  const [blockOpen, setBlockOpen] = useState(false)
  const [open, setOpen] = useState(false)

  const renderPageHeader = () => {
    return (<></>
      // <header className="bg-white shadow-sm">
      //   <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      //     <h1 className="text-lg leading-6 font-semibold text-gray-900">
      //       Projects
      //     </h1>
      //   </div>
      // </header>
    )
  }

  const renderMainContent = () => {
    return (
      <main>
        {/* <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-4 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
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
          <div className="ml-3 relative">
            <ProfileDropDown />
          </div>
        </div>
      )
    } else {
      return (
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
      )
    }
  }

  const renderMenuButtonForMobile = () => {
    // When the screen is narrow, need a menu button to toggle the menu
    return (
      <div className="-mr-2 flex items-center sm:hidden">
        <button onClick={() => setBlockOpen(!blockOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out" aria-label={`${blockOpen ? 'Close main menu' : 'Main menu'}`} aria-expanded={blockOpen ? true : false}>
          <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path className={`${blockOpen ? 'hidden' : 'inline-flex'}`} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path className={`${blockOpen ? 'inline-flex' : 'hidden'}`} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <>
    <div>
      <nav className="">
        <div className="max-w-7xl">
          <div className="flex h-16 w-full flex-row">
            {/* <NavBarItems navBarDir={navBarDir} screenSize={'large'} /> */}
            <div className="bg-red-100 w-full h-full flex flex-row relative">
              <div className="bg-green-200 w-84 h-full p-2 mx-auto">
                <div className="bg-white shadow-xl p-1 h-full rounded-lg"></div>
              </div>
              <div className="bg-blue-300 w-auto h-full flex absolute flex-row right-0 mr-3">
                <NotificationButton />
                <div className="h-8 my-auto object-contain">    
                  <ProfileDropDown />
                </div>
              </div>
            </div>
            
            
            {/* { renderNotificationAndProfileButton('large') } */}
            {/* { renderMenuButtonForMobile() }  */}
          </div>
        </div>

        <div className={`${blockOpen ? 'block' : 'hidden'}`}>
          <NavBarItemsMobile navBarDir={navBarDir} />
        </div>
      </nav>
      { renderPageHeader() }
      { renderMainContent() }
    </div>
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
        className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">{item}</Link>
    )
  }

  return (
    <>
      <div className="pt-2 pb-3">
        <a href="#" className="block pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out">Dashboard</a>
        { renderNavBarItem('Releases') }
        { renderNavBarItem('Team')}
      </div>
      <div className="pt-4 pb-3 border-t border-gray-200">
        <div className="flex items-center px-4">
          <div className="flex-shrink-0">
            <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium leading-6 text-gray-800">Tom Cook</div>
            <div className="text-sm font-medium leading-5 text-gray-500">tom@example.com</div>
          </div>
        </div>
        <div className="mt-3">
          <a href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out">Your Profile</a>
          <a href="#" className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out">Settings</a>
          <a href="#" className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out">Sign out</a>
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
      <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
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
        <div className="flex-shrink-0 flex items-center">
          <img className="h-8 w-auto" src="workflow-logo-on-white.svg" alt="logo" />
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
    <button className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out">
      <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    </button>
  )
}

const ProfileDropDown = () => {
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
        <button onClick={() => setShowProfileDropDown(!showProfileDropDown)} className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true">
        {/* <button @click="open = !open" className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true" x-bind:aria-expanded="open"> */}
          <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        </button>
      </>
    )
  }

  if (showProfileDropDown) {
    return (
      <>
        { renderAvatarButton() }
        <div ref={profileDropDownRef} x-show="open" className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
          {/* <div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"> */}
          <div className="py-1 rounded-md bg-white shadow-xs">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
            <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to={{pathname: `/settings`}}>Settings</Link>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
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
