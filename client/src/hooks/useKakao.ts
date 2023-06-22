import { useEffect } from "react";

const useKakao = () => {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
        
      }, []);

      const share = (uuid:string) => {
        const url = `${process.env.REACT_APP_TAROT_CARD}/shared?uuid=${uuid}`;
        console.log('url : ' ,url);
        //@ts-ignore
        if (window.Kakao) {
          //@ts-ignore
          const kakao = window.Kakao;
          if (!kakao.isInitialized()) {
            kakao.init(process.env.REACT_APP_KAKAO_KEY); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
          }
      
          kakao.Link.sendDefault({
            objectType: "feed", // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
            content: {
              title: '타로카드', // 인자값으로 받은 title
              description: "결과", // 인자값으로 받은 title
              imageUrl: "이미지 url",
              link: {
                mobileWebUrl: url, // 인자값으로 받은 route(uri 형태)
                webUrl: url
              }
            },
            buttons: [
              {
                title: "공유하기",
                link: {
                  mobileWebUrl: url,
                  webUrl: url
                }
              }
            ]
          });
        }
      }
    return {
        share
    }
}

export default useKakao;