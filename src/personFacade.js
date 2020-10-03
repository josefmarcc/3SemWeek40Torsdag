import SERVER_URL from './constants.js'

const URL = "https://segatos.com/person-1.0.1/api/person/"


function getPersons(){
    return fetch(URL + "all")
    .then(res => res.json())
}

function addPerson(person) {
    const options = makeOptions("POST",person)
    return fetch(URL, options)
    .then(handleHttpErrors)
    .catch(err =>{
        if(err.status){
          err.fullError.then(e=> document.getElementById("error").innerHTML = "FEJL I SYSTEMET")
        }
        else{console.log("Network error"); }
     });
    
}

function deletePerson(id) {
    const options = makeOptions("DELETE")
    return fetch(URL + id, options)
    .then(handleHttpErrors)
    .catch(err =>{
        if(err.status){
          err.fullError.then(e=>
            console.log(e.message),
            document.getElementById("error").innerHTML = e.message
            )
        }
        else{ console.log("Network error"); }
     })
}

function editPerson(person) {
  const options = makeOptions("PUT", person)
  return fetch(URL + person.id, options)
  .then(handleHttpErrors)
  .catch(err =>{
      if(err.status){
        err.fullError.then(e=>
          console.log(e.message),
          document.getElementById("error").innerHTML = e.message
          )
      }
      else{ console.log("Network error"); }
   })
}

const personFacade = {
    getPersons,
    addPerson,
    deletePerson,
    editPerson,
}


function makeOptions(method, body) {
    var opts =  {
      method: method,
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    }
    if(body){
      opts.body = JSON.stringify(body);
    }
    return opts;
   }

   function handleHttpErrors(res){
    if(!res.ok){
      return Promise.reject({status: res.status, fullError: res.json() })
    }
    return res.json();
   }


export default personFacade;