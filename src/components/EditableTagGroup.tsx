
import React, { Props, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tag, Input, Icon } from 'antd';

type EditableTagGroupProps = {
  tags?: string[]
}

type EditableTagGroupState = {
  tags: string[],
  inputVisible: boolean,
  inputValue: string
}

export const EditableTagGroup = ({tags}: EditableTagGroupProps) => {
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [tagsList, setTagsList] = useState(tags !== undefined ? tags : [])
  const inputRef = useRef<Input>(null);

  const handleClose = (removedTag: string) => {
    const tags = tagsList.filter(tag => tag !== removedTag);
    console.log(tags);
    setTagsList(tags)
  };
  
  const showInput = () => {
    setInputVisible(true)
  }

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value)
  }

  const handleInputConfirm = () => {
    if (inputValue && tagsList.indexOf(inputValue) === -1) {
      setTagsList([...tagsList, inputValue])
    }
    setInputVisible(false)
    setInputValue("")
  }

  const forMap = (tag: any) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e: any) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };
  
  const tagChild = tagsList.map(forMap);
  if (!inputVisible) {
      tagChild.push(
        <Tag onClick={showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
            <Icon type="plus" /> New Tag
        </Tag>
      )
  } else {
    tagChild.push(
      <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
      />
    )
  }
  
  return (
    <div onClick={(e) => e.stopPropagation()}>
        {tagChild}
    </div>
  )
}          