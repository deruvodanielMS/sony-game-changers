-- Add managerId column to people for self-referential manager relation
ALTER TABLE "people" ADD COLUMN "managerId" TEXT;

-- Add foreign key constraint referencing people(id)
ALTER TABLE "people" ADD CONSTRAINT "people_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "people"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Add index to speed up manager lookups
CREATE INDEX "people_managerId_idx" ON "people"("managerId");
