import ItemRouter from "./routes/Item.Route.js";
import ItemOrderRouter from "./routes/ItemOrder.Route.js";
import ItemQARouter from "./routes/ItemQA.Route.js";
import ItemComplaintRouter from "./routes/ItemQAComplaint.Route.js";

import MaterialRouter from "./routes/Material.Route.js";
import MaterialOrderRouter from "./routes/MaterialOrder.Route.js";
import MaterialQARouter from "./routes/MaterialQA.Route.js";
import MaterialComplaintRouter from "./routes/MaterialQAComplaint.Route.js";

import ProcessManagerRouter from "./routes/ProcessManager.Route.js";
import SellerRouter from "./routes/Seller.Route.js";
import SupplierRouter from "./routes/Supplier.Route.js";
import ManufacturerRouter from "./routes/Manufacturer.Route.js";

function routers(app) {
  app.use("/api/items", ItemRouter);
  app.use("/api/itemOrders", ItemOrderRouter);
  app.use("/api/itemQAs", ItemQARouter);
  app.use("/api/itemComplaints", ItemComplaintRouter);

  app.use("/api/materials", MaterialRouter);
  app.use("/api/materialOrders", MaterialOrderRouter);
  app.use("/api/materialQAs", MaterialQARouter);
  app.use("/api/materialComplaints", MaterialComplaintRouter);

  app.use("/api/processManagers", ProcessManagerRouter);
  app.use("/api/sellers", SellerRouter);
  app.use("/api/suppliers", SupplierRouter);
  app.use("/api/manufacturers", ManufacturerRouter);
}

export default routers;
