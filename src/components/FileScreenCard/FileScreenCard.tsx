import React, { useState, useEffect } from 'react';
import { Storage } from "aws-amplify";
import { Card, Icon } from 'antd'
import { UploadFile } from 'antd/lib/upload/interface';
import './FileScreenCard.css';
import Log from '../../utils/Log';

export type S3File = {
  s3Key: string
  name: string
}

type FileScreenCard = {
  file: S3File | UploadFile
  onClick?: () => void
}

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (file && file.type?.match('image.*')) {
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    } else {
      resolve('')
    }
  });
}

const FileScreenCard = ({ file, onClick }: FileScreenCard) => {
  const actions = onClick ? (
    [
      <Icon type='delete' key='remove' onClick={() => onClick()}/>,
    ]
  ) : [];

  const [ preview, setPreview ] = useState()

  useEffect(() => {
    const setRawFilePreview = async () => {
      const filePreview = await getBase64(file);
      setPreview(filePreview)
    }
    const setS3FilePreview = async () => {
      Storage.get((file as S3File).s3Key)
      .then(result => {
        Log.info(JSON.stringify(result))
        setPreview(result)
      })
      .catch(error => Log.error(error))
    }

    if ((file as S3File).s3Key) {
      setS3FilePreview()
    } else {
      setRawFilePreview()
    }
  },[]);

  return (
    <Card style={{ width: 300, margin: '0 auto', display: 'inline-block', marginRight: 5 }}
      onClick={onClick && onClick}
      actions={actions}
      cover={
        <img alt="example" src={preview}
          style={{ maxHeight: 400, objectFit: 'scale-down' }}/>
      }
      className='file-screen-card'
    >
      <Card.Meta title={file.name}/>
    </Card>
  )
}

export default FileScreenCard;
