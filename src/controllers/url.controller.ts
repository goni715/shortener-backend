import { Request, Response } from "express";
import { URL_VALID_FIELDS } from "../constants/url.constant";
import CustomError from "../errors/CustomError";
import UrlModel from "../models/url.model";
import CreateShortUrlService from "../services/url/CreateShortUrlService";
import DeleteUrlService from "../services/url/DeleteUrlService";
import GetUrlsService from "../services/url/GetUrlsService";
import asyncHandler from "../utils/asyncHandler";
import pickValidFields from "../utils/pickValidFields";

const createShortUrl = asyncHandler(async (req, res) => {
  const { userId } = req.headers;
  const result = await CreateShortUrlService(userId as string, req.body);
  res.status(201).json({
    success: true,
    message: "Short url is created successfully",
    data: result,
  });
});

const getUrls = asyncHandler(async (req, res) => {
  const { userId } = req.headers;
  const validatedQuery = pickValidFields(req.query, URL_VALID_FIELDS);
  const result = await GetUrlsService(userId as string, validatedQuery);
  res.status(200).json({
    success: true,
    message: "Urls are retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const redirectUrl = async (req: Request, res: Response) => {
  const { code } = req.params;
  const url = await UrlModel.findOne({ shortCode: code });
  if (!url) {
    throw new CustomError(404, "URL not found");
  }

  //increment the visits
  await UrlModel.updateOne(
    { _id: url._id },
    { $inc: { visits: 1 } },
    { runValidators: true }
  );

  res.redirect(url.originalUrl);
};

const deleteUrl = asyncHandler(async (req, res) => {
  const { userId } = req.headers;
  const { urlId } = req.params;
  const result = await DeleteUrlService(userId as string, urlId);
  res.status(200).json({
    success: true,
    message: "URL is deleted successfully",
    data: result,
  });
});

const UrlController = {
  createShortUrl,
  getUrls,
  redirectUrl,
  deleteUrl,
};

export default UrlController;
