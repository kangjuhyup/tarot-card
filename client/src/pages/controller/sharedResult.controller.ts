import { useSearchParams } from "react-router-dom";

const SharedResultController = () => {
    const [searchParams] = useSearchParams();
    const uuid = searchParams.get('uuid')

    return {
        uuid : uuid,
    }
}

export default SharedResultController;