// Task #1
let albumStore = []

async function fetchAlbumData() {
    const response = await fetch('public/data/albums.json')
    const data = await response.json()
    albumStore = [...data]
    renderTable(data)
}

function renderTable(data) {
    const tableBody = document.getElementById('album-rows')
    tableBody.innerHTML = ''
    
    data.forEach(album => {
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${album.album}</td>
        <td>${album.releaseDate}</td>
        <td>${album.artistName}</td>
        <td>${album.genres}</td>
        <td>${album.averageRating}</td>
        <td>${album.numberReviews}</td>
        `
        tableBody.appendChild(row)
    })
}

// Task #2
document.getElementById('album-search-form').addEventListener('submit', e => {
    e.preventDefault()
    
    const searchQuery = document.getElementById('search-input').value.trim().toLowerCase()
    const minimumRating = parseFloat(document.getElementById('min-album-rating-input').value) || 0
    
    const data = [...albumStore]
    const searchResults = searchDataUsingInputTextField(data, searchQuery)
    const ratingResults = searchDataUsingMinimumRatingInput(searchResults, minimumRating)

    renderTable(ratingResults)
})

function searchDataUsingInputTextField(data, searchTerm) {
    return data.filter(album => album.album.toLowerCase().includes(searchTerm) || album.artistName.toLowerCase().includes(searchTerm))
}

function searchDataUsingMinimumRatingInput(data, minimumRating) {
    return data.filter(album => album.averageRating >= minimumRating)
}

// Bonus Task 1
document.getElementById('average-rating').addEventListener('click', e => {
    e.preventDefault()

    const data = [...albumStore]
    data.sort((a, b) => b.averageRating - a.averageRating)
    renderTable(data)
})

document.getElementById('number-of-reviews').addEventListener('click', e => {
    e.preventDefault()

    const data = [...albumStore]
    data.sort((a, b) => b.numberReviews - a.numberReviews)
    renderTable(data)
})

// Bonus Task 2
document.getElementById('release-date').addEventListener('click', e => {
    e.preventDefault()

    const data = [...albumStore]
    data.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate))
    renderTable(data)
})

fetchAlbumData()