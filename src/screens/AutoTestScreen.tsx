import React, { useState } from "react"
import { Card, Button, List, Icon, Row, Col, Modal } from 'antd';
import { StyleSheet }  from '../../src/GlobalTypes'
import { AnnotationCanvas } from '../components/AnnotationCanvas';
import { EditableTagGroup } from '../components/EditableTagGroup'
import { Typography } from 'antd';
import { AppetizeMock } from "../components/AppetizeMock";

const { Title } = Typography;

export const AutoTestScreen =  ({}) => {
    const [autoTestCasesList, setAutoTestCasesList] = useState<AutoTestCaseData[]>([])

    return (<div>
        <AppetizeMock />
        <TestCaseList testCases={autoTestCasesList} />
        <CreateAutoTestCaseModal onFinish={(autoTestCaseData) => {

        }} />
    </div>)
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
    return (<div></div>)
}