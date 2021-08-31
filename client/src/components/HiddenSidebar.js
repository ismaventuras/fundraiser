import { Button, Offcanvas } from "react-bootstrap";

import { useState } from "react";
import { useWeb3React } from '@web3-react/core';
import {injected} from '../connectors'

export default function HiddenSidebar(props){
    const {chainId, account, active} = useWeb3React();

    const {ButtonText} = props;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <>
        <Button variant="primary" onClick={handleShow}>
          {ButtonText}
        </Button>
  
        <Offcanvas show={show} onHide={handleClose} placement='end'>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Your Wallet</Offcanvas.Title>
          </Offcanvas.Header>
          {active ?
          <Offcanvas.Body>
            <p>Account: {account}</p>
            <p>Connected Chain: {chainId} </p>
            
            <p>Supported Chains</p>
            <ul>
              {injected.supportedChainIds.map( chain => (
                <li key={chain}>{chain}</li>
              ))}
            </ul>
          </Offcanvas.Body>
          :
          <p>Please connect your wallet</p>
          }
        </Offcanvas>
      </>
    )
}