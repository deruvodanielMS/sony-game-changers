-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "parentId" TEXT,
    "path" TEXT,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "orgId" TEXT NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "people" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "profileImageUrl" TEXT,
    "employeeId" TEXT,
    "workdayId" TEXT,
    "status" TEXT,
    "orgId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goals" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "parentId" TEXT,
    "path" TEXT,
    "assignedTo" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,

    CONSTRAINT "goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goal_ambitions" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "goalId" TEXT NOT NULL,

    CONSTRAINT "goal_ambitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goal_actions" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "goalId" TEXT NOT NULL,

    CONSTRAINT "goal_actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goal_achievements" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "goalId" TEXT NOT NULL,

    CONSTRAINT "goal_achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkins" (
    "id" TEXT NOT NULL,
    "peopleId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,

    CONSTRAINT "checkins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" TEXT NOT NULL,
    "peopleId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "performance_reviews" (
    "id" TEXT NOT NULL,
    "peopleId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "ambitions_text" TEXT NOT NULL,
    "achievements_text" TEXT NOT NULL,
    "strengths_text" TEXT NOT NULL,
    "growth_text" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "final_score" DOUBLE PRECISION NOT NULL,
    "potential_score" DOUBLE PRECISION NOT NULL,
    "createdBy" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,

    CONSTRAINT "performance_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "performance_breakdown" (
    "id" TEXT NOT NULL,
    "performanceReviewId" TEXT NOT NULL,
    "peopleId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "periodId" TEXT NOT NULL,

    CONSTRAINT "performance_breakdown_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "performance_examples" (
    "id" TEXT NOT NULL,
    "breakdownId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "performance_examples_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "performance_periods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fiscalYear" INTEGER NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "performance_periods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "people_email_key" ON "people"("email");

-- AddForeignKey
ALTER TABLE "organization" ADD CONSTRAINT "organization_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "people" ADD CONSTRAINT "people_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "people" ADD CONSTRAINT "people_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "goals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "performance_periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goal_ambitions" ADD CONSTRAINT "goal_ambitions_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "goals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goal_actions" ADD CONSTRAINT "goal_actions_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "goals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goal_achievements" ADD CONSTRAINT "goal_achievements_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "goals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkins" ADD CONSTRAINT "checkins_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkins" ADD CONSTRAINT "checkins_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkins" ADD CONSTRAINT "checkins_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "performance_periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "performance_periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "performance_reviews" ADD CONSTRAINT "performance_reviews_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "performance_reviews" ADD CONSTRAINT "performance_reviews_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "performance_reviews" ADD CONSTRAINT "performance_reviews_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "performance_periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "performance_breakdown" ADD CONSTRAINT "performance_breakdown_performanceReviewId_fkey" FOREIGN KEY ("performanceReviewId") REFERENCES "performance_reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "performance_breakdown" ADD CONSTRAINT "performance_breakdown_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "performance_breakdown" ADD CONSTRAINT "performance_breakdown_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "performance_periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "performance_examples" ADD CONSTRAINT "performance_examples_breakdownId_fkey" FOREIGN KEY ("breakdownId") REFERENCES "performance_breakdown"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
