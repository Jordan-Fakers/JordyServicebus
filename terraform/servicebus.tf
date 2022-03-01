resource "azurerm_servicebus_namespace" "ServiceBus" {
  name                = "JordyServiceBus"
  location            = azurerm_resource_group.JordyRG2.location
  resource_group_name = azurerm_resource_group.JordyRG2.name
  sku                 = "Standard"

  tags = {
    source      = "terraform"
    environment = "Test"
    Country     = "France"
  }
}

resource "azurerm_servicebus_namespace_authorization_rule" "ServiceRule" {
  name         = "ServiceBusRules"
  namespace_id = azurerm_servicebus_namespace.ServiceBus.id

  listen = true
  send   = true
  manage = true
}


### Service Bus Queue #############################################################

resource "azurerm_servicebus_queue" "ServiceQueue" {
  name         = "ServiceQueue"
  namespace_id = azurerm_servicebus_namespace.ServiceBus.id

  enable_partitioning = true
}

### Service Bus Topic ###############################################################

resource "azurerm_servicebus_topic" "JordyTopic" {
  name         = "JordyTopic"
  namespace_id = azurerm_servicebus_namespace.ServiceBus.id

  enable_partitioning = true
}

resource "azurerm_servicebus_subscription" "ServiceSub" {
  name               = "SubOne"
  topic_id           = azurerm_servicebus_topic.JordyTopic.id
  max_delivery_count = 1
}