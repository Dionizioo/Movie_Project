import { useState } from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'

import styles from '../project/ProjectForm.module.css'


function ServiceForm({ handleSubmit, btnText, projectData }) {
  const [service, setService] = useState({})

  const submit = (e) => {
    e.preventDefault()
    projectData.services.push(service)
    handleSubmit(projectData) // manipula os dados do projeto,adicionando o serviço e "joga" o projeto para cima
    //onde vai lidar com a função createService(Projects.js)
  }

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value }) //pegar o objeto atual e colocar o nome(input)
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do serviço"
        name="name"
        placeholder="Insira o nome do serviço"
        handleOnChange={handleChange} // mudança de estado
      />
      <Input
        type="number"
        text="Custo do serviço"
        name="cost"
        placeholder="Insira o valor total"
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="Descrição do projeto"
        name="description"
        placeholder="Descreva o projeto"
        handleOnChange={handleChange}
      />
      <SubmitButton text={btnText} />
    </form>
  )
}

export default ServiceForm


/*
ProjectForm.js(input) 
ProjectCard(function(director)p(span"director"))
 Project.js ( <p>project.director) 
*/