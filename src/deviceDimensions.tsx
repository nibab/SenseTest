import { DeviceType } from './types'

type DeviceContainerStyle = {
    width: string
    height: string
}

export const getDeviceDimensions = (deviceType: DeviceType): DeviceContainerStyle =>  {
    switch(deviceType) {
        case 'IPHONE_X':
            return {
                height: '583px',
                width: '281px'
            }
        case 'IPHONE_8': 
            return {
                height: '600px',
                width: '287px'
            }
        default:
            return {
                height: '583px',
                width: '281px'
            }
    }

}