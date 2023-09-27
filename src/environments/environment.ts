import awsmobile from "src/aws-exports";
export const environment = {
  production: true,
  STRIPE_API: 'pk_live_51NpaEfL21evYAUlPAB6QA8ChVu9PbtAbaRrsNJ8VUo6ogVYvuTWLzQjuiG68gVn6QQfXlSskJ3dcMhTvVONTIjXd00gNvMFIkE',
  GOOGLE_MAPS_API: 'AIzaSyABcNJOiFPqFdDvQFJinlQ4NgyMZvzoRig',
  API_BASE_URL: awsmobile?.aws_cloud_logic_custom[0]?.endpoint,
};
