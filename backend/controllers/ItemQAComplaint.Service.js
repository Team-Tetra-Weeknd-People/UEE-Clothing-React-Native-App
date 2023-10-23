import ItemQAComplaint from "../models/ItemQAComplaint.Model.js";

// Get all itemQAComplains
export const getItemQAComplaints = async (req, res) => {
  try {
    const itemQAComplains = await ItemQAComplaint.find();
    res.status(200).json(itemQAComplains);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get single itemQAComplain
export const getItemQAComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const itemQAComplain = await ItemQAComplaint.findById(id);
    res.status(200).json(itemQAComplain);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create itemQAComplain
export const createItemQAComplaint = async (req, res) => {
  const itemQAComplain = req.body;

  const newItemQAComplaint = new ItemQAComplaint(itemQAComplain);

  try {
    await newItemQAComplaint.save();
    res.status(201).json(newItemQAComplaint);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update itemQAComplain
export const updateItemQAComplaint = async (req, res) => {
  const { id } = req.params;
  const itemQAComplain = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No itemQAComplain with that id");

  const updatedItemQAComplaint = await ItemQAComplaint.findByIdAndUpdate(
    id,
    itemQAComplain,
    {
      new: true,
    }
  );
  res.json(updatedItemQAComplaint);
};

// Delete itemQAComplain
export const deleteItemQAComplaint = async (req, res) => {
  const { id } = req.params;
  try {
    await ItemQAComplaint.findByIdAndRemove(id);
    res.json({ message: "ItemQAComplain deleted successfully." });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// get itemQAComplains by itemOrderID
export const getItemQAComplaintsByItemOrderID = async (req, res) => {
  try {
    const { id } = req.params;
    const itemQAComplains = await ItemQAComplaint.find({
      itemOrderID: id,
    });
    res.status(200).json(itemQAComplains);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get QA complains by QAid
export const getItemQAComplaintsByQAid = async (req, res) => {
  try {
    const { id } = req.params;
    const itemQAComplains = await ItemQAComplaint.find({
      QAid: id,
    });
    res.status(200).json(itemQAComplains);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default {
  getItemQAComplaints,
  getItemQAComplaint,
  createItemQAComplaint,
  updateItemQAComplaint,
  deleteItemQAComplaint,
  getItemQAComplaintsByItemOrderID,
  getItemQAComplaintsByQAid,
};
