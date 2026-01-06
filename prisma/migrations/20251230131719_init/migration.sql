-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "parentId" TEXT,
    "path" TEXT,
    CONSTRAINT "organization_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "organization" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "orgId" TEXT NOT NULL,
    CONSTRAINT "jobs_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "people" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "profileImageUrl" TEXT,
    "employeeId" TEXT,
    "workdayId" TEXT,
    "status" TEXT,
    "orgId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    CONSTRAINT "people_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "people_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "goals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "parentId" TEXT,
    "path" TEXT,
    "assignedTo" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,
    CONSTRAINT "goals_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "goals" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "goals_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "people" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "goals_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "people" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "goals_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "performance_periods" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "goal_ambitions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "goalId" TEXT NOT NULL,
    CONSTRAINT "goal_ambitions_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "goals" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "goal_actions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "goalId" TEXT NOT NULL,
    CONSTRAINT "goal_actions_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "goals" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "goal_achievements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "goalId" TEXT NOT NULL,
    CONSTRAINT "goal_achievements_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "goals" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "checkins" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "peopleId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,
    CONSTRAINT "checkins_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "people" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "checkins_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "people" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "checkins_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "performance_periods" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "peopleId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,
    CONSTRAINT "feedback_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "people" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "feedback_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "people" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "feedback_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "performance_periods" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "performance_reviews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "peopleId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "ambitions_text" TEXT NOT NULL,
    "achievements_text" TEXT NOT NULL,
    "strengths_text" TEXT NOT NULL,
    "growth_text" TEXT NOT NULL,
    "score" REAL NOT NULL,
    "final_score" REAL NOT NULL,
    "potential_score" REAL NOT NULL,
    "createdBy" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,
    CONSTRAINT "performance_reviews_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "people" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "performance_reviews_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "people" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "performance_reviews_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "performance_periods" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "performance_breakdown" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "performanceReviewId" TEXT NOT NULL,
    "peopleId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "score" REAL NOT NULL,
    "periodId" TEXT NOT NULL,
    CONSTRAINT "performance_breakdown_performanceReviewId_fkey" FOREIGN KEY ("performanceReviewId") REFERENCES "performance_reviews" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "performance_breakdown_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "people" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "performance_breakdown_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "performance_periods" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "performance_examples" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "breakdownId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    CONSTRAINT "performance_examples_breakdownId_fkey" FOREIGN KEY ("breakdownId") REFERENCES "performance_breakdown" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "performance_periods" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "fiscalYear" INTEGER NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "active" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "people_email_key" ON "people"("email");
