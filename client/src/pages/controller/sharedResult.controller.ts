import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useTarot from "../../hooks/tarotHooks";

const SharedResultController = () => {
    const [searchParams] = useSearchParams();
    const uuid = searchParams.get('uuid')
    const {useSharedResultQuery} = useTarot();
    const { data : sharedResult } = useSharedResultQuery(uuid);
    const [result,setResult] = useState();
    const [cards,setCards] = useState<any>();

    const navigate = useNavigate();
    const handleClick = () => {
      navigate("/");
    }

    useEffect(() => {
        if(sharedResult) {
            setCards([{
                num : sharedResult.result.first_card_num,
                forward : sharedResult.result.first_forward,
            },{
                num : sharedResult.result.second_card_num,
                forward : sharedResult.result.second_forward,
            },{
                num : sharedResult.result.third_card_num,
                forward : sharedResult.result.third_forward,
            }])
            setResult(sharedResult.result.result);
        }
    },[sharedResult])


    return {
        sharedResult : result,
        sharedCards : cards,
        move : handleClick
    }
}

export default SharedResultController;

