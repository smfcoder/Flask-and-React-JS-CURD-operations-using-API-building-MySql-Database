import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import APIService from "./APIService";
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure() 


export default function UpdateData(props){
    const[title,setTitle] = useState('');
    const[body,setBody] = useState('');
    const[show,setShow] = useState(true);

    
    //console.log(title);

    useEffect(()=>{
        setTitle(props.article.title)
        setBody(props.article.body)
        setShow(true);
        
    },[props.article])

    const UpdateArticle =()=>{
        APIService.UpdateArticle(props.article.id,{title,body})
        .then(resp => props.updatedData(resp))
        .catch(error => console.log(error))
        setShow(false);
        toast.success("Record Updated Successfully",{autoClose:2500});
        //document.getElementById("showcard").style.visibility='hidden'
    }

    const hideBox = ()=>{
        setShow(false);
        toast.error("Record Updation Cancelled",{autoClose:2500});
    }
    const hideBoxIns = ()=>{
        setShow(false);
        toast.error("Record Insertion Cancelled",{autoClose:2500});
    }
    //console.log(show)

    const insertArticle =()=>{
        APIService.insertArticle({title,body})
        .then(resp => props.insertedArticle(resp))
        .catch(error => console.log(error))
        setShow(false);
        toast.success("Record inserted Successfully",{autoClose:2500});
    }



    return(
        <div>
            
            {show ? (
            <div>
            {props.article ? (
                <div>
                <Card border="dark" style={{ maxWidth:'35rem',marginTop:'10px',marginLeft:'auto',marginRight:'auto', border:'1px solid black'}}>
                    <Card.Header style={{fontWeight: 'bold', borderBottom : '1px solid black'}}>
                        { props.article.id ? <span>Update Data</span> : <span>Insert Data</span>}
                    </Card.Header>
                    <Card.Body>
                    {/* <Card.Title>Special title treatment</Card.Title> */}
                    <Card.Text>
                        <div className="row">
                            <div className="col-sm-4">
                                <label  className="form-label">Title</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} className="form-control" placeholder="Enter Title here"></input>
                            </div>
                        </div>
                        <div className="row" style={{marginTop:'10px'}}>
                            <div className="col-sm-4">
                                <label  className="form-label">Description</label>
                            </div>
                            <div className="col-sm-8">
                                <textarea className="form-control" value={body} onChange={(e)=>setBody(e.target.value)} placeholder="Enter Title here"></textarea>
                            </div>
                        </div>
                    </Card.Text>
                    </Card.Body>

                    
                    {
                        props.article.id ?
                        <Card.Footer>
                            <Button variant="success" onClick={UpdateArticle} >Submit</Button>
                            <Button variant="danger" style={{marginLeft:'10px'}} onClick={hideBox} >Cancel</Button> 
                        </Card.Footer>
                        :    
                        <Card.Footer>
                            <Button variant="success" onClick={insertArticle} >Insert Data</Button>
                            <Button variant="danger" style={{marginLeft:'10px'}} onClick={hideBoxIns} >Cancel</Button> 
                        </Card.Footer>
                        
                    }
                    
                        
                   


                </Card>
                </div>

            ):null}
            </div>
            ):null}
        </div>
    )
}

// class UpdateData extends React.Component{
    
//     constructor(props) {
//         super(props);
//         this.state = {disp: "none"};
//       }
//       static getDerivedStateFromProps(props, state) {
//         return {disp: props.article.body };
//       }
    
//     render(){
//         return(
//         <div><h1>{this.state.disp}</h1></div>
//     )}
// }