import MaterialQA from "../models/MaterialQA.Model.js";

// Get all materialQAs
export const getMaterialQAs = async (req, res) => {
  try {
    const materialQAs = await MaterialQA.find();
    res.status(200).json(materialQAs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get single materialQA
export const getMaterialQA = async (req, res) => {
  const { id } = req.params;

  try {
    const materialQA = await MaterialQA.findById(id);
    res.status(200).json(materialQA);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create materialQA
export const createMaterialQA = async (req, res) => {
  const materialQA = req.body;

  const newMaterialQA = new MaterialQA(materialQA);

  try {
    await newMaterialQA.save();
    res.status(201).json(newMaterialQA);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update materialQA
export const updateMaterialQA = async (req, res) => {
  const { id } = req.params;
  const materialQA = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No materialQA with that id");

  const updatedMaterialQA = await MaterialQA.findByIdAndUpdate(id, materialQA, {
    new: true,
  });
  res.json(updatedMaterialQA);
};

// Delete materialQA
export const deleteMaterialQA = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No materialQA with that id");

  await MaterialQA.findByIdAndRemove(id);

  res.json({ message: "MaterialQA deleted successfully." });
};

// get all QA by materialID
export const getMaterialQAByMaterialID = async (req, res) => {
  const { id } = req.params;

  try {
    const materialQA = await MaterialQA.find({ materialID: id });
    res.status(200).json(materialQA);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default {
  getMaterialQAs,
  getMaterialQA,
  createMaterialQA,
  updateMaterialQA,
  deleteMaterialQA,
  getMaterialQAByMaterialID,
};
