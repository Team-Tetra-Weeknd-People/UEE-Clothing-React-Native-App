import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ItemSchema = new Schema(
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
    manufacturerID: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: Object,
      default: {},
    },
    materialID: {
      type: String,
      required: true,
    },
    material: {
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

const Item = mongoose.model("Item", ItemSchema);

export default Item;
