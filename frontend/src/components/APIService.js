

export default class APIService{
    
    //Update API
    static UpdateArticle(id,body){
        return(
            fetch(`http://localhost:5000/update/${id}` ,{
                'method' : 'PUT',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(body)
            })
            .then(resp => resp.json())
        )
    }

    //Insert API
    static insertArticle(body){
        return(
            fetch(`http://localhost:5000/add` ,{
                'method' : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(body)
            })
            .then(resp => resp.json())
        )
    }

    //Delete API
    static DeleteArticle(id){
        return(
            fetch(`http://localhost:5000/delete/${id}` ,{
                'method' : 'DELETE',
                headers : {
                    'Content-Type' : 'application/json'
                },
            })
        )
    }

}