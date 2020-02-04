import React, { useRef } from 'react';
import { ZeplinScreen } from '../utils/ZeplinAuth';
import ZeplinScreenCard from './ZeplinScreenCard';

type ZeplinScreenSelectorProps = {
    filteredScreens: ZeplinScreen[],
    setSelectedScreen: (screenId: string) => void 
}

export const ZeplinScreenSelector = ({filteredScreens, setSelectedScreen} : ZeplinScreenSelectorProps) => {
    let width = 300;
    return (
        <div>
            {!!filteredScreens && filteredScreens.map((screen: ZeplinScreen) => (
              <ZeplinScreenCard
                zeplinScreen={screen}
                onClick={() => setSelectedScreen(screen.id)}
                hoverable={true}
                width={width}
              />
            ))}
        </div>
    )
}