import { DeviceType } from './types'

type DeviceContainerStyle = {
    width: string
    height: string
    scale?: string
}

export const getDeviceDimensions = (deviceType: DeviceType): DeviceContainerStyle =>  {
    switch(deviceType) {
        case 'IPHONE_7': 
            return {
                height: '600px',
                width: '287px',
            }
        case 'IPHONE_7_PLUS': 
            return {
                height: '615px',
                width: '298px',
                scale: '65'
            }
        case 'IPHONE_8': 
            return {
                height: '600px',
                width: '287px'
            }
        case 'IPHONE_8_PLUS': 
            return {
                height: '605px',
                width: '294px',
                scale: '64'
            }
        case 'IPHONE_X':
            return {
                height: '583px',
                width: '281px'
            }
        case 'IPHONE_XS':
            return {
                height: '583px',
                width: '281px'
            }
        case 'IPHONE_XS_MAX':
            return {
                height: '605px',
                width: '300px',
                scale: '64'
            }
        case 'IPHONE_11_PRO':
            return {
                height: '583px',
                width: '281px'
            }
        case 'IPHONE_11_PRO_MAX':
            return {
                height: '606px',
                width: '300px',
                scale: '64'
            }
    }

}