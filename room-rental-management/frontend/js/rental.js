document.addEventListener('DOMContentLoaded', () => {
    const rentalList = document.getElementById('rental-list');
    const createRentalForm = document.getElementById('create-rental-form');
    const deleteRentalForm = document.getElementById('delete-rental-form');

    // Function to fetch and display rentals
    const fetchRentals = async () => {
        try {
            const response = await fetch('/api/rentals');
            const rentals = await response.json();
            rentalList.innerHTML = '';
            rentals.forEach(rental => {
                const rentalItem = document.createElement('li');
                rentalItem.textContent = `${rental.name} - ${rental.price}`;
                rentalItem.setAttribute('data-id', rental.id);
                rentalList.appendChild(rentalItem);
            });
        } catch (error) {
            console.error('Error fetching rentals:', error);
        }
    };

    // Function to create a new rental
    const createRental = async (event) => {
        event.preventDefault();
        const formData = new FormData(createRentalForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/rentals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                fetchRentals();
                createRentalForm.reset();
            } else {
                console.error('Error creating rental:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating rental:', error);
        }
    };

    // Function to delete a rental
    const deleteRental = async (event) => {
        event.preventDefault();
        const rentalId = deleteRentalForm.querySelector('input[name="rentalId"]').value;

        try {
            const response = await fetch(`/api/rentals/${rentalId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchRentals();
                deleteRentalForm.reset();
            } else {
                console.error('Error deleting rental:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting rental:', error);
        }
    };

    createRentalForm.addEventListener('submit', createRental);
    deleteRentalForm.addEventListener('submit', deleteRental);
    fetchRentals();
});