import {useEffect, useState} from "react";
import { baseUrl, getRequest } from "../utils/services";


export const useFetchRecipientUser =(chat, user) =>{
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);

    //console.log('user in useFetchRecipientUser:', user);

    const recipientId = chat?.members?.find((id) => id !== user?._id);
     
    //console.log('chat in useFetchRecipientUser:', chat); 
    // chat 안에 값 O 

    useEffect(() =>{
        const getUser = async() =>{
            
            if(!recipientId) {
                setRecipientUser(null);
                return ;
            }

            const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);

            console.log("Apt Url ", `${baseUrl}/users/find/${recipientId}`);
            
            console.log('API response for recipient user:', response);
            console.log('Recipient User Response:', recipientId);
            
            
            if(response && response.error){
                
                //console.log('Error fetching recipient user:', response.error);
                return setError(response);
            }
            setRecipientUser(response); 


            console.log('Recipient user set in state:', response);
        };

        getUser();  
    },[recipientId, chat, user]);

    return {recipientUser};

};