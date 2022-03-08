-- CreateTable
CREATE TABLE "Cabane" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,
    "location" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" INTEGER,

    CONSTRAINT "Cabane_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "isowner" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "Cabane" ADD CONSTRAINT "Cabane_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
