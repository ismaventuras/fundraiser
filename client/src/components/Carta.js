import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { Button, Card,  } from "react-bootstrap";
import ModalDonate from "./ModalDonate";
import Fundraiser from '../contracts/Fundraiser.json';

import ethereumIcon from '../ethereum.png';

export default function Carta(props) {
    const { fundraiser } = props;



    const [name,setName] = useState(false);
    const [description,setDescription] = useState(false);
    const [imageURL,setImageURL] = useState(false);
    
    const [totalDonations, setTotalDonations] = useState(false);
    const [contract, setContract] = useState(false);
    const [owner, setOwner] = useState(false);
    const {account ,library } = useWeb3React();


    const handleTransfer = async (event) =>{
        event.preventDefault();
        await contract.methods.withdraw().send(
            {
                from: account
            }
        )
    }
    useEffect(()=>{
        const info = async ()=>{
            
            const contract = new library.eth.Contract(Fundraiser.abi, fundraiser);
            const name = await contract.methods.name().call()
            const description = await contract.methods.description().call()
            const totalDonations = await contract.methods.totalDonations().call()
            const imageURL = await contract.methods.imageURL().call()
            
            const owner = await contract.methods.owner().call()

            setName(name)
            setDescription(description)
            setTotalDonations(library.utils.fromWei(totalDonations,'ether'))
            setImageURL(imageURL)
            setContract(contract)
            setOwner(owner)
        }
     info();
    },[])
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" href='' src={imageURL.toString()} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>

                <Card.Subtitle>Total collected: {totalDonations} <img src={ethereumIcon} alt='ether' width='32rem'/></Card.Subtitle>
                <Card.Text className='justify-content-center d-flex p-2'>
                    <ModalDonate title={name} description={description} image={imageURL} contract={contract}/>
                    {account === owner && <Button onClick={handleTransfer}>Transfer</Button>}
                </Card.Text>
            </Card.Body>
        </Card>

    )
}