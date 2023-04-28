function createCategory(){
    var title = document.getElementById('title').value;
    var parent = document.getElementById('parent').value;
    categoryValidation(title)
    postCategory(title,parent)
    console.log(title,parent);
}

function categoryValidation(title){
    if(title.length < 2){alert('name must be at least 2 character')}
}


function postCategory(title,parent){
        const config = {
          headers:{
          'cache-control': 'no-cache',
          'content-type': 'application/json' 
          }
        };
        const url = "http://localhost:3000/api/categories";
        
        const data ={
          title: title,
          parent: parent
        }
        axios.post(url, data, config)
          .then(res => console.log(res))
          .catch(err => console.log(err))
}