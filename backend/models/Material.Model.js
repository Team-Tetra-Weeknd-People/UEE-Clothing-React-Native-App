import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MaterialSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    qualityAttributes: {
      type: Array,
      default: [],
    },
    supplierID: {
      type: String,
      required: true,
    },
    supplier: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: {
      createdAt: "createdOn",
      updatedAt: "updatedOn",
    },
  }
);

const Material = mongoose.model("Material", MaterialSchema);

export default Material;
