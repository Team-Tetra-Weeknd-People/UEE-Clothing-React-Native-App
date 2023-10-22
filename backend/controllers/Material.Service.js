import Material from "../models/Material.Model.js";
import MaterialQA from "../models/MaterialQA.Model.js";
import Supplier from "../models/Supplier.Model.js";

// Get all materials
export const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    for (let i = 0; i < materials.length; i++) {
      const materialQAs = await MaterialQA.find({
        materialID: materials[i]._id,
      });
      materials[i].qualityAttributes = materialQAs;
      const supplier = await Supplier.find({ _id: materials[i].supplierID });
      materials[i].supplier = supplier[0];
    }
    res.status(200).json(materials);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get single material
export const getMaterial = async (req, res) => {
  const { id } = req.params;

  try {
    const material = await Material.findById(id);
    const materialQAs = await MaterialQA.find({ materialID: material._id });
    material.qualityAttributes = materialQAs;
    const supplier = await Supplier.find({ _id: material.supplierID });
    material.supplier = supplier[0];
    res.status(200).json(material);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create material
export const createMaterial = async (req, res) => {
  const material = req.body;

  const newMaterial = new Material(material);

  try {
    await newMaterial.save();
    res.status(201).json(newMaterial);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update material
export const updateMaterial = async (req, res) => {
  const { id } = req.params;
  const material = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No material with that id");

  const updatedMaterial = await Material.findByIdAndUpdate(id, material, {
    new: true,
  });
  res.json(updatedMaterial);
};

// Delete material
export const deleteMaterial = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No material with that id");

  await Material.findByIdAndRemove(id);

  res.json({ message: "Material deleted successfully." });
};

export const getMaterialsBySupplierID = async (req, res) => {
  const { id } = req.params;

  try {
    const materials = await Material.find({ supplierID: id });
    for (let i = 0; i < materials.length; i++) {
      const materialQAs = await MaterialQA.find({
        materialID: materials[i]._id,
      });
      materials[i].qualityAttributes = materialQAs;
    }
    res.status(200).json(materials);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default {
  getMaterials,
  getMaterial,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterialsBySupplierID,
};
