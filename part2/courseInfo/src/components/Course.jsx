import React from 'react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

const Course = ({ courses }) => {
    const render = courses.map(course => (
        
        <div key={course.id}>
            <Header name={course.name} />

            <Content
                parts={course.parts}
            />

            <Footer course={course} />
        </div>
    ) )
    

    return (
        <div>
            {render}
        </div>
       
    )
}

export default Course