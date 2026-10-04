# ==============================================================================
# AWS Static Website — Developer Workflow Makefile
# ==============================================================================

.PHONY: help install dev build clean ci ci-frontend ci-infra deploy-dryrun tf-init tf-validate tf-plan tf-apply tf-output deploy

help: ## Show this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Continuous Integration (CI) Targets:"
	@echo "  ci             Run full CI pipeline locally (frontend build + terraform checks)"
	@echo "  ci-frontend    Install dependencies, compile bundle, and verify dist artifacts"
	@echo "  ci-infra       Check Terraform canonical formatting and validate configuration"
	@echo "  deploy-dryrun  Build frontend and simulate S3 deployment without modifying AWS"
	@echo ""
	@echo "Frontend Development:"
	@echo "  install        Install frontend npm dependencies"
	@echo "  dev            Run Vite local development server"
	@echo "  build          Build static production bundle into frontend/dist"
	@echo "  clean          Remove local dist and temporary files"
	@echo ""
	@echo "Infrastructure Management:"
	@echo "  tf-init        Initialize Terraform working directory and providers"
	@echo "  tf-validate    Format and validate Terraform configuration"
	@echo "  tf-plan        Preview Terraform changes against cloud infrastructure"
	@echo "  tf-apply       Provision/update AWS infrastructure"
	@echo "  tf-output      Display outputs (CloudFront URL, S3 Bucket, etc.)"
	@echo ""
	@echo "Deployment (Future/Live):"
	@echo "  deploy         Build frontend, sync assets to S3, and invalidate CloudFront"

# ── CI Pipeline Targets ───────────────────────────────────────────────────────

ci: ci-frontend ci-infra
	@echo "========================================================"
	@echo "✅ All Continuous Integration (CI) checks passed locally!"
	@echo "========================================================"

ci-frontend:
	@echo "──> [CI] Testing Frontend Build & Asset Integrity..."
	cd frontend && npm ci
	cd frontend && npm run build
	@test -f frontend/dist/index.html || { echo "❌ dist/index.html missing"; exit 1; }
	@test -d frontend/dist/assets || { echo "❌ dist/assets directory missing"; exit 1; }
	@echo "✓ Frontend bundle verified successfully."

ci-infra:
	@echo "──> [CI] Checking Terraform Formatting & Syntax..."
	cd infrastructure && terraform fmt -check -diff
	cd infrastructure && terraform init -backend=false
	cd infrastructure && terraform validate
	@echo "✓ Terraform configuration verified successfully."

deploy-dryrun: build
	@echo "========================================================"
	@echo "🚀 SIMULATED DRY-RUN DEPLOYMENT"
	@echo "========================================================"
	@echo "Bundle verified at frontend/dist:"
	@ls -la frontend/dist
	@echo ""
	@echo "Simulated target cache strategies:"
	@echo "  - frontend/dist/assets/* -> public, max-age=31536000, immutable"
	@echo "  - frontend/dist/*.html   -> no-cache, no-store, must-revalidate"
	@echo "✓ Dry-run completed. Zero AWS cloud changes performed."
	@echo "========================================================"

# ── Frontend Targets ──────────────────────────────────────────────────────────

install:
	cd frontend && npm install

dev:
	cd frontend && npm run dev

build:
	cd frontend && npm run build

clean:
	rm -rf frontend/dist

# ── Infrastructure Targets ───────────────────────────────────────────────────

tf-init:
	cd infrastructure && terraform init

tf-validate:
	cd infrastructure && terraform fmt && terraform validate

tf-plan:
	cd infrastructure && terraform plan

tf-apply:
	cd infrastructure && terraform apply

tf-output:
	cd infrastructure && terraform output

# ── Deployment Target ────────────────────────────────────────────────────────

deploy: build
	@echo "Fetching Terraform outputs..."
	$(eval BUCKET := $(shell cd infrastructure && terraform output -raw s3_bucket_name))
	$(eval DIST_ID := $(shell cd infrastructure && terraform output -raw cloudfront_distribution_id))
	@echo "Deploying to S3 Bucket: $(BUCKET)"
	aws s3 sync frontend/dist/assets s3://$(BUCKET)/assets --delete --cache-control "public, max-age=31536000, immutable"
	aws s3 sync frontend/dist s3://$(BUCKET) --delete --exclude "assets/*" --cache-control "no-cache, no-store, must-revalidate"
	@echo "Invalidating CloudFront Distribution: $(DIST_ID)"
	aws cloudfront create-invalidation --distribution-id $(DIST_ID) --paths "/*"
	@echo "✅ Deployment complete!"
