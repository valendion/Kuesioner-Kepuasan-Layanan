import * as yup from "yup";
import { useFormik } from "formik";
import { questionData } from "@/app/utils/contans";

export const useValidation = ({ handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      age: "",
      gender: "",
      education: "",
      occupation: "",
      otherOccupation: "",
      services_received: "",
      answers: Array.from({ length: questionData.length }, () => ""),
      suggestion: "",
    },
    validationSchema: yup.object({
      age: yup
        .number()
        .integer("Harus berupa angka bulat")
        .max(99, "Angka tidak boleh lebih dari 2 digit")
        .required("Umur wajib diisi"),
      gender: yup.string().required("Jenis kelamin wajib dipilih"),
      education: yup.string().required("Pendidikan wajib dipilih"),
      occupation: yup.string().required("Pekerjaan wajib dipilih"),
      otherOccupation: yup.string().when("occupation", {
        is: "Lainnya",
        then: () => yup.string().required("Pekerjaan lainnyas wajib diisi"),
      }),
      services_received: yup
        .string()
        .required("Jenis layanan yang diterima wajib dipilih"),
      answers: yup.array().of(yup.string().required("Jawaban harus dipilih")),
      suggestion: yup.string(),
    }),
    onSubmit: handleSubmit,
  });
  return formik;
};
