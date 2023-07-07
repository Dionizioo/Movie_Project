import Message from "../layout/Message"
import styles from "../layout/Message.module.css"

import{useLocation} from 'react-router-dom'


function Projeto(){

    const location = useLocation()
    let message=''

    if(location.state){
        message=location.state.mesage
    }

    return(
        <div>
            <h1>Meu Projetos</h1>
            {message && <Message type="success" msg={message} />}
        </div>
    ) 
}
export default Projeto

/*

Precisamos deixar dinamico




*/