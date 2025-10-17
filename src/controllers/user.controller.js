import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudirnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation of user inputs
  //check if user already exists: check with the unique parameter like username or email
  //check for images,check for avtar
  //upload them to cloudinary,avtar
  //create user object-create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return response (to the user)

  const { fullName, email, username, password } = req.body;
  console.log("email: ", email);

  //for validation currently we are only checking if all fields are filled  or not
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //now to check if user already exists or not
  //below is the synatx to check if in the database among the given fields like username or enail if we find any one in the data base it will return true else it will return false
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avaatarLocalPath = req.files?.avatar[0]?.path;
  const CoverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avaatarLocalPath) throw new ApiError(400, "Avatar file is required");

  //upload  to cloudinary
  const avatar = await uploadOnCloudinary(avaatarLocalPath);
  const coverImage = await uploadOnCloudinary(CoverImageLocalPath);

  //check if avatar is correctly uploaded on cloudinary
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  //checking if user is created successfully and if created we will remove the password and the refresh token fields from the response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(
      500,
      "Somethinng went wrong while registerinng the user"
    );
  }

  //once the user is created we wil return the response to the user
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
