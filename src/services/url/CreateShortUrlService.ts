import config from "../../config";
import CustomError from "../../errors/CustomError";
import { IUrl } from "../../interfaces/url.interface";
import UrlModel from "../../models/url.model";
import generateShortCode from "../../utils/generateShortCode";

const CreateShortUrlService = async (loginUserId: string, payload: IUrl) => {
  const { originalUrl } = payload;

  const urlCount = await UrlModel.countDocuments({ userId: loginUserId });
  if (urlCount >= 100) {
    throw new CustomError(403, "Free tier limit reached.");
  }

  //check originalUrl is already exist
  const existingurl = await UrlModel.findOne({
    userId: loginUserId,
    originalUrl
  })

  if(existingurl){
    return existingurl;
  }

  const shortCode = generateShortCode();
  const shortUrl = `${config.short_base_url}/${shortCode}`;

  const result = await UrlModel.create({
    userId: loginUserId,
    originalUrl,
    shortCode,
    shortUrl,
  });

  return result;
};

export default CreateShortUrlService;
