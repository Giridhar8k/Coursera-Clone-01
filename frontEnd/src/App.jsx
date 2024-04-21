import React, { useEffect, useState } from "react"
import { CreateCourse } from "./components/createCourse"

function App() {
    const [course,setCourse]=useState([]);

    useEffect(()=>{
        fetch('http://localhost:4000/allcourseDetails')
        .then(async (resp)=>{
            const json = await resp.json();
            setCourse(json.Courses);
        });
    },[]);
    
    return <div>
        <CreateCourse></CreateCourse>
        {course.map((eachCourse)=>{
            return <Courses key= {eachCourse._id} title ={eachCourse.title} description={eachCourse.description} price={eachCourse.price}>
            </Courses>
        })}
    </div>
}

const Courses = React.memo(function Courses({title,description,price}){
    return <div>
        <h2>{title}</h2>
        <h5>{description}</h5>
        <h5>{price}</h5>
    </div>
})

export default App
