import ItemOrder from "../models/ItemOrder.Model.js";
import Item from "../models/Item.Model.js";
import ItemQA from "../models/ItemQA.Model.js";
import ItemQAComplain from "../models/ItemQAComplaint.Model.js";
import Manufacturer from "../models/Manufacturer.Model.js";
import Seller from "../models/Seller.Model.js";
import Supplier from "../models/Supplier.Model.js";
import Material from "../models/Material.Model.js";

// Get all itemOrders
export const getItemOrders = async (req, res) => {
  try {
    const itemOrders = await ItemOrder.find();
    for (let i = 0; i < itemOrders.length; i++) {
      //item
      const item = await Item.find({ _id: itemOrders[i].itemID });
      itemOrders[i].item = item[0];

      // material to item
      const material = await Material.find({
        _id: itemOrders[i].item.materialID,
      });
      itemOrders[i].material = material[0];

      // suuplier to material
      const supplier = await Supplier.find({
        _id: itemOrders[i].material.supplierID,
      });
      itemOrders[i].supplier = supplier[0];

      //manufacturer
      const manufacturer = await Manufacturer.find({
        _id: itemOrders[i].manufacturerID,
      });
      itemOrders[i].manufacturer = manufacturer[0];

      //itemQA
      const itemQAs = await ItemQA.find({
        itemID: itemOrders[i].item._id,
      });
      itemOrders[i].itemQA = itemQAs;

      //seller
      const seller = await Seller.find({ _id: itemOrders[i].sellerID });
      itemOrders[i].seller = seller[0];

      //QAComplain
      const QAComplain = await ItemQAComplain.find({
        itemOrderID: itemOrders[i]._id,
      });
      itemOrders[i].QAComplain = QAComplain;
    }
    res.status(200).json(itemOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get single itemOrder
export const getItemOrder = async (req, res) => {
  try {
    const itemOrder = await ItemOrder.findById(req.params.id);
    //item
    const item = await Item.find({ _id: itemOrder.itemID });
    itemOrder.item = item[0];

    // material to item
    const material = await Material.find({
      _id: itemOrder.item.materialID,
    });
    itemOrder.material = material[0];

    // suuplier to material
    const supplier = await Supplier.find({
      _id: itemOrder.material.supplierID,
    });
    itemOrder.supplier = supplier[0];

    //manufacturer
    const manufacturer = await Manufacturer.find({
      _id: itemOrder.manufacturerID,
    });
    itemOrder.manufacturer = manufacturer[0];

    //itemQA
    const itemQAs = await ItemQA.find({
      itemID: itemOrder.item._id,
    });
    itemOrder.itemQA = itemQAs;

    //seller
    const seller = await Seller.find({ _id: itemOrder.sellerID });
    itemOrder.seller = seller[0];

    //QAComplain
    const QAComplain = await ItemQAComplain.find({
      itemOrderID: itemOrder._id,
    });
    itemOrder.QAComplain = QAComplain;
    res.status(200).json(itemOrder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create itemOrder
export const createItemOrder = async (req, res) => {
  const itemOrder = req.body;

  const newItemOrder = new ItemOrder(itemOrder);

  try {
    await newItemOrder.save();
    res.status(201).json(newItemOrder);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update itemOrder
export const updateItemOrder = async (req, res) => {
  const { id } = req.params;
  const itemOrder = req.body;

  if (ItemOrder.findById(req.params.id))
    return res.status(404).send("No itemOrder with that id");

  const updatedItemOrder = await ItemOrder.findByIdAndUpdate(id, itemOrder, {
    new: true,
  });
  res.json(updatedItemOrder);
};

// Delete itemOrder
export const deleteItemOrder = async (req, res) => {
  const { id } = req.params;

  if (ItemOrder.findById(req.params.id))
    return res.status(404).send("No itemOrder with that id");

  await ItemOrder.findByIdAndRemove(id);

  res.json({ message: "ItemOrder deleted successfully." });
};

// Get itemOrders by manufacturerID
export const getItemOrdersByManufacturerID = async (req, res) => {
  const { id } = req.params;

  try {
    const itemOrders = await ItemOrder.find({ manufacturerID: id });
    for (let i = 0; i < itemOrders.length; i++) {
      //item
      const item = await Item.find({ _id: itemOrders[i].itemID });
      itemOrders[i].item = item[0];

      // material to item
      const material = await Material.find({
        _id: itemOrders[i].item.materialID,
      });
      itemOrders[i].material = material[0];

      // suuplier to material
      const supplier = await Supplier.find({
        _id: itemOrders[i].material.supplierID,
      });
      itemOrders[i].supplier = supplier[0];

      //manufacturer
      const manufacturer = await Manufacturer.find({
        _id: itemOrders[i].manufacturerID,
      });
      itemOrders[i].manufacturer = manufacturer[0];

      //itemQA
      const itemQAs = await ItemQA.find({
        itemID: itemOrders[i].item._id,
      });
      itemOrders[i].itemQA = itemQAs;

      //seller
      const seller = await Seller.find({ _id: itemOrders[i].sellerID });
      itemOrders[i].seller = seller[0];

      //QAComplain
      const QAComplain = await ItemQAComplain.find({
        itemOrderID: itemOrders[i]._id,
      });
      itemOrders[i].QAComplain = QAComplain;
    }
    res.status(200).json(itemOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get itemOrders by status
export const getItemOrdersByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const itemOrders = await ItemOrder.find({ status: status });
    for (let i = 0; i < itemOrders.length; i++) {
      //item
      const item = await Item.find({ _id: itemOrders[i].itemID });
      itemOrders[i].item = item[0];

      // material to item
      const material = await Material.find({
        _id: itemOrders[i].item.materialID,
      });
      itemOrders[i].material = material[0];

      // suuplier to material
      const supplier = await Supplier.find({
        _id: itemOrders[i].material.supplierID,
      });
      itemOrders[i].supplier = supplier[0];

      //manufacturer
      const manufacturer = await Manufacturer.find({
        _id: itemOrders[i].manufacturerID,
      });
      itemOrders[i].manufacturer = manufacturer[0];

      //itemQA
      const itemQAs = await ItemQA.find({
        itemID: itemOrders[i].item._id,
      });
      itemOrders[i].itemQA = itemQAs;

      //seller
      const seller = await Seller.find({ _id: itemOrders[i].sellerID });
      itemOrders[i].seller = seller[0];

      //QAComplain
      const QAComplain = await ItemQAComplain.find({
        itemOrderID: itemOrders[i]._id,
      });
      itemOrders[i].QAComplain = QAComplain;
    }
    res.status(200).json(itemOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get itemOrders by manufacturerID and status
export const getItemOrdersByManufacturerIDAndStatus = async (req, res) => {
  const { id, status } = req.params;

  try {
    const itemOrders = await ItemOrder.find({
      manufacturerID: id,
      status: status,
    });
    for (let i = 0; i < itemOrders.length; i++) {
      //item
      const item = await Item.find({ _id: itemOrders[i].itemID });
      itemOrders[i].item = item[0];

      // material to item
      const material = await Material.find({
        _id: itemOrders[i].item.materialID,
      });
      itemOrders[i].material = material[0];

      // suuplier to material
      const supplier = await Supplier.find({
        _id: itemOrders[i].material.supplierID,
      });
      itemOrders[i].supplier = supplier[0];

      //manufacturer
      const manufacturer = await Manufacturer.find({
        _id: itemOrders[i].manufacturerID,
      });
      itemOrders[i].manufacturer = manufacturer[0];

      //itemQA
      const itemQAs = await ItemQA.find({
        itemID: itemOrders[i].item._id,
      });
      itemOrders[i].itemQA = itemQAs;

      //seller
      const seller = await Seller.find({ _id: itemOrders[i].sellerID });
      itemOrders[i].seller = seller[0];

      //QAComplain
      const QAComplain = await ItemQAComplain.find({
        itemOrderID: itemOrders[i]._id,
      });
      itemOrders[i].QAComplain = QAComplain;
    }
    res.status(200).json(itemOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get item orders by seller id
export const getItemOrdersBySellerID = async (req, res) => {
  const { id } = req.params;

  try {
    const itemOrders = await ItemOrder.find({ sellerID: id });
    for (let i = 0; i < itemOrders.length; i++) {
      //item
      const item = await Item.find({ _id: itemOrders[i].itemID });
      itemOrders[i].item = item[0];

      // material to item
      const material = await Material.find({
        _id: itemOrders[i].item.materialID,
      });
      itemOrders[i].material = material[0];

      // suuplier to material
      const supplier = await Supplier.find({
        _id: itemOrders[i].material.supplierID,
      });
      itemOrders[i].supplier = supplier[0];

      //manufacturer
      const manufacturer = await Manufacturer.find({
        _id: itemOrders[i].manufacturerID,
      });
      itemOrders[i].manufacturer = manufacturer[0];

      //itemQA
      const itemQAs = await ItemQA.find({
        itemID: itemOrders[i].item._id,
      });
      itemOrders[i].itemQA = itemQAs;

      //seller
      const seller = await Seller.find({ _id: itemOrders[i].sellerID });
      itemOrders[i].seller = seller[0];

      //QAComplain
      const QAComplain = await ItemQAComplain.find({
        itemOrderID: itemOrders[i]._id,
      });
      itemOrders[i].QAComplain = QAComplain;
    }
    res.status(200).json(itemOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default {
  getItemOrders,
  getItemOrder,
  createItemOrder,
  updateItemOrder,
  deleteItemOrder,
  getItemOrdersByManufacturerID,
  getItemOrdersByStatus,
  getItemOrdersByManufacturerIDAndStatus,
  getItemOrdersBySellerID,
};
