-- CreateEnum
CREATE TYPE "public"."BookingStatus" AS ENUM ('PENDING', 'ACTIVE', 'COMPLETED');

-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EventType" (
    "event_type_id" SERIAL NOT NULL,
    "event_type" TEXT NOT NULL,

    CONSTRAINT "EventType_pkey" PRIMARY KEY ("event_type_id")
);

-- CreateTable
CREATE TABLE "public"."Package" (
    "package_id" SERIAL NOT NULL,
    "package_name" TEXT NOT NULL,
    "features" TEXT NOT NULL DEFAULT '[]',
    "package_desc" TEXT NOT NULL DEFAULT '',
    "package_price" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("package_id")
);

-- CreateTable
CREATE TABLE "public"."Tag" (
    "tag_id" SERIAL NOT NULL,
    "tag_name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("tag_id")
);

-- CreateTable
CREATE TABLE "public"."Venue" (
    "venue_id" SERIAL NOT NULL,
    "venue_name" TEXT NOT NULL,
    "venue_ratings" DOUBLE PRECISION,
    "venue_desc" TEXT NOT NULL,
    "venue_capacity" INTEGER NOT NULL,
    "venue_loc" TEXT NOT NULL,
    "venue_price" DOUBLE PRECISION NOT NULL,
    "venue_img" TEXT,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("venue_id")
);

-- CreateTable
CREATE TABLE "public"."VenueTag" (
    "venue_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "VenueTag_pkey" PRIMARY KEY ("venue_id","tag_id")
);

-- CreateTable
CREATE TABLE "public"."Booking" (
    "booking_id" SERIAL NOT NULL,
    "venue_id" INTEGER NOT NULL,
    "booking_date" TIMESTAMP(3) NOT NULL,
    "event_type_id" INTEGER NOT NULL,
    "expected_guest" INTEGER NOT NULL,
    "event_name" TEXT NOT NULL,
    "description" TEXT,
    "request" TEXT,
    "package_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "booking_end" TIMESTAMP(3),
    "booking_time" TEXT,
    "status" "public"."BookingStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "public"."BookingService" (
    "id" SERIAL NOT NULL,
    "booking_id" INTEGER NOT NULL,
    "serv_id" INTEGER NOT NULL,

    CONSTRAINT "BookingService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Service" (
    "serv_id" SERIAL NOT NULL,
    "serv_name" TEXT NOT NULL,
    "serv_price" DOUBLE PRECISION NOT NULL,
    "serv_type" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Service_pkey" PRIMARY KEY ("serv_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "public"."Admin"("email");

-- CreateIndex
CREATE INDEX "Booking_event_type_idx" ON "public"."Booking"("event_type_id");

-- CreateIndex
CREATE INDEX "Booking_package_idx" ON "public"."Booking"("package_id");

-- CreateIndex
CREATE INDEX "Booking_venue_idx" ON "public"."Booking"("venue_id");

-- CreateIndex
CREATE INDEX "BookingService_serv_idx" ON "public"."BookingService"("serv_id");

-- CreateIndex
CREATE UNIQUE INDEX "BookingService_booking_serv_key" ON "public"."BookingService"("booking_id", "serv_id");

-- AddForeignKey
ALTER TABLE "public"."VenueTag" ADD CONSTRAINT "VenueTag_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "public"."Venue"("venue_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VenueTag" ADD CONSTRAINT "VenueTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."Tag"("tag_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_event_type_rel" FOREIGN KEY ("event_type_id") REFERENCES "public"."EventType"("event_type_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_package_rel" FOREIGN KEY ("package_id") REFERENCES "public"."Package"("package_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_venue_rel" FOREIGN KEY ("venue_id") REFERENCES "public"."Venue"("venue_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BookingService" ADD CONSTRAINT "BookingService_booking_rel" FOREIGN KEY ("booking_id") REFERENCES "public"."Booking"("booking_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BookingService" ADD CONSTRAINT "BookingService_serv_rel" FOREIGN KEY ("serv_id") REFERENCES "public"."Service"("serv_id") ON DELETE NO ACTION ON UPDATE CASCADE;
