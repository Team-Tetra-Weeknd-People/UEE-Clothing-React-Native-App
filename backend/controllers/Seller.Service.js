import Seller from "../models/Seller.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Get all sellers
export const getSellers = async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.status(200).json(sellers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get single seller
export const getSeller = async (req, res) => {
  const { id } = req.params;

  try {
    const seller = await Seller.findById(id);
    res.status(200).json(seller);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create seller
export const createSeller = async (req, res) => {
  const seller = req.body;

  const newSeller = new Seller(seller);

  try {
    await newSeller.save();
    res.status(201).json(newSeller);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update seller
export const updateSeller = async (req, res) => {
  const { id } = req.params;
  const seller = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No seller with that id");

  const updatedSeller = await Seller.findByIdAndUpdate(id, seller, {
    new: true,
  });
  res.json(updatedSeller);
};

// Delete seller
export const deleteSeller = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No seller with that id");

  await Seller.findByIdAndRemove(id);

  res.json({ message: "Seller deleted successfully." });
};

// Login seller
export const loginSeller = async (req, res) => {
  const { email, password } = req.body;

  try {
    const seller = await Seller.findOne({ email });

    if (seller) {
      const passwordCorrect = await bcrypt.compare(password, seller.password);
      if (passwordCorrect) {
        const token = jwt.sign(
          { email: seller.email, id: seller._id },
          "test",
          { expiresIn: "1h" }
        );
        res.status(200).json({ result: seller, token, user: "SELLER" });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handle level
export const handleLevel = async (req, res) => {
  const { id } = req.params;
  const { points, count } = req.body; // count is up or down

  // get supplier
  const seller = await Seller.findById(id);

  // update points
  if (count === "up") {
    seller.points = parseFloat(seller.points) + parseFloat(points);
  } else {
    seller.points = parseFloat(seller.points) - parseFloat(points);
  }

  // if points is greater than 100 then level up and reset points
  if (seller.points >= 100) {
    seller.points = 0;
    seller.level = parseFloat(seller.level) + 1;
  }

  // if points is less than 0 then level down and reset points
  if (seller.points < 0) {
    seller.points = 0;
    seller.level = parseFloat(seller.level) - 1;
  }

  if (seller.level < 0) {
    seller.level = 0;
  }

  // update supplier
  const updatedSeller = await Seller.findByIdAndUpdate(id, seller, {
    new: true,
  });
  res.json(updatedSeller);
};

export default {
  getSellers,
  getSeller,
  createSeller,
  updateSeller,
  deleteSeller,
  loginSeller,
  handleLevel,
};
