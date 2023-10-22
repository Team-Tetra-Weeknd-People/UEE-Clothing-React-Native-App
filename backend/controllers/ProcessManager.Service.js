import ProcessManager from "../models/ProcessManager.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Get all processManagers
export const getProcessManagers = async (req, res) => {
  try {
    const processManagers = await ProcessManager.find();
    res.status(200).json(processManagers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get single processManager
export const getProcessManager = async (req, res) => {
  const { id } = req.params;

  try {
    const processManager = await ProcessManager.findById(id);
    res.status(200).json(processManager);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create processManager
export const createProcessManager = async (req, res) => {
  const processManager = req.body;

  const newProcessManager = new ProcessManager(processManager);

  try {
    await newProcessManager.save();
    res.status(201).json(newProcessManager);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update processManager
export const updateProcessManager = async (req, res) => {
  const { id } = req.params;
  const processManager = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No processManager with that id");

  const updatedProcessManager = await ProcessManager.findByIdAndUpdate(
    id,
    processManager,
    {
      new: true,
    }
  );
  res.json(updatedProcessManager);
};

// Delete processManager
export const deleteProcessManager = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No processManager with that id");

  await ProcessManager.findByIdAndRemove(id);

  res.json({ message: "ProcessManager deleted successfully." });
};

// login processManager
export const loginProcessManager = async (req, res) => {
  const { email, password } = req.body;

  try {
    const processManager = await ProcessManager.findOne({ email });
    if (processManager) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        processManager.password
      );
      if (isPasswordCorrect) {
        const token = jwt.sign(
          { email: processManager.email, id: processManager._id },
          "test",
          { expiresIn: "1h" }
        );
        res
          .status(200)
          .json({ result: processManager, token, user: "PROCESSMANAGER", id: processManager._id });
      } else {
        res.status(400).json({ message: "Invalid credentials." });
      }
    } else {
      res.status(404).json({ message: "ProcessManager not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export default {
  getProcessManagers,
  getProcessManager,
  createProcessManager,
  updateProcessManager,
  deleteProcessManager,
  loginProcessManager,
};
