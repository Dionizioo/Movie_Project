import { parse, v4 as uuidv4 } from 'uuid'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './Projetc.module.css'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project() {
  let { id } = useParams()
  const [project, setProject] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [services, setServices] = useState([])
  const [message, setMessage] = useState('')
  const [type, setType] = useState('success')

  useEffect(() => {
    // Para ver o loading
    setTimeout(
      () =>
        fetch(`http://localhost:5000/projects/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProject(data)
            setServices(data.services)
          }),
      0,
    )
  }, [id])

  //função para realizar no banco de dados
  function editPost(project) {
    setMessage('') //para não dar o bug depois que atualizar varias vezes
    // budget validation - validação para não ultrapassar o valor
    if (project.budget < project.cost) {
      setMessage('O Orçamento não pode ser menor que o custo do projeto!')
      setType('error')
      return false // vai parar o projeto caso não de certo a
    }
//rota 
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH', // função que alterar oque realmente precisar mudar que está no banco
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project), //mandando o projeto como texto
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data)
        //mensagens
        setShowProjectForm(!showProjectForm)
        setMessage('Projeto atualizado!')
        setType('success')
      })
  }

  function createService(project) {
    // last service
    const lastService = project.services[project.services.length - 1]

    lastService.id = uuidv4() //ID único

    const lastServiceCost = lastService.cost

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost) //novo custo(atual+ultimo)

    // maximum value validation
    if (newCost > parseFloat(project.budget)) {
      setMessage('Orçamento ultrapassado, verifique o valor do serviço!')
      setType('error')
      project.services.pop()
      return false
    }

    // add service cost to project cost total
    project.cost = newCost
    
    //update project
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setServices(data.services)
        setShowServiceForm(!showServiceForm)
        setMessage('Serviço adicionado!')
        setType('success')
      })
  }
 //Atualização do Front
  function removeService(id, cost) {
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id,
    )

    const projectUpdated = project

    projectUpdated.services = servicesUpdated
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost) // removendo o custo do servido e custo que tenho

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(projectUpdated)//aqui que atualiza o estao
        setServices(servicesUpdated)
        setMessage('Serviço removido com sucesso!')
      })
  }
  //funçao de service e form
  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
              </button>
              {!showProjectForm ? (
                <div className={styles.form}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total do orçamento:</span> R${project.budget}
                  </p>
                  <p>
                    <span>Total utilizado:</span> R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.form}>
                  <ProjectForm
                    handleSubmit={editPost} //Parte que posso editar o projeto 
                    btnText="Concluir Edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2> 
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
              </button>
              <div className={styles.form}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços:</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Não há serviços cadastrados.</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Project