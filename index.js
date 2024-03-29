let currentPage = window.location.hash
const content = document.getElementById('content')

function setNavigation(element) {
  element.querySelectorAll('a').forEach((a) => {
    // Only set navigation for internal links with a hash
    if (!a.hash || a.hash == '#') return

    a.addEventListener('click', (e) => {
      console.log(a)
      e.preventDefault()
      currentPage = a.hash
      window.location.hash = currentPage
      render()
    })
  })
}

setNavigation(document)

function render() {
  // If the current page is not set, set it to index
  if (!currentPage || currentPage == '#undefined') currentPage = 'index'
  // Remove the # from the page name
  currentPage = currentPage.replace('#', '')
  // Get the page from the pages folder
  fetch(`pages/${currentPage}.md`).then((response) => {
    // If the page doesn't exist, get the 404 page
    if (!response.ok) {
      fetch(`pages/home.md`)
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
        setNavigation(content)

        // Scroll to top
        window.scrollTo(0, 0)
      })
    }
  })
}

render()
