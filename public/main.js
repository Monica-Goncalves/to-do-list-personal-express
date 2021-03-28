var checkOff = document.getElementsByClassName("fa fa-check-square");
var submit = document.getElementsByClassName("submit");
var clearAll = document.getElementsByClassName("clearAll");
var removeCompleted = document.getElementsByClassName("removeCompleted");
var deleteTask = document.getElementsByClassName("fa-trash")


Array.from(submit).forEach(function(element) {
      element.addEventListener('click', function(){
        const task = this.parentNode.parentNode.childNodes[1].innerText
        fetch('newTask', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'task': task
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(checkOff).forEach(function(element) {
      element.addEventListener('click', function(){
        const task = this.parentNode.parentNode.childNodes[1].innerText
        fetch('completed', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'task': task
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
});

Array.from(deleteTask).forEach(function(element) {
      element.addEventListener('click', function(){
        const task = this.parentNode.parentNode.childNodes[1].innerText
        fetch('deleteItem', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'task': task
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

document.querySelector('.removeCompleted').addEventListener('click', deleteComplete)
function deleteComplete() {
  fetch('deleteCompleted', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    })
  }).then(function (response) {
    window.location.reload()
  })
}

document.querySelector(".clearAll").addEventListener('click', function(){
  console.log('trash')
        const task = this.parentNode.parentNode.childNodes[1].innerText
        fetch('/deleteAll', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'task': task
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
    });
