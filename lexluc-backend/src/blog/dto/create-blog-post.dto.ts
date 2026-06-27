import {
  IsString,
  IsOptional,
  IsBoolean,
  IsUUID,
  IsArray,
  IsInt,
  IsDateString,
  IsEnum,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
<<<<<<< HEAD
import { Type } from 'class-transformer';
=======
>>>>>>> 0eb0d894d67885f2e5d7084ca6293c4ed4db5ac0

export enum BlogPostStatus {
  DRAFT = 'DRAFT',
  UNDER_REVIEW = 'UNDER_REVIEW',
  SCHEDULED = 'SCHEDULED',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export class CreateBlogPostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsEnum(BlogPostStatus)
  status?: BlogPostStatus;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @IsOptional()
  @IsDateString()
  publishedAt?: string;

  @IsOptional()
  @IsDateString()
  scheduledFor?: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsBoolean()
  aiGenerated?: boolean;

  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  sourceTourIds?: string[];

  @IsOptional()
  @IsDateString()
  lastAutosavedAt?: string;

  @IsOptional()
  @IsInt()
  views?: number;

  @IsOptional()
  @IsInt()
  likes?: number;

  @IsOptional()
  @IsInt()
  shares?: number;

  @IsOptional()
  @IsInt()
  commentsCount?: number;

  @IsOptional()
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  seoKeywords?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

export enum BlogArticleType {
  TRAVEL_GUIDE = 'TRAVEL_GUIDE',
  DESTINATION_SPOTLIGHT = 'DESTINATION_SPOTLIGHT',
  TOUR_HIGHLIGHTS = 'TOUR_HIGHLIGHTS',
  TRAVEL_TIPS = 'TRAVEL_TIPS',
  COMPANY_EXPERIENCE_STORY = 'COMPANY_EXPERIENCE_STORY',
  CUSTOM = 'CUSTOM',
}

export enum BlogTone {
  PROFESSIONAL = 'Professional',
  LUXURY = 'Luxury',
  INFORMATIVE = 'Informative',
  CONVERSATIONAL = 'Conversational',
  CORPORATE = 'Corporate',
  INSPIRATIONAL = 'Inspirational',
}

export enum BlogArticleLength {
  SHORT = 'SHORT',
  MEDIUM = 'MEDIUM',
  LONG = 'LONG',
}

export enum BlogSeoFocus {
  SEO_OPTIMIZED = 'SEO_OPTIMIZED',
  READER_FOCUSED = 'READER_FOCUSED',
  BALANCED = 'BALANCED',
}

export enum BlogTargetAudience {
  FAMILIES = 'Families',
  TOURISTS = 'Tourists',
  CORPORATE_TRAVELERS = 'Corporate Travelers',
  STUDENTS = 'Students',
  INTERNATIONAL_VISITORS = 'International Visitors',
  BUSINESS_TRAVELERS = 'Business Travelers',
}

export class BlogSourceSelectionDto {
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  tourIds?: string[];

  @IsOptional()
  @IsString()
  destination?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsBoolean()
  upcoming?: boolean;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}

export class GenerateBlogDto {
<<<<<<< HEAD
  @IsOptional()
  @ValidateNested()
  @Type(() => BlogSourceSelectionDto)
  sourceSelection?: BlogSourceSelectionDto;
=======
  @ValidateNested()
  sourceSelection: BlogSourceSelectionDto;
>>>>>>> 0eb0d894d67885f2e5d7084ca6293c4ed4db5ac0

  @IsEnum(BlogArticleType)
  articleType: BlogArticleType;

  @IsOptional()
  @IsString()
  customTopic?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsEnum(BlogTone)
  tone: BlogTone;

  @IsEnum(BlogArticleLength)
  articleLength: BlogArticleLength;

  @IsEnum(BlogSeoFocus)
  seoFocus: BlogSeoFocus;

  @IsEnum(BlogTargetAudience)
  targetAudience: BlogTargetAudience;
}

export enum BlogAssistAction {
  IMPROVE_WRITING = 'IMPROVE_WRITING',
  EXPAND_CONTENT = 'EXPAND_CONTENT',
  SHORTEN_CONTENT = 'SHORTEN_CONTENT',
  IMPROVE_SEO = 'IMPROVE_SEO',
  GENERATE_META_TAGS = 'GENERATE_META_TAGS',
  GENERATE_TAGS = 'GENERATE_TAGS',
  GENERATE_CTA = 'GENERATE_CTA',
}

export class AssistBlogDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  seoKeywords?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

<<<<<<< HEAD
  @IsOptional()
  @ValidateNested()
  @Type(() => BlogSourceSelectionDto)
  sourceSelection?: BlogSourceSelectionDto;
=======
  @ValidateNested()
  sourceSelection: BlogSourceSelectionDto;
>>>>>>> 0eb0d894d67885f2e5d7084ca6293c4ed4db5ac0

  @IsEnum(BlogAssistAction)
  action: BlogAssistAction;
}
