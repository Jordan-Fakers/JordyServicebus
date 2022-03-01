resource "azurerm_storage_account" "JordyStorage" {
  name                     = "jordystorage"
  resource_group_name      = azurerm_resource_group.JordyRG2.name
  location                 = azurerm_resource_group.JordyRG2.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_app_service_plan" "JordyAppPlan" {
  name                = "JordyAppPlan"
  location            = azurerm_resource_group.JordyRG2.location
  resource_group_name = azurerm_resource_group.JordyRG2.name
  kind                = "FunctionApp"

  sku {
    tier = "Dynamic"
    size = "Y1"
  }
}

resource "azurerm_function_app" "JordyFunction" {
  name                       = "JordyFunction"
  location                   = azurerm_resource_group.JordyRG2.location
  resource_group_name        = azurerm_resource_group.JordyRG2.name
  app_service_plan_id        = azurerm_app_service_plan.JordyAppPlan.id
  storage_account_name       = azurerm_storage_account.JordyStorage.name
  storage_account_access_key = azurerm_storage_account.JordyStorage.primary_access_key
  # connection_string {
    
  # }
}