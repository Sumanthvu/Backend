import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String, //cloudirnary url
      required: true,
    },
    thumbnail: {
      type: String, //cloudirnary url
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    descrption: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, //cloudirnary url
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);


videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema);
