import './App.css';
import {useState, useEffect} from 'react';
import ArticleList from './components/ArticleList';
import UpdateData from './components/UpdateData';
import Button from 'react-bootstrap/esm/Button';


function App() {

  const [articles,setArticles] = useState([]);
  const [editedArticle,setEditedArticle] = useState(null);
  
  useEffect(()=>{
      fetch('http://localhost:5000/get',{
        'method' : 'GET',
        headers:{
          'Content-Type' : 'application/json'
        }
      })
      .then(resp => resp.json())
      .then(resp => setArticles(resp))
      .catch(error => console.log(error))

  },[])
  
  const editArticle =(article)=>{
    //console.log("Hello world")
    setEditedArticle(article);
  }

  const updatedData =(article)=>{
    const new_article = articles.map(my_article =>{
      if(my_article.id === article.id){
        return article
      }
      else{
        return my_article
      }
    })
    setArticles(new_article)
  }

  const openForm =()=>{
    setEditedArticle({title:'',body:''})
  }

  const insertedArticle =(article)=>{
    const new_articles = [...articles,article]
    setArticles(new_articles)
  }


  const deleteArticle=(article)=>{
    const afterdelet = articles.filter(myarticle => {
      if(myarticle.id === article.id){
        return false
      }
      else{
        return true
      }
    })
    setArticles(afterdelet)
  }



  return (
    <div className="App">
      <div className="row">
        <div className="col-sm-8">
          <h1 style={{'color':'purple'}}>Flask and React JS Course</h1>
        </div>
        <div className="col-sm-2">
          <Button className="btn btn-success" onClick={openForm}>Insert</Button>
        </div>
      </div>
      <ArticleList articles={articles} editArticle={editArticle} deleteArticle={deleteArticle} />

      {editedArticle ? <UpdateData article ={editedArticle} updatedData={updatedData} insertedArticle={insertedArticle}  /> : null}
      
      

    </div>
  );
}

export default App;
