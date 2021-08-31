import {useEffect, } from 'react'

import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import HiddenSidebar from "./HiddenSidebar";
import './HeaderStyle.css';

import { useWeb3React } from '@web3-react/core';
import {injected} from '../connectors';

export default function Header() {
    const { activate , active } = useWeb3React();
    
    useEffect(()=>{
        async function connect(){
            await activate(injected)
        }
        connect()
        console.log(active)
    },[active, activate])

    return (
        <header>
            <Navbar expand='lg' className='mb-4'>
                <Container fluid={true}>
                <LinkContainer to='/'>
                    <Navbar.Brand href='#home' className='mb-0 h1'>ismapps</Navbar.Brand>
                </LinkContainer>

                    <Navbar.Toggle aria-controls='basic-navbar-nav'><span className='navbar-toggler-icon'>⚙</span></Navbar.Toggle>
                    <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end align-items-center'>
                        <Nav className='align-items-center' navbarScroll>
                            <NavDropdown title='Apps' id='basic-nav-dropdown' className=''>
                                <LinkContainer to='/main'>
                                    <NavDropdown.Item>Recaudacion de fondos</NavDropdown.Item>
                                </LinkContainer>
                                
                            </NavDropdown>
                            <Nav.Item>
                                <HiddenSidebar ButtonText='Wallet/Connect' />
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}