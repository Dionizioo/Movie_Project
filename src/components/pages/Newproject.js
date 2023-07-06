import { useHistory } from 'react-router-dom'

import ProjectForm from '../project/ProjectForm'

import styles from './Newproject.module.css'

//Inserindo dados no banco
function NewProject() {
    //Permita direcionar o usuario ,para outra pagina
  const history = useHistory()

  function createPost(project) {
    // initialize cost and services
    project.cost = 0
    project.services = []

    fetch('http://localhost:5000/projects', {
      method: 'POST', //envio
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(project), //mandar dados por POST
    })
      .then((resp) => resp.json())
      .then((data) => {
        history.push('/projects', { message: 'Projeto criado com sucesso!' })
      })
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
  )
}

export default NewProject