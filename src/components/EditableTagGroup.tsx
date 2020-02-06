
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tag, Input, Icon } from 'antd';

export class EditableTagGroup extends React.Component {
    input: any

    constructor(props: any) {
        super(props)
        this.input = "s"
    }

  state = {
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    inputVisible: false,
    inputValue: '',
  };  

  handleClose = (removedTag: string) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e: any) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  saveInputRef = (input: any) => (this.input = input);

  forMap = (tag: any) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e: any) => {
          e.preventDefault();
          this.handleClose(tag);
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

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    const tagChild = tags.map(this.forMap);
    if (!inputVisible) {
        tagChild.push(
            <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                <Icon type="plus" /> New Tag
            </Tag>
        )
    } else {
        tagChild.push(
            <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
            />
        )
    }
    
    return (
      <div>
        <div>
            {tagChild}
        </div>
      </div>
    );
  }
}          