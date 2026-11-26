import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    userName: { type: String, default: '' },
    gfName: { type: String, default: 'Riya' },
    personality: {
      type: String,
      default:
        'sweet, caring, playful and a little teasing; loves garba, chai, Bollywood songs and late-night talks',
    },
    // Short facts she remembers about the user, e.g. "has a dog named Max"
    memories: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
