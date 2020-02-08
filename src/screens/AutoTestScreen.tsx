import React, { useState, useContext } from "react"
import { Card, Button, List, Icon, Row, Col, Modal } from 'antd';
import { StyleSheet }  from '../../src/GlobalTypes'
import { AnnotationCanvas } from '../components/AnnotationCanvas';
import { EditableTagGroup } from '../components/EditableTagGroup'
import { Typography } from 'antd';
import { AppetizeMock } from "../components/AppetizeMock";

const { Title } = Typography

interface AppetizeContextProps {
    img: string
}

export const AppetizeContext = React.createContext({} as AppetizeContextProps)

export const AutoTestScreen =  ({}) => {
    const [autoTestCasesList, setAutoTestCasesList] = useState<AutoTestCaseData[]>([])
    const [createTestModalVisible, setCreateTestModalVisible] = useState(false)

    return (
        <AppetizeContext.Provider value={{img: ""}}>
            <AppetizeMock />
            <TestCaseList testCases={autoTestCasesList} />
            <CreateAutoTestCaseModal visible={createTestModalVisible} onFinish={(autoTestCaseData) => {
                setCreateTestModalVisible(false)
            }} />
            <Button onClick={() => {
                setCreateTestModalVisible(true)
            }}>Open Modal</Button>
        </AppetizeContext.Provider>
    )
}

type TestCaseListProps = {
    testCases: AutoTestCaseData[]
}

const TestCaseList = ({testCases}: TestCaseListProps) => {
    return (<div></div>)
}

type AutoTestCaseData = {

}

type CreateAutoTestCaseModalProps = {
    onFinish: (autoTestCaseData: AutoTestCaseData) => void
    visible: boolean
}

const CreateAutoTestCaseModal = ({onFinish, visible}: CreateAutoTestCaseModalProps) => {
    const appetizeContext = useContext(AppetizeContext)
    console.log("CreateAutoTestCaseModal: " + appetizeContext)
    return (<Modal visible={visible} onOk={() => onFinish({})} onCancel={() => onFinish({})}></Modal>)
}