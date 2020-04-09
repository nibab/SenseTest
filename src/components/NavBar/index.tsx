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
            <ProfileDropDown signOut={signOut} />
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
      <div className="w-full h-full flex flex-row relative">
        <div className="w-72 h-full p-2 left-0 ml-2">
						<div className="bg-white shadow-lg p-2 h-full rounded-lg flex">	
							<div className="bg-green-300 rounded-lg w-12 h-12 my-auto">
                <img src="appIcon.png" />
							</div>
							<div className="m-1 w-12 h-8 my-auto content-end">
								<h5 className='text-sm font-bold truncate'>App.ly</h5>
								<div className='-mt-3 tracking-tighter text-xs uppercase text-gray-600 font-semibold '>
									V 0.12.3
								</div>
							</div>
							{/* <div className="flex flex-auto relative my-auto z-0 overflow-hidden justify-end">

								<img className="relative z-30 inline-block h-8 w-8 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
								<img className="relative z-20 -ml-2 inline-block h-8 w-8 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
								<img className="relative z-10 -ml-2 inline-block h-8 w-8 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
								<img className="relative mr-0 z-0 -ml-2 inline-block h-8 w-8 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
								<div className="bg-blue-500 rounded-full w-10 -ml-1 flex h-8 font-bold items-center justify-center text-gray-300" style={{fontSize: "13px"}}> 
									+15
								</div>
							</div> */}
							<div className="bg-gray-400 h-10 m-3 my-auto z-0 overflow-hidden justify-end" style={{width: "2px"}}></div>
							<div className="flex items-center text-sm font-bold text-green-700">
								<div className="border-green-500 border-solid border-2 h-10 px-3 flex rounded-lg items-center justify-center ">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-2 icon-launch"><path className="secondary" d="M6.64 6.46h7.07a1 1 0 0 1 .7 1.71l-4.24 4.24a1 1 0 0 1-.7.3H2.38A1 1 0 0 1 1.7 11l4.24-4.24a1 1 0 0 1 .7-.3zm10.9 10.9a1 1 0 0 1-.3.71L13 22.31a1 1 0 0 1-1.7-.7v-7.07a1 1 0 0 1 .29-.71l4.24-4.24a1 1 0 0 1 1.7.7v7.07z"/><path className="primary" d="M5.78 13.19a15.94 15.94 0 0 1 14.39-10.4 1 1 0 0 1 1.04 1.04 15.94 15.94 0 0 1-10.4 14.39 1 1 0 0 1-1.17-.37 14.1 14.1 0 0 0-3.5-3.5 1 1 0 0 1-.36-1.16zm.59 2.57a16.2 16.2 0 0 1 1.87 1.87 1 1 0 0 1-.47 1.6c-.79.25-1.6.42-2.4.54a1 1 0 0 1-1.14-1.13c.12-.82.3-1.62.53-2.41a1 1 0 0 1 1.6-.47z"/><path className="secondary" d="M7.23 10.26a19.04 19.04 0 0 1 6.5 6.51c-.92.58-1.9 1.07-2.92 1.45a1 1 0 0 1-1.17-.37 14.1 14.1 0 0 0-3.5-3.5 1 1 0 0 1-.36-1.16c.38-1.03.87-2 1.45-2.93zM17.62 3.1c.84-.17 1.7-.27 2.55-.3a1 1 0 0 1 1.04 1.04c-.03.86-.13 1.71-.3 2.55a19.2 19.2 0 0 0-3.29-3.29zm-3.91 7.2a2 2 0 1 1 2.83-2.83 2 2 0 0 1-2.83 2.83z"/></svg>
									Approve
								</div>
								
							</div>					
						</div>
					</div>	
        <div className="my-3 w-auto h-8 flex absolute flex-row right-0 mr-3">
          <NotificationButton />
          <div className="h-8 object-contain">    
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
    <button className="my-auto h-8 w-8 mr-2 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out">
      <svg className="mx-auto h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
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
        <div ref={profileDropDownRef} x-show="open" className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50">
          {/* <div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"> */}
          <div className="py-1 rounded-md bg-white shadow-xs">
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
