import { useState } from "react";

export function CreateCourse(){
    const [title,setTitle]= useState("");
    const [description,setDescription]= useState("");
    const [price,setPrice]= useState(0);

    return <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div >
        <div>Title :</div>
        <input type = "text" id= 'TITLE' placeholder="Title of the Course" style ={{
            padding:10,
            margin:10
        }}
        onChange={(e)=>{
            const value = e.target.value;
            setTitle(value);
        }}/><br></br>
        <div>Description :</div>
        <input type = "text" id='DESCRIPTION' placeholder="Description of the Course" style ={{
            padding:10,
            margin:10
        }} 
        onChange={(e)=>{
            const value = e.target.value;
            setDescription(value);
        }}/><br></br>
        <div >Price :</div>
        <input type = "number" id='PRICE' placeholder="Price of the Course" style ={{
            padding:10,
            margin:10
        }} 
        onChange={(e)=>{
            const value = e.target.value;
            setPrice(parseInt(value));
        }}/><br></br>
        <button
            id="CREATE_COURSE"
            
            style={{
                backgroundColor: '#06bc3d',
                color: '#fff',
                border: '1px solid rgba(0, 0, 0, 0)',
                borderRadius: '3px',
                paddingLeft: '20px',
                paddingTop: '10px',
                paddingBottom: '10px',
                paddingRight: '20px',
                cursor: 'pointer',
                margin:20
            }} 
            onClick={()=>{
                fetch('http://localhost:4000/createCourse',{
                    method:"POST",
                    body:JSON.stringify({
                        title:title,
                        description:description,
                        price:price
                    }),
                    headers:{
                        "contentType":"application/json"
                    }
                }).then(async (resp)=>{
                const json = await resp.json();
                alert(json);
            })
            }}>Create Course
        </button>
        </div>
    </div>
}
