const rentalApiUrl = '/api/rentals';

document.addEventListener('DOMContentLoaded', () => {
    loadRentals();
    document.getElementById('createRentalForm').addEventListener('submit', createRental);
    document.getElementById('deleteRentalForm').addEventListener('submit', deleteRental);
});

function loadRentals() {
    fetch(rentalApiUrl)
        .then(response => response.json())
        .then(data => {
            const rentalList = document.getElementById('rentalList');
            rentalList.innerHTML = '';
            data.forEach(rental => {
                const listItem = document.createElement('li');
                listItem.textContent = `${rental.name} - ${rental.price}`;
                rentalList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error loading rentals:', error));
}

function createRental(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const rentalData = Object.fromEntries(formData.entries());

    fetch(rentalApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rentalData),
    })
    .then(response => response.json())
    .then(data => {
        alert('Rental created successfully!');
        loadRentals();
        event.target.reset();
    })
    .catch(error => console.error('Error creating rental:', error));
}

function deleteRental(event) {
    event.preventDefault();
    const rentalId = event.target.rentalId.value;

    fetch(`${rentalApiUrl}/${rentalId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            alert('Rental deleted successfully!');
            loadRentals();
        } else {
            alert('Error deleting rental.');
        }
    })
    .catch(error => console.error('Error deleting rental:', error));
}