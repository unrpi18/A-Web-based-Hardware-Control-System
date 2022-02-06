import {useNavigate} from "react-router";

export const url = "http://13ea-2a02-8071-229e-e400-ccc9-ae7d-23bf-cf14.ngrok.io/";
export function useLogout(){
    const navigate = useNavigate();
    navigate('/');
}