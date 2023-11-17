import mongoose from "mongoose";
import LogSchema from "../models/log";

export let Log: mongoose.Model<
  { [x: string]: any },
  {},
  {},
  {},
  mongoose.Document<unknown, {}, { [x: string]: any }> & {
    [x: string]: any;
  } & Required<{ _id: unknown }>,
  mongoose.Schema<
    any,
    mongoose.Model<any, any, any, any, any, any>,
    {},
    {},
    {},
    {},
    mongoose.DefaultSchemaOptions,
    { [x: string]: any },
    mongoose.Document<unknown, {}, mongoose.FlatRecord<{ [x: string]: any }>> &
      mongoose.FlatRecord<{ [x: string]: any }> &
      Required<{ _id: unknown }>
  >
>;

export default function DBInit() {
  console.info(process.env.MONGO_URI);
  mongoose.connect(process.env.MONGO_URI!);

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error", err);
    //Log.error('MongoDB connection error: ' + err);
    process.exit();
  });
  mongoose.connection.on("connected", () => {
    console.info("Connected to mogoDB");
    Log = mongoose.model("Log", LogSchema);
  });
  mongoose.connection.on("disconnected", () => {
    console.info("Disconnected from MongoDB");
  });
}
