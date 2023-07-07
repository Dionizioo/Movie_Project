import Message from "../layout/Message"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"

import styles from './Projeto.module.css'

import{useLocation} from 'react-router-dom'


function Projeto(){

    const location = useLocation()
    let message=''

    if(location.state){
        message=location.state.mesage
    }

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meu Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            {message && <Message type="success" msg={message} />}
            <Container customClass="start">
                <p>Projetos...</p>
            </Container>
        </div>
    ) 
}
export default Projeto

/*

Precisamos deixar dinamico




*/