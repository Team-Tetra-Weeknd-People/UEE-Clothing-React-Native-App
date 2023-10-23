import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ItemOrderSchema = new Schema(
  {
    itemID: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
      default: {},
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    manufacturerID: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: Object,
      default: {},
    },
    sellerID: {
      type: String,
      required: true,
    },
    seller: {
      type: Object,
      default: {},
    },
    supplier: {
      type: Object,
      default: {},
    },
    material: {
      type: Object,
      default: {},
    },
    status: {
      type: String,
      default: "Pending",
      enums: [
        "Pending",
        "Confirmed",
        "Sent",
        "Rejected",
        "Received",
        "Assured",
      ],
    },
    itemQA: {
      type: Array,
      default: [],
    },
    QAComplain: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: "createdOn",
      updatedAt: "updatedOn",
    },
  }
);

const ItemOrder = mongoose.model("ItemOrder", ItemOrderSchema);

export default ItemOrder;
