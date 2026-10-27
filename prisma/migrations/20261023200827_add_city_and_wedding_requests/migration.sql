-- CreateEnum
CREATE TYPE "WeddingRequestStatus" AS ENUM ('submitted', 'under_review', 'consultation_scheduled', 'consultation_completed');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "city" VARCHAR(50),
ADD COLUMN     "state" VARCHAR(50);

-- CreateTable
CREATE TABLE "wedding_requests" (
    "id" TEXT NOT NULL,
    "groom_name" TEXT NOT NULL,
    "bride_name" TEXT NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "wedding_date" VARCHAR(10),
    "venue" TEXT,
    "style" TEXT,
    "notes" TEXT,
    "budget_total" INTEGER,
    "budget_allocation" JSONB NOT NULL,
    "services" JSONB NOT NULL,
    "status" "WeddingRequestStatus" NOT NULL DEFAULT 'submitted',
    "submitted_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "wedding_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "wedding_requests_phone_idx" ON "wedding_requests"("phone");
