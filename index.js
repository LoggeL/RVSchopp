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
  // If the current page is not set, set it to index
  if (!currentPage || currentPage == '#undefined') currentPage = 'index'
  // Remove the # from the page name
  currentPage = currentPage.replace('#', '')
  // Get the page from the pages folder
  fetch(`pages/${currentPage}.md`).then((response) => {
    // If the page doesn't exist, get the 404 page
    if (!response.ok) {
      fetch(`pages/404.md`)
        // Get the text from the 404 page
        .then((response) => response.text())
        // Convert the text to HTML
        .then((text) => {
          var converter = new showdown.Converter({
            tables: true,
          })
          content.innerHTML = converter.makeHtml(text)
          // Scroll to top
          window.scrollTo(0, 0)
        })
    } else {
      // Get the text from the page
      response.text().then((text) => {
        // Convert the text to HTML
        var converter = new showdown.Converter({
          tables: true,
        })
        content.innerHTML = converter.makeHtml(text)

        // Put tables in div with overflow-x: auto
        const div = document.createElement('div')
        div.style['overflow-x'] = 'auto'

        const tables = document.querySelectorAll('table')
        tables.forEach((table) => {
          div.appendChild(table.cloneNode(true))

          // Insert the div before the table
          table.parentNode.insertBefore(div, table)

          // Remove the table
          table.parentNode.removeChild(table)
        })

        document.querySelectorAll('table').forEach((table) => {
          table.classList.add('border')
        })

        content.querySelectorAll('a').forEach((a) => {
          // If the link is external, pass, compare the hostnames
          if (a.hostname != window.location.hostname) return

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
