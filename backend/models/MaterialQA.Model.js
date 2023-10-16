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
