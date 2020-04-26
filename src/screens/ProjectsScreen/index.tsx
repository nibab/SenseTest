import React, { useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createProject } from '../../graphql/mutations'
import { CreateProjectInput, CreateProjectMutation } from "../../API"
import { v4 as uuidv4 } from 'uuid'
import { Project } from '../../types'
import Log from '../../utils/Log'

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

	return (<>
		<p> Hello Basterd </p>
		<button className='bg-green-300' onClick={async () => await createNewProject()}> Create Project </button>
	</>)
}

export default ProjectsScreen