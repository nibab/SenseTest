import React from 'react'
import { Analytics } from 'aws-amplify'
import { AuthState } from '../store/authentication/actions'

type EventType = 
    'CREATED_PROJECT' | 
    'CREATED_ISSUE' | 
    'CREATED_ANNOTATION' | 
    'RESOLVED_ISSUE' |
    'OPENED_SIMULATOR_ON_ISSUE_PAGE' |
    'OPENED_MEMBERS_MODAL' |
    'RESOLVED_ISSUE' |
    'STARTED_SIMULATOR_ON_CREATE_PAGE' |
    'TOOK_SIMULATOR_SCREENSHOT' | 
    'INVITED_USER' | 
    'VIEW_ISSUE' |
    'UPLOAD_NEW_REVISION'

export class AnalyticsClient {
    static record(event: EventType, authState: AuthState) {
        Analytics.record({
            name: event,
            attributes: {
                email: authState.email
            }
        })
    }
}