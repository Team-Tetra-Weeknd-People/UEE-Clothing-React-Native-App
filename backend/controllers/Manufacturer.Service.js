import Manufacturer from "../models/Manufacturer.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Get all manufacturers
export const getManufacturers = async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find();
    res.status(200).json(manufacturers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get single manufacturer
export const getManufacturer = async (req, res) => {
  const { id } = req.params;

  try {
    const manufacturer = await Manufacturer.findById(id);
    res.status(200).json(manufacturer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create manufacturer
export const createManufacturer = async (req, res) => {
  const manufacturer = req.body;

  const newManufacturer = new Manufacturer(manufacturer);

  try {
    await newManufacturer.save();
    res.status(201).json(newManufacturer);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update manufacturer
export const updateManufacturer = async (req, res) => {
  const { id } = req.params;
  const manufacturer = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No manufacturer with that id");

  const updatedManufacturer = await Manufacturer.findByIdAndUpdate(
    id,
    manufacturer,
    {
      new: true,
    }
  );
  res.json(updatedManufacturer);
};

// Delete manufacturer
export const deleteManufacturer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No manufacturer with that id");

  await Manufacturer.findByIdAndRemove(id);

  res.json({ message: "Manufacturer deleted successfully." });
};

// Login manufacturer
export const loginManufacturer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const manufacturer = await Manufacturer.findOne({ email });
    if (manufacturer) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        manufacturer.password
      );
      if (isPasswordCorrect) {
        const token = jwt.sign(
          { email: manufacturer.email, id: manufacturer._id },
          "test",
          { expiresIn: "1h" }
        );
        res
          .status(200)
          .json({ result: manufacturer, token, user: "MANUFACTURER", id: manufacturer._id });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// handle level
export const handleLevel = async (req, res) => {
  const { id } = req.params;
  const { points, count } = req.body; // count is up or down

  const manufacturer = await Manufacturer.findById(id);

  // update points
  if (count === "up") {
    manufacturer.points = parseFloat(manufacturer.points) + parseFloat(points);
  } else {
    manufacturer.points = parseFloat(manufacturer.points) - parseFloat(points);
  }

  // if points is greater than 100 then level up and reset points
  if (manufacturer.points >= 100) {
    manufacturer.points = 0;
    manufacturer.level = parseFloat(manufacturer.level) + 1;
  }

  // if points is less than 0 then level down and reset points
  if (manufacturer.points < 0) {
    manufacturer.points = 0;
    manufacturer.level = parseFloat(manufacturer.level) - 1;
  }

  if (manufacturer.level < 0) {
    manufacturer.level = 0;
  }

  // update supplier
  const updatedManufacturer = await Manufacturer.findByIdAndUpdate(
    id,
    manufacturer,
    {
      new: true,
    }
  );
  res.json(updatedManufacturer);
};

export default {
  getManufacturers,
  getManufacturer,
  createManufacturer,
  updateManufacturer,
  deleteManufacturer,
  loginManufacturer,
  handleLevel,
};
