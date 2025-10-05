terraform {
  backend "s3" {
    bucket = "devesh11411"
    key    = "frontend/terraform.tfstate"
    region = "ap-south-1"
  }
}