import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";
import { authKakaoDto } from "./dto/authKakao.dto";

const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const authKakao = async (data: authKakaoDto) => {
      setLoading(true);
      try {
        const url = `${process.env.REACT_APP_TAROT_SERVER}/auth/kakao`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });
    
        if (response.status === 200) {
          const jsonData = response.data;
          const jwtToken = jsonData.access;
          const cookies = new Cookies();
          cookies.set("access", jwtToken, { path: "/" });
          
          return jsonData;
        } else if (response.status === 613) {
          return { success: false };
        } else {
          throw Error("failed call getPolicy API");
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
          authKakao
      }
}

export default useAuth;

