import styles from "./Company.module.css"
import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'

function Contact(){
   return(
    <section className={styles.company_container }>
        <h1> Ficou mais curioso sobre nosso trabalho? </h1>
        <h2>Siga a gente nas redes sociais para mais informaçoes </h2>
        <ul className={styles.social_list}>
            <li>
                <FaFacebook />
            </li>
            <li>
                <FaInstagram />
            </li>
            <li>
                <FaLinkedin />
            </li>
        </ul>
  

    </section>
   )
}
export default Contact