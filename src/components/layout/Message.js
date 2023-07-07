import { useState, useEffect } from 'react'

import styles from './Message.module.css'

function Message({ type, msg }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!msg) {
      setVisible(false)
      return
    }

    setVisible(true)

    const timer = setTimeout(() => {
      setVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [msg])

  return (
    <>
      {visible && (
        <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
      )}
    </>
  )
}

export default Message


/* O programador vai ser o tipo da mensagem como(succeso,falha...)
 const [visible, setVisible] = useState(false) - é uma visualzilaçao, que dura com tempo curto, 
apareceçe na tela

*/