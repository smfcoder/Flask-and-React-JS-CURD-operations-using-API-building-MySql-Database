import React from "react";
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import APIService from "./APIService";
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure() 


function ArticleList(props){

    // const editArticle = (article) => {
    //     props.editArticle(article)
    // }

    const editArticle = (cell) => {
        //console.log(cell.original);
        props.editArticle(cell.original);
    }

    const deleteArticle = (cell) =>{
        const reply = window.confirm("Are you sure you want to delete ?");
        if(reply===true){
            
                APIService.DeleteArticle(cell.original.id)
                .then(()=>props.deleteArticle(cell.original))
                //.then(resp => props.deleteArticle(resp))
                .catch(error => console.log(error))
                toast.success('Record Deleted Successfully',{autoClose:2500})
                
        
        }
        else{
            //console.log("Operation cancelled")
            toast.error('Deletion Aborted',{autoClose:2500})
        }
    }

    


    const columns =[
        {
            Header : 'userId',
            accessor : 'id',
            //sortable : false,
            style : {color:'purple'},
            maxWidth : '100',
        },
        {
            Header : 'Title',
            accessor : 'title',
            filterable : true,
        },
        {
            Header : 'Description',
            accessor : 'body',
            filterable : false,
        },
        {
            Header : 'Date Time',
            accessor : 'date',
            filterable : false,
            
        },
        {
            Header : 'Update',
            // Cell: props=>{
            //     return(
            //         <button onClick={() => editArticle(props.articles)} className="btn btn-primary">Update</button>
            //     )
            // },
            Cell: props => <button className="btn btn-primary" onClick={() => editArticle(props)}>Update</button>,
            filterable : false,
        },
        {
            Header : 'Update',
            Cell: props => <button className="btn btn-danger" onClick={() => deleteArticle(props)}>Delete</button>,
            filterable : false,
        }
    ]


   return(
        <div>
            <ReactTable
            columns={columns}
            data={props.articles}
            filterable
            style={{textAlign:'center'}}
            defaultPageSize={5}
            showPaginationTop={false}
            noDataText={'Please Wait Data is loading...'}
            >

            </ReactTable>

        </div>    
        
    )
}
export default ArticleList

// function ArticleList(props){
//     return(
//         <div>
//         {props.articles && props.articles.map(article => {
//             return(
//             <div key = {article.id}>
//                 <h2>{article.title}</h2>
//                 <h2>{article.body}</h2>
//                 <h2>{article.date}</h2>
                
//                 <div className="row">
//                     <div className="col-md-1">
//                         <button className="btn btn-primary">Update</button>
//                     </div>

//                     <div className="col-md-1">
//                         <button className="btn btn-danger">Delete</button>
//                     </div>

//                 </div>

//             </div>
//             )
//         })}
//         </div>
//     )
// }


// export default ArticleList

