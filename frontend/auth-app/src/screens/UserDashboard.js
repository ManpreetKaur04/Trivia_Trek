import React from 'react'
import { Row, Col } from 'react-bootstrap'

import questionSets from './questionSet';
import Set from '../components/Set'

function UserDashboard() {
    return(
        <div>
            <h1>Select Your Quiz Subject</h1>
            <Row>
                {questionSets.map((questionSet) => (
                    <Col key={questionSet._id} sm={12} md={6} lg={3} xl={3}>
                        <Set questionSet={questionSet} />
                    </Col>
                ))}
            </Row>
        </div>
    )
    
}



export default UserDashboard