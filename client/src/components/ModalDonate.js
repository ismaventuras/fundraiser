import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react"
import { Button, Modal, Form, Image} from "react-bootstrap";

export default function ModalDonate(props){
    const {title , description, image, contract} = props;
    const {account, library} = useWeb3React();
    const [donationAmount, setDonationAmount] = useState(null);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = async (event) => {
        event.preventDefault();
        await contract.methods.donate().send(
            {
                from: account,
                value: library.utils.toWei(donationAmount,'ether'),
                gas: 650000
            }
        );
        alert('transaction submitted');
        handleClose()
    }

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Donate
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                Donate to {title}
            </Modal.Header>
            <Modal.Body>
                <p>{description}</p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3 d-flex justify-content-center align-items-center flex-nowrap flex-column' controlId='amount-donation'>
                        <Image src={image} style={{width:'50%', height:'50$'}}/>
                        <Form.Label>How much BNB you want to donate</Form.Label>
                        <Form.Control type='number' placeholder='0.00' min='0.01' step='0.01' value={donationAmount || 0.00} onChange={(e)=> setDonationAmount(e.target.value)} required/>
                        <Form.Text className='text-muted' >
                        Amount in $
                        </Form.Text>
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