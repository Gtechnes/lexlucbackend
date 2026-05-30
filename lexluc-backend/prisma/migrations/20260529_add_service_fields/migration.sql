-- AddEnum
ALTER TYPE "ServiceStatus" ADD VALUE 'DRAFT';
ALTER TYPE "ServiceStatus" ADD VALUE 'PUBLISHED';

-- AlterTable
ALTER TABLE "services" ADD COLUMN "status" "ServiceStatus" NOT NULL DEFAULT 'DRAFT';
ALTER TABLE "services" ADD COLUMN "features" TEXT[] DEFAULT ARRAY[]::TEXT[];