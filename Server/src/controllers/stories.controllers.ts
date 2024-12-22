import SoldStories from "../models/sold-stories.js";

export const getStories = async () => {
    const soldStories = await SoldStories.find();
    return soldStories;
}