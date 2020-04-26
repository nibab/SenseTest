import React from 'react'
import { AppBuildClient } from '../clients/AppBuildClient'
import { API, graphqlOperation } from 'aws-amplify'

const AppBuildScreen = () => {

    const createNewAppBuild = () => {
        AppBuildClient.createAppBuildClient({
            assetId: '1',
            appVersion: '2',
            appName: 'wha',
            assetUrl: "https://appetizetest.s3.amazonaws.com/MovieSwift.zip",
            projectId: '68134e24-ed27-494e-b0bb-8a14f2b3167f'
        })
    }

    const getAppBuilds = async () => {

            
        //const response = await API.graphql(graphqlOperation(getA, {projectId: projectId, limit: 100})) as { data: ProjectPostsByTimeQuery }

    }

    return (
        <>
            <p> App Build Screen </p>
            <button className='bg-green-300' onClick={async () => await createNewAppBuild()}> Create App Build </button>
            <button className='bg-blue-300' onClick={async () => await getAppBuilds()}> Get App Builds </button>
        </>
    )
}

export default AppBuildScreen