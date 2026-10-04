resource "aws_route53_zone" "portfolio" {
  count = var.enable_custom_domain ? 1 : 0
  name  = var.domain_name

  tags = merge(
    local.common_tags,
    {
      Name = "Portfolio Route 53 Hosted Zone"
    }
  )
}

# IPv4 Alias Record to CloudFront
resource "aws_route53_record" "ipv4" {
  count   = var.enable_custom_domain ? 1 : 0
  zone_id = aws_route53_zone.portfolio[0].zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}

# IPv6 Alias Record to CloudFront
resource "aws_route53_record" "ipv6" {
  count   = var.enable_custom_domain ? 1 : 0
  zone_id = aws_route53_zone.portfolio[0].zone_id
  name    = var.domain_name
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}
