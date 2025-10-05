resource "aws_cloudwatch_log_group" "letschat_frontend" {
  name              = "/ecs/letschat-frontend"
  retention_in_days = 30
}

resource "aws_ecs_task_definition" "frontend" {
  family                   = "${var.name}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  execution_role_arn = data.terraform_remote_state.network.outputs.ecs_task_role_arn
  task_role_arn      = data.terraform_remote_state.network.outputs.ecs_task_role_arn

  container_definitions = jsonencode([
    {
      name      = "${var.name}"
      image     = "${var.frontend_image}"
      essential = true

      portMappings = [
        { containerPort = 80, hostPort = 80 }
      ]

      environment = [
        {
          name  = "BACKEND_HOST"
          value = "${data.terraform_remote_state.network.outputs.backend_service_discovery_name}.${data.terraform_remote_state.network.outputs.service_discovery_namespace_name}:3000"
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/letschat-frontend"
          "awslogs-region"        = "ap-south-1"
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])
}