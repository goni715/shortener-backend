import { Document, Types } from "mongoose";

export interface IUrl extends Document {
  userId: Types.ObjectId;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  visits: number;
}

export type TUrlQuery = {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
