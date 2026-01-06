import { Types } from "mongoose";
import { TUrlQuery } from "../../interfaces/url.interface";
import UrlModel from "../../models/url.model";

const GetUrlsService = async (loginUserId: string, query: TUrlQuery) => {
  const {
    searchTerm,
    page = 1,
    limit = 10,
    sortOrder = "desc",
    sortBy = "createdAt",
  } = query;

  // 1. Set up pagination
  const skip = (Number(page) - 1) * Number(limit);

  //3. setup sorting
  const sortDirection = sortOrder === "asc" ? 1 : -1;

  const result = await UrlModel.aggregate([
    {
      $match: {
        userId: new Types.ObjectId(loginUserId),
      },
    },
    {
      $project: {
        updatedAt: 0,
        userId: 0,
      },
    },
    { $sort: { [sortBy]: sortDirection } },
    { $skip: skip },
    { $limit: Number(limit) },
  ]);

  // total count
  const totalCountResult = await UrlModel.aggregate([
    {
      $match: {
        userId: new Types.ObjectId(loginUserId),
      },
    },
    { $count: "totalCount" },
  ]);

  const totalCount = totalCountResult[0]?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / Number(limit));

  return {
    meta: {
      page: Number(page), //currentPage
      limit: Number(limit),
      totalPages,
      total: totalCount,
    },
    data: result,
  };
};

export default GetUrlsService;
