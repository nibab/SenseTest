import React, { useState, useRef } from 'react'
import { AssetStorageClient } from '../clients/AssetStorageClient'
import { DropzoneOptions, useDropzone } from 'react-dropzone'
import Log from '../utils/Log'

type DropZoneState = 'WAITING' | 'UPLOADING' | 'DONE' | 'ERROR'
type DropZoneProps = {
    projectId: string
    bundleId: string
    onBundleUploaded: () => void
    title?: string
}
const DropZone = (props: DropZoneProps) => {
    const onDrop: DropzoneOptions["onDrop"] = (acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
      
            reader.onabort = () => Log.info('file reading was aborted')
            reader.onerror = () => Log.info('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
            }

            setFileInputName(file.name)

            AssetStorageClient.createUploadUrl(props.bundleId, props.projectId).then((presignedUrlFields) => {
                Log.info("Presigned url for get " + presignedUrlFields)
                return AssetStorageClient.uploadDataToUrlWithProgress(file, presignedUrlFields, (p) => setCounter(p))
            }).then(() => {
                setVisualState('DONE')
                props.onBundleUploaded()
            }).catch(() => {
                Log.error("Something bad happened")
            })

            reader.readAsArrayBuffer(file)
        })
       
        setVisualState('UPLOADING')
    }

    const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject} = useDropzone({onDrop})
    const [visualState, setVisualState] = useState<DropZoneState>('WAITING')
    const [counter, setCounter] = useState<number>(0)
    const progressBarRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [fileInputName, setFileInputName] = useState<string>()

    const renderWaiting = () => {
        return (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mx-auto w-14 icon-box"><g><path className="secondary" d="M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2zm4 5a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9z"/><path className="primary" d="M4 3h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5c0-1.1.9-2 2-2z"/></g></svg>
                <p className="mt-1 text-sm text-gray-600">
                    
                    <button type="button" className="mr-1 font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline">
                    Upload a file
                    <input type="file" ref={fileInputRef} style={{display: "none"}} />
                    </button>
                    or drag and drop
                </p>
                <p className="mt-1 font-mono text-xs text-gray-500">
                    Upload a .zip or .tar.gz file containing your compressed .app bundle.
                </p>
            </>
        )
    }

    const renderUploading = () => {
        return (
            <div className='outline-none'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mx-auto w-14 icon-box"><g><path className="secondary" d="M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2zm4 5a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9z"/><path className="primary" d="M4 3h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5c0-1.1.9-2 2-2z"/></g></svg>
                <p className="mt-1 text-sm font-bold text-gray-600">
                    File Uploading ...
                </p>
                <div className='w-full h-4 mt-1 bg-gray-300 rounded-full shadow-inner'>
                    <div ref={progressBarRef} className='h-4 bg-green-300 rounded-full shadow-inner' style={{width: `${counter}%`}}>
                    </div>
                </div> 
            </div>
        )
    }

    const renderDone = () => {
        return(
            <>
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full outline-none">
                    <svg className="w-6 h-6 text-green-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                </div>
                <p className="mt-1 font-bold text-gray-600 text-md">
                    Done Uploading
                </p>
                <p className="mt-1 text-sm text-gray-600">
                    { fileInputName }
                </p>
            </>
        )
    }
    
    return (
        <>
            { props.title && <label className="block font-mono text-xs font-semibold leading-5 text-gray-700">
                {props.title}
            </label> }
            <div {...getRootProps()}>
                <div className={`flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 ${ isDragActive ? 'bg-gray-200' : '' } border-dashed rounded-md`} > 
                    
                    
                    { visualState === 'WAITING' && <div className="text-center outline-none">
                        <input {...getInputProps()} />
                        { renderWaiting() }
                    </div> }
                    { visualState === 'UPLOADING' && <div className="w-10/12 text-center"> { renderUploading() }</div>}
                    { visualState === 'DONE' && <div className="w-10/12 text-center"> { renderDone() }</div> }
                </div>
            </div>
            
        </>
    )
}

export default DropZone