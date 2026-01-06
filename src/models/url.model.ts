import { model, Schema } from "mongoose";
import { IUrl } from "../interfaces/url.interface";

const urlSchema = new Schema<IUrl>(
  {
     userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"]
    },
    originalUrl: {
      type: String,
      required: true
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    shortUrl: {
      type: String,
      required: true
    },
    visits: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

const UrlModel = model<IUrl>("Url", urlSchema);
export default UrlModel;
