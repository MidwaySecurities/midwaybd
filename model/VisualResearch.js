import mongoose from "mongoose";

const visualResearchSchema = new mongoose.Schema(
  {
    title: {},
    description: {},
    image: {},
    link: {},
  },
  { timestamps: true }
);
export default mongoose.models.VisualResearch || mongoose.model("VisualResearch", visualResearchSchema);