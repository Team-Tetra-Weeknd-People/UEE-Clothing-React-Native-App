import MaterialQAComplaint from "../models/MaterialQAComplaint.Model.js";

// Get all materialQAComplains
export const getMaterialQAComplains = async (req, res) => {
  try {
    const materialQAComplains = await MaterialQAComplaint.find();
    res.status(200).json(materialQAComplains);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get single materialQAComplain
export const getMaterialQAComplain = async (req, res) => {
  const { id } = req.params;

  try {
    const materialQAComplain = await MaterialQAComplaint.findById(id);
    res.status(200).json(materialQAComplain);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create materialQAComplain
export const createMaterialQAComplain = async (req, res) => {
  const materialQAComplain = req.body;

  const newMaterialQAComplain = new MaterialQAComplaint(materialQAComplain);

  try {
    await newMaterialQAComplain.save();
    res.status(201).json(newMaterialQAComplain);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update materialQAComplain
export const updateMaterialQAComplain = async (req, res) => {
  const { id } = req.params;
  const materialQAComplain = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No materialQAComplain with that id");

  const updatedMaterialQAComplain = await MaterialQAComplaint.findByIdAndUpdate(
    id,
    materialQAComplain,
    {
      new: true,
    }
  );
  res.json(updatedMaterialQAComplain);
};

// Delete materialQAComplain
export const deleteMaterialQAComplain = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No materialQAComplain with that id");

  await MaterialQAComplaint.findByIdAndRemove(id);

  res.json({ message: "MaterialQAComplain deleted successfully." });
};

//get all materialQAComplains by materialOrderID
export const getMaterialQAComplainsByMaterialOrderID = async (req, res) => {
  const { id } = req.params;

  try {
    const materialQAComplains = await MaterialQAComplaint.find({
      materialOrderID: id,
    });
    res.status(200).json(materialQAComplains);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get QA complains by QAid
export const getMaterialQAComplainsByQAid = async (req, res) => {
  const { id } = req.params;

  try {
    const materialQAComplains = await MaterialQAComplaint.find({
      QAid: id,
    });
    res.status(200).json(materialQAComplains);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default {
  getMaterialQAComplains,
  getMaterialQAComplain,
  createMaterialQAComplain,
  updateMaterialQAComplain,
  deleteMaterialQAComplain,
  getMaterialQAComplainsByMaterialOrderID,
  getMaterialQAComplainsByQAid,
};
