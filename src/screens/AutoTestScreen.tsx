import React, { useState, useContext } from "react"
import { Card, Button, List, Icon, Row, Col, Modal } from 'antd';
import { Typography } from 'antd';
import { AppetizeMock } from "../components/AppetizeMock";
import Rekognition, { TextDetectionList } from "aws-sdk/clients/rekognition"
import AWS from "aws-sdk"
import { EditableTagGroup } from "../components/EditableTagGroup";

const { Title } = Typography

interface AppetizeContextProps {
    img: string
}

export const AppetizeContext = React.createContext({} as AppetizeContextProps)

export const AutoTestScreen =  ({}) => {
    const [autoTestCasesList, setAutoTestCasesList] = useState<AutoTestCaseData[]>([])
    const [createTestModalVisible, setCreateTestModalVisible] = useState(false)
    const [detectedWords, setDetectedWords] = useState<string[]>([])

    return (
        <AppetizeContext.Provider value={{img: ""}}>
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden', margin: '-10px'}}>
                <div style={{ flex: 0.2, width: 'auto', objectFit:'contain'}}>
                    <AppetizeMock />
                    <Button onClick={async () => {
                        //setCreateTestModalVisible(true)
                        const textDetections = await callRekognition()
                        const textListToDisplay: string[] = []
                        textDetections.flat().forEach((textDetection) => {
                            textListToDisplay.push(textDetection.DetectedText)
                        })
                        console.log(textListToDisplay)
                        setDetectedWords(textListToDisplay)
                    }}>Call Rekognition</Button>
                </div>
                <div style={{flex: 0.8, marginLeft: '10px'}}>
                    <EditableTagGroup tags={detectedWords} />
                    {/* <TestCaseList testCases={autoTestCasesList} /> */}
                </div>
            </div>
            
            <CreateAutoTestCaseModal visible={createTestModalVisible} onFinish={(autoTestCaseData) => {
                setCreateTestModalVisible(false)
            }} />
            
        </AppetizeContext.Provider>
    )
}

type TestCaseListProps = {
    testCases: AutoTestCaseData[]
}

const TestCaseList = ({testCases}: TestCaseListProps) => {
    return (<div>WAGWANA</div>)
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

const callRekognition = async (): Promise<TextDetectionList> => {
    return new Promise(async (resolve, reject) => {
        const initAWSClient = () => {
            AWS.config.region = 'us-east-1'; // Region
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-east-1:530e7faf-f51a-4cd1-992c-b4a034295254'
            });
        }
    
        initAWSClient()
        const imageBytes = await getBytesFromImage("newsScreenshot.png")
        //Call Rekognition  
        const params: Rekognition.DetectTextRequest = {
            Image: {
              Bytes: imageBytes
            }
        };
        const rekognitionClient = new Rekognition()
        const recognitionRequest = rekognitionClient.detectText(params, (err, data) => {
            resolve(data.TextDetections)
        })
        recognitionRequest.send()
    })
}

const getBytesFromImage = (url: string): Promise<Uint8Array> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = "newsScreenshot.png"
        img.onload = () => {
            // Create an empty canvas element
            var canvas = document.createElement("canvas")
            canvas.width = img.width
            canvas.height = img.height
        
            // Copy the image contents to the canvas
            var ctx = canvas.getContext("2d")
            ctx?.drawImage(img, 0, 0)

            // Get the data-URL formatted image
            // Firefox supports PNG and JPEG. You could check img.src to
            // guess the original format, but be aware the using "image/jpg"
            // will re-encode the image.
            var dataURL = canvas.toDataURL("image/png").toString()

            var BASE64_MARKER = ';base64,';
            var base64Index = dataURL.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
            var base64 = dataURL.substring(base64Index);

            base64.replace(/^data:image\/(png|jpg);base64,/, "")

            function _base64ToArrayBuffer(dataURL: string): Uint8Array {
                var binary_string = window.atob(dataURL)
                var len = binary_string.length
                var bytes = new Uint8Array(len)
                for (var i = 0; i < len; i++) {
                    bytes[i] = binary_string.charCodeAt(i)
                }
                return bytes
            }
        
            resolve(_base64ToArrayBuffer(base64))
        }
    })
}