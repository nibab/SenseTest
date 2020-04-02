import React, { useState, useContext, useEffect, useRef } from "react"
import TextArea from "antd/lib/input/TextArea"
import { Button } from "antd"
import { StyleSheet } from '../../src/GlobalTypes'

const HEIGHT = 544

type AppetizeMockProps = {
    onScreenshot?: (imageSrc: string) => void
}

export const AppetizeMock = ({onScreenshot}: AppetizeMockProps) => {
    const mockImageSrc = ["newsScreenshot.png", "newsScreenshot2.png", "newsScreenshot3.png", "newsScreenshot4.png"]
    const [imageToDisplay, setImageToDisplay] = useState<string>(mockImageSrc[0])
    
    // for testing the context sharing
    const textAreaRef= useRef<TextArea>(null);

    return (
        <div>
            <div style={{ width: '250px', textAlign: 'center'}} onClick={() => {
                const indexOfImageToDisplay = Math.floor(Math.random() * mockImageSrc.length)
                setImageToDisplay(mockImageSrc[indexOfImageToDisplay])
            }}> 
                <img style={{ width: '250px', height: `${HEIGHT}px` }} src={imageToDisplay} />
                {/* // for testing the context sharing */}
                {/* <TextArea ref={textAreaRef} onClick={() => {
                    const text = textAreaRef.current?.state === undefined ? "" : textAreaRef.current.state.value
                    debugger
                    appetizeContext.img = text
                }}></TextArea> */}
            </div>
            <Button style={styles.button} onClick={() => {
                if (onScreenshot !== undefined) {
                    onScreenshot(imageToDisplay)
                }
            }}>Annotate</Button>
        </div>
        
    )
}

const styles: StyleSheet = {
    button: {
        float: 'right',
        marginTop: '10px',
        marginRight: '3px',
        marginBottom: '3px'
    }
}