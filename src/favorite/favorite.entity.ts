import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/user.entity';

export type FavoriteDocument = HydratedDocument<Favorite>;

export enum CATEGORIES {
  MOVIE = 'movie',
  TV_SHOW = 'tv-show',
}

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret._id;
      return ret;
    },
  },
})
export class Favorite {
  @Prop({
    required: true,
  })
  id: number;

  @Prop({
    type: String,
  })
  title: string;

  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    enum: Object.values(CATEGORIES),
  })
  category: CATEGORIES;

  @Prop({
    required: true,
  })
  overview: string;

  @Prop({ type: String })
  poster_path: string;

  @Prop({ type: Date })
  release_date: Date;

  @Prop({ type: Number, required: true })
  vote_average: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: User;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
