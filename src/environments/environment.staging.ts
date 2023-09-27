import awsmobile from "src/aws-exports";
export const environment = {
  production: false,
  STRIPE_API: 'pk_test_51NpaEfL21evYAUlPxouvN6BnkvqmKL5hBTkTDGmfYpEl1dfXiJoWXi2DjMbFlJ8YjY2iYDIqkDaENQtnukSdqTgd00C4rkAgeb',
  GOOGLE_MAPS_API: 'AIzaSyABcNJOiFPqFdDvQFJinlQ4NgyMZvzoRig',
  API_BASE_URL: awsmobile?.aws_cloud_logic_custom[0]?.endpoint,
};
