-- CreateEnum
CREATE TYPE "PartyType" AS ENUM ('CUSTOMER','DEALER');
CREATE TYPE "AccountType" AS ENUM ('ASSET','LIABILITY','INCOME','EXPENSE');

-- CreateTable Branches
CREATE TABLE "branches" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT now(),
  "updated_at" TIMESTAMP DEFAULT now()
);

-- CreateTable OEMs
CREATE TABLE "oems" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT now(),
  "updated_at" TIMESTAMP DEFAULT now()
);

-- CreateTable Parties
CREATE TABLE "parties" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
  "type" "PartyType" NOT NULL,
  "name" TEXT NOT NULL,
  "branch_id" UUID,
  "created_at" TIMESTAMP DEFAULT now(),
  "updated_at" TIMESTAMP DEFAULT now(),
  CONSTRAINT "parties_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id")
);

-- CreateTable Dealers
CREATE TABLE "dealers" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
  "party_id" UUID UNIQUE NOT NULL,
  "oem_id" UUID,
  "branch_id" UUID,
  "created_at" TIMESTAMP DEFAULT now(),
  "updated_at" TIMESTAMP DEFAULT now(),
  CONSTRAINT "dealers_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "parties"("id"),
  CONSTRAINT "dealers_oem_id_fkey" FOREIGN KEY ("oem_id") REFERENCES "oems"("id"),
  CONSTRAINT "dealers_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id")
);

-- CreateTable KycDocuments
CREATE TABLE "kyc_documents" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
  "party_id" UUID NOT NULL,
  "doc_type" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "version" INTEGER NOT NULL DEFAULT 1,
  "deleted_at" TIMESTAMP,
  "created_at" TIMESTAMP DEFAULT now(),
  "updated_at" TIMESTAMP DEFAULT now(),
  CONSTRAINT "kyc_documents_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "parties"("id")
);
CREATE INDEX "idx_kyc_documents_party_id" ON "kyc_documents"("party_id");

-- CreateTable Products
CREATE TABLE "products" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT now(),
  "updated_at" TIMESTAMP DEFAULT now()
);

-- CreateTable Applications
CREATE TABLE "applications" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
  "app_number" TEXT NOT NULL,
  "party_id" UUID NOT NULL,
  "product_id" UUID NOT NULL,
  "branch_id" UUID,
  "status" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT now(),
  "updated_at" TIMESTAMP DEFAULT now(),
  CONSTRAINT "applications_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "parties"("id"),
  CONSTRAINT "applications_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id"),
  CONSTRAINT "applications_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id")
);
CREATE INDEX "idx_applications_app_number" ON "applications"("app_number");
CREATE INDEX "idx_applications_party_id" ON "applications"("party_id");

-- CreateTable Loans
CREATE TABLE "loans" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
  "application_id" UUID,
  "party_id" UUID NOT NULL,
  "product_id" UUID NOT NULL,
  "branch_id" UUID,
  "amount" DECIMAL(18,2) NOT NULL,
  "status" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT now(),
  "updated_at" TIMESTAMP DEFAULT now(),
  CONSTRAINT "loans_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id"),
  CONSTRAINT "loans_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "parties"("id"),
  CONSTRAINT "loans_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id"),
  CONSTRAINT "loans_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id")
);
CREATE INDEX "idx_loans_party_id" ON "loans"("party_id");

-- CreateTable RepaymentSchedules
CREATE TABLE "repayment_schedules" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
  "loan_id" UUID NOT NULL,
  "due_date" TIMESTAMP NOT NULL,
  "amount" DECIMAL(18,2) NOT NULL,
  "version" INTEGER NOT NULL DEFAULT 1,
  "deleted_at" TIMESTAMP,
  "created_at" TIMESTAMP DEFAULT now(),
  "updated_at" TIMESTAMP DEFAULT now(),
  CONSTRAINT "repayment_schedules_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "loans"("id")
);
CREATE INDEX "idx_repayment_schedules_loan_id" ON "repayment_schedules"("loan_id");
CREATE INDEX "idx_repayment_schedules_due_date" ON "repayment_schedules"("due_date");

-- CreateTable Receipts
CREATE TABLE "receipts" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
  "loan_id" UUID NOT NULL,
  "amount" DECIMAL(18,2) NOT NULL,
  "received_at" TIMESTAMP NOT NULL,
  "created_at" TIMESTAMP DEFAULT now(),
  "updated_at" TIMESTAMP DEFAULT now(),
  CONSTRAINT "receipts_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "loans"("id")
);
CREATE INDEX "idx_receipts_loan_id" ON "receipts"("loan_id");

-- CreateTable DisbursementVouchers
CREATE TABLE "disbursement_vouchers" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
  "loan_id" UUID NOT NULL,
  "amount" DECIMAL(18,2) NOT NULL,
  "created_at" TIMESTAMP DEFAULT now(),
  "updated_at" TIMESTAMP DEFAULT now(),
  CONSTRAINT "disbursement_vouchers_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "loans"("id")
);
CREATE INDEX "idx_disbursement_vouchers_loan_id" ON "disbursement_vouchers"("loan_id");

-- CreateTable GlAccounts
CREATE TABLE "gl_accounts" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
  "code" TEXT NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  "type" "AccountType" NOT NULL,
  "created_at" TIMESTAMP DEFAULT now(),
  "updated_at" TIMESTAMP DEFAULT now()
);

-- CreateTable GlEntries
CREATE TABLE "gl_entries" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
  "account_id" UUID NOT NULL,
  "loan_id" UUID,
  "debit" DECIMAL(18,2),
  "credit" DECIMAL(18,2),
  "entry_date" TIMESTAMP NOT NULL,
  "created_at" TIMESTAMP DEFAULT now(),
  "updated_at" TIMESTAMP DEFAULT now(),
  CONSTRAINT "gl_entries_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "gl_accounts"("id"),
  CONSTRAINT "gl_entries_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "loans"("id")
);
CREATE INDEX "idx_gl_entries_loan_id" ON "gl_entries"("loan_id");
