
import { useState } from "react"
import { Button, Modal, Form} from "react-bootstrap";

import { useWeb3React } from '@web3-react/core';

export default function ModalCreateFundraiser(props){

    const {account} = useWeb3React();
    
    const {fundraiserFactoryContract} = props;
    
    const [name,setName] = useState(false);
    const [description,setDescription] = useState(false);
    const [imageURL,setImageURL] = useState(false);
    const [url,setUrl] = useState(false);
    const [beneficiary, setBeneficiary] = useState(false);


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = async (event) => {

        event.preventDefault();
        await fundraiserFactoryContract.methods.createFundraiser(     
                name,
                description,
                imageURL,
                url,
                beneficiary   
        ).send(
            { from: account}
            )
        alert('transaction submitted');
        handleClose()
    }
    

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Create
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               Create a new fundraise
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3 ' controlId='fundraise-name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' placeholder='A legit project' onChange={(e)=> setName(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className='mb-3 ' controlId='fundraise-description'>
                        <Form.Label>description</Form.Label>
                        <Form.Control as='textarea' rows={3} required onChange={(e) => setDescription(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className='mb-3 ' controlId='fundraise-url'>
                        <Form.Label>Url</Form.Label>
                        <Form.Control type='text' placeholder='an url for your project' onChange={(e) => setUrl(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className='mb-3 ' controlId='fundraise-url'>
                        <Form.Label>Beneficiary address</Form.Label>
                        <Form.Control type='text' placeholder='0x....' onChange={(e) => setBeneficiary(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='fundraise-imageURL'>
                        <Form.Label>Image url</Form.Label>
                        <Form.Control type='text' placeholder='An image (url) for your project' className='mb-2' onChange={(e) =>setImageURL(e.target.value)} required/>
                        <Button variant='primary' type='submit'>
                            Send Transaction
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}