import { useState } from "react";
import { getResultDto } from "../../hooks/dto/getResult.dto";
import useTarot from "../../hooks/tarotHooks";

const TarotCardController = () => {
    const [tarot_result, setResult] = useState({ success: false, result: "" });
    const { getResult, loading, error } = useTarot();
  
    const setCards = async (value: getResultDto) => {
      const result = await getResult(value);
      if (result.success) setResult(result);
      else console.log("result fail");
    };

    return {
        setCards : setCards,
        result : tarot_result,
        resultLoading : loading,
        resultError : error,
    }
}

export default TarotCardController;