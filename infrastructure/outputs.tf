output "s3_bucket_name" {
  description = "Name of the static website S3 bucket"
  value       = aws_s3_bucket.website.bucket
}

output "s3_bucket_arn" {
  description = "ARN of the static website S3 bucket"
  value       = aws_s3_bucket.website.arn
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution (required for CI/CD cache invalidation)"
  value       = aws_cloudfront_distribution.website.id
}

output "cloudfront_domain_name" {
  description = "Default CloudFront edge endpoint URL"
  value       = aws_cloudfront_distribution.website.domain_name
}

output "website_url" {
  description = "Public URL to access the deployed portfolio"
  value       = var.enable_custom_domain ? "https://${var.domain_name}" : "https://${aws_cloudfront_distribution.website.domain_name}"
}

output "waf_web_acl_arn" {
  description = "ARN of the associated AWS WAFv2 Web ACL"
  value       = aws_wafv2_web_acl.portfolio.arn
}

output "route53_nameservers" {
  description = "Route 53 authoritative nameservers (configure these at your domain registrar)"
  value       = var.enable_custom_domain ? aws_route53_zone.portfolio[0].name_servers : []
}
