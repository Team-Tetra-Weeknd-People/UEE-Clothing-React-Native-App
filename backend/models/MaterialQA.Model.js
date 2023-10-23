import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MaterialQASchema = new Schema(
  {
    materialID: {
      type: String,
      required: true,
    },
    QAName: {
      type: String,
      required: true,
    },
    QADescription: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enums: ['Pending', 'Checked', 'Defect'],
      default: 'Pending'
    },
  },
  {
    timestamps: {
      createdAt: "createdOn",
      updatedAt: "updatedOn",
    },
  }
);

const MaterialQA = mongoose.model("MaterialQA", MaterialQASchema);

export default MaterialQA;
