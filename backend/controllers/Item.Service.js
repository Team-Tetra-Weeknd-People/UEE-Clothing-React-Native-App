import Item from "../models/Item.Model.js";
import ItemQA from "../models/ItemQA.Model.js";

// Get all items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    for (let i = 0; i < items.length; i++) {
      const itemQAs = await ItemQA.find({ itemID: items[i]._id });
      items[i].qualityAttributes = itemQAs;
    }
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get single item
export const getItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findById(id);
    const itemQAs = await ItemQA.find({ itemID: item._id });
    item.qualityAttributes = itemQAs;
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create item
export const createItem = async (req, res) => {
  const item = req.body;

  const newItem = new Item(item);

  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update item
export const updateItem = async (req, res) => {
  const { id } = req.params;
  const item = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No item with that id");

  const updatedItem = await Item.findByIdAndUpdate(id, item, { new: true });
  res.json(updatedItem);
};

// Delete item
export const deleteItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No item with that id");

  await Item.findByIdAndRemove(id);

  res.json({ message: "Item deleted successfully" });
};

export default {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
