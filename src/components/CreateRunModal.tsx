import React, { Fragment, useState, useEffect } from 'react';
import RunForm, { RunFormTypes } from './RunForm';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type CreateRunModal = {
    show: boolean,
    handleClose: () => void,
    handleSubmit: () => void,
  } & RunFormTypes;
  
export const CreateRunModal = ({show, handleClose, handleSubmit,
                           runType, setRunType, version,
                           setVersion}: CreateRunModal) => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Start a run</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RunForm setVersion={setVersion} setRunType={setRunType}
           version={version} runType={runType}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={!version}>
            Start
          </Button>
        </Modal.Footer>
      </Modal>
    );
}