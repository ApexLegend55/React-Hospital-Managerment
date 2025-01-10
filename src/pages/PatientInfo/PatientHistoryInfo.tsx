import * as Yup from "yup";
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
  responsiveFontSizes,
  Input,
  FormControl
} from "@mui/material";

import ImageUploadCard from "../../components/ClickableAvatar";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Appbar from "../../components/Appbar";
import { Link, useParams } from "react-router-dom";
import { DisplaySettings } from "@mui/icons-material";
import { experimentalStyled as styled } from '@mui/material/styles';
import Encounter from "../../components/Encounter";

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
                      
                     <Grid container rowSpacing={2} sx={{justifyContent: "space-between",alignItems: "center",}}>
                        <Grid item xs={12} sm={1}>
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
                      
                        <Grid item xs={12} sm={2} style={{textAlign:'right', paddingRight:'0'}}>
                          <ImageUploadCard/>
                        </Grid>
                      
                      </Grid>                     
                      <Grid container spacing={2} sx={{display:'flex', flexDirection:'row'}}>                        
                        <Grid item xs={12} sm={6} md={6}>
                          <div className="past-medical-history" style={styles.container} >
                            <h2>Past Medical History</h2>
                            <TextField 
                              id="past-medical-history"
                              fullWidth
                              multiline 
                              rows={8}
                              placeholder="Please write the past medical history" />
                          </div>
                          <div style={styles.container} className="past-surgical-history">
                            <h2>Past Surgical History</h2>
                            <TextField 
                              id="past-surgical-history"
                              fullWidth
                              multiline 
                              rows={8}
                              placeholder="Please write the past surgical history" />
                          </div>
                          <div style={styles.container} className="past-surgical-history">
                            <h2>Known Allergies</h2>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                              <Grid item xs={12}>
                                <FormControl variant="standard" fullWidth>
                                  <InputLabel htmlFor="component-simple">Allergen</InputLabel>
                                  <Input id="component-simple" />
                                </FormControl>
                              </Grid>
                              <Grid item xs={8}>
                                <FormControl variant="standard" fullWidth>
                                  <InputLabel htmlFor="component-simple">Reaction</InputLabel>
                                  <Input id="component-simple" />
                                </FormControl>
                              </Grid>
                              <Grid item xs={4}>
                                <FormControl variant="standard" fullWidth>
                                  <InputLabel htmlFor="component-simple">Status</InputLabel>
                                  <Input id="component-simple" />
                                </FormControl>
                              </Grid>
                            </Grid>
                          </div>
                          <div style={styles.container} className="past-surgical-history">
                            <h2>Health Maintenance</h2>
                            <div className="influenza-vaccine" style={styles.container}>
                              <label>Influenza Vaccine</label>
                              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Date</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Note</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Due</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Dose</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Lot#</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">MFR</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>

                              </Grid>
                            </div>
                            <div className="pneumococcal-vaccine" style={styles.container}>
                              <label>Pneumococcal Vaccine</label>
                              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Date</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Note</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Due</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Dose</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Lot#</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">MFR</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>

                              </Grid>
                            </div>
                            <div className="colorectal-screening" style={styles.container}>
                              <label>Colorectal Screening</label>
                              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Date</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Note</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Due</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                  <FormControl variant="standard" fullWidth>
                                    <InputLabel htmlFor="component-simple">Misc</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </div>
                            <div className="prostate-screening" style={styles.container}>
                              <label>Prostate Screening</label>
                              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Date</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Note</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Due</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                  <FormControl variant="standard" fullWidth>
                                    <InputLabel htmlFor="component-simple">Misc</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </div>
                            <div className="screening-mammogram" style={styles.container}>
                              <label>Screening Mammogram</label>
                              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Date</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Note</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Due</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                  <FormControl variant="standard" fullWidth>
                                    <InputLabel htmlFor="component-simple">Misc</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </div>
                            <div className="screening-pap-smear" style={styles.container}>
                              <label>Screening Pap Smear</label>
                              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Date</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Note</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Due</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                  <FormControl variant="standard" fullWidth>
                                    <InputLabel htmlFor="component-simple">Misc</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </div>
                          </div>                         
                        </Grid>  
                        <Grid item xs={12} sm={6} md={6}>
                          <div className="family-history" style={styles.container}>
                            <h2>Family History</h2>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">Diabetes</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">Stroke</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">Hypertension</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">Heart Disease</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">Cancer</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">Asthma</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">Hay Fever</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">Arthritis</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">Osteoporosis</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">Anemia</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">Migraine</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">Alzheimers</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">Epilepsy</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">Glaucoma</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            
                          </div>  
                          <div className="social-history" style={styles.container}>
                            <h2>Social History</h2>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">Alcohol Use</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">Caffeine Use</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">Tobacco Use</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">Drugs Use</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">Chm Exposure</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">TB Exposure</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">HIV Exposure</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">Sex Relations</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">Exercise</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel htmlFor="component-simple">Sleep Habits</InputLabel>
                              <Input id="component-simple" />
                            </FormControl>                            
                          </div>
                          <div className="master-problem-list" style={styles.container}>
                              <h2>Master Problem List</h2>
                              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Code</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Onset</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Nature</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={8}>
                                  <FormControl variant="standard" fullWidth>
                                    <InputLabel htmlFor="component-simple">Desc</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard" fullWidth>
                                    <InputLabel htmlFor="component-simple">Status</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                              </Grid>
                          </div>
                          <div className="master-medication-list" style={styles.container}>
                              <h2>Master Medication List</h2>
                              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={12}>
                                  <FormControl variant="standard" fullWidth>
                                    <InputLabel htmlFor="component-simple">Rx</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={8}>
                                  <FormControl variant="standard" fullWidth>
                                    <InputLabel htmlFor="component-simple">Sig</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard" fullWidth>
                                    <InputLabel htmlFor="component-simple">Status</InputLabel>
                                    <Input id="component-simple" />
                                  </FormControl>
                                </Grid>
                              </Grid>
                          </div>                        
                        </Grid>                      
                      </Grid>                     
                      <br />
                      <Grid container justifyContent="flex-end" sx={{p: 5}}>
                        <Grid item xs={2} sm={1}>
                          <Button
                            component={Link}
                            to={`/patient-info/${patient.id}`}
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
                           to={`/patient-info-encounter/${patient.id}`}                          
                           color="warning"
                           variant="contained"
                           >
                            Encounter
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
