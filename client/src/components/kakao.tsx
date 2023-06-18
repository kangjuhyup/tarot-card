import KakaoLogin from "react-kakao-login";
import useAuth from "../hooks/authHooks";
import useRoundStore from "../store/round";

const Kakao = () => {
    const key = process.env.REACT_APP_KAKAO_KEY?.toString() || "abc"
    const {setRound} = useRoundStore();
    const { authKakao, loading } = useAuth()
    const kakaoOnSuccess = async (data:any) => {
        const idToken = data.response.access_token
        if(idToken) {
            const result = await authKakao({access_token:idToken}).catch((error) => {
                console.log('authKakaoError : ',error);
            });
            setRound(1);
            console.log(result);
        }
        console.log(idToken)
    }
    const kakaoOnFail = (error:any) => {
        console.log(error);
    }

    return (
        <>
            <KakaoLogin
                
                token={key}
                onSuccess={kakaoOnSuccess}
                onFail={kakaoOnFail}
            />
        </>
    )
}
export default Kakao