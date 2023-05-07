let currentPage = window.location.hash
const content = document.getElementById('content')

document.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', (e) => {
    console.log(a)
    e.preventDefault()
    currentPage = a.hash
    window.location.hash = currentPage
    render()
  })
})

function render() {
  if (!currentPage || currentPage == '#undefined') currentPage = 'index'
  currentPage = currentPage.replace('#', '')
  fetch(`pages/${currentPage}.md`).then((response) => {
    if (!response.ok) {
      fetch(`pages/404.md`)
        .then((response) => response.text())
        .then((text) => {
          var converter = new showdown.Converter({
            tables: true,
          })
          content.innerHTML = converter.makeHtml(text)
          // Scroll to top
          window.scrollTo(0, 0)
        })
    } else {
      response.text().then((text) => {
        var converter = new showdown.Converter({
          tables: true,
        })
        content.innerHTML = converter.makeHtml(text)
        // Add classes to tables
        document.querySelectorAll('table').forEach((table) => {
          table.classList.add('border')
        })
      content.querySelectorAll('a').forEach((a) => {
          a.addEventListener('click', (e) => {
            console.log(a)
            e.preventDefault()
            currentPage = a.hash
            window.location.hash = currentPage
            render()
          })
        })
        // Scroll to top
        window.scrollTo(0, 0)
      })
    }
  })
}

render()
