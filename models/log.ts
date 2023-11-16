import { Mongoose, Schema } from "mongoose";

const LogSchema: Schema = new Schema({
  level: String,
  message: String,
  resourceId: String,
  timestamp: Date,
  traceId: String,
  spanId: String,
  commit: String,
  metaData: {
    parentResourceId: String,
  },
});

export default LogSchema;
