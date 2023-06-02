/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

awsmobile = {
  "aws_project_region": "us-east-1",
  "aws_cognito_identity_pool_id": "us-east-1:aeffe68a-6c57-404b-8777-e6dd01b55bc7",
  "aws_cognito_region": "us-east-1",
  "aws_user_pools_id": "us-east-1_PkXvHo7aE",
  "aws_user_pools_web_client_id": "2ti5l5vgkp7s3669p632fssrnq",
  "oauth": {},
  "aws_cognito_username_attributes": [
      "EMAIL"
  ],
  "aws_cognito_social_providers": [],
  "aws_cognito_signup_attributes": [
      "ADDRESS",
      "EMAIL",
      "NAME",
      "PHONE_NUMBER"
  ],
  "aws_cognito_mfa_configuration": "OPTIONAL",
  "aws_cognito_mfa_types": [
      "TOTP"
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
          "tableName": "coreDynamo-staging",
          "region": "us-east-1"
      }
  ],
  "aws_cloud_logic_custom": [
      {
          "name": "coreAPI",
          "endpoint": "https://8h3vwutdq2.execute-api.us-east-1.amazonaws.com/staging",
          "region": "us-east-1"
      }
  ]
};


module.exports = awsmobile;
