import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().optional().positive().integer().lessThan(100, "Too old").transform((currentValue) => isNaN(+currentValue)?undefined:currentValue),
  address: yup.string().optional(),
});

const theme = createTheme();

type Inputs = yup.InferType<typeof schema>;

export default function FormAssignment() {

  const { register, handleSubmit, formState: { errors },reset } = useForm<Inputs>(
    { resolver: yupResolver(schema) }
  );

  const onSubmit: SubmitHandler<Inputs> = data => { console.log(data); reset(); };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Part3.Q2 Assignments
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField error={errors.name?true:false} autoComplete="name" required fullWidth id="name" label="Name" autoFocus {...register("name") }  helperText={errors.name?.message} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField error={errors.age?true:false}  fullWidth id="age" label="Age" autoComplete="age" type="number"  {...register("age")} helperText={errors.age?.message} />
              </Grid>
              <Grid item xs={12}>
                <TextField error={errors.address?true:false}  fullWidth id="address" label="Address" autoComplete="address" {...register("address")} helperText={errors.address?.message} />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
