  async function getCategories(){
    const url = "http://localhost:3000/api/categories";
    
    let response = await fetch(url);

    if (response.ok) { // if HTTP-status is 200-299
      // get the response body (the method explained below)
      var json = await response.json()}
    else {
      alert("HTTP-Error: " + response.status);
    }
    console.log(json.data)
    return json.data
}

async function createOptions(){
  const categories = await getCategories()
  for(let category of categories){
  var option = document.createElement("option");
  option.text = category.title;
  option.value = category._id;
  var select = document.getElementById("categoryDropdown");
  select.appendChild(option);
  }
}



function getSelectedCategories(){
  var selected = [];
  for (var option of document.getElementById('categoryDropdown').options)
  {
      if (option.selected) {
          selected.push(option.value);
      }
  }
  console.log(selected);
  return selected
}

function callPostRoute(title,subtitle,content,readingtime,categoryId){
  const config = {
    headers:{
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    'x-auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ1YWQxZDU5MDNjNWZlMTFkMjZkNDIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODIyODc5MDF9.Gv6LM3bIwhqeoUKI0ZratqXLOxYlVJsB9O0WlAmdXC8'
    }
  };
  const url = "http://localhost:3000/api/posts";
  
  const data ={
    title : title,
    subtitle : subtitle,
    content : content,  
    readingtime : readingtime,
    categoryId : categoryId
  }
  axios.post(url, data, config)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}


function createPost(){
  var title = document.getElementById('title').value;
  var subtitle = document.getElementById('subtitle').value;
  var content = document.getElementById('content').value;  
  var readingtime = document.getElementById('readingtime').value;
  var categoryId = getSelectedCategories();
  callPostRoute(title,subtitle,content,readingtime,categoryId)
  console.log(title,subtitle,content,readingtime,categoryId)
}