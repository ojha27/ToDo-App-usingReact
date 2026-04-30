import * as yup from "yup";

export const todoSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  priority: yup.string().required("Priority is required"),
});
