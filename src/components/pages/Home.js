import styles from "./Home.module.css"
import savings from '../../img/savings.svg'
import LinkButton from "../layout/LinkButton"

function Home(){
    return(
        <section className={styles.home_container}>
            <h1>Bem-Vindo ao <span>Cost</span></h1>
            <p>Começe a gerenciasr os seus projetos agora mesmo!</p>
            <LinkButton to="/newproject" text="Criar Projeto"/>
            <img src={savings} alt="Cost" />

        </section>
    )
}
export default Home


//section trablar em sessãoes
// coloca um destaque