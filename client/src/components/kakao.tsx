import KakaoLogin from "react-kakao-login";
import useAuth from "../hooks/authHooks";
import useLogInStore from "../store/logIn";

const Kakao = () => {
    const key = process.env.REACT_APP_KAKAO_KEY?.toString() || "abc"
    const {setLogIn} = useLogInStore();
    const { authKakao, loading } = useAuth()
    const kakaoOnSuccess = async (data:any) => {
        const idToken = data.response.access_token
        if(idToken) {
            const result = await authKakao({access_token:idToken}).catch((error) => {
                console.log('authKakaoError : ',error);
            });
            if(result) setLogIn(true);
        }
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