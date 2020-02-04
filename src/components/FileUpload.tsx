import React from 'react';
import { Upload, Icon, message } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';

const { Dragger } = Upload;

type FileUploadProps = {
  onUpload: (file: UploadFile) => void
}

const FileUpload = ({ onUpload }: FileUploadProps) => {
  const onChange = (info: any) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      onUpload(info.file)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  const onBeforeUpload = (file: UploadFile) => {
    onUpload(file);
    return false;
  }

  return (
    <Dragger name='file' multiple={false} accept='image/*' onChange={onChange}
      beforeUpload={onBeforeUpload}>
      <p className="ant-upload-drag-icon">
        <Icon type="inbox" />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Only one file per test is supported at this time.
      </p>
    </Dragger>
  )
  
}

export default FileUpload;
