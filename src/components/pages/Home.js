import styles from "./Home.module.css"
import savings from '../../img/director.png'
import LinkButton from "../layout/LinkButton"

function Home(){
    return(
        <section className={styles.home_container}>
            <h1>Bem-Vindo ao <span>Movie's Project</span></h1>
            <p>Coloque suas ideias em pratica agora mesmo!</p>
            <LinkButton to="/newproject" text="Criar Projeto"/>
            <img src={savings} alt="Cost" />

        </section>
    )
}
export default Home


//section trablar em sessãoes
// coloca um destaque