import { Navigate } from "react-router-dom";
import { useQuestions } from "../QuestionP/QuestionProvider";

export default function PrivateRoute({children}){
    const{user} = useQuestions();
    return user ? children : <Navigate to={"/LoginForm"} replace />
}