-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT,
    "complement" TEXT,
    "lat" DECIMAL(65,30),
    "lon" DECIMAL(65,30),
    "is_active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "energy" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "independence" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pet_photos" (
    "id" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "caption" TEXT,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "pet_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adption_requirement" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "description" TEXT,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "adption_requirement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_photos" ADD CONSTRAINT "pet_photos_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adption_requirement" ADD CONSTRAINT "adption_requirement_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
