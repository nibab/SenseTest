import React, { Fragment } from 'react';
import ZeplinAuth, { ZeplinScreen, ZeplinProject } from '../utils/ZeplinAuth';
import { Card, Select } from 'antd';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import ZeplinScreenCard from './ZeplinScreenCard';
import { ZeplinScreenSelector } from './ZeplinScreenSelector';

const { Option } = Select;

type ZeplinProjectCard = {
    id: string
    name: string
    platform: string
    status: string
    setSelectedProject: (selectedProjectId: string) => void
}

const ZeplinProjectCard = ({ id, name, platform, status, setSelectedProject }: ZeplinProjectCard) => (
  <Card hoverable style={{ maxWidth: 200 }} title={name} onClick={() => setSelectedProject(id)}>
    <b>Platform:</b> {platform}<br/>
    <b>Status:</b> {status}<br/>
  </Card>
)

type ZeplinImportProps = {
  setZeplinScreen: (zeplinScreen: ZeplinScreen) => void
}

type ZeplinImportState = {
  projects: ZeplinProject[]
  screens: ZeplinScreen[]
  selectedProject: ZeplinProject | null
  selectedScreen: ZeplinScreen | null
  query: string | null
  filteredScreens: ZeplinScreen[]
  isLoadingScreens: boolean
  isLoadingProjects: boolean
}

export default class ZeplinImport extends React.Component<ZeplinImportProps, ZeplinImportState> {
    constructor(props: any) {
        super(props)
        this.state = {
            projects: [],
            screens: [],
            selectedProject: null,
            selectedScreen: null,
            query: null,
            filteredScreens: [],
            isLoadingScreens: false,
            isLoadingProjects: true
        }
        this.setSelectedProject = this.setSelectedProject.bind(this);
        this.setSelectedScreen = this.setSelectedScreen.bind(this);
        this.onQueryChanged = this.onQueryChanged.bind(this);
    }

    componentDidMount() {
        this.getProjects()
    }

    onQueryChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.currentTarget.value;
      if (!!query) {
        this.setState({ query });
        console.log(query)
        const filteredScreens = this.state.screens.filter(screen => screen.name.toLowerCase().includes(query.toLowerCase()));
        this.setState({ filteredScreens });
      } else {
        const screens = this.state.screens;
        this.setState({ filteredScreens: screens });
      }
    }

    setSelectedProject = (selectedProjectId: string) => {
        const selectedProject = this.state.projects.filter(project => project.id === selectedProjectId)[0];
        this.setState({ selectedProject, isLoadingScreens: true });
        this.getScreens(selectedProjectId);
    }

    setSelectedScreen = (selectedScreenId: string) => {
        const selectedScreen = this.state.screens.filter(screen => screen.id === selectedScreenId)[0];
        this.setState({ selectedScreen });
        this.props.setZeplinScreen(selectedScreen)
    }

    async getProjects() {
        const credentials = ZeplinAuth.getCredentials()
        const apiURL = 'https://api.zeplin.dev/v1/projects?limit=30&offset=0';
        const response = await fetch(apiURL, {
            method: 'GET',
            mode: 'cors',
            body: null,
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${(await credentials).accessToken}`
            }
        })
        const data = await response.json()
        const zeplinProjects: ZeplinProject[] = []
        for (let project in data) {
            if (isZeplinProject(data[project])) {
                zeplinProjects.push(data[project])
            }
        }
        this.setState({
            projects: zeplinProjects,
            isLoadingProjects: false
        })
    }

    /* TODO: Use sections, support pagination */
    async getScreens(projectId: string) {
        const credentials = ZeplinAuth.getCredentials()

        const apiURL = `https://api.zeplin.dev/v1/projects/${projectId}/screens?limit=30&offset=0`;
        const response = await fetch(apiURL, {
            method: 'GET',
            mode: 'cors',
            body: null,
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${(await credentials).accessToken}`
            }
        })
        const data = await response.json()
        const zeplinScreens: ZeplinScreen[] = []
        for (let screen in data) {
            if (isZeplinScreen(data[screen])) {
                zeplinScreens.push(data[screen])
            }
        }
        this.setState({
            screens: zeplinScreens,
            filteredScreens: zeplinScreens,
            isLoadingScreens: false
        })
    }

    renderScreens() {
      return (
        <div>
            {!!this.state.screens.length && (
              <Form.Group>
                <Form.Control placeholder='search...' type='text'
                  onChange={this.onQueryChanged}/>
              </Form.Group>
            )}
            <ZeplinScreenSelector filteredScreens={this.state.filteredScreens} setSelectedScreen={this.setSelectedScreen} />
        </div>
      )
    }

    renderProjects() {
      return (
        <Select loading={this.state.isLoadingProjects} onChange={(projectId: string) => this.setSelectedProject(projectId)}>
          {this.state.projects.map((project: ZeplinProject) => (
            <Option value={project.id}>{project.name}</Option>
          ))}
        </Select>
      )
    }

    render() {
        const selectedProject = this.state.selectedProject;
        const projectSelector = (
          <Fragment>
            <p className='form-label' style={{ textAlign: 'left' }}>Select a project</p> {/* WATCH OUT THIS RELIES ON BOOTSTRAP STYLES */}
            {this.renderProjects()}
          </Fragment>
        )
        const screenSelector = !!selectedProject && (
          <Fragment>
            <p className='form-label' style={{ marginTop: '10px', textAlign: 'left' }}>Select a screen</p>
            {this.renderScreens()}
          </Fragment>
        )
        return (
          <Container style={{width: '100%'}}>
            <Form>
              {projectSelector}
              {screenSelector} 
            </Form>
          </Container>
        )
    }
}

function isZeplinProject(object: any): object is ZeplinProject {
    return object.id !== undefined &&
        object.name !== undefined &&
        object.thumbnail !== undefined &&
        object.platform !== undefined &&
        object.status !== undefined && 
        object.created !== undefined &&
        object.updated !== undefined &&
        object.number_of_screens !== undefined &&
        object.number_of_components !== undefined &&
        object.number_of_text_styles !== undefined &&
        object.number_of_colors !== undefined &&
        object.number_of_members !== undefined
}

function isZeplinScreen(object: any): object is ZeplinProject {
    return object.id !== undefined &&
        object.name !== undefined &&
        object.created !== undefined &&
        object.updated !== undefined &&
        object.tags !== undefined &&
        object.image !== undefined &&
        object.number_of_versions !== undefined &&
        object.number_of_notes !== undefined
}