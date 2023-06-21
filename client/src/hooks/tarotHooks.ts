import { useState } from "react";
import Cookies from "universal-cookie";
import { authKakaoDto } from "./dto/authKakao.dto";
import { getResultDto } from "./dto/getResult.dto";

const useTarot = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getResult = async (data: getResultDto) => {
    setLoading(true);
    try {
      const url = `${process.env.REACT_APP_TAROT_SERVER}/tarot/result?type_num=${data.type_num}&first_card_num=${data.first_card_num}&first_forward=${data.first_forward}&second_card_num=${data.second_card_num}&second_forward=${data.second_forward}&third_card_num=${data.third_card_num}&third_forward=${data.third_forward}`;
      const cookies = new Cookies();
      const jwt = cookies.get("access");
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (response.ok) {
        const jsonData = await response.json();
        return jsonData;
      } else if (response.status === 613) {
        return { success: false };
      } else {
        throw Error("failed call getResult API");
      }
    } catch (error: any) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getSharedResult = async (uuid: string) => {
    setLoading(true);
    try {
      const url = `${process.env.REACT_APP_TAROT_SERVER}/tarot/sharedResult?uuid=${uuid}`;
      const response = await fetch(url);
      if (response.ok) {
        const jsonData = await response.json();
        return jsonData;
      } else if (response.status === 613) {
        return { success: false };
      } else {
        throw Error("failed call getSharedResult API");
      }
    } catch (error: any) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getResult,
    getSharedResult,
  };
};

export default useTarot;
