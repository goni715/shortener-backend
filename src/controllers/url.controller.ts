import CreateShortUrlService from "../services/url/CreateShortUrlService";
import asyncHandler from "../utils/asyncHandler";


const createShortUrl = asyncHandler(async (req, res) => {
  const { userId } = req.headers;
  const result = await CreateShortUrlService(userId as string, req.body);
  res.status(201).json({
    success: true,
    message: "Short url is created successfully",
    data: result,
  });
});


const UrlController = {
    createShortUrl
}

export default UrlController;