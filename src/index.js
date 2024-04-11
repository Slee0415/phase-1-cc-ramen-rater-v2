// index.js
let currentRamen = null
// Callbacks
// Function responds to clicks on images
const handleClick = (ramen) => {
  // Updates ramen details in the ramen-detail div
  const nameElement = document.querySelector('.name');
  const restaurantElement = document.querySelector('.restaurant');
  const ratingDisplay = document.getElementById('rating-display');
  const commentDisplay = document.getElementById('comment-display');

  // Give ramen details
  nameElement.textContent = ramen.name;
  restaurantElement.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;

  // Give ramen an image
  const detailImage = document.querySelector('.detail-image');
  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;

  currentRamen = ramen
}

// Function adds a a submitEventListener to the form for adding a new ramen
const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', function(event) {
    event.preventDefault() // Prevents the form from sending data and reloading the page
    const newName = document.getElementById('new-name').value;
    const newRestaurant = document.getElementById('new-restaurant').value;
    const newImage = document.getElementById('new-image').value;
    const newRating = document.getElementById('new-rating').value;
    const newComment = document.getElementById('new-comment').value;

    // Create new ramen 
    const newRamen = {
      name: newName,
      restaurant: newRestaurant,
      image: newImage,
      rating: newRating,
      comment: newComment,
    };

    //add new ramen to the menu
    const ramenMenu = document.getElementById('ramen-menu');
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener('click', () => handleClick (newRamen));
    ramenMenu.appendChild(img);

    // clear form
    form.reset();
    })
}

// Function to display all ramen imges in the ramen menu div
const displayRamens = () => {
  // Fetch ramen data from the URL
  fetch('http://localhost:3000/ramens')
  .then(response => response.json()) // Convert the response to json format
  .then(data => { // Handle the json data that we received from the response
    const ramenMenu = document.getElementById('ramen-menu');
      // Creates an img element for each ramen via a loop
      data.forEach(ramen => {
      
        const img = document.createElement('img');
        // Sets src of the img element to the ramen image from the URL
        img.src = ramen.image;
        // Sets alt for case where the image doesnt load
        img.alt = ramen.name;
        // Adds click event listener to display ramen details
        img.addEventListener('click', () => handleClick(ramen));
        // Appends the img element to the menu
        ramenMenu.appendChild(img);
      });
      // Display details for the first ramen in the array
      if (data.length > 0) {
        handleClick(data[0]);
      }
      })
      // Logs if there is an error while fetching
      .catch(error => console.error('Error fetching ramen data:', error));
}

// Function that handles edit ramen detail submissions
const editRamen = () => {
  const form = document.getElementById('edit-ramen');
  form.addEventListener('submit', function(event) {
    // Prevents the form from sending data and reloading the page
    event.preventDefault();
    const newRating = document.getElementById('new-rating').value;
    const newComment = document.getElementById('new-comment').value;
    //display the updated ratings and comments


    if (currentRamen) {

      currentRamen.rating = newRating;
      currentRamen.comment = newComment;

      const ratingDisplay = document.getElementById('rating-display');
      const commentDisplay = document.getElementById('comment-display');
      ratingDisplay.textContent = currentRamenRamen.rating
      commentDisplay.textContent = currentRamen.comment

        form.reset();
      }
    }) 
  }
// Function handles deleting the displayed ramen
const deleteRamen = () => {
  const deleteButton = document.getElementById('delete-button');
  deleteButton.addEventListener('click', function() {

    // Check if a ramen is displayed
    if (currentRamen) {
      const ramenMenu = document.getElementById('ramen-menu');
      const ramenDetail = document.getElementById('ramen-detail');

      const imgElements = ramenMenu.querySelectorAll('img');
      imgElements.forEach(img => {
        if (img.alt === currentRamen.name) {
          img.remove();
        }
      })

    }


    const nameElement = document.querySelector('.name');
    const restaurantElement = document.querySelector('.restaurant');
    const ratingDisplay = document.getElementById('rating-display');
    const commentDisplay = document.getElementById('comment-display');
    nameElement.textContent = ''
    restaurantElement.textContent = ''
    ratingDisplay.textContent = ''
    commentDisplay.textContent = ''

    // Clear form
    const editForm = document.getElementById('edit-ramen');
    editForm.reset()


  })
}

// Main function begins
const main = () => {
  // Invoke displayRamens here
  displayRamens()
  // Invoke addSubmitListener here
  addSubmitListener()
  // Invoke editRamen
  editRamen()
  // Invoke deleteRamen
  deleteRamen()
}

// Invoke the main function after the DOM loads
document.addEventListener('DOMContentLoaded', main)

// Export all functions
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  editRamen,
  deleteRamen,
  main
}
