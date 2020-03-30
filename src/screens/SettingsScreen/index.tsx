import React from 'react';

const UserProfile = {
  name: 'John Appleseed',
  email: 'johnappleseed@gmail.com',
  role: 'Admin'
}

const SettingsScreen = () => {
  return (
    <div>
      <PlanPanel />
      {/* <PaymentsPanel /> */}
    </div>
  )
}

const PaymentsPanel = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Payment method
            </h3>
            <div className="mt-5">
              <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
                <div className="sm:flex sm:items-start">
                  <svg className="h-8 w-auto sm:flex-shrink-0 sm:h-6" fill="none" viewBox="0 0 36 24">
                    <rect width="36" height="24" fill="#224DBA" rx="4" />
                    <path fill="#fff" fill-rule="evenodd" d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z" clip-rule="evenodd" />
                  </svg>
                  <div className="mt-3 sm:mt-0 sm:ml-4">
                    <div className="text-sm leading-5 font-medium text-gray-900">
                      Ending with 4242
                    </div>
                    <div className="mt-1 text-sm leading-5 text-gray-600 sm:flex sm:items-center">
                      <div>
                        Expires 12/20
                      </div>
                      <span className="hidden sm:mx-2 sm:inline">
                        &middot;
                      </span>
                      <div className="mt-1 sm:mt-0">
                        Last updated on 22 Aug 2017
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
                  <span className="inline-flex rounded-md shadow-sm">
                    <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                      Edit
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const PlanPanel = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Manage subscription
          </h3>
          <div className="mt-2 sm:flex sm:items-start sm:justify-between">
            <div className="max-w-xl text-sm leading-5 text-gray-500">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptatibus corrupti atque repudiandae nam.
              </p>
            </div>
            <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
              <span className="inline-flex rounded-md shadow-sm">
                <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                  Change plan
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

// const SettingsScreen = () => {
//   const enabled = false;
//   const clientId = '5df1298dd0f7fb1a408d4ef1';
//   const redirectURI = 'http://localhost:9090';
//   const zeplinURL = `https://api.zeplin.dev/v1/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=code`;

//   const [isZeplinIntegrationActivated, setIsZeplinIntegrationActivated] = useState(false);

//   useEffect(() => {
//     async function setZeplinIntegrationStatus() {
//       const activated = await ZeplinAuth.isZeplinIntegrationActivated()
//       setIsZeplinIntegrationActivated(!!activated ? true : false)
//     }
//     setZeplinIntegrationStatus()
//   }, [])

//   return (
//     <Container style={{ paddingTop: 30 }}>
//       <h3>Settings</h3>
//       <Card>
//         <Card.Header>Account Details</Card.Header>
//         <Card.Body>
//           <p><b>Name</b>: {UserProfile.name}</p>
//           <p><b>Email</b>: {UserProfile.email}</p>
//           <p><b>Role</b>: {UserProfile.role}</p>
//         </Card.Body>
//       </Card>
//       <br/>
//       <h3>Integrations</h3>
//       <CardDeck>
//         <Card style={{ maxWidth: '250px', }}>
//           <Card.Header>Zeplin</Card.Header>
//           <Card.Img src='zeplin.png'/>
//           <Card.Footer>
//             {isZeplinIntegrationActivated ? (
//               <p style={{ display: 'inline-block'}}>Enabled</p>
//             ) : (
//               <Fragment>
//                 <p style={{ display: 'inline-block'}}>Disabled</p>
//                 <Button style={{ float: 'right' }} variant='primary'
//                   disabled={isZeplinIntegrationActivated}
//                   href={zeplinURL}>Enable</Button>
//               </Fragment>
//             )}
//           </Card.Footer>
//         </Card>
//       </CardDeck>
//     </Container>
//   )
// }

export default SettingsScreen;