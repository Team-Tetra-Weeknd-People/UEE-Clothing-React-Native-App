import ItemQA from "../models/ItemQA.Model.js";

// Get all itemQAs
export const getItemQAs = async (req, res) => {
  try {
    const itemQAs = await ItemQA.find();
    res.status(200).json(itemQAs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get single itemQA
export const getItemQA = async (req, res) => {
  const { id } = req.params;

  try {
    const itemQA = await ItemQA.findById(id);
    res.status(200).json(itemQA);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create itemQA
export const createItemQA = async (req, res) => {
  const itemQA = req.body;

  const newItemQA = new ItemQA(itemQA);

  try {
    await newItemQA.save();
    res.status(201).json(newItemQA);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update itemQA
export const updateItemQA = async (req, res) => {
  const { id } = req.params;
  const itemQA = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No itemQA with that id");

  const updatedItemQA = await ItemQA.findByIdAndUpdate(id, itemQA, {
    new: true,
  });
  res.json(updatedItemQA);
};

// Delete itemQA
export const deleteItemQA = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No itemQA with that id");

  await ItemQA.findByIdAndRemove(id);
  res.json({ message: "ItemQA deleted successfully." });
};

// Get all itemQAs by itemID
export const getItemQAsByItemID = async (req, res) => {
  const { id } = req.params;

  try {
    const itemQAs = await ItemQA.find({ itemID: id });
    res.status(200).json(itemQAs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default {
  getItemQAs,
  getItemQA,
  createItemQA,
  updateItemQA,
  deleteItemQA,
  getItemQAsByItemID,
};
