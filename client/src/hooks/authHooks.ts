import { useState } from "react";
import { authKakaoDto } from "./dto/authKakao.dto";

const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const authKakao = async (data: authKakaoDto) => {
        setLoading(true);
        try {
          const url = 
          `${process.env.REACT_APP_TAROT_SERVER}/auth/kakao`;
          const response = await fetch(url,{
              headers : {
                "Authoriztion" : `Bearer ${data.access_token}`
              }
          });
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
      }
      
      return {
          loading,
          error,
          authKakao
      }
}

export default useAuth;

