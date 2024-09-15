import React from 'react'
import { Card } from 'react-bootstrap'

function Set({ questionSet}) {
  console.log(questionSet.image); 
  return (
    <Card style={{ maxWidth: '30rem' }} className='my-3 p-3 rounded' sm={12} md={2} lg={3} xl={3}>
        <a href={`/questionSet/${questionSet._id}`}>
        <Card.Img  src={questionSet.image} style={{ width: '400px', height: '200px', objectFit: 'cover' }} />
        </a>
        <Card.Body>
            <a href={`/questionSet/${questionSet._id}`}>
                <Card.Title as="div">
                    <strong>{questionSet.name}</strong>
                </Card.Title>
            </a>
            <Card.Text as="div">
                <div className='my-3'>
                    {questionSet.description}
                </div>
            </Card.Text>
           
        </Card.Body>
    </Card>
  )
}

export default Set
