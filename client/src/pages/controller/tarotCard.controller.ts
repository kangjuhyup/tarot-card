import { useEffect, useState } from "react";
import { getResultDto } from "../../hooks/dto/getResult.dto";
import useTarot from "../../hooks/tarotHooks";
import useLogInStore from "../../store/logIn";

const TarotCardController = () => {
    const [message, setMessage] = useState(''); 
    const {logIn} = useLogInStore();
    const { getResult, loading, error } = useTarot();
    const [uuid,setUuid] = useState('');
  
    useEffect(() => {
      if(!logIn) setMessage('로그인을 해주세요.')
      if(logIn) setMessage('보고 싶은 운세를 선택해 주세요.')
    },[logIn])
    const setCards = async (value: getResultDto) => {
      const result = await getResult(value);
      if (result.success) {
        setMessage(result.result)
        setUuid(result.uuid);
      }
      else {console.log("result fail")};
    };

    

    return {
        setMessage : setMessage,
        message : message,
        setCards : setCards,
        resultLoading : loading,
        resultError : error,
        uuid : uuid,
    }
}

export default TarotCardController;