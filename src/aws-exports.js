/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

awsmobile = {
  "aws_project_region": "us-east-1",
  "aws_cloud_logic_custom": [
      {
          "name": "coreAPI",
          "endpoint": "https://8hbtkzkq1a.execute-api.us-east-1.amazonaws.com/prod",
          "region": "us-east-1"
      }
  ],
  "aws_cognito_identity_pool_id": "us-east-1:e53e6246-1bc1-4977-88bc-5e2dfe8f6c48",
  "aws_cognito_region": "us-east-1",
  "aws_user_pools_id": "us-east-1_lACvNJfGF",
  "aws_user_pools_web_client_id": "fg52uibn8fdivffg8bo1j562n",
  "oauth": {},
  "aws_cognito_username_attributes": [
      "EMAIL"
  ],
  "aws_cognito_social_providers": [],
  "aws_cognito_signup_attributes": [
      "EMAIL",
      "NAME",
      "PHONE_NUMBER",
      "ADDRESS"
  ],
  "aws_cognito_mfa_configuration": "OFF",
  "aws_cognito_mfa_types": [
      "SMS"
  ],
  "aws_cognito_password_protection_settings": {
      "passwordPolicyMinLength": 8,
      "passwordPolicyCharacters": []
  },
  "aws_cognito_verification_mechanisms": [
      "EMAIL"
  ],
  "aws_dynamodb_all_tables_region": "us-east-1",
  "aws_dynamodb_table_schemas": [
      {
          "tableName": "coreDynamo-prod",
          "region": "us-east-1"
      }
  ],
  "aws_user_files_s3_bucket": "shopwriterpros3191212-prod",
  "aws_user_files_s3_bucket_region": "us-east-1"
};

module.exports = awsmobile;
