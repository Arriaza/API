const User = require('../user.controller')

const loadInitialTemplate = () => {
  const template = `
  <h1>Users</h1>
  <form id='user-form'>
    <div>
      <label>Name: </label>
      <input name='name' />
    </div>
    <div>
      <label>Lastname: </label>
      <input lastname='lastname' />
    </div>
    <button type='submit'>Send</button>
  </form>
  <ul id='user-list'></ul>
  `

  const body = document.getElementsByTagName('body')[0]
  body.innerHTML = template
}

const getUsers = async () => {
  const response = await fetch('/users')
  const users = await response.json()
  // console.log(users)
  const template = user => `
    <li>
      ${user.name} ${user.lastname} <button data-id='${user._id}'>Delete</button>
    </li>
  `

// prints on screen
  const userList = document.getElementById('user-list')
  userList.innerHTML = users.map(user => template(user)).join('')

// delete users
  users.forEach(user => {
    const userNode = document.querySelector(`[data-id="${user._id}"]`)
    userNode.onclick = async e => {
      await fetch(`/users/${user._id}`, {
        method: 'DELETE',
      })
      userNode.parentNode.remove()
      alert('Successfully removed')
    }
  })
}

const addFormListener = () => {
  const useForm = document.getElementById('user-form')
  useForm.onsubmit = async (e) => {
    e.preventDefault()
// !
    const formData = new FormData(useForm)
// !
    const data = Object.fromEntries(formData.entries())
    console.log(data)
// !
    await fetch('/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    userForm.reset()
    getUsers()
  }
}

window.onload = () => {
  loadInitialTemplate()
  addFormListener()
  getUsers()
}
