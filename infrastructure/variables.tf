variable "aws_region" {
  description = "Primary AWS region for infrastructure deployment"
  type        = string
  default     = "ap-southeast-1"
}

variable "bucket_name" {
  description = "Name of the S3 bucket for website hosting (must be globally unique)"
  type        = string
  default     = "dineth-portfolio-website-bucket"
}

variable "enable_custom_domain" {
  description = "Set to true if you own a registered domain and want to provision Route 53 & ACM"
  type        = bool
  default     = false
}

variable "domain_name" {
  description = "Custom domain name for the portfolio (e.g., portfolio.yourdomain.com)"
  type        = string
  default     = "portfolio.dineth-example.com"
}

variable "environment" {
  description = "Deployment environment name"
  type        = string
  default     = "production"
}

variable "project_name" {
  description = "Project name tag for resource tracking"
  type        = string
  default     = "aws-static-website"
}
