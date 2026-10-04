resource "aws_wafv2_web_acl" "portfolio" {
  provider = aws.us_east_1

  name        = "dineth-portfolio-waf"
  description = "Web ACL for CloudFront edge distribution with rate limiting and AWS managed rules"
  scope       = "CLOUDFRONT"

  default_action {
    allow {}
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "dinethPortfolioWAF"
    sampled_requests_enabled   = true
  }

  # Rule 1: IP Rate Limiting (Prevents DDoS, HTTP floods, and scrapers)
  rule {
    name     = "RateLimit500RequestsPer5Minutes"
    priority = 1

    action {
      block {}
    }

    statement {
      rate_based_statement {
        limit              = 500
        aggregate_key_type = "IP"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "RateLimit500RequestsPer5Minutes"
      sampled_requests_enabled   = true
    }
  }

  # Rule 2: AWS Managed Common Rule Set (OWASP Top 10 protection)
  rule {
    name     = "AWSManagedRulesCommonRuleSet"
    priority = 2

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "AWSManagedRulesCommonRuleSet"
      sampled_requests_enabled   = true
    }
  }

  tags = {
    Name        = "Dineth Portfolio WAF"
    Environment = "dev"
    Project     = "aws-static-website"
  }
}
