resource "aws_sns_topic" "portfolio_alerts" {
  name = "dineth-portfolio-alerts"

  tags = merge(
    local.common_tags,
    {
      Name = "Portfolio Alert Topic"
    }
  )
}

# CloudFront 5xx Error Rate Alarm
resource "aws_cloudwatch_metric_alarm" "cloudfront_5xx_errors" {
  provider            = aws.us_east_1
  alarm_name          = "${var.bucket_name}-cloudfront-high-5xx-errors"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "5xxErrorRate"
  namespace           = "AWS/CloudFront"
  period              = 300
  statistic           = "Average"
  threshold           = 5 # Alarm if 5xx rate exceeds 5%
  alarm_description   = "CloudFront 5xx error rate exceeded 5% across two 5-minute evaluation periods"
  alarm_actions       = [aws_sns_topic.portfolio_alerts.arn]

  dimensions = {
    DistributionId = aws_cloudfront_distribution.website.id
    Region         = "Global"
  }

  tags = local.common_tags
}

# WAF Blocked Requests Spike Alarm (DDoS or scanning detection)
resource "aws_cloudwatch_metric_alarm" "waf_blocked_requests" {
  provider            = aws.us_east_1
  alarm_name          = "${var.bucket_name}-waf-blocked-spike"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "BlockedRequests"
  namespace           = "AWS/WAFV2"
  period              = 300
  statistic           = "Sum"
  threshold           = 100 # Alarm if over 100 requests blocked in 5 minutes
  alarm_description   = "Spike in requests blocked by AWS WAF on CloudFront distribution"
  alarm_actions       = [aws_sns_topic.portfolio_alerts.arn]

  dimensions = {
    WebACL = aws_wafv2_web_acl.portfolio.name
    Region = "us-east-1"
    Rule   = "ALL"
  }

  tags = local.common_tags
}
