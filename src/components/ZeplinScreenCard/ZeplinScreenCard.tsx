import React from 'react';
import { Card, Icon } from 'antd'
import { ZeplinScreen } from '../../utils/ZeplinAuth';
import './ZeplinScreenCard.css';

type ZeplinScreenCard = {
  zeplinScreen: ZeplinScreen
  hoverable?: boolean
  onClick?: () => void
  width: number
}

const ZeplinScreenCard = ({ zeplinScreen, hoverable=false, onClick, width }: ZeplinScreenCard) => {
  const actions = !hoverable && onClick ? (
    [
      <Icon type='delete' key='remove' onClick={() => onClick()}/>,
    ]
  ) : []
  const height = Math.round(width * 16/9)
  return (
    // Width and Height make a 9:16 ratio
    <Card style={{ width: width, height: height, margin: '0 auto', display: 'inline-block', marginRight: 5, borderRadius: '10px' }}
      hoverable={hoverable}
      onClick={onClick && onClick}
      actions={actions}
      cover={
        <img alt="example" src={zeplinScreen.image.original_url}
          style={{ maxHeight: height - 2, objectFit: 'scale-down' }}/>
      }
      className='zeplin-screen-card'
    >
      <Card.Meta title={zeplinScreen.name}/>
    </Card>
  )
}

export default ZeplinScreenCard;
