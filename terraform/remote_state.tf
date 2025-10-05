data "terraform_remote_state" "network" {
  backend = "s3"
  config = {
    bucket = "devesh11411"
    key    = "dev/terraform.tfstate"
    region = "ap-south-1"
  }
}
