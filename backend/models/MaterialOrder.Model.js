import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MaterialOrderSchema = new Schema(
  {
    materialID: {
      type: String,
      required: true,
    },
    material: {
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
    supplierID: {
      type: String,
      required: true,
    },
    supplier: {
      type: Object,
      default: {},
    },
    manufacturerID: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: Object,
      default: {},
    },
    status: {
      type: String,
      default: "Pending",
      enums: [
        "Pending",
        "Accepted",
        "Confiremed",
        "Rejected",
        "Delivered",
        "Assuered",
      ],
    },
    materialQA: {
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

const MaterialOrder = mongoose.model("MaterialOrder", MaterialOrderSchema);

export default MaterialOrder;
