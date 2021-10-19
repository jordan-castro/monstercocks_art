import { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import Abi from '../utils/abi.json';
import { CONTRACT_ADDRESS } from '../utils/globals';

/**
 * Crea una conexion a el smart contract.
 * 
 * @returns `Contract`
 */
export default function connectToContract() {
    // Connecta a web3.
    const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc-mainnet.maticvigil.com/"));
    // Connecta el contract
    const contract = new web3.eth.Contract(Abi as AbiItem[], CONTRACT_ADDRESS)
    
    return contract;
}