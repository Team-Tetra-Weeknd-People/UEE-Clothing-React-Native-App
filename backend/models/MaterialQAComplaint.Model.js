import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MaterialQAComplaintSchema = new Schema(
  {
    materialOrderID: {
      type: String,
      required: true,
    },
    materialID: {
      type: String,
      required: true,
    },
    QAid: {
      type: String,
      required: true,
    },
    complain: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "createdOn",
      updatedAt: "updatedOn",
    },
  }
);

const MaterialQAComplaint = mongoose.model(
  "MaterialQAComplaint",
  MaterialQAComplaintSchema
);

export default MaterialQAComplaint;
