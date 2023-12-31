import Supplier from "../models/Supplier.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Get all suppliers
export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get single supplier
export const getSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    const supplier = await Supplier.findById(id);
    res.status(200).json(supplier);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create supplier
export const createSupplier = async (req, res) => {
  const supplier = req.body;

  const newSupplier = new Supplier(supplier);

  try {
    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update supplier
export const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const supplier = req.body;

  if (!Supplier.findById(req.params.id))
    return res.status(404).send("No supplier with that id");

  const updatedSupplier = await Supplier.findByIdAndUpdate(id, supplier, {
    new: true,
  });
  res.json(updatedSupplier);
};

// Delete supplier
export const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  if (!Supplier.findById(req.params.id))
    return res.status(404).send("No supplier with that id");

  await Supplier.findByIdAndRemove(id);

  res.json({ message: "Supplier deleted successfully." });
};

// Login supplier
export const loginSupplier = async (req, res) => {
  const { email, password } = req.body;
  try {
    const supplier = await Supplier.findOne({ email });
    if (supplier) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        supplier.password
      );
      if (isPasswordCorrect) {
        const token = jwt.sign(
          { email: supplier.email, id: supplier._id },
          "test",
          { expiresIn: "1h" }
        );
        res.status(200).json({ result: supplier, token, user: "SUPPLIER", id: supplier._id });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "No supplier found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// handle level
export const handleLevel = async (req, res) => {
  const { id } = req.params;
  const { points, count } = req.body; // count is up or down

  // get supplier
  const supplier = await Supplier.findById(id);

  // update points
  if (count === "up") {
    supplier.points = parseFloat(supplier.points) + parseFloat(points);
  } else {
    supplier.points = parseFloat(supplier.points) - parseFloat(points);
  }

  // if points is greater than 100 then level up and reset points
  if (supplier.points >= 100) {
    supplier.points = 0;
    supplier.level = parseFloat(supplier.level) + 1;
  }

  // if points is less than 0 then level down and reset points
  if (supplier.points < 0) {
    supplier.points = 0;
    supplier.level = parseFloat(supplier.level) - 1;
  }

  if (supplier.level < 0) {
    supplier.level = 0;
  }

  // update supplier
  const updatedSupplier = await Supplier.findByIdAndUpdate(id, supplier, {
    new: true,
  });
  res.json(updatedSupplier);
};

export default {
  getSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  loginSupplier,
  handleLevel,
};
