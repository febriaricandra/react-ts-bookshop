import React, { useEffect } from 'react'
import BookService from '../services/BookService'

export default function Home() {
  useEffect(() => {
    BookService.getBooks().then((response) => {
      console.log(response)
    })
  }
  , [])
  return (
    <div>Home</div>
  )
}
