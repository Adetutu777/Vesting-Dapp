
import bunzz from 'bunzz-sdk';
import { DAPP_ID, API_KEY } from "@/constant"

const handle = async () => {
    const allow = await bunzz.initWithConnect({
        dappId: DAPP_ID,
        apiKey: API_KEY,

    })
    return allow
}

const MODULE_NAME = "Vesting"
        const initContract = async () => {
            try {
                const handler = await handle();
                const getContract = await handler.getContract(MODULE_NAME);
                    return getContract
            } catch (error) {
                console.error(error);
            }

            
        }
           
       export const useContract =async ()=> {      
       const title= await  initContract()
            
            return title
        }