import { Request, Response } from "express";
import { URL_VALID_FIELDS } from "../constants/url.constant";
import CustomError from "../errors/CustomError";
import UrlModel from "../models/url.model";
import CreateShortUrlService from "../services/url/CreateShortUrlService";
import DeleteUrlService from "../services/url/DeleteUrlService";
import GetUrlsService from "../services/url/GetUrlsService";
import asyncHandler from "../utils/asyncHandler";
import pickValidFields from "../utils/pickValidFields";
import RedirectUrlService from "../services/url/RedirectUrlService";

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
  const result = await RedirectUrlService(code);
  res.status(200).json({
    success: true,
    message: "Url is redirected successfully",
    data: result,
  });
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
