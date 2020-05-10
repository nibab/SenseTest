import React, { useState, useEffect } from 'react'
import { Geometry, Annotation as AnnotationType, DeviceType } from '../../types'
import {
	PointSelector
} from 'react-image-annotation/lib/selectors'
import Annotation from 'react-image-annotation'
import uuid from 'uuid'
import { getDeviceDimensions } from '../../deviceDimensions'

type AnnotationScreenProps = {
    imageBlob: Blob
    annotations: AnnotationType[]
	onSubmit: (annotation: AnnotationType) => void
	deviceType: DeviceType
}

type DotProps = {
	geometry: Geometry
	annotationId?: string
}

const Dot = ({geometry, annotationId}: DotProps) => {
	if (annotationId !== undefined) {
		return (
			<div className='flex items-center justify-center -mt-3 -ml-3 font-mono text-sm font-semibold text-gray-300 bg-indigo-600 border-2 border-white border-solid rounded-full cursor-pointer w-7 h-7 hover:bg-indigo-400' style={{
				position: 'absolute',
				left: `${geometry.x}%`,
				top: `${geometry.y}%`,
			}}> {annotationId} </div>
		)
	} else {
		return (
			<div className='w-6 h-6 -mt-3 -ml-3 bg-indigo-700 border-2 border-white border-solid rounded-full' style={{
				position: 'absolute',
				left: `${geometry.x}%`,
				top: `${geometry.y}%`,
			}} />
		)
	}
}

const AnnotationScreen = (props: AnnotationScreenProps) => {
	const [annotations, setAnnotations] = useState<AnnotationType[]>([])
	const [annotation, setAnnotation] = useState<AnnotationType| {}>({})

	useEffect(() => {
		// TODO: This is a hacky way to ensure that annotations are displayed after the component has been unmounted.
		// What happens is, if the component gets rendered once, then pushed down the stack and then re-mounted,
		// the annotations are hidden until the mouse hovers over the screenshot.
		setAnnotations(props.annotations)
	}, [props])

	const onChange = (annotation: AnnotationType) => {
		setAnnotation(annotation)
	}

	const onSubmit = (annotation: AnnotationType) => {
		const currentAnnotations = [...annotations]
		const newAnnotation: AnnotationType = {
			geometry: annotation.geometry,
			data: {
				...annotation.data,
				id: `${annotations.length + 1}`
			}
		}
		currentAnnotations.push(newAnnotation)
		setAnnotation({})
        setAnnotations(currentAnnotations)
        props.onSubmit(newAnnotation)
	}

	type RenderHighlightParams = {
		annotation: AnnotationType
		active: boolean
	}

	// Overriding the selector appearence from react-image-annotate
	function renderSelector (params: RenderHighlightParams) {
		const geometry = params.annotation.geometry
		if (!geometry) return null
	  
		return (
			<Dot key={uuid()} geometry={geometry} />
		)
	}

	// Overriding the highlight appearence from react-image-annotate
	const renderHighlight = (params: RenderHighlightParams) => {
		const geometry = params.annotation.geometry
		if (!geometry) return null

		return (
			<Dot key={uuid()} annotationId={`${params.annotation.data.id}`} geometry={geometry} />
		)
	}

	const deviceDimensions = getDeviceDimensions(props.deviceType)

	return (
		<div className='relative flex flex-shrink-0 w-full rounded-lg rounded-r-none'>
			<div className='absolute z-0 w-full h-full ' >
				{/* <img className="object-contain w-full h-full" src='../../../../public/iphonexBlack.png'></img> */}
			</div>	
			
			
			<Annotation 
				className="object-contain p-2 pr-3 mx-auto"
				src={window.URL.createObjectURL(props.imageBlob)} 
				annotations={annotations} 
				enderSelector={renderSelector} 
				renderHighlight={renderHighlight} 
				onSubmit={onSubmit} 
				onChange={onChange} 
				type={PointSelector.TYPE} 
				value={annotation}
			/>
			
		</div>
	)
}

export default AnnotationScreen