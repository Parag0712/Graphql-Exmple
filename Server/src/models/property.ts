import mongoose, { Schema, Document, Model } from "mongoose";

// Define interfaces for the nested documents
interface IAddress {
  fullAddress: string;
  city: string;
  state: string;
  zipOrPostalCode: string;
  country: string;
}

interface IPropertyDocument {
  name: string;
  url?: string;
}

interface IMortgage {
  totalAmount?: string;
  downPayment?: string;
  interestRate?: string;
  loanYears?: string;
  propertyTax?: string;
  insurance?: string;
  pmi?: string;
}

interface IAdditionalDetail {
  key: string;
  value: string;
}

// Define the main interface extending Document
interface IProperty extends Document {
  propertyId: string;
  title: string;
  price: string;
  sold: boolean;
  slider: boolean;
  address: IAddress;
  mortgage?: IMortgage;
  areaSize?: string;
  gmapLink?: string;
  yearBuilt?: string;
  propertyType: string;
  propertyDocuments: IPropertyDocument[];
  singleImage: string[];
  images: string[];
  mapImage?: string[];
  description: string;
  slug: string;
  featured:boolean
  hotOffer:boolean
  sale:boolean
  additionalDetails?: IAdditionalDetail[];
}

// Define the schema
const propertySchema: Schema<IProperty> = new Schema(
  {
    propertyId: { type: String, unique: true, required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    sold: { type: Boolean, required: true },
    slider: { type: Boolean, required: true },
    featured:{ type: Boolean, default:false },
    hotOffer:{ type: Boolean, default:false },
    sale:{ type: Boolean, default:false },
    address: {
      fullAddress: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipOrPostalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    mortgage: {
      totalAmount: { type: String },
      downPayment: { type: String },
      interestRate: { type: String },
      loanYears: { type: String },
      propertyTax: { type: String },
      insurance: { type: String },
      pmi: { type: String },
    },
    areaSize: { type: String },
    gmapLink: { type: String },
    yearBuilt: { type: String },
    propertyType: { type: String },
    propertyDocuments: [
      {
        name: { type: String },
        url: {
          type: String,
          validate: {
            validator: function (v: string) {
              return /\.pdf$/i.test(v);
            },
            message: (props: any) => `${props.value} is not a valid PDF URL!`,
          },
        },
      },
    ],
    singleImage: [{ type: String }],
    images: [{ type: String }],
    mapImage: [{ type: String }],
    description: { type: String },
    additionalDetails: [
      {
        key: { type: String },
        value: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create the model
const Property: Model<IProperty> = mongoose.models.Property || mongoose.model<IProperty>("Property", propertySchema);

export default Property;