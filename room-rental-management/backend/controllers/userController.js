class UserController {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async getUsers(req, res) {
        try {
            const users = await this.userModel.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving users', error });
        }
    }

    async createUser(req, res) {
        const userData = req.body;
        try {
            const newUser = await this.userModel.create(userData);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error });
        }
    }
}

export default UserController;