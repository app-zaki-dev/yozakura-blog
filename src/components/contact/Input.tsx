import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { 
  Textarea, 
  Input, 
  FormLabel,
  Button,
  CssVarsProvider,
  Box,
  Grid
} from "@mui/joy";
import { contactValue } from "@/types/contactType";
import { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";

// バリデーション
const contactSchema = yup.object({
  name: yup.string().max(50, "お名前は50文字以内で入力してください").required("お名前は必須です"),
  email: yup.string().email("メールアドレスの形式で入力してください").required("メールアドレスは必須です"),
  contact: yup.string().max(5000, "お問い合わせ内容は5000文字以内で入力してください").required("お問い合わせ内容は必須です"),
}).required();

// テーマ
const theme = createTheme();

export default function InputContact (props: any) {
  const { control, register, handleSubmit, watch, setValue, formState: { errors } }
    = useForm<contactValue>({
      defaultValues: {
        name: "",
        email: "",
        contact: "",
      },
      resolver: yupResolver(contactSchema),
      mode: "all",
    });

  // 確認画面へ
  const onConfirm: SubmitHandler<contactValue> = (data) => {
    console.log("確認画面へ", data);
    props.handleNext();
    props.setFormValue({ ...props.formValue, input: data });
  }

  // 確認画面から戻ってきたときに入力値を表示
  useEffect(() => {
    const inputValue = props.formValue.input;
    if(inputValue) {
      setValue("name", inputValue.name);
      setValue("email", inputValue.email);
      setValue("contact", inputValue.contact);
    }
  });

  return (
    <div className="contact-input">      
      <CssVarsProvider>
        <form onSubmit={handleSubmit(onConfirm)}>
          <Grid>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Box sx={{ my: 2 }}>
                  <FormLabel>お名前</FormLabel>
                  <Input
                    {...field}
                    type="text"
                    placeholder="ヨザクラ花子"
                    error={errors.name ? true : false}
                  />
                  {errors.name &&
                    <Typography variant="overline" color="#ef5350">
                      {errors.name.message}
                    </Typography>
                  }
                </Box>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Box sx={{ my: 2 }}>
                  <FormLabel>メールアドレス</FormLabel>
                  <Input 
                    {...field}
                    type="email"
                    placeholder="yozakura@example.com"
                    error={errors.email ? true : false}
                  />
                  {errors.email &&
                    <Typography variant="overline" color="#ef5350">
                      {errors.email.message}
                    </Typography>
                  }
                </Box>
              )}
            />
            <Controller 
              control={control}
              name="contact"
              render={({ field }) => (
                <>
                  <FormLabel>お問い合わせ内容</FormLabel>
                  <Textarea
                    {...field}
                    placeholder="お問い合わせ内容をご入力ください"
                    minRows={14}
                    error={errors.contact ? true : false}
                  />
                  {errors.contact &&
                    <Typography variant="overline" color="#ef5350">
                      {errors.contact.message}
                    </Typography>
                  }
                </>
              )}
            />
          </Grid> 
          <Grid>
            <Button
              sx={{ mt: 4 }}
              color="primary"
              type="submit"
              fullWidth
            >
              確認画面に進む
            </Button>
          </Grid>
        </form>
      </CssVarsProvider>
    </div>
  )
}