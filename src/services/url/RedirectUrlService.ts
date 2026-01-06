import CustomError from "../../errors/CustomError";
import UrlModel from "../../models/url.model";

const RedirectUrlService = async (code: string) => {
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

  return url.originalUrl;
}

export default RedirectUrlService