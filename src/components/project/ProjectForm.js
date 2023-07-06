import { useState, useEffect } from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

import styles from './ProjectForm.module.css'

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [project, setProject] = useState(projectData || {})
  const [categories, setCategories] = useState([])

  //UseEffect- ele espera um resposta e algo vazio
  useEffect(() => {
    fetch('http://localhost:5000/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      /*
      // Conexão com o json a base de Proms
      */
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data)
      })
  }, [])

  /*Recapitulando oque está acontecendo aqui,
    1.Fiz um Request,para minha url Categority
    2.Peguei os dados da resposta e tranformei em json
    3.E coloquei no meu Hulk de setCateries
    */
    

  const submit = (e) => {
    e.preventDefault()
    handleSubmit(project)
  }

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value })
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    })
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleChange}
        value={project.name}
      />
      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira o orçamento total"
        handleOnChange={handleChange}
        value={project.budget}
      />
      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : ''}
      />
      <SubmitButton text={btnText} />
    </form>
  )
}

export default ProjectForm