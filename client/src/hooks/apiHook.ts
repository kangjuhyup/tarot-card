import { useState } from "react";
import { getResultDto } from "./dto/getResult.dto";

const useTarot = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getResult = async (data: getResultDto) => {
      console.log('getResult Start')
        setLoading(true);
        try {
          const url = 
          `${process.env.REACT_APP_TAROT_SERVER}/tarot/result?type_num=${data.type_num}&first_card_num=${data.first_card_num}&first_forward=${data.first_forward}&second_card_num=${data.second_card_num}&second_forward=${data.second_forward}&third_card_num=${data.third_card_num}&third_forward=${data.third_forward}`;
          const response = await fetch(url);
          if (response.ok) {
            const jsonData = await response.json();
            return jsonData;
          } else if (response.status === 613) {
            return { success: false };
          } else {
            throw Error("failed call getPolicy API");
          }
        } catch (error:any) {
          setError(error);
          throw error;
        } finally {
          setLoading(false);
        }
      };
      return {
          loading,
          error,
          getResult
      }
}

export default useTarot;