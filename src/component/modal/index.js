import React, { forwardRef,useImperativeHandle, useState } from 'react';
import {Modal, Row, Col, Container } from 'react-bootstrap';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


/**
* @author
* @function AppModal
**/

const AppModal = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();

    useImperativeHandle(ref, () => ({
            handleModalOpen(){
                setOpen(true);
            }
        }),
    )

    const uploadUserData = () => {
        console.log(data);
    }

    const handleModalClose = () => {
        setOpen(false);
    }

    return (
        <Modal ref={ref} className="modal" show={open} onHide={handleModalClose} animation={true}>
        <Modal.Body className="product-modal-body">
            <Container>
                <Row style={{  }}>
                    <Col md={{ span: 10 , offset: 1}}>
                        <ValidatorForm useref="form" onSubmit={uploadUserData}>
                            <TextValidator 
                                className="input-field"
                                placeholder="Enter Email"
                                value={data}
                                type="text"
                                variant = "outlined"
                                validators={['required']}
                                errorMessages={['this field is required']}
                                onChange={(e) => setData(e.target.value)}
                            />                                                      
                            <label className="tandc">
                                Welcome Again! By Logging in you can
                                explore more and connect with your batchmates.
                            </label>
                            <button className="register-btn">
                                Login
                            </button>
                        </ValidatorForm>
                    </Col>
                </Row>
            </Container>
        </Modal.Body>
        <Modal.Footer>
            <button className="Delete-btn" onClick={handleModalClose}>
                Close
            </button>
            <button className="Update-btn" onClick={handleModalClose}>
                Import
            </button>
        </Modal.Footer>
        </Modal>
    )

})

export default AppModal