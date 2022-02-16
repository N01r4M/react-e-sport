import { useParams } from "react-router-dom"

export default function withRouter(Child) {
    return (props) => {
        const params = useParams();
        return <Child {...props} params={params} />
    }
}