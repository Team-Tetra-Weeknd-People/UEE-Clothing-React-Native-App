import Item from "../models/Item.Model.js";
import ItemQA from "../models/ItemQA.Model.js";
import Manufacturer from "../models/Manufacturer.Model.js";
import Material from "../models/Material.Model.js";

// Get all items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    for (let i = 0; i < items.length; i++) {
      const itemQAs = await ItemQA.find({ itemID: items[i]._id });
      items[i].qualityAttributes = itemQAs;
      const manufacturer = await Manufacturer.find({
        _id: items[i].manufacturerID,
      });
      items[i].manufacturer = manufacturer[0];
      const material = await Material.find({ _id: items[i].materialID });
      items[i].material = material[0];
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
    const manufacturer = await Manufacturer.find({ _id: item.manufacturerID });
    item.manufacturer = manufacturer[0];
    const material = await Material.find({ _id: item.materialID });
    item.material = material[0];
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

  if (!Item.findById(req.params.id))
    return res.status(404).send("No itemQAComplain with that id");

  const updatedItem = await Item.findByIdAndUpdate(id, item, { new: true });
  res.json(updatedItem);
};

// Delete item
export const deleteItem = async (req, res) => {
  const { id } = req.params;

  if (!Item.findById(req.params.id))
    return res.status(404).send("No itemQAComplain with that id");

  await Item.findByIdAndRemove(id);

  res.json({ message: "Item deleted successfully" });
};

export const getItemsByManufacturerID = async (req, res) => {
  const { id } = req.params;

  try {
    const items = await Item.find({ manufacturerID: id });
    for (let i = 0; i < items.length; i++) {
      const itemQAs = await ItemQA.find({ itemID: items[i]._id });
      items[i].qualityAttributes = itemQAs;
      const manufacturer = await Manufacturer.find({
        _id: items[i].manufacturerID,
      });
      items[i].manufacturer = manufacturer[0];
      const material = await Material.find({ _id: items[i].materialID });
      items[i].material = material[0];
    }
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getItemsByMaterialID = async (req, res) => {
  const { id } = req.params;

  try {
    const items = await Item.find({ materialID: id });
    for (let i = 0; i < items.length; i++) {
      const itemQAs = await ItemQA.find({ itemID: items[i]._id });
      items[i].qualityAttributes = itemQAs;
      const manufacturer = await Manufacturer.find({
        _id: items[i].manufacturerID,
      });
      items[i].manufacturer = manufacturer[0];
      const material = await Material.find({ _id: items[i].materialID });
      items[i].material = material[0];
    }
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getItemsByManufacturerID,
  getItemsByMaterialID,
};
