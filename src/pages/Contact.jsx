import { useState } from 'react'
import PageTitle from '../components/PageTitle.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import FormField, { inputClass } from '../components/FormField.jsx'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    e.target.reset()
  }
  return (
    <>
      <PageTitle title="Contáctanos" subtitle="Escríbenos y te responderemos a la brevedad." />
      <Card>
        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          <FormField label="Nombre"><input required className={inputClass} /></FormField>
          <FormField label="Correo"><input type="email" required className={inputClass} /></FormField>
          <div className="sm:col-span-2">
            <FormField label="Mensaje"><textarea required rows={4} className={inputClass} /></FormField>
          </div>
          <div className="sm:col-span-2">
            <Button type="submit">Enviar</Button>
            {sent && <span className="ml-3 text-sm text-green-700">¡Mensaje enviado!</span>}
          </div>
        </form>
      </Card>
    </>
  )
}
