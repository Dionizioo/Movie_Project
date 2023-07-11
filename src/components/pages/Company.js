import styles from "./Company.module.css"

function Company(){
    return (
        <section className={styles.company_container}>
            <h1>Saiba um pouco mais sobre a <span>Movie's Project</span></h1>
            <h2>Este site foi feito para o controle de serviços que um cineasta deseja investir!!</h2>
        </section>
        
    )
}
export default Company;
