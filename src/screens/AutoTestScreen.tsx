import React, { useState } from "react"
import { Card, Button, List, Icon, Row, Col, Modal } from 'antd';
import { StyleSheet }  from '../../src/GlobalTypes'
import { AnnotationCanvas } from '../components/AnnotationCanvas';
import { EditableTagGroup } from '../components/EditableTagGroup'
import { Typography } from 'antd';
import { AppetizeMock } from "../components/AppetizeMock";

const { Title } = Typography;

export const AutoTestScreen =  ({}) => {
    return (<div>
        <AppetizeMock />
    </div>)
}
