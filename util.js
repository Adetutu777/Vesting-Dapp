import { ethers } from "ethers";
import {ContractAddress, rpcUrl} from "./constant"
import ABI from "./abi.json"


const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const signerOrProvider = new ethers.providers.Web3Provider(window.ethereum);
const signer = signerOrProvider.getSigner()

export const getContract = (isSigner=false, contractAddress = ContractAddress, abi=ABI,)=>{
    const newProvider = isSigner ? signer : provider;
    return new ethers.Contract(contractAddress, ABI, newProvider);
}