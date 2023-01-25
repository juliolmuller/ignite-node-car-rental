-- CreateTable
CREATE TABLE "cars" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "brand" VARCHAR(255) NOT NULL,
    "category_id" UUID,
    "license_plate" VARCHAR(20) NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "daily_rate" DOUBLE PRECISION NOT NULL,
    "fine_amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
