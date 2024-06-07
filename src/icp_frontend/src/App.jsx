import React from 'react'
import { Button } from 'react-bootstrap'
import { chapter_2 } from 'declarations/chapter_2'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const handleSubmit = async () => {
    try {
      const members = await chapter_2.getAllMembers()
      console.log('Members:', members)
    } catch (error) {
      console.error('Error fetching members:', error)
    }
  }

  return (
    <main>
      <Button variant="primary" onClick={handleSubmit}>
        Click to see members!
      </Button>
    </main>
  )
}

export default App
