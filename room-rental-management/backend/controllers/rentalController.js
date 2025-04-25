class RentalController {
    constructor(rentalModel) {
        this.rentalModel = rentalModel;
    }

    async getRentals(req, res) {
        try {
            const rentals = await this.rentalModel.findAll();
            res.status(200).json(rentals);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving rentals', error });
        }
    }

    async createRental(req, res) {
        try {
            const rentalData = req.body;
            const newRental = await this.rentalModel.create(rentalData);
            res.status(201).json(newRental);
        } catch (error) {
            res.status(500).json({ message: 'Error creating rental', error });
        }
    }

    async deleteRental(req, res) {
        try {
            const rentalId = req.params.id;
            await this.rentalModel.delete(rentalId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting rental', error });
        }
    }
}

export default RentalController;