import Carta from "./Carta";
import ModalCreateFundraiser from "./ModalCreateFundraiser";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import FundraiserFactory from '../contracts/FundraiserFactory.json';
import Fundraiser from '../contracts/Fundraiser.json';
import {injected} from '../connectors'


export default function Main(props) {
    const {applicationName} = props

    const {active, activate, library} = useWeb3React();

    const [fundraiserFactoryContract,setFundraiserFactoryContract] = useState(false);
 
    const [ funds, setFunds ] = useState(null)

    useEffect(()=>{
        const init = async () =>{
                await activate(injected)
                if(active){
                const fundraiserFactoryContract = new library.eth.Contract(FundraiserFactory.abi,FundraiserFactory.networks[5777].address);
                setFundraiserFactoryContract(fundraiserFactoryContract);
                // const fundraiserContract = new library.eth.Contract(Fundraiser.abi, Fundraiser.networks[5777].address);
                // setFundraiserContract(fundraiserContract);
                const funds = await fundraiserFactoryContract.methods.fundraisers().call()
                setFunds(funds);
                }
            
        }

        init()
    },[activate,active])

    const getFundraiser = async (address) =>{
        const contract = new library.eth.Contract(Fundraiser.abi,address);
        console.log(contract)
        return contract
    }
    return (
        <main>
            <div className='content py-4'>
                <p className='display-3 text-center application-title'>{applicationName}</p>
                <ModalCreateFundraiser fundraiserFactoryContract={fundraiserFactoryContract}/>
                <div className='d-flex justify-content-evenly flex-wrap gap-3 p-2'>
                
                        {funds && funds.map( (fundraiser) =>{
                            return (
                                <Carta key={fundraiser} fundraiser={fundraiser}/>
                            )
                        })}
                    
                </div>
            </div>
        </main>
    )
}