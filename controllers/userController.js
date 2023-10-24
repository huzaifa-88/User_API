const user = require('../models/userModel');

module.exports = {
    createUser,
    getAllUser,
    updateUser,
    deleteUser,
    loginUser,
}

async function createUser(req, res){
    try{
        const {UserEmail, Contact, Password} = req.body;
        const userDB = await user.findOne({UserEmail});
        // console.log(userDB);
        if(userDB != null)
        {
            if(UserEmail == userDB.UserEmail && Password == userDB.Password){
                return res
                .status(409)
                .send("Account already exist");
            }
            else if(Password == userDB.Password){
                return res
                .status(409)
                .send("Password already exist");
            }
            else if(UserEmail == userDB.UserEmail){
                return res
                .status(201)
                .send("Email Already Exists");
            }
            else if(Contact == userDB.Contact){
                return res
                .status(201)
                .send("Contact Number Already Exists");
            }
        }
        else{
            // let emailExist = await userExists({email: req.body.email})
            const newUser = await user.create(req.body);
            if(!newUser) return res.status(401).json({msg: "Failed to create User"});
            res.status(201).json(newUser);
        }
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
}

async function getAllUser(req, res){
    try{
        let users = await user.find();
        res.json(users);
    }
    catch(err){
        res.status(500).send("Server error");
    }
}

async function updateUser(req, res){
    try{
        const {UserEmail} = req.body;
        let userDB = await user.findOneAndUpdate({UserEmail}, {$set: req.body},{new: true});
        res.send("Updated Succesfully");

        // const id = req.params;
        // // let updatedUser = await user.updateOne({_id: req.params.userId}, {...req.body});
        // let updatedUser = await user.findByIdAndUpdate(id, req.body, {new : true});
        // res.json(updatedUser);
    }
    catch(err){
        res.status(404).send("Cannot find the user.");
    }
}


async function deleteUser(req, res){
    try{
        // const {UserEmail} = req.body;
        const id = req.params;
        let deletedUser = await user.deleteOne({_id: id});
        // await user.findByIdAndDelete(id);
        // await user.findByIdAndRemove(id);
        res.sendStatus(204).json(deletedUser).send("Deleted Succesfully");
    }
    catch(err){
        res.status(404).send("Cannot find the user.");
    }
}

async function loginUser (req, res) {
    try {
      const { UserEmail, Password } = req.body;
      const myUser = await user.findOne({ UserEmail });
  
      if (!myUser) {
        return res
          .status(401)
          .json({ message: "Authentication failed. User not found." });
      }
  
      if (myUser.Password !== Password) {
        return res
          .status(401)
          .json({ message: "Authentication failed. Incorrect password." });
      }
  
      res.status(200).json({ message: "Authentication successful" });
    } catch (err) {
      res.status(500).json({ error: err.message});
  }
};