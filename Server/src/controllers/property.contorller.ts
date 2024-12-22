import Property from "../models/property.js";

export const getProperty = async () => {
    const property = await Property.find();
    return property;
}