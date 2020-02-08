import React, { useState, useContext, useEffect, useRef } from "react"
import { AppetizeContext } from "../screens/AutoTestScreen"
import TextArea from "antd/lib/input/TextArea"

const HEIGHT = 544

export const AppetizeMock = () => {
    const appetizeContext = useContext(AppetizeContext)
    // for testing the context sharing
    const textAreaRef= useRef<TextArea>(null);

    return (
        <div style={{ width: '250px', textAlign: 'center'}}> 
            <img style={{ width: '250px', height: `${HEIGHT}px` }} src="newsScreenshot.png" />
            {/* // for testing the context sharing */}
            {/* <TextArea ref={textAreaRef} onClick={() => {
                const text = textAreaRef.current?.state === undefined ? "" : textAreaRef.current.state.value
                debugger
                appetizeContext.img = text
            }}></TextArea> */}
        </div>
    )
}