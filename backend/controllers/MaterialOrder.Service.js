import MaterialOrder from "../models/MaterialOrder.Model.js";
import Material from "../models/Material.Model.js";
import MaterialQA from "../models/MaterialQA.Model.js";
import MaterialQAComplain from "../models/MaterialQAComplaint.Model.js";
import Supplier from "../models/Supplier.Model.js";
import Manufacturer from "../models/Manufacturer.Model.js";

// Get all materialOrders
export const getMaterialOrders = async (req, res) => {
  try {
    const materialOrders = await MaterialOrder.find();
    for (let i = 0; i < materialOrders.length; i++) {
      //material
      const material = await Material.find({
        _id: materialOrders[i].materialID,
      });
      materialOrders[i].material = material[0];

      //supplier
      const supplier = await Supplier.find({
        _id: materialOrders[i].supplierID,
      });
      materialOrders[i].supplier = supplier[0];

      //materialQA
      const materialQAs = await MaterialQA.find({
        materialID: materialOrders[i].material._id,
      });
      materialOrders[i].materialQA = materialQAs;

      //manufacturer
      const manufacturer = await Manufacturer.find({
        _id: materialOrders[i].manufacturerID,
      });
      materialOrders[i].manufacturer = manufacturer[0];

      //QAComplain
      const QAComplain = await MaterialQAComplain.find({
        materialOrderID: materialOrders[i]._id,
      });
      materialOrders[i].QAComplain = QAComplain;
    }
    res.status(200).json(materialOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get single materialOrder
export const getMaterialOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const materialOrder = await MaterialOrder.findById(id);
    //material
    const material = await Material.find({
      _id: materialOrder[i].materialID,
    });
    materialOrder[i].material = material[0];

    //supplier
    const supplier = await Supplier.find({
      _id: materialOrder[i].supplierID,
    });
    materialOrder[i].supplier = supplier[0];

    //materialQA
    const materialQAs = await MaterialQA.find({
      materialID: materialOrder[i].material._id,
    });
    materialOrder[i].materialQA = materialQAs;

    //manufacturer
    const manufacturer = await Manufacturer.find({
      _id: materialOrder[i].manufacturerID,
    });
    materialOrder[i].manufacturer = manufacturer[0];

    //QAComplain
    const QAComplain = await MaterialQAComplain.find({
      materialOrderID: materialOrder[i]._id,
    });
    materialOrder[i].QAComplain = QAComplain;

    res.status(200).json(materialOrder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create materialOrder
export const createMaterialOrder = async (req, res) => {
  const materialOrder = req.body;

  const newMaterialOrder = new MaterialOrder(materialOrder);

  try {
    await newMaterialOrder.save();
    res.status(201).json(newMaterialOrder);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update materialOrder
export const updateMaterialOrder = async (req, res) => {
  const { id } = req.params;
  const materialOrder = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No materialOrder with that id");

  const updatedMaterialOrder = await MaterialOrder.findByIdAndUpdate(
    id,
    materialOrder,
    {
      new: true,
    }
  );
  res.json(updatedMaterialOrder);
};

// Delete materialOrder
export const deleteMaterialOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No materialOrder with that id");

  await MaterialOrder.findByIdAndRemove(id);

  res.json({ message: "MaterialOrder deleted successfully." });
};

// get material orders by supplier id
export const getMaterialOrdersBySupplierID = async (req, res) => {
  const { id } = req.params;

  try {
    const materialOrders = await MaterialOrder.find({ supplierID: id });
    for (let i = 0; i < materialOrders.length; i++) {
      //material
      const material = await Material.find({
        _id: materialOrders[i].materialID,
      });
      materialOrders[i].material = material[0];

      //supplier
      const supplier = await Supplier.find({
        _id: materialOrders[i].supplierID,
      });
      materialOrders[i].supplier = supplier[0];

      //materialQA
      const materialQAs = await MaterialQA.find({
        materialID: materialOrders[i].material._id,
      });
      materialOrders[i].materialQA = materialQAs;

      //manufacturer
      const manufacturer = await Manufacturer.find({
        _id: materialOrders[i].manufacturerID,
      });
      materialOrders[i].manufacturer = manufacturer[0];

      //QAComplain
      const QAComplain = await MaterialQAComplain.find({
        materialOrderID: materialOrders[i]._id,
      });
      materialOrders[i].QAComplain = QAComplain;
    }
    res.status(200).json(materialOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get material orders by status
export const getMaterialOrdersByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const materialOrders = await MaterialOrder.find({ status: status });
    for (let i = 0; i < materialOrders.length; i++) {
      //material
      const material = await Material.find({
        _id: materialOrders[i].materialID,
      });
      materialOrders[i].material = material[0];

      //supplier
      const supplier = await Supplier.find({
        _id: materialOrders[i].supplierID,
      });
      materialOrders[i].supplier = supplier[0];

      //materialQA
      const materialQAs = await MaterialQA.find({
        materialID: materialOrders[i].material._id,
      });
      materialOrders[i].materialQA = materialQAs;

      //manufacturer
      const manufacturer = await Manufacturer.find({
        _id: materialOrders[i].manufacturerID,
      });
      materialOrders[i].manufacturer = manufacturer[0];

      //QAComplain
      const QAComplain = await MaterialQAComplain.find({
        materialOrderID: materialOrders[i]._id,
      });
      materialOrders[i].QAComplain = QAComplain;
    }
    res.status(200).json(materialOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get material orders by supplier id and status
export const getMaterialOrdersBySupplierIDAndStatus = async (req, res) => {
  const { id, status } = req.params;

  try {
    const materialOrders = await MaterialOrder.find({
      supplierID: id,
      status: status,
    });
    for (let i = 0; i < materialOrders.length; i++) {
      //material
      const material = await Material.find({
        _id: materialOrders[i].materialID,
      });
      materialOrders[i].material = material[0];

      //supplier
      const supplier = await Supplier.find({
        _id: materialOrders[i].supplierID,
      });
      materialOrders[i].supplier = supplier[0];

      //materialQA
      const materialQAs = await MaterialQA.find({
        materialID: materialOrders[i].material._id,
      });
      materialOrders[i].materialQA = materialQAs;

      //manufacturer
      const manufacturer = await Manufacturer.find({
        _id: materialOrders[i].manufacturerID,
      });
      materialOrders[i].manufacturer = manufacturer[0];

      //QAComplain
      const QAComplain = await MaterialQAComplain.find({
        materialOrderID: materialOrders[i]._id,
      });
      materialOrders[i].QAComplain = QAComplain;
    }
    res.status(200).json(materialOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default {
  getMaterialOrders,
  getMaterialOrder,
  createMaterialOrder,
  updateMaterialOrder,
  deleteMaterialOrder,
  getMaterialOrdersBySupplierID,
  getMaterialOrdersByStatus,
  getMaterialOrdersBySupplierIDAndStatus,
};
