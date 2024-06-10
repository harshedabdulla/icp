import React from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import AddMembers from '../pages/AddMembers'
import Members from '../pages/Members'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/members" />} />
        <Route path="/members" element={<Members />} />
        <Route path="/members/new" element={<AddMembers />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
