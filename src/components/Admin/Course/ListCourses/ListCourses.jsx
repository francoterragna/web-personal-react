import React, { useState, useEffect } from 'react';
import { Course } from '../../../../api'

const courseController = new Course();

export function ListCourses() {
  const [courses, setCourses] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await courseController.getCourses();
        console.log(response);
      } catch (error) {
        console.error('hola');
      }
    })()
  }, [])
  

  return (
    <div>
        <h2>Lista de cursos</h2>
    </div>
  )
}
