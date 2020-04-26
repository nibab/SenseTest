import React, { useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createProject } from '../../graphql/mutations'
import { CreateProjectInput, CreateProjectMutation, GetProjectQuery } from "../../API"
import { v4 as uuidv4 } from 'uuid'
import { Project } from '../../types'
import Log from '../../utils/Log'
import { getProject } from '../../graphql/queries'

const ProjectsScreen = () => {
	const [currentProjects, setCurrentProjects] = useState<string[]>()


	const getAllProjects = async () => {
		
	}

	const createNewProject = (): Promise<Project> => {
		return new Promise(async (resolve, reject) => {
			const createProjectInput: CreateProjectInput = {
				name: 'TestProject',
				id: uuidv4() 
			}
	
			try {
				const createProjectResult = await API.graphql(
					graphqlOperation(createProject, {input: createProjectInput})
				) as { data: CreateProjectMutation }
	
				const newProject = createProjectResult.data.createProject!
				// Create project that can be displayed in the app.
				const _newProject: Project = {
					id: newProject.id,
					name: newProject.name,
					posts: [],
					appBuilds: [],
					currentAppBuild: {
						id: '1',
						project: '1',
						name: '1',
						assetId: '2',
						appetizeKey: '1',
						createdAt: 'now',
						version: '12',
						uploadedByUserId: '1'
					}
				}

				Log.info(`Succeeded in creating project ${JSON.stringify(_newProject)}.`, "ProjectsScreen")
				resolve(_newProject)
			} catch (err) {
				Log.error(`There was an error creating a project ${JSON.stringify(err)}.`, "ProjectsScreen")
				reject()
			}
		})
		
	}

	const getProjectInfo = async () => {
		const project = await API.graphql(graphqlOperation(getProject, {id: '68134e24-ed27-494e-b0bb-8a14f2b3167f'})) as {data: GetProjectQuery}
		console.log(project.data)
		

    }

	return (<>
		<p> Hello Basterd </p>
		<button className='bg-green-300' onClick={async () => await createNewProject()}> Create Project </button>
		<button className='bg-blue-300' onClick={async () => await getProjectInfo()}> Get Project </button>
	</>)
}

export default ProjectsScreen