import mongoose from 'mongoose';

const homeSchema = new mongoose.Schema({
  hero: {
    title: {
      type: String,
      required: [true, 'Hero title is required'],
      trim: true
    },
    subtitle: {
      type: String,
      required: [true, 'Hero subtitle is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Hero description is required'],
      trim: true
    },
    image: {
      type: String,
      required: [true, 'Hero image is required'],
      trim: true
    }
  },
  features: [{
    title: {
      type: String,
      required: [true, 'Feature title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Feature description is required'],
      trim: true
    },
    icon: {
      type: String,
      required: [true, 'Feature icon is required'],
      trim: true
    }
  }],
  about: {
    title: {
      type: String,
      required: [true, 'About title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'About description is required'],
      trim: true
    },
    image: {
      type: String,
      required: [true, 'About image is required'],
      trim: true
    }
  },
  testimonials: [{
    name: {
      type: String,
      required: [true, 'Testimonial name is required'],
      trim: true
    },
    role: {
      type: String,
      required: [true, 'Testimonial role is required'],
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Testimonial content is required'],
      trim: true
    },
    image: {
      type: String,
      required: [true, 'Testimonial image is required'],
      trim: true
    }
  }],
  cta: {
    title: {
      type: String,
      required: [true, 'CTA title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'CTA description is required'],
      trim: true
    },
    buttonText: {
      type: String,
      required: [true, 'CTA button text is required'],
      trim: true
    },
    buttonLink: {
      type: String,
      required: [true, 'CTA button link is required'],
      trim: true
    }
  }
}, {
  timestamps: true
});

// Create and export the Home model
const Home = mongoose.models.Home || mongoose.model('Home', homeSchema);

export default Home; 