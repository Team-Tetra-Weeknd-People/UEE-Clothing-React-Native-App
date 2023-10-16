import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ItemQAComplaintSchema = new Schema(
  {
    itemID: {
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

const ItemQAComplaint = mongoose.model(
  "ItemQAComplaint",
  ItemQAComplaintSchema
);

export default ItemQAComplaintSchema;
