import * as Yup from "yup";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import '../../styles.css'
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  Box,
  Divider,
  Paper,
  IconButton,
  Avatar,
  FormControl,
  Input,
  SelectChangeEvent
} from "@mui/material";
import ImageUploadCard from "../../components/ClickableAvatar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Appbar from "../../components/Appbar";
import { Link, useParams } from "react-router-dom";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { blueGrey, grey } from "@mui/material/colors";
import SelectGender from "../../components/SelectGender";
import SelectStatus from "../../components/WorkInformation";

// select marriage

export function Marriage () {
  // set marriage
  const [marriage, setMarriage] = useState<string>('');
  const handleChange = (event: SelectChangeEvent) => {
      setMarriage(event.target.value);
    };
  return (
    <>
      <FormControl variant="standard" sx={{ minWidth:490 }}>
        <InputLabel id="demo-simple-select-standard-label">Marriage</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={marriage}
          onChange={handleChange}
          label="Marriage"
        >
          <MenuItem value={10}>Married</MenuItem>
          <MenuItem value={20}>Divorced</MenuItem>
          <MenuItem value={30}>Separated</MenuItem>
          <MenuItem value={40}>Widowed</MenuItem>
          <MenuItem value={50}>Single</MenuItem>
          <MenuItem value={60}>Cohabiting</MenuItem>
          <MenuItem value={70}>Polygamous</MenuItem>
          <MenuItem value={80}>Other</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

// select race
export function Race () {
  // set marriage
  const [race, setRace] = useState<string>('');
  const handleChange = (event: SelectChangeEvent) => {
      setRace(event.target.value);
    };
  return (
    <>
      <FormControl variant="standard" sx={{ minWidth:490 }}>
        <InputLabel id="demo-simple-select-standard-label">Race</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={race}
          onChange={handleChange}
          label="Race"
        >
          <MenuItem value={10}>White</MenuItem>
          <MenuItem value={20}>Black</MenuItem>
          <MenuItem value={30}>Hispanic</MenuItem>
          <MenuItem value={40}>Asian</MenuItem>
          <MenuItem value={50}>Other</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}


const PatientInfoSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  phoneNumber: Yup.string()
    .required("Required")
    .matches(/^\d+$/, "Phone number must contain only digits"),
  email: Yup.string().email("Invalid email").required("Required"),
  age: Yup.number().required("Required").positive("Age must be positive"),
  bloodGroup: Yup.string().required("Required"),
  referredByDoctor: Yup.string().required("Required"),
  referredByDoctorEmail: Yup.string().email("Invalid email"),
  referredByDoctorPhoneNumber: Yup.string().matches(
    /^\d+$/,
    "Phone number must contain only digits"
  ),
  diseases: Yup.string().required("Required"),
  patientHistory: Yup.string(),
});



const PatientInfo = ({ patients }: any) => {
  const { id } = useParams<{ id: string }>();
  const patient = patients?.find(
    (patient: any) => patient.id === parseInt(id || "", 10)
  );
  const initialValues = {
    id: patient.id,
    firstName: patient.firstName,
    lastName: patient.lastName,
    address: patient.address,
    phoneNumber: patient.phoneNumber,
    email: patient.email,
    age: patient.age,
    bloodGroup: patient.bloodGroup,
    referredByDoctor: patient.referredByDoctor,
    referredByDoctorEmail: patient.referredByDoctorEmail,
    referredByDoctorPhoneNumber: patient.referredByDoctorPhoneNumber,
    diseases: patient.diseases,
    patientHistory: patient.patientHistory,
  };
  const handleSubmit = (values: any, { resetForm }: any) => {
    console.log(values);
    //resetForm();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar appBarTitle="General" />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        
        <Container sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Grid
              container
              spacing={2}
              sx={{ marginleft: "10px", padding: "20px" }}
            >           
              <Grid item xs={12}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={PatientInfoSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    
                    <Form>
                      <Grid item xs={12} sm={12}>
                      <div className="setside">
                        <div className="left">
                          <IconButton component={Link} to="/patient-list" color="inherit">
                            <ArrowBackIcon />
                          </IconButton>
                        </div>                        
                      </div>
                        </Grid>  
                      
                     <Grid container spacing={2} sx={{justifyContent: "space-between",alignItems: "center",}}>
                        <Grid item xs={12} sm={2}>
                          <Field
                            as={TextField}
                            name="id"
                            label="Chart"
                            fullWidth
                          />
                          
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Field
                            as={TextField}
                            name="firstName"
                            label="First Name"
                            fullWidth
                            error={errors.firstName && touched.firstName}
                            helperText={touched.firstName && errors.firstName}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Field
                            as={TextField}
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            error={errors.lastName && touched.lastName}
                            helperText={touched.lastName && errors.lastName}
                          />
                        </Grid>                     
                        <Grid item xs={12} sm={1}>
                          <Field
                            as={TextField}
                            name="age"
                            label="Age"
                            fullWidth
                            error={touched.age && Boolean(errors.age)}
                            helperText={touched.age && errors.age}
                          />
                        </Grid>
                        <Grid item xs={12} sm={1} style={{textAlign:'right'}}>
                          <IconButton component={Link} to="/pdf-viewer" color="inherit">
                            <DocumentScannerIcon                              
                              style={{
                                width:"50px",
                                height: "50px",
                              }}
                            ></DocumentScannerIcon>
                          </IconButton>
                        </Grid>
                      
                        <Grid item xs={12} sm={2} style={{textAlign:'right', padding:'0'}}>
                          <ImageUploadCard/>
                        </Grid>
                      
                      </Grid>                     
                      <Grid container spacing={2}>                        
                        <Grid item xs={12} sm={6} md={6}>
                          <div className="personal-information" style={styles.container}>
                            <h2>Personal Information</h2>
                            <Grid container rowSpacing={1}>
                              <FormControl variant="standard" fullWidth>
                                <InputLabel htmlFor="component-simple">ID:</InputLabel>
                                <Input id="component-simple" />
                              </FormControl>
                              <FormControl variant="standard" fullWidth>
                                <InputLabel htmlFor="component-simple">MRN:</InputLabel>
                                <Input id="component-simple" />
                              </FormControl>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']} >
                                  <DatePicker label="DOB"  />
                                </DemoContainer>
                              </LocalizationProvider>
                              <SelectGender width={490}/>
                              <Marriage/>
                              <FormControl variant="standard" fullWidth>
                                <InputLabel htmlFor="component-simple">Siblings:</InputLabel>
                                <Input id="component-simple" />
                              </FormControl>
                              <Race/>
                              <FormControl variant="standard" fullWidth>
                                <InputLabel htmlFor="component-simple">Pharmacy:</InputLabel>
                                <Input id="component-simple" />
                              </FormControl>
                              <FormControl variant="standard" fullWidth>
                                <InputLabel htmlFor="component-simple">Other:</InputLabel>
                                <Input id="component-simple" />
                              </FormControl>
                            </Grid>                       
                          </div>
                          <div className="contact-information" style={styles.container}>
                            <h2>Contact Information</h2>
                            <Grid container rowSpacing={1}>
                              <Grid xs={12}>
                                <TextField
                                  id="outlined-multiline-static"
                                  label="Address"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                />
                              </Grid>
                              <Grid xs={12}>
                                <TextField
                                  id="outlined-multiline-static"
                                  label="City"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                />
                              </Grid>
                              <Grid xs={12}>
                                <TextField
                                  id="outlined-multiline-static"
                                  label="Post Code"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                />
                              </Grid>
                              
                              <TextField
                                id="outlined-multiline-static"
                                label="Country"
                                multiline
                                variant="standard"
                                fullWidth
                              />
                              <TextField
                                id="outlined-multiline-static"
                                label="State"
                                multiline
                                variant="standard"
                                fullWidth
                              />
                              <TextField
                                id="outlined-multiline-static"
                                label="Home Ph"
                                multiline
                                variant="standard"
                                fullWidth
                              />
                              <TextField
                                id="outlined-multiline-static"
                                label="Cell Ph"
                                multiline
                                variant="standard"
                                fullWidth
                              />
                              <TextField
                                id="outlined-multiline-static"
                                label="Email"
                                multiline
                                variant="standard"
                                fullWidth
                              />
                              <TextField
                                id="outlined-multiline-static"
                                label="Emergency"
                                multiline
                                variant="standard"
                                fullWidth
                              />
                              
                            </Grid>                       
                          </div>                                      
                        </Grid>  
                        <Grid item xs={12} sm={6} md={6}>
                          <div style={styles.container}>
                            <h2>Insurance 1</h2>
                            <Grid container rowSpacing={1}>
                              <TextField
                                id="outlined-multiline-static"
                                label="Carrier:"
                                multiline
                                variant="standard"
                                fullWidth
                              />
                              <TextField
                                id="outlined-multiline-static"
                                label="Address:"
                                multiline
                                variant="standard"
                                fullWidth
                              />
                              <TextField
                                id="outlined-multiline-static"
                                label="City:"
                                multiline
                                variant="standard"
                                fullWidth
                              />
                              <TextField
                                id="outlined-multiline-static"
                                label="Postcode:"
                                multiline
                                variant="standard"
                                fullWidth
                              />
                              <TextField
                                id="outlined-multiline-static"
                                label="Country:"
                                multiline
                                variant="standard"
                                fullWidth
                              />
                              <TextField
                                id="outlined-multiline-static"
                                label="State:"
                                multiline
                                variant="standard"
                                fullWidth
                              />
                              <TextField
                                id="outlined-multiline-static"
                                label="Phone:"
                                multiline
                                variant="standard"
                                fullWidth
                              />
                              <TextField
                                id="outlined-multiline-static"
                                label="Facsimile:"
                                multiline
                                variant="standard"
                                fullWidth
                              />
                              <TextField
                                id="outlined-multiline-static"
                                label="Plan:"
                                multiline
                                variant="standard"
                                fullWidth
                              /><TextField
                                id="outlined-multiline-static"
                                label="Expiry:"
                                multiline
                                variant="standard"
                                fullWidth
                              />
                              <TextField
                                id="outlined-multiline-static"
                                label="ID No:"
                                multiline
                                variant="standard"
                                fullWidth
                              />
                              <TextField
                                id="outlined-multiline-static"
                                label="Group No:"
                                multiline
                                variant="standard"
                                fullWidth
                              />
                              <TextField
                                id="outlined-multiline-static"
                                label="Copay:"
                                multiline
                                variant="standard"
                                fullWidth
                              />
                              <TextField
                                id="outlined-multiline-static"
                                label="Auth No:"
                                multiline
                                variant="standard"
                                fullWidth
                              />
                              <Grid xs={12} paddingBottom={2} borderBottom={1} borderColor={"#cfd8dc"}>
                                <TextField
                                  id="outlined-multiline-static"
                                  label="Remarks:"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                />
                              </Grid>
                              <TextField
                                id="outlined-multiline-static"
                                label="Relation:"
                                multiline
                                variant="standard"
                                fullWidth
                              />
                              <TextField
                                id="outlined-multiline-static"
                                label="Home Ph:"
                                multiline
                                variant="standard"
                                fullWidth
                              />
                              <Grid container xs={12}>
                                <Grid xs={5}>
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="Last Name"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                  />
                                </Grid>
                                <Grid xs={5}>
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="First Name"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                  />
                                </Grid>
                                <Grid xs={2}>
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="MI"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                  />
                                </Grid>
                              </Grid>
                              
                              <Grid xs={12} sx={{justifyContent:'space-between',display:'flex'}}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']} >
                                      <DatePicker label="DOB"  />
                                    </DemoContainer>
                                  </LocalizationProvider>
                                  <SelectGender margin={2}/>
                                
                              </Grid>
                            </Grid>                                                                           
                            
                          </div>  
                          <div style={styles.container}>
                            <h2>Work Information</h2>
                            <SelectStatus/>                                                                           
                            <TextField
                                id="outlined-multiline-static"
                                label="Employer:"
                                multiline
                                variant="standard"
                                fullWidth
                              />                
                              <TextField
                                id="outlined-multiline-static"
                                label="Work Ph:"
                                multiline
                                variant="standard"
                                fullWidth
                              />        
                          </div>                        
                        </Grid>                      
                      </Grid>                     
                      <br />
                        
                      <Grid container justifyContent="flex-end">
                        <Grid item xs={2} sm={1}>
                          <Button
                            component={Link}
                            to="/patient-list"
                            color="inherit"
                          >
                            Cancel
                          </Button>
                        </Grid>
                        <Grid item xs={2} sm={1}>
                          <Button type="submit" variant="contained">
                            Save
                          </Button>                          
                        </Grid>
                        <Grid item xs={2} sm={1}>
                          <Button 
                           component={Link}
                           to={`/patient-info-history/${patient.id}`}
                           color="warning"
                           variant="contained"
                           >
                            History
                          </Button> 
                                                 
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    border: '1px solid lightgray',
    borderRadius: '5px',
    padding: '20px',
    margin: 'auto',
    marginTop: '20px',
  },
  header: {
    textAlign: 'center',
  },
   subHeader: {
    marginTop: '20px',
  },
  field: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  label: {
    marginLeft: '10px',
    width:'20%',
  },
  input: {
    flex: 1,
    marginLeft: '10px',
    padding: '5px',
    border: '1px solid lightgray',
    borderRadius: '3px',
  },
 
};

export default PatientInfo;
