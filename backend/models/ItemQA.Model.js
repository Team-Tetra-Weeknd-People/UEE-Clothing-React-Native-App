import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ItemQASchema = new Schema(
  {
    itemID: {
      type: String,
      required: true,
    },
    qaName: {
      type: String,
      required: true,
    },
    qaDescription: {
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

const ItemQA = mongoose.model("ItemQA", ItemQASchema);

export default ItemQA;
