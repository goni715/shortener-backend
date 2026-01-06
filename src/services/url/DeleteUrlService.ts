import CustomError from "../../errors/CustomError";
import UrlModel from "../../models/url.model";
import isNotObjectId from "../../utils/isNotObjectId";

const DeleteUrlService = async (loginUserId: string, urlId: string) => {
  if (isNotObjectId(urlId)) {
    throw new CustomError(400, "urlId must be a valid ObjectId");
  }
  const url = await UrlModel.findOne({
    _id: urlId,
    userId: loginUserId,
  });
  if (!url) {
    throw new CustomError(404, "URL not found with the provided ID");
  }

  const result = await UrlModel.deleteOne({
    _id: urlId,
    userId: loginUserId,
  });
  return result;
};

export default DeleteUrlService;
