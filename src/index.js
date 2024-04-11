// index.js

// Callbacks
const handleClick = (ramen) => {
  // Add code
  // retrieve the ramen-detail 
  const ramenDetail = document.querySelector('#ramen-detail')
  // clears content in ramenDetail 
  while (ramenDetail.firstChild) {
    ramenDetail.removeChild(ramenDetail.firstChild)
  }
  // create image element
  const img = document.createElement('img');
  img.className = 'detail-image'
  img.src = ramen.image
  img.alt = ramen.name
  //append the image to the ramen-detail
  ramenDetail.appendChild(img);

  // create name element
  const name = document.createElement('h2')
  name.className = 'name'
  name.textContent = ramen.name
  ramenDetail.appendChild(name)

  // create restauarant element
  const restaurant = document.createElement('h3')
  restaurant.className = 'restaurant'
  restaurant.textContent = ramen.restaurant
  ramenDetail.appendChild(restaurant)

  // updates the rating that is displayed to the selected ramen
  const ratingDisplay = document.getElementById('rating-display')
  ratingDisplay.textContent = ramen.rating 

  // updates the rating that is displayed to the slected ramen
  const commentDisplay = document.getElementById('comment-display')
  commentDisplay.textContent = ramen.comment
  
};
// add event listener to form
const addSubmitListener = () => {
  // Add code
  const form = document.getElementById('new-ramen')
  form.addEventListener('submit', (event) => {
    event.preventDefault()

    // get input values
    const newRamen = {
      name: document.getElementById('new-name').value,
      restaurant: document.getElementById('new-restaurant').value,
      image: document.getElementById('new-image').value,
      rating: document.getElementById('new-rating').value,
      comment: document.getElementById('new-comment').value
    }
    // Display the new ramen 
    displayNewRamen(newRamen)
    // reset form
    form.reset()
  })

  // add event listener to edit ramen
  const editForm = document.getElementById('edit-ramen')
  editForm.addEventListener('submit', (event) => {
    event.preventDefault()

    // get updated rating and comment from form
    const rating = document.getElementById('new-rating').value
    const comment = document.getElementById('new-comment').value

    // change the rating displayed
    const ratingDisplay = document.getElementById('rating-display')
    ratingDisplay.textContent = rating

    // change the comment that is displayed
    const commentDisplay = document.getElementById('comment-display')
    commentDisplay.textContent = comment

    // reset form
    editForm.reset()
  })

  // delete button
  const deleteButton = document.getElementById('delete-button')
  deleteButton.addEventListener('click', () => {
    const ramenMenu = document.getElementById('ramen-menu')
    const ramenDetail = document.getElementById('ramen-detail')

    // remove the first child element from the ramen-menu
   ramenMenu.removeChild(ramenMenu.firstChild)

   // clear content of ramen-detail
    while (ramenDetail.firstChild) {
      ramenDetail.removeChild(ramenDetail.firstChild)
    }
  })
}

// fetch and siplay all ramen
const displayRamens = () => {
  // Add code
fetch('http://localhost:3000/ramens')
.then((resp) => resp.json())
.then((data) => {
  // loops each ramen in array and displays them
  data.forEach((ramen) => {
    displayRamen(ramen)
  
    
    
  })
})
  .catch((error) => console.error('Error fetching ramen data:', error))

};

const displayRamen = (ramen) => {
  // Displays a single ramen on the menu
  const ramenMenu = document.querySelector('#ramen-menu')
  const img = document.createElement('img')
  img.src = ramen.image
  img.alt = ramen.name 
  img.addEventListener('click', () => handleClick(ramen));
  ramenMenu.appendChild(img)
}

const displayNewRamen = (ramen) => {
// display newRamen in div
const ramenMenu = document.querySelector('#ramen-menu')
const img = document.createElement('img')
img.src = ramen.image
img.alt = ramen.name
img.addEventListener('click', () => handleClick(ramen))
ramenMenu.appendChild(img)
}

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here

  document.addEventListener('DOMContentLoaded', () => {
    displayRamens()
    addSubmitListener()
  })

}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
