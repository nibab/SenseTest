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

    return (
        <AppetizeContext.Provider value={{img: ""}}>
            <AppetizeMock />
            <TestCaseList testCases={autoTestCasesList} />
            <CreateAutoTestCaseModal onFinish={(autoTestCaseData) => {

            }} />
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
}

const CreateAutoTestCaseModal = ({onFinish}: CreateAutoTestCaseModalProps) => {
    const appetizeContext = useContext(AppetizeContext)
    console.log("CreateAutoTestCaseModal: " + appetizeContext)
    return (<div></div>)
}