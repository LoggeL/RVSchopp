let currentPage = window.location.hash
const content = document.getElementById('content')
const progress = document.getElementById('progress')

document.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault()
    currentPage = e.target.hash
    window.location.hash = currentPage
    render()
  })
})

function render() {
  progress.style.opacity = 1
  currentPage = currentPage.replace('#', '')
  if (!currentPage) currentPage = 'index'
  console.log(currentPage)
  fetch(`pages/${currentPage}.md`)
    .then((response) => response.text())
    .then((text) => {
      var converter = new showdown.Converter({
        tables: true,
      })
      content.innerHTML = converter.makeHtml(text)
      progress.style.opacity = 0
    })
}

render()
